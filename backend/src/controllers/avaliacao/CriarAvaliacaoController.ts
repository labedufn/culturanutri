import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Avaliacao } from "@models/Avaliacao";
import { CriarAvaliacaoService } from "@services/avaliacao/CriarAvaliacaoService";

export class CriarAvaliacaoController {
  async handle(req: Request, res: Response) {
    const { id_estabelecimento } = req.body;
    try {
      const ativo = 1;
      const slug = uuidv4();

      const novaAvaliacao = new Avaliacao(slug, ativo, id_estabelecimento);
      const criarAvaliacaoService = new CriarAvaliacaoService();
      const avaliacao = await criarAvaliacaoService.execute(novaAvaliacao);

      return res.json(avaliacao);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
