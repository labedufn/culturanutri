import { ListarUsuariosService } from "@services/usuario/ListarUsuariosService";
import { Request, Response } from "express";

export class ListarUsuariosController {
  async handle(req: Request, res: Response) {
    const { id_usuario } = req.body;

    try {
      const listarUsuariosService = new ListarUsuariosService();
      const usuarios = await listarUsuariosService.execute(id_usuario);

      return res.json(usuarios);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
