import { Resultado } from "@models/Resultado";
import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class CriarResultadoService {
  async execute(resultado: Resultado) {
    const resultadoCriado = await prisma.resultado.create({
      data: {
        id_estabelecimento: resultado.id_estabelecimento,
        id_triangulacao: resultado.id_triangulacao,
        informacoes: resultado.informacoes,
      },
      select: {
        id: true,
        id_estabelecimento: true,
        id_triangulacao: true,
        informacoes: true,
      },
    });

    const informacoesDecodificadas = await desconverterBase64JSON(resultadoCriado.informacoes);

    return {
      ...resultado,
      informacoesDecodificadas: informacoesDecodificadas,
    };
  }
}
