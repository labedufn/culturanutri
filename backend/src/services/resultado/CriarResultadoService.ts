import { Resultado } from "@models/Resultado";
import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class CriarResultadoService {
  async execute(resultado: Resultado) {
    console.log(resultado);
    let resultadoCriado;
    const resultadoExiste = await prisma.resultado.findFirst({
      where: {
        id_avaliacao: resultado.id_avaliacao,
        id_estabelecimento: resultado.id_estabelecimento,
        id_triangulacao: resultado.id_triangulacao,
      },
    });

    if (resultadoExiste) {
      resultadoCriado = await prisma.resultado.update({
        where: {
          id: resultadoExiste.id,
        },
        data: {
          id_avaliacao: resultado.id_avaliacao,
          id_estabelecimento: resultado.id_estabelecimento,
          id_triangulacao: resultado.id_triangulacao,
          informacoes: resultado.informacoes,
        },
        select: {
          id: true,
          id_avaliacao: true,
          id_estabelecimento: true,
          id_triangulacao: true,
          informacoes: true,
        },
      });
    } else {
      resultadoCriado = await prisma.resultado.create({
        data: {
          id_avaliacao: resultado.id_avaliacao,
          id_estabelecimento: resultado.id_estabelecimento,
          id_triangulacao: resultado.id_triangulacao,
          informacoes: resultado.informacoes,
        },
        select: {
          id: true,
          id_avaliacao: true,
          id_estabelecimento: true,
          id_triangulacao: true,
          informacoes: true,
        },
      });
    }

    const informacoesDecodificadas = await desconverterBase64JSON(resultadoCriado.informacoes);

    return {
      ...resultadoCriado,
      informacoesDecodificadas: informacoesDecodificadas,
    };
  }
}
