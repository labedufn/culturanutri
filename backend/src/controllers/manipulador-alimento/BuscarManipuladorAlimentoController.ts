import { BuscarManipuladorAlimentoService } from "@services/manipulador-alimento/BuscarManipuladorAlimentoService";
import { Request, Response } from "express";

export class BuscarManipuladorAlimentoController {
  async handle(req: Request, res: Response) {
    const { id_usuario, id_manipulador_alimento } = req.body;

    try {
      const buscarManipuladorAlimentoService = new BuscarManipuladorAlimentoService();
      const manipuladorAlimento = await buscarManipuladorAlimentoService.execute(id_usuario, id_manipulador_alimento);

      return res.json(manipuladorAlimento);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
