import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class BuscarTriangulacaoService {
  async execute(id_avaliacao: string) {
    const triangulacao = await prisma.triangulacao.findFirst({
      where: {
        id_avaliacao: id_avaliacao,
      },
      select: {
        id: true,
        informacoes: true,
        id_avaliacao: true,
        data_cadastro: true,
        data_alteracao: true,
      },
    });

    const informacoesDecodificadas = await desconverterBase64JSON(triangulacao.informacoes);

    return {
      ...triangulacao,
      informacoesDecodificadas: informacoesDecodificadas,
    };
  }
}
