import { ListarEstabelecimentosService } from "@services/estabelecimento/ListarEstabelecimentoService";
import { Request, Response } from "express";

export class ListarEstabelecimentosController {
  async handle(req: Request, res: Response) {
    const { id_usuario } = req.body;

    try {
      const listarEstabelecimentosService = new ListarEstabelecimentosService();
      const estabelecimento = await listarEstabelecimentosService.execute(id_usuario);

      return res.json(estabelecimento);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
