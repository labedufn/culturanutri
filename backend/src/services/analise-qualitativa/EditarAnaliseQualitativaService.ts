import { AnaliseQualitativa } from "@models/AnaliseQualitativa";
import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class EditarAnaliseQualitativaService {
  async execute(idAnaliseQualitativa: string, analiseQualitativa: AnaliseQualitativa) {
    const analiseQualitativaEditada = await prisma.analiseQualitativa.update({
      where: {
        id: idAnaliseQualitativa,
        id_avaliacao: analiseQualitativa.id_avaliacao,
      },
      data: {
        id_avaliacao: analiseQualitativa.id_avaliacao,
        informacoes: analiseQualitativa.informacoes,
        ativo: analiseQualitativa.ativo,
      },
      select: {
        id: true,
        id_avaliacao: true,
        informacoes: true,
        data_cadastro: true,
        data_alteracao: true,
        ativo: true,
      },
    });

    const informacoesDecodificadas = await desconverterBase64JSON(analiseQualitativaEditada.informacoes);

    return {
      ...analiseQualitativaEditada,
      informacoesDecodificadas: informacoesDecodificadas,
    };
  }
}
