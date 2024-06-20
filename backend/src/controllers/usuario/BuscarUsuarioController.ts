import { BuscarUsuarioService } from "@services/usuario/BuscarUsuarioService";
import { Request, Response } from "express";

export class BuscarUsuarioController {
  async handle(req: Request, res: Response) {
    const { id_usuario } = req.body;

    try {
      const listarUsuariosService = new BuscarUsuarioService();
      const usuarios = await listarUsuariosService.execute(id_usuario);

      return res.json(usuarios);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
