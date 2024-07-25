import { Triangulacao } from "@models/Triangulacao";
import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class CriarTriangulacaoService {
  async execute(triangulacao: Triangulacao) {
    const triangulacaoCriada = await prisma.triangulacao.create({
      data: {
        informacoes: triangulacao.informacoes,
        id_estabelecimento: triangulacao.id_estabelecimento,
      },
      select: {
        id: true,
        informacoes: true,
        id_estabelecimento: true,
        data_cadastro: true,
        data_alteracao: true,
      },
    });

    const informacoesDecodificadas = await desconverterBase64JSON(triangulacaoCriada.informacoes);

    return {
      ...triangulacaoCriada,
      informacoesDecodificadas: informacoesDecodificadas,
    };
  }
}
