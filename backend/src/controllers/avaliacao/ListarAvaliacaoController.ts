import { ListarAvaliacaoService } from "@services/avaliacao/ListarAvaliacaoService";
import { Request, Response } from "express";

export class ListarAvaliacaoController {
  async handle(req: Request, res: Response) {
    try {
      const listarAvaliacaoService = new ListarAvaliacaoService();
      const avaliacao = await listarAvaliacaoService.execute();

      return res.json(avaliacao);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
