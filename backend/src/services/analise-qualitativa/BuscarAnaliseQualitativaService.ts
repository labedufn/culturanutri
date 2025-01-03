import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class BuscarAnaliseQualitativaService {
  async execute(idAvaliacao: string) {
    const analiseQualitativaBuscada = await prisma.analiseQualitativa.findFirst({
      where: {
        id_avaliacao: idAvaliacao,
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

    const informacoesDecodificadas = await desconverterBase64JSON(analiseQualitativaBuscada.informacoes);

    return {
      ...analiseQualitativaBuscada,
      informacoesDecodificadas: informacoesDecodificadas,
    };
  }
}
