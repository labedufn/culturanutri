import { BuscarResultadoService } from "@services/resultado/BuscarResultadoService";
import { Request, Response } from "express";

export class BuscarResultadoController {
  async handle(req: Request, res: Response) {
    const { id_estabelecimento } = req.body;

    try {
      const buscarResultadoService = new BuscarResultadoService();
      const resultado = await buscarResultadoService.execute(id_estabelecimento);

      return res.json(resultado);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
