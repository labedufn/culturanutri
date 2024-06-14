import { verificarToken } from "@/scripts/verificarToken";
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { CustomMiddleware } from "./chain";

export function autenticarUsuario(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    const token = request.cookies.get("token")?.value;
    const authenticated = token ? await verificarToken(token) : false;

    if (
      (!authenticated && request.nextUrl.pathname === "/") ||
      (!authenticated && request.nextUrl.pathname.startsWith("/dashboard"))
    ) {
      response = NextResponse.redirect(new URL("/autenticacao/login", request.url));
    }

    if (
      authenticated &&
      (request.nextUrl.pathname === "/" ||
        request.nextUrl.pathname.startsWith("/autenticacao/login") ||
        request.nextUrl.pathname.startsWith("/autenticacao/cadastro"))
    ) {
      response = NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return middleware(request, event, response);
  };
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/autenticacao/:path*"],
};
