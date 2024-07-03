import { Usuario, TipoUsuario } from "@models/Usuario";
import { EditarUsuarioService } from "@services/usuario/EditarUsuarioService";
import { BuscarUsuarioService } from "@services/usuario/BuscarUsuarioService";
import { Request, Response } from "express";

export class EditarUsuarioController {
  async handle(req: Request, res: Response) {
    const { senhaAtual, novaSenha } = req.body;
    const idUsuario = req.id_usuario;
    const TipoUsuario = req.tipo_usuario;

    try {
      const buscarUsuarioService = new BuscarUsuarioService();
      const { usuario: usuarioAtual } = await buscarUsuarioService.execute(idUsuario);

      const usuario = new Usuario(
        usuarioAtual.nome,
        usuarioAtual.sobrenome,
        usuarioAtual.cpf,
        usuarioAtual.email,
        TipoUsuario as TipoUsuario,
        usuarioAtual.instituicao,
        novaSenha,
      );

      const editarUsuarioService = new EditarUsuarioService();
      const resultado = await editarUsuarioService.execute(idUsuario, usuario, false);

      return res.json(resultado);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
