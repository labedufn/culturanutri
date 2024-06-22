import { Usuario } from "@models/Usuario";
import { EditarUsuarioService } from "@services/usuario/EditarUsuarioService";
import { Request, Response } from "express";

export class EditarUsuarioController {
  async handle(req: Request, res: Response) {
    const { tipo, nome, sobrenome, cpf, email, senha, instituicao, ativo } = req.body;

    const idUsuario = req.id_usuario;

    try {
      const data_cadastro = new Date();
      const data_alteracao = new Date();
      const ultimo_login = new Date();

      const usuario = new Usuario(
        nome,
        sobrenome,
        cpf,
        email,
        senha,
        tipo,
        instituicao,
        data_cadastro,
        data_alteracao,
        ativo,
        ultimo_login,
      );

      const editarUsuarioService = new EditarUsuarioService();
      const usuarios = await editarUsuarioService.execute(idUsuario, usuario);

      return res.json(usuarios);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
