import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CriarAvaliacaoService {
  async execute(avaliacao) {
    try {
      const avaliacaoCriada = await prisma.avaliacao.create({
        data: {
          id_estabelecimento: avaliacao.id_estabelecimento,
          ativo: avaliacao.ativo,
        },
        select: {
          id: true,
          id_estabelecimento: true,
          data_cadastro: true,
          ativo: true,
        },
      });

      return avaliacaoCriada;
    } catch (error) {
      throw new Error(`Erro ao criar avaliação: ${error.message}`);
    }
  }
}
