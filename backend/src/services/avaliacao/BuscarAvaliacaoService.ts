import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class BuscarAvaliacaoService {
  async execute(id_avaliacao: string) {
    const avaliacao = await prisma.avaliacao.findUnique({
      where: {
        id: id_avaliacao,
      },
      select: {
        id: true,
        id_estabelecimento: true,
        data_cadastro: true,
        slug: true,
        ativo: true,
        Estabelecimento: {
          select: {
            nome: true,
          },
        },
      },
    });

    return avaliacao;
  }
}
