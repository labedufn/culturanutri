import { ManipuladorAlimento, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CriarManipuladorAlimentoService {
  async execute(manipuladorAlimento: ManipuladorAlimento) {
    const estabelecimento = await prisma.estabelecimento.findUnique({
      where: {
        id: manipuladorAlimento.id_estabelecimento,
      },
    });

    if (!estabelecimento) {
      throw new Error("Estabelecimento não encontrado");
    }

    const manipuladorCriado = await prisma.manipuladorAlimento.create({
      data: {
        id_estabelecimento: manipuladorAlimento.id_estabelecimento,
        data_alteracao: manipuladorAlimento.data_alteracao,
        data_cadastro: manipuladorAlimento.data_cadastro,
        informacoes: manipuladorAlimento.informacoes,
        ativo: manipuladorAlimento.ativo,
      },
      select: {
        id: true,
        id_estabelecimento: true,
        data_cadastro: true,
        data_alteracao: true,
        informacoes: true,
        ativo: true,
      },
    });

    return manipuladorCriado;
  }
}
