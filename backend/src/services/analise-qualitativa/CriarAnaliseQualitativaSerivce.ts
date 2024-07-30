import { AnaliseQualitativa } from "@models/AnaliseQualitativa";
import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class CriarAnaliseQualitativaService {
  async execute(analiseQualitativa: AnaliseQualitativa) {
    let analiseQualitativaCriada;
    const analiseExiste = await prisma.analiseQualitativa.findFirst({
      where: {
        id_avaliacao: analiseQualitativa.id_avaliacao,
      },
      select: {
        id: true,
      },
    });

    if (!analiseExiste) {
      analiseQualitativaCriada = await prisma.analiseQualitativa.create({
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
    } else {
      analiseQualitativaCriada = await prisma.analiseQualitativa.update({
        where: {
          id: analiseExiste.id,
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
    }

    const informacoesDecodificadas = await desconverterBase64JSON(analiseQualitativaCriada.informacoes);

    return {
      ...analiseQualitativaCriada,
      informacoesDecodificadas: informacoesDecodificadas,
    };
  }
}
