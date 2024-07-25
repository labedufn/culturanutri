import { BuscarTriangulacaoService } from "@services/triangulacao/BuscarTriangulacaoService";
import { Request, Response } from "express";

export class CalcularTriangulacaoController {
  async handle(req: Request, res: Response) {
    const { id_estabelecimento } = req.body;

    try {
      const buscarTriangulacaoService = new BuscarTriangulacaoService();
      const triangulacao = await buscarTriangulacaoService.execute(id_estabelecimento);

      return res.json(triangulacao);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
