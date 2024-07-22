import { verificarToken } from "@/scripts/verificarToken";
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { CustomMiddleware } from "./chain";
import { buscarUsuario } from "@/actions/buscar-usuario";

export function autenticarUsuario(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    const token = request.cookies.get("token")?.value;
    const authenticated = token ? await verificarToken(token) : false;

    if (!authenticated) {
      if (request.nextUrl.pathname.startsWith("/autenticacao")) {
        return middleware(request, event, response);
      }

      const redirectResponse = NextResponse.redirect(new URL("/autenticacao/login", request.url));
      redirectResponse.cookies.set("token", "", { maxAge: -1 });
      return redirectResponse;
    } else {
      try {
        const usuarioResponse = await buscarUsuario();
        const usuario = usuarioResponse.data?.usuario;
        if (!usuario || !usuario.ativo) {
          const redirectResponse = NextResponse.redirect(new URL("/autenticacao/login", request.url));
          redirectResponse.cookies.set("token", "", { maxAge: -1 });
          return redirectResponse;
        }

        const tipoUsuario = usuario?.tipo_usuario;
        if (request.nextUrl.pathname.startsWith("/dashboard/usuarios") && tipoUsuario !== "ADMINISTRADOR") {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        if (
          request.nextUrl.pathname === "/" ||
          request.nextUrl.pathname.startsWith("/autenticacao/login") ||
          request.nextUrl.pathname.startsWith("/autenticacao/cadastro")
        ) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        const redirectResponse = NextResponse.redirect(new URL("/autenticacao/login", request.url));
        redirectResponse.cookies.set("token", "", { maxAge: -1 });
        return redirectResponse;
      }
    }

    return middleware(request, event, response);
  };
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/autenticacao/:path*"],
};
