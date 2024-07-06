import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class BuscarAnaliseQuantitativaService {
  async execute(id_estabelecimento) {
    const analiseQuantitativa = await prisma.analiseQuantitativa.findFirst({
      where: {
        id_estabelecimento: id_estabelecimento,
      },
      select: {
        id: true,
        id_estabelecimento: true,
        caracteristicas_socio_demograficas: true,
        resultados_avaliacao_quantitativas_csa: true,
        vies_otimista: true,
        data_cadastro: true,
        data_alteracao: true,
        ativo: true,
      },
    });

    const caracteristicasSocioDemograficas = await desconverterBase64JSON(
      analiseQuantitativa.caracteristicas_socio_demograficas,
    );

    const resultadosAvaliacaoQuantitativasCSA = await desconverterBase64JSON(
      analiseQuantitativa.resultados_avaliacao_quantitativas_csa,
    );

    const viesOtimista = await desconverterBase64JSON(analiseQuantitativa.vies_otimista);

    return {
      ...analiseQuantitativa,
      caracteristicasSocioDemograficasDecodificadas: caracteristicasSocioDemograficas,
      resultadosAvaliacaoQuantitativasCSADecodificadas: resultadosAvaliacaoQuantitativasCSA,
      viesOtimistaDecodificado: viesOtimista,
    };
  }
}
