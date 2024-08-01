import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { buscarAvaliacao } from "@/actions/buscar-avaliacao";
import { CustomMiddleware } from "@/middlewares/chain";

export function validarIdAvaliacao(middleware: CustomMiddleware): CustomMiddleware {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith("/dashboard/avaliacoes/")) {
      const slug = pathname.split("/").pop();

      if (!slug) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      try {
        const avaliacaoResponse = await buscarAvaliacao(slug);
        if (!avaliacaoResponse.success) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      } catch (error) {
        console.error("Erro ao buscar avaliação:", error);
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }

    return middleware(request, event, response);
  };
}
