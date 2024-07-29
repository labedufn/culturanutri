import { BuscarAnaliseQuantitativaService } from "@services/analise-quantitativa/BuscarAnaliseQuantitativaService";
import { Request, Response } from "express";

export class BuscarAnaliseQuantitativaController {
  async handle(req: Request, res: Response) {
    const { id_avaliacao } = req.body;

    try {
      const buscarAnaliseQuantitativaService = new BuscarAnaliseQuantitativaService();
      const analiseQuantitativa = await buscarAnaliseQuantitativaService.execute(id_avaliacao);

      return res.json(analiseQuantitativa);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
