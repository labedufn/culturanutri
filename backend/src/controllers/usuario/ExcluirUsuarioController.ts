import { ExcluirUsuarioService } from "@services/usuario/ExcluirUsuarioService";
import { Request, Response } from "express";

export class ExcluirUsuarioController {
  async handle(req: Request, res: Response) {
    const { id_usuario } = req.body;

    try {
      const excluirUsuarioService = new ExcluirUsuarioService();
      const result = await excluirUsuarioService.execute(id_usuario);

      return res.json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
