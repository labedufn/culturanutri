import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { buscarAvaliacao } from "@/actions/buscar-avaliacao";
import { CustomMiddleware } from "@/middlewares/chain";

export function validarIdAvaliacao(middleware: CustomMiddleware): CustomMiddleware {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    const pathname = request.nextUrl.pathname;

    const ignoredRoutes = ["/dashboard/avaliacoes/nova", "/dashboard/avaliacoes/minhas"];

    if (pathname.startsWith("/dashboard/avaliacoes/")) {
      const segments = pathname.split("/");
      const slug = segments[segments.length - 1];

      if (ignoredRoutes.includes(pathname)) {
        return middleware(request, event, response);
      }

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
