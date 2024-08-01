import { BuscarGestorService } from "@services/gestor/BuscarGestorService";
import { Request, Response } from "express";

export class BuscarGestorController {
  async handle(req: Request, res: Response) {
    const { id_gestor } = req.params;
    const id_usuario = req.id_usuario;

    try {
      const buscaGestorService = new BuscarGestorService();
      const gestor = await buscaGestorService.execute(id_usuario, id_gestor);

      return res.json(gestor);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
