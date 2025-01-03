import { BuscarEstabelecimentosService } from "@services/estabelecimento/BuscarEstabelecimentoService";
import { Request, Response } from "express";

export class BuscarEstabelecimentoController {
  async handle(req: Request, res: Response) {
    const { id_estabelecimento } = req.body;
    const id_usuario = req.id_usuario;

    try {
      const buscarEstabelecimentosService = new BuscarEstabelecimentosService();
      const estabelecimento = await buscarEstabelecimentosService.execute(id_estabelecimento, id_usuario);

      return res.json(estabelecimento);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
