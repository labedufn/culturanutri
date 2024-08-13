import { CriarEstabelecimentoController } from "@controllers/estabelecimento/CriarEstabelecimentoController";
import { EditarEstabelecimentoController } from "@controllers/estabelecimento/EditarEstabelecimentoController";
import { ListarEstabelecimentosController } from "@controllers/estabelecimento/ListarEstabelecimentosController";
import { ListarUsuariosController } from "@controllers/usuario/ListarUsuariosController";
import { AutenticarUsuarioController } from "@controllers/usuario/AutenticarUsuarioController";
import { CriarUsuarioController } from "@controllers/usuario/CriarUsuarioController";
import { RecuperarSenhaController } from "@controllers/usuario/RecuperarSenhaController";
import { RedefinirSenhaController } from "@controllers/usuario/RedefinirSenhaController";
import { SolicitarCadastroController } from "@controllers/usuario/SolicitarCadastroController";
import { authAdministrador, authUsuario } from "@middlewares/authUsuario";
import { validarCadastroToken } from "@utils/validarCadastroToken";
import { Router } from "express";
import { EditarUsuarioController } from "@controllers/usuario/EditarUsuarioController";
import { BuscarUsuarioController } from "@controllers/usuario/BuscarUsuarioController";
import { BuscarEstabelecimentoController } from "@controllers/estabelecimento/BuscarEstabelecimentoController";
import { CriarManipuladorAlimentoController } from "@controllers/manipulador-alimento/CriarManipuladorAlimentoController";
import { ListarManipuladoresAlimentoController } from "@controllers/manipulador-alimento/ListarManipuladoresAlimentoController";
import { EditarManipuladorAlimentoController } from "@controllers/manipulador-alimento/EditarManipuladorAlimentoController";
import { BuscarManipuladorAlimentoController } from "@controllers/manipulador-alimento/BuscarManipuladorAlimentoController";
import { CriarGestorController } from "@controllers/gestor/CriarGestorController";
import { ListarGestoresController } from "@controllers/gestor/ListarGestoresController";
import { BuscarGestorController } from "@controllers/gestor/BuscarGestorController";
import { EditarGestorController } from "@controllers/gestor/EditarGestorController";
import { EditarUsuarioAdminController } from "@controllers/usuario/EditarUsuarioAdminController";
import { AlterarSenhaUsuarioController } from "@controllers/usuario/AlterarSenhaUsuarioController";
import { CriarAnaliseQuantitativaController } from "@controllers/analise-quantitativa/CriarAnaliseQuantitativaController";
import { BuscarAnaliseQuantitativaController } from "@controllers/analise-quantitativa/BuscarAnaliseQuantitativaController";
import { ListarInformacoesUsuarioController } from "@controllers/usuario/ListarInformacoesUsuarioController";
import { InstituicoesController } from "@controllers/util/InstituicoesController";
import { ListarConvitesCadastroController } from "@controllers/usuario/ListarConvitesCadastroController";
import { ExcluirUsuarioController } from "@controllers/usuario/ExcluirUsuarioController";
import { ExcluirEstabelecimentoController } from "@controllers/estabelecimento/ExcluirEstabelecimentoController";
import { CriarAnaliseQualitativaController } from "@controllers/analise-qualitativa/CriarAnaliseQualitativaController";
import { CalcularAnaliseQualitativaController } from "@controllers/analise-qualitativa/CalcularAnaliseQualitativaController";
import { CalcularTriangulacaoController } from "@controllers/triangulacao/CalcularTriangulacaoController";
import { CriarListaVerificacaoController } from "@controllers/lista-verificacao/CriarListaVerificacaoController";
import { EditarListaVerificacaoController } from "@controllers/lista-verificacao/EditarListaVerificacaoController";
import { CalcularListaVerificacaoController } from "@controllers/lista-verificacao/CalcularListaVerificacaoController";
import { CriarResultadoController } from "@controllers/resultado/CriarResultadoController";
import { BuscarResultadoController } from "@controllers/resultado/BuscarResultadoController";
import { CriarAvaliacaoController } from "@controllers/avaliacao/CriarAvaliacaoController";
import { ExcluirAvaliacaoController } from "@controllers/avaliacao/ExcluirAvaliacaoController";
import { ListarAvaliacaoController } from "@controllers/avaliacao/ListarAvaliacaoController";
import { BuscarDadosAvaliacaoController } from "@controllers/avaliacao/BuscarDadosAvaliacaoController";
import { BuscarAvaliacaoController } from "@controllers/avaliacao/BuscarAvaliacaoController";

export const router = Router();

// Rotas teste
router.get("/api/listar-instituicoes", new InstituicoesController().handle);
router.get("/api/validar-cadastro-token", validarCadastroToken);

// Rotas usuários
router.post("/api/login", new AutenticarUsuarioController().handle);
router.post("/api/usuario", authAdministrador, new SolicitarCadastroController().handle);
router.post("/api/cadastro", new CriarUsuarioController().handle);
router.post("/api/recuperar-senha", new RecuperarSenhaController().handle);
router.post("/api/redefinir-senha", new RedefinirSenhaController().handle);
router.put("/api/editar-usuario", authUsuario, new EditarUsuarioController().handle);
router.put("/api/editar-usuario-admin", authAdministrador, new EditarUsuarioAdminController().handle);
router.put("/api/alterar-senha-usuario", authUsuario, new AlterarSenhaUsuarioController().handle);
router.get("/api/listar-usuarios", authAdministrador, new ListarUsuariosController().handle);
router.get("/api/buscar-usuario", authUsuario, new BuscarUsuarioController().handle);
router.get("/api/listar-infos", authUsuario, new ListarInformacoesUsuarioController().handle);
router.get("/api/listar-convites", authAdministrador, new ListarConvitesCadastroController().handle);
router.delete("/api/excluir-usuario", authAdministrador, new ExcluirUsuarioController().handle);

// Rotas Avaliação
router.post("/api/cadastrar-avaliacao", authUsuario, new CriarAvaliacaoController().handle);
router.put("/api/excluir-avaliacao", authUsuario, new ExcluirAvaliacaoController().handle);
router.get("/api/listar-avaliacoes", authUsuario, new ListarAvaliacaoController().handle);
router.get("/api/buscar-avaliacao", authUsuario, new BuscarAvaliacaoController().handle);
router.get("/api/buscar-dados-avaliacao", authUsuario, new BuscarDadosAvaliacaoController().handle);

// Rotas Estabelecimento
router.post("/api/cadastrar-estabelecimento", authUsuario, new CriarEstabelecimentoController().handle);
router.put("/api/editar-estabelecimento", authUsuario, new EditarEstabelecimentoController().handle);
router.get("/api/listar-estabelecimentos", authUsuario, new ListarEstabelecimentosController().handle);
router.get("/api/buscar-estabelecimento", authUsuario, new BuscarEstabelecimentoController().handle);
router.delete("/api/excluir-estabelecimento", authUsuario, new ExcluirEstabelecimentoController().handle);

// Rotas Gestor Avaliacao
router.post("/api/cadastrar-gestor", authUsuario, new CriarGestorController().handle);
router.put("/api/editar-gestor", authUsuario, new EditarGestorController().handle);
router.get("/api/listar-gestores", authUsuario, new ListarGestoresController().handle);
router.get("/api/buscar-gestor", authUsuario, new BuscarGestorController().handle);

// Rotas Manipulador Alimento
router.post("/api/cadastrar-manipulador-alimento", authUsuario, new CriarManipuladorAlimentoController().handle);
router.put("/api/editar-manipulador-alimento", authUsuario, new EditarManipuladorAlimentoController().handle);
router.get("/api/listar-manipulador-alimento", authUsuario, new ListarManipuladoresAlimentoController().handle);
router.get("/api/buscar-manipulador-alimento", authUsuario, new BuscarManipuladorAlimentoController().handle);

// Rotas Analise Quantitativa
router.post("/api/cadastrar-analise-quantitativa", authUsuario, new CriarAnaliseQuantitativaController().handle);
router.get("/api/buscar-analise-quantitativa", authUsuario, new BuscarAnaliseQuantitativaController().handle);

router.get("/api/listar-instituicoes", new InstituicoesController().handle);

// Rotas Analise Qualitativa
router.post("/api/cadastrar-analise-qualitativa", authUsuario, new CriarAnaliseQualitativaController().handle);
router.post("/api/calcular-analise-qualitativa", authUsuario, new CalcularAnaliseQualitativaController().handle);

// Rotas Triangulação
router.post("/api/calcular-triangulacao", authUsuario, new CalcularTriangulacaoController().handle);

// Rotas Lista de Verificação
router.post("/api/criar-lista-verificacao", authUsuario, new CriarListaVerificacaoController().handle);
router.post("/api/editar-lista-verificacao", authUsuario, new EditarListaVerificacaoController().handle);
router.post("/api/calcular-lista-verificacao", authUsuario, new CalcularListaVerificacaoController().handle);

// Rotas Resultado
router.post("/api/criar-resultado", authUsuario, new CriarResultadoController().handle);
router.post("/api/buscar-resultado", authUsuario, new BuscarResultadoController().handle);
