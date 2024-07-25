import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class BuscarTriangulacaoService {
  async execute(id_estabelecimento: string) {
    const triangulacao = await prisma.triangulacao.findFirst({
      data: {
        id_estabelecimento: id_estabelecimento,
      },
      select: {
        id: true,
        informacoes: true,
        id_estabelecimento: true,
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
