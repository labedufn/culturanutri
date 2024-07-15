import { ExcluirEstabelecimentoService } from "@services/estabelecimento/ExcluirEstabelecimentoService";
import { Request, Response } from "express";

export class ExcluirEstabelecimentoController {
  async handle(req: Request, res: Response) {
    const { id_estabelecimento } = req.body;

    try {
      const excluirEstabelecimentoService = new ExcluirEstabelecimentoService();
      const result = await excluirEstabelecimentoService.execute(id_estabelecimento);

      return res.json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
