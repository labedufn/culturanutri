import { AnaliseQuantitativa } from "@models/AnaliseQuantitativa";
import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class CriarAnaliseQuantitativaService {
  async execute(analiseQuantitativa: AnaliseQuantitativa) {
    const analiseQuantitativaCriada = await prisma.analiseQuantitativa.create({
      data: {
        id_estabelecimento: analiseQuantitativa.id_estabelecimento,
        caracteristicas_socio_demograficas: analiseQuantitativa.caracteristicas_socio_demograficas,
        resultados_avaliacao_quantitativas_csa: analiseQuantitativa.resultados_avaliacao_quantitativas_csa,
        vies_otimista: analiseQuantitativa.vies_otimista,
        ativo: analiseQuantitativa.ativo,
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

    const caracteristicasSocioDemograficasDecodificadas = await desconverterBase64JSON(
      analiseQuantitativaCriada.caracteristicas_socio_demograficas,
    );

    const resultadosAvaliacaoQuantitativasCSADecodificadas = await desconverterBase64JSON(
      analiseQuantitativaCriada.resultados_avaliacao_quantitativas_csa,
    );

    const viesOtimistaDecodificado = await desconverterBase64JSON(analiseQuantitativaCriada.vies_otimista);

    return {
      ...analiseQuantitativaCriada,
      caracteristicasSocioDemograficasDecodificadas: caracteristicasSocioDemograficasDecodificadas,
      resultadosAvaliacaoQuantitativasCSADecodificadas: resultadosAvaliacaoQuantitativasCSADecodificadas,
      viesOtimistaDecodificado: viesOtimistaDecodificado,
    };
  }
}
