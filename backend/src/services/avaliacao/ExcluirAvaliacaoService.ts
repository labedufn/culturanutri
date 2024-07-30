import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ExcluirAvaliacaoService {
  async execute(id_avaliacao: string, ativo: number) {
    const avaliacaoAlterada = await prisma.avaliacao.update({
      where: {
        id: id_avaliacao,
      },
      data: {
        ativo: ativo,
      },
      select: {
        id: true,
        id_estabelecimento: true,
        data_cadastro: true,
        slug: true,
        ativo: true,
      },
    });

    return avaliacaoAlterada;
  }
}
