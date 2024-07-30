import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class BuscarAnalisesQualitativaEstabelecimentoService {
  async execute(idAvaliacoes: string[]) {
    const analisesQualitativas = await prisma.analiseQualitativa.findMany({
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

    const analisesQualitativasComInformacoesDecodificadas = await Promise.all(
      analisesQualitativas.map(async (gestor) => {
        const informacoesDecodificadas = await desconverterBase64JSON(gestor.informacoes);
        return {
          ...gestor,
          informacoesDecodificadas,
        };
      }),
    );

    return analisesQualitativasComInformacoesDecodificadas;
  }
}
