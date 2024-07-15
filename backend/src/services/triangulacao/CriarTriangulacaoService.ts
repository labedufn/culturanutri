import { Triangulacao } from "@models/Triangulacao";
import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class CriarTriangulacaoService {
  async execute(triangulacao: Triangulacao) {
    const triangulacaoCriada = await prisma.triangulacao.create({
      data: {
        id_analise_qualitativa: triangulacao.id_analise_qualitativa,
        id_analise_quantitativa: triangulacao.id_analise_quantitativa,
        informacoes: triangulacao.informacoes,
        ativo: triangulacao.ativo,
      },
      select: {
        id: true,
        id_analise_qualitativa: true,
        id_analise_quantitativa: true,
        informacoes: true,
        data_cadastro: true,
        data_alteracao: true,
        ativo: true,
      },
    });

    const informacoesDecodificadas = await desconverterBase64JSON(triangulacaoCriada.informacoes);

    return {
      ...triangulacaoCriada,
      informacoesDecodificadas: informacoesDecodificadas,
    };
  }
}
