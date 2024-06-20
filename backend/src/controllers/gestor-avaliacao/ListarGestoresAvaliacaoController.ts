import { ListarGestoresAvaliacaoService } from "@services/gestor-avaliacao/ListarGestoresAvaliacaoService";
import { Request, Response } from "express";

export class ListarGestoresAvaliacaoController {
  async handle(req: Request, res: Response) {
    const { id_usuario } = req.body;

    try {
      const listarGestoresAvaliacaoService = new ListarGestoresAvaliacaoService();
      const gestores = await listarGestoresAvaliacaoService.execute(id_usuario);

      return res.json(gestores);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
