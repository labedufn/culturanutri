import { CriarEstabelecimentoController } from "@controllers/estabelecimento/CriarEstabelecimentoController";
import { EditarEstabelecimentoController } from "@controllers/estabelecimento/EditarEstabelecimentoController";
import { ListarEstabelecimentosController } from "@controllers/estabelecimento/ListarEstabelecimentosController";
import { ListarUsuariosController } from "@controllers/usuario/ListarUsuariosController";
import { AtualizarUsuarioController } from "@controllers/usuario/AtualizarUsuarioController";
import { AutenticarUsuarioController } from "@controllers/usuario/AutenticarUsuarioController";
import { CriarUsuarioController } from "@controllers/usuario/CriarUsuarioController";
import { RecuperarSenhaController } from "@controllers/usuario/RecuperarSenhaController";
import { RedefinirSenhaController } from "@controllers/usuario/RedefinirSenhaController";
import { SolicitarCadastroController } from "@controllers/usuario/SolicitarCadastroController";
import { authCriarUsuario, authUsuario } from "@middlewares/authUsuario";
import { validarCadastroToken } from "@utils/validarCadastroToken";
import { Router } from "express";
import { EditarUsuarioController } from "@controllers/usuario/EditarUsuarioController";
import { BuscarUsuarioController } from "@controllers/usuario/BuscarUsuarioController";
import { BuscarEstabelecimentoController } from "@controllers/estabelecimento/BuscarEstabelecimentoController";

export const router = Router();

// Rotas usuários
router.post("/api/cadastro", new CriarUsuarioController().handle);
router.post("/api/usuario", authCriarUsuario, new SolicitarCadastroController().handle);
router.put("/api/usuario", authUsuario, new AtualizarUsuarioController().handle);
router.post("/api/login", new AutenticarUsuarioController().handle);
router.post("/api/recuperar-senha", new RecuperarSenhaController().handle);
router.post("/api/redefinir-senha", new RedefinirSenhaController().handle);
router.get("/api/validar-cadastro-token", validarCadastroToken);
router.put("/api/editar-usuario", new EditarUsuarioController().handle);
router.get("/api/listar-usuario", new ListarUsuariosController().handle);
router.get("/api/buscar-usuario", new BuscarUsuarioController().handle);

// Rotas Estabelecimento
router.post("/api/cadastro-estabelecimento", new CriarEstabelecimentoController().handle);
router.put("/api/editar-estabelecimento", new EditarEstabelecimentoController().handle);
router.get("/api/listar-estabelecimento", new ListarEstabelecimentosController().handle);
router.get("/api/buscar-estabelecimento", new BuscarEstabelecimentoController().handle);
