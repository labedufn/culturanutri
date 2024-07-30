import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class BuscarResultadoService {
  async execute(id_estabelecimento: string) {
    const resultados = await prisma.resultado.findMany({
      where: {
        id_estabelecimento: id_estabelecimento,
      },
      select: {
        id: true,
        id_estabelecimento: true,
        id_triangulacao: true,
        informacoes: true,
      },
    });

    const informacoesDecodificadas = await Promise.all(
      resultados.map(async (resultado) => ({
        id_estabelecimento,
        ...resultado,
        informacoes: await desconverterBase64JSON(resultado.informacoes),
      })),
    );

    return informacoesDecodificadas;
  }
}
