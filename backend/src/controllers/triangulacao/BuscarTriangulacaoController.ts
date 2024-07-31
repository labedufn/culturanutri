import { BuscarTriangulacaoService } from "@services/triangulacao/BuscarTriangulacaoService";
import { Request, Response } from "express";
export class BuscarTriangulacaoController {
  async handle(req: Request, res: Response) {
    const { id_triangulacao } = req.body;

    try {
      const buscarListaVerificacao = new BuscarTriangulacaoService();
      const listaVerificacao = await buscarListaVerificacao.execute(id_triangulacao);

      return res.json(listaVerificacao);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
