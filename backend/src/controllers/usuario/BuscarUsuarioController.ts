import { BuscarUsuarioService } from "@services/usuario/BuscarUsuarioService";
import { Request, Response } from "express";

export class BuscarUsuarioController {
  async handle(req: Request, res: Response) {
    const idUsuario = req.id_usuario;

    try {
      const listarUsuariosService = new BuscarUsuarioService();
      const usuarios = await listarUsuariosService.execute(idUsuario);

      return res.json(usuarios);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
