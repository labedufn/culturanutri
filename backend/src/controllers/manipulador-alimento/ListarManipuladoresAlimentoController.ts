import { ListarManipuladoresAlimentoService } from "@services/manipulador-alimento/ListarManipuladoresAlimentoService";
import { Request, Response } from "express";

export class ListarManipuladoresAlimentoController {
  async handle(req: Request, res: Response) {
    const { id_usuario } = req.body;

    try {
      const listarManipuladoresAlimentoService = new ListarManipuladoresAlimentoService();
      const manipuladoresAlimento = await listarManipuladoresAlimentoService.execute(id_usuario);

      return res.json(manipuladoresAlimento);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
