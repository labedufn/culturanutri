import { chain } from "@/middlewares/chain";
import { autenticarUsuario } from "./middlewares/autenticarUsuario";
import { redefinirSenhaToken } from "./middlewares/redefinirSenhaToken";
import { validarTokenCadastro } from "./middlewares/validarTokenCadastro";

export default chain([autenticarUsuario, validarTokenCadastro, redefinirSenhaToken]);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
