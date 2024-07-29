import { Triangulacao } from "@models/Triangulacao";
import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class CriarTriangulacaoService {
  async execute(triangulacao: Triangulacao) {
    let triangulacaoNova;
    const triangulacaoExiste = await prisma.triangulacao.findFirst({
      where: {
        id_avaliacao: triangulacao.id_avaliacao,
      },
    });

    if (triangulacaoExiste) {
      triangulacaoNova = await prisma.triangulacao.update({
        where: {
          id: triangulacaoExiste.id,
        },
        data: {
          informacoes: triangulacao.informacoes,
        },
        select: {
          id: true,
          informacoes: true,
          id_avaliacao: true,
          data_cadastro: true,
          data_alteracao: true,
        },
      });
    } else {
      triangulacaoNova = await prisma.triangulacao.create({
        data: {
          informacoes: triangulacao.informacoes,
          id_avaliacao: triangulacao.id_avaliacao,
        },
        select: {
          id: true,
          informacoes: true,
          id_avaliacao: true,
          data_cadastro: true,
          data_alteracao: true,
        },
      });
    }

    const informacoesDecodificadas = await desconverterBase64JSON(triangulacaoNova.informacoes);

    return {
      ...triangulacaoNova,
      informacoesDecodificadas: informacoesDecodificadas,
    };
  }
}
