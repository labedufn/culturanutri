import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ListarAvaliacaoService {
  async execute() {
    const avaliacoes = await prisma.avaliacao.findMany({
      where: {
        ativo: 1,
      },
      select: {
        id: true,
        id_estabelecimento: true,
        data_cadastro: true,
        slug: true,
        ativo: true,
      },
    });

    console.log(avaliacoes);

    return avaliacoes;
  }
}
