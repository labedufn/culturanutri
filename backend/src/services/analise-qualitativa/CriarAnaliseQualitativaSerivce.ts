import { AnaliseQualitativa } from "@models/AnaliseQualitativa";
import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class CriarAnaliseQualitativaService {
  async execute(analiseQualitativa: AnaliseQualitativa) {
    const analiseQualitativaCriada = await prisma.analiseQualitativa.create({
      data: {
        id_estabelecimento: analiseQualitativa.id_estabelecimento,
        informacoes: analiseQualitativa.informacoes,
        ativo: analiseQualitativa.ativo,
      },
      select: {
        id: true,
        id_estabelecimento: true,
        informacoes: true,
        data_cadastro: true,
        data_alteracao: true,
        ativo: true,
      },
    });

    const informacoesDecodificadas = await desconverterBase64JSON(analiseQualitativaCriada.informacoes);

    return {
      ...analiseQualitativaCriada,
      informacoesDecodificadas: informacoesDecodificadas,
    };
  }
}
