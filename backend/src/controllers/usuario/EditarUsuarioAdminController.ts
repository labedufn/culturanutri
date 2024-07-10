import { Usuario, TipoUsuario } from "@models/Usuario";
import { EditarUsuarioService } from "@services/usuario/EditarUsuarioService";
import { BuscarUsuarioService } from "@services/usuario/BuscarUsuarioService";
import { Request, Response } from "express";

export class EditarUsuarioAdminController {
  async handle(req: Request, res: Response) {
    const { id_usuario, ativo, tipo_usuario } = req.body;

    try {
      const buscarUsuarioService = new BuscarUsuarioService();

      if (!Object.values(TipoUsuario).includes(tipo_usuario)) {
        throw new Error("Tipo de usuário inválido.");
      }

      const { usuario: usuarioAtual } = await buscarUsuarioService.execute(id_usuario);

      const usuario = new Usuario(
        usuarioAtual.nome,
        usuarioAtual.sobrenome,
        usuarioAtual.cpf,
        usuarioAtual.email,
        usuarioAtual.senha,
        tipo_usuario as TipoUsuario,
        usuarioAtual.instituicao,
        ativo,
      );

      const editarUsuarioService = new EditarUsuarioService();
      const resultado = await editarUsuarioService.execute(id_usuario, usuario, true);

      return res.json(resultado);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
