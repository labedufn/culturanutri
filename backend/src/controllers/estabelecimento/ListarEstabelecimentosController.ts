import { ListarEstabelecimentosService } from "@services/estabelecimento/ListarEstabelecimentosService";
import { Request, Response } from "express";

export class ListarEstabelecimentosController {
  async handle(req: Request, res: Response) {
    try {
      const listarEstabelecimentosService = new ListarEstabelecimentosService();
      const estabelecimento = await listarEstabelecimentosService.execute();

      return res.json(estabelecimento);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
