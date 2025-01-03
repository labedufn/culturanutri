import { ListaVerificacao } from "@models/ListaVerificacao";
import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class CriarListaVerificacaoService {
  async execute(listaVerificacao: ListaVerificacao) {
    let listaVerificacaoCriada;
    const listaExiste = await prisma.listaVerificacao.findFirst({
      where: {
        id_avaliacao: listaVerificacao.id_avaliacao,
      },
      select: {
        id: true,
      },
    });

    if (!listaExiste) {
      listaVerificacaoCriada = await prisma.listaVerificacao.create({
        data: {
          informacoes: listaVerificacao.informacoes,
          id_avaliacao: listaVerificacao.id_avaliacao,
          ativo: listaVerificacao.ativo,
        },
        select: {
          id: true,
          id_avaliacao: true,
          data_cadastro: true,
          data_alteracao: true,
          informacoes: true,
          ativo: true,
        },
      });
    } else {
      listaVerificacaoCriada = await prisma.listaVerificacao.update({
        where: {
          id: listaExiste.id,
        },
        data: {
          informacoes: listaVerificacao.informacoes,
          id_avaliacao: listaVerificacao.id_avaliacao,
          ativo: listaVerificacao.ativo,
        },
        select: {
          id: true,
          id_avaliacao: true,
          data_cadastro: true,
          data_alteracao: true,
          informacoes: true,
          ativo: true,
        },
      });
    }

    const informacoesDecodificadas = await desconverterBase64JSON(listaVerificacaoCriada.informacoes);

    return {
      ...listaVerificacaoCriada,
      informacoesDecodificadas: informacoesDecodificadas,
    };
  }
}
