import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class BuscarAnalisesQuantitativaEstabelecimentoService {
  async execute(idAvaliacoes: string[]) {
    const analisesQuantitativas = await prisma.analiseQuantitativa.findMany({
      where: {
        id_avaliacao: {
          in: idAvaliacoes,
        },
      },
      select: {
        id: true,
        id_avaliacao: true,
        caracteristicas_socio_demograficas: true,
        resultados_avaliacao_quantitativas_csa: true,
        vies_otimista: true,
        data_cadastro: true,
        data_alteracao: true,
        ativo: true,
      },
    });

    const analisesQuantitativasCompletas = await Promise.all(
      analisesQuantitativas.map(async (analise) => {
        const caracteristicasSocioDemograficasDecodificadas = await desconverterBase64JSON(
          analise.caracteristicas_socio_demograficas,
        );
        const resultadosAvaliacaoQuantitativasCSADecodificadas = await desconverterBase64JSON(
          analise.resultados_avaliacao_quantitativas_csa,
        );
        const viesOtimistaDecodificadas = await desconverterBase64JSON(analise.vies_otimista);

        return {
          ...analise,
          caracteristicasSocioDemograficasDecodificadas,
          resultadosAvaliacaoQuantitativasCSADecodificadas,
          viesOtimistaDecodificadas,
        };
      }),
    );

    return analisesQuantitativasCompletas;
  }
}
