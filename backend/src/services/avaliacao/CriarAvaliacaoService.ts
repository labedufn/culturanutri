import { Avaliacao } from "@models/Avaliacao";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CriarAvaliacaoService {
  async execute(avaliacao: Avaliacao) {
    const avaliacaoCriada = await prisma.avaliacao.create({
      data: {
        id_estabelecimento: avaliacao.id_estabelecimento,
        slug: avaliacao.slug,
      },
      select: {
        id: true,
        id_estabelecimento: true,
        data_cadastro: true,
        slug: true,
        ativo: true,
      },
    });

    return avaliacaoCriada;
  }
}
