import { BuscarListaVerificacaoService } from "@services/lista-verificacao/BuscarListaVerificacaoService";
import { Request, Response } from "express";

export class BuscarTriangulacaoController {
  async handle(req: Request, res: Response) {
    const { id_estabelecimento } = req.body;

    try {
      const buscarListaVerificacao = new BuscarListaVerificacaoService();
      const listaVerificacao = await buscarListaVerificacao.execute(id_estabelecimento);

      return res.json(listaVerificacao);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
