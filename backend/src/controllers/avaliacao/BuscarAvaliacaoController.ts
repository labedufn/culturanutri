import { BuscarAvaliacaoService } from "@services/avaliacao/BuscarAvaliacaoService";
import { Request, Response } from "express";

export class BuscarAvaliacaoController {
  async handle(req: Request, res: Response) {
    const { id_avaliacao } = req.query;

    try {
      const buscarAvaliacaoService = new BuscarAvaliacaoService();
      const avaliacao = await buscarAvaliacaoService.execute(id_avaliacao as string);

      return res.json(avaliacao);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
