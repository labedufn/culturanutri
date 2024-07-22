import { ListaVerificacao } from "@models/ListaVerificacao";
import { EditarListaVerificacaoService } from "@services/lista-verificacao/EditarListaVerificacaoService";
import converterBase64JSON from "@utils/converterBase64JSON";
import { Request, Response } from "express";

export class EditarListaVerificacaoController {
  async handle(req: Request, res: Response) {
    const { json_informacoes, id_lista_verificacao, ativo } = req.body;

    try {
      const { informacoes } = await converterBase64JSON(json_informacoes, "informacoes");

      const novaListaVerificacao = new ListaVerificacao(informacoes, ativo);
      const editarListaVerificacaoService = new EditarListaVerificacaoService();
      const listaVerificacao = await editarListaVerificacaoService.execute(novaListaVerificacao, id_lista_verificacao);

      return res.json(listaVerificacao);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
