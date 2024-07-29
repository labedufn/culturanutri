import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class BuscarDadosAvaliacaoService {
  async execute(id_estabelecimento: string) {
    const avaliacao = await prisma.avaliacao.findMany({
      where: {
        id_estabelecimento: id_estabelecimento,
      },
      select: {
        id: true,
        id_estabelecimento: true,
        data_cadastro: true,
        slug: true,
        ativo: true,
      },
    });

    return avaliacao;
  }
}
