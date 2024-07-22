import { ListaVerificacao } from "@models/ListaVerificacao";
import { CriarListaVerificacaoService } from "@services/lista-verificacao/CriarListaVerificacaoService";
import converterBase64JSON from "@utils/converterBase64JSON";
import { Request, Response } from "express";

export class CriarListaVerificacaoController {
  async handle(req: Request, res: Response) {
    const { json_informacoes } = req.body;

    try {
      const ativo = 1;
      const { informacoes } = await converterBase64JSON(json_informacoes, "informacoes");

      const novaListaVerificacao = new ListaVerificacao(informacoes, ativo);
      const criarListaVerificacaoService = new CriarListaVerificacaoService();
      const listaVerificacao = await criarListaVerificacaoService.execute(novaListaVerificacao);

      return res.json(listaVerificacao);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
