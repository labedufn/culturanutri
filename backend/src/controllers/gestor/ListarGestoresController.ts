import { ListarGestoresService } from "@services/gestor/ListarGestoresService";
import { Request, Response } from "express";

export class ListarGestoresController {
  async handle(req: Request, res: Response) {
    const { id_estabelecimento } = req.body;

    try {
      const listarGestoresService = new ListarGestoresService();
      const gestores = await listarGestoresService.execute(id_estabelecimento);

      return res.json(gestores);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
