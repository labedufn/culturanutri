import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class BuscarResultadosEstabelecimentoService {
  async execute(idAvaliacoes: string[]) {
    const resultados = await prisma.resultado.findMany({
      where: {
        id_avaliacao: {
          in: idAvaliacoes,
        },
      },
      select: {
        id: true,
        id_avaliacao: true,
        informacoes: true,
        id_estabelecimento: true,
        id_triangulacao: true,
      },
    });

    const resultadosComInformacoesDecodificadas = await Promise.all(
      resultados.map(async (resultado) => {
        const informacoesDecodificadas = await desconverterBase64JSON(resultado.informacoes);
        return {
          ...resultado,
          informacoesDecodificadas,
        };
      }),
    );

    return resultadosComInformacoesDecodificadas;
  }
}
