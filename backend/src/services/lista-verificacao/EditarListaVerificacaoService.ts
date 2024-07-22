import { ListaVerificacao } from "@models/ListaVerificacao";
import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class EditarListaVerificacaoService {
  async execute(listaVerificacao: ListaVerificacao, id_lista_verificacao: string) {
    const listaVerificacaoCriada = await prisma.listaVerificacao.update({
      where: {
        id: id_lista_verificacao,
      },
      data: {
        informacoes: listaVerificacao.informacoes,
        ativo: listaVerificacao.ativo,
      },
      select: {
        id: true,
        data_cadastro: true,
        data_alteracao: true,
        informacoes: true,
        ativo: true,
      },
    });

    const informacoesDecodificadas = await desconverterBase64JSON(listaVerificacaoCriada.informacoes);

    return {
      ...listaVerificacaoCriada,
      informacoesDecodificadas: informacoesDecodificadas,
    };
  }
}
