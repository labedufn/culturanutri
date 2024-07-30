import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class BuscarListasVerificacaoEstabelecimentoService {
  async execute(idAvaliacoes: string[]) {
    const listas = await prisma.listaVerificacao.findMany({
      where: {
        id_avaliacao: {
          in: idAvaliacoes,
        },
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

    const listasComInformacoesDecodificadas = await Promise.all(
      listas.map(async (lista) => {
        const informacoesDecodificadas = await desconverterBase64JSON(lista.informacoes);
        return {
          ...lista,
          informacoesDecodificadas,
        };
      }),
    );

    return listasComInformacoesDecodificadas;
  }
}
