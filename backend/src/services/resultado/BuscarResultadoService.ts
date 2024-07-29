import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class BuscarResultadoService {
  async execute(id_avaliacao: string) {
    const resultado = await prisma.resultado.findFirst({
      where: {
        id_avaliacao: id_avaliacao,
      },
      select: {
        id: true,
        id_avaliacao: true,
        id_triangulacao: true,
        informacoes: true,
      },
    });

    const informacoesDecodificadas = await desconverterBase64JSON(resultado.informacoes);

    return {
      ...resultado,
      informacoesDecodificadas: informacoesDecodificadas,
    };
  }
}
