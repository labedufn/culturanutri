import { verificarToken } from "@/scripts/verificarToken";
import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { CustomMiddleware } from "./chain";

export function validarTokenCadastro(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    const token = request.nextUrl.searchParams.get("token");
    const currentUrl = request.nextUrl.pathname;

    if (token === null && currentUrl === "/autenticacao/cadastro") {
      return NextResponse.redirect(new URL("/autenticacao/login", request.url));
    } else if (token) {
      try {
        const isValid = await verificarToken(token);
        if (!isValid) {
          return NextResponse.redirect(new URL("/erro/link-invalido", request.url));
        }
      } catch (error) {
        return NextResponse.redirect(new URL("/erro/link-invalido", request.url));
      }
    }

    return middleware(request, event, response);
  };
}

export const config = {
  matcher: ["/autenticacao/cadastro"],
};
