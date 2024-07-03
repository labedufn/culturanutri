import { Usuario, TipoUsuario } from "@models/Usuario";
import { EditarUsuarioService } from "@services/usuario/EditarUsuarioService";
import { BuscarUsuarioService } from "@services/usuario/BuscarUsuarioService";
import { Request, Response } from "express";

export class EditarUsuarioController {
  async handle(req: Request, res: Response) {
    const { nome, sobrenome, cpf, email, instituicao } = req.body;
    const idUsuario = req.id_usuario;

    try {
      const buscarUsuarioService = new BuscarUsuarioService();
      const { usuario: usuarioAtual } = await buscarUsuarioService.execute(idUsuario);

      const usuario = new Usuario(
        nome,
        sobrenome,
        cpf,
        email,
        usuarioAtual.tipo_usuario as TipoUsuario,
        instituicao,
        usuarioAtual.senha,
      );

      const editarUsuarioService = new EditarUsuarioService();
      const resultado = await editarUsuarioService.execute(idUsuario, usuario, false);

      return res.json(resultado);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
