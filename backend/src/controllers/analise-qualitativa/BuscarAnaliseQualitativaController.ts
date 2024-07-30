import { BuscarAnaliseQualitativaService } from "@services/analise-qualitativa/BuscarAnaliseQualitativaService";
import { Request, Response } from "express";

export class BuscarAnaliseQualitativaController {
  async handle(req: Request, res: Response) {
    const { id_avaliacao } = req.body;

    try {
      const buscarAnaliseQualitativaService = new BuscarAnaliseQualitativaService();
      const analiseQualitativa = await buscarAnaliseQualitativaService.execute(id_avaliacao);

      return res.json(analiseQualitativa);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
