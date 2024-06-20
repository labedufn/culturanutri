import { BuscarGestorAvaliacaoService } from "@services/gestor-avaliacao/BuscarGestorAvaliacaoService";
import { Request, Response } from "express";

export class BuscarGestorAvaliacaoController {
  async handle(req: Request, res: Response) {
    const { id_usuario, id_gestor_avaliacao } = req.body;

    try {
      const buscaGestorAvaliadorService = new BuscarGestorAvaliacaoService();
      const gestorAvaliador = await buscaGestorAvaliadorService.execute(id_usuario, id_gestor_avaliacao);

      return res.json(gestorAvaliador);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
