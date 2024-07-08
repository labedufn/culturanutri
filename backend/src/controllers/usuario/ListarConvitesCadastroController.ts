import { ListarConvitesCadastroService } from "@services/usuario/ListarConvitesCadastroService";
import { Request, Response } from "express";

export class ListarConvitesCadastroController {
  async handle(req: Request, res: Response) {
    const idUsuario = req.id_usuario;

    try {
      const listarConvitesCadastroService = new ListarConvitesCadastroService();
      const usuarios = await listarConvitesCadastroService.execute(idUsuario);

      return res.json(usuarios);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
