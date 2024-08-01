import { Request, Response } from "express";
import { Avaliacao } from "@models/Avaliacao";
import { CriarAvaliacaoService } from "@services/avaliacao/CriarAvaliacaoService";

export class CriarAvaliacaoController {
  async handle(req: Request, res: Response) {
    const { id_estabelecimento } = req.body;
    try {
      const ativo = 1;

      const novaAvaliacao = new Avaliacao(ativo, id_estabelecimento);
      const criarAvaliacaoService = new CriarAvaliacaoService();
      const avaliacao = await criarAvaliacaoService.execute(novaAvaliacao);

      return res.json(avaliacao);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
