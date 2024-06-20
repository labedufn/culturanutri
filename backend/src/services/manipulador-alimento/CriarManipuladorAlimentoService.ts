import { ManipuladorAlimento, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CriarManipuladorAlimentoService {
  async execute(manipuladorAlimento: ManipuladorAlimento) {
    const manipuladorCriado = await prisma.manipuladorAlimento.create({
      data: {
        data_alteracao: manipuladorAlimento.data_alteracao,
        data_cadastro: manipuladorAlimento.data_cadastro,
        informacoes: manipuladorAlimento.informacoes,
        ativo: manipuladorAlimento.ativo,
      },
      select: {
        id: true,
        data_cadastro: true,
        data_alteracao: true,
        informacoes: true,
        ativo: true,
      },
    });

    return manipuladorCriado;
  }
}
