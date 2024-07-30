import { ListarManipuladoresAlimentoService } from "@services/manipulador-alimento/ListarManipuladoresAlimentoService";
import { Request, Response } from "express";

export class ListarManipuladoresAlimentoController {
  async handle(req: Request, res: Response) {
    try {
      const listarManipuladoresAlimentoService = new ListarManipuladoresAlimentoService();
      const manipuladoresAlimento = await listarManipuladoresAlimentoService.execute();

      return res.json(manipuladoresAlimento);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
