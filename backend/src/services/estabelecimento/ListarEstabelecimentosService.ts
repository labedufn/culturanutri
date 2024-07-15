import { prisma } from "@config/prismaClient";

export class ListarEstabelecimentosService {
  async execute() {
    const estabelecimentos = await prisma.estabelecimento.findMany({
      orderBy: {
        data_alteracao: "desc",
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            sobrenome: true,
          },
        },
      },
    });

    if (estabelecimentos.length === 0) {
      throw new Error("Nenhum estabelecimento encontrado");
    }

    const formattedEstabelecimentos = estabelecimentos.map((estabelecimento) => ({
      ...estabelecimento,
      alterado_por: `${estabelecimento.usuario.nome} ${estabelecimento.usuario.sobrenome}`,
    }));

    return {
      estabelecimentos: formattedEstabelecimentos,
    };
  }
}
