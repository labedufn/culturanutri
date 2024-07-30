import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class BuscarTriangulacoesEstabelecimentoService {
  async execute(idAvaliacoes: string[]) {
    const triangulacoes = await prisma.triangulacao.findMany({
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
      },
    });

    const triangulacoesComInformacoesDecodificadas = await Promise.all(
      triangulacoes.map(async (triangulacao) => {
        const informacoesDecodificadas = await desconverterBase64JSON(triangulacao.informacoes);
        return {
          ...triangulacao,
          informacoesDecodificadas,
        };
      }),
    );

    return triangulacoesComInformacoesDecodificadas;
  }
}
