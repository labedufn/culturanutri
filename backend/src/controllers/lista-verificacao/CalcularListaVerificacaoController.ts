import { ListaVerificacao } from "@models/ListaVerificacao";
import { CalcularListaVerificacaoService } from "@services/calculos/lista-verificacao/CalcularListaVerificacaoService";
import { BuscarListaVerificacaoService } from "@services/lista-verificacao/BuscarListaVerificacaoService";
import { EditarListaVerificacaoService } from "@services/lista-verificacao/EditarListaVerificacaoService";
import converterBase64JSON from "@utils/converterBase64JSON";
import { Request, Response } from "express";

export class CalcularListaVerificacaoController {
  async handle(req: Request, res: Response) {
    const { id_lista_verificacao } = req.body;

    try {
      const ativo = 1;
      const editarListaVerificacaoService = new EditarListaVerificacaoService();
      const buscarListaVerificacaoService = new BuscarListaVerificacaoService();
      const calcularListaVerificacaoService = new CalcularListaVerificacaoService();

      const lista = await buscarListaVerificacaoService.execute(id_lista_verificacao);
      const { informacoesCalculadas } = await calcularListaVerificacaoService.execute(lista.informacoesDecodificadas);

      const { informacoes } = await converterBase64JSON(informacoesCalculadas, "informacoes");

      const listaVerificacao = new ListaVerificacao(informacoes, ativo);
      const listaVerificacaoCalculada = await editarListaVerificacaoService.execute(
        listaVerificacao,
        id_lista_verificacao,
      );

      return res.json(listaVerificacaoCalculada);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
