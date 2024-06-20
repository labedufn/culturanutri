import { PrismaClient } from "@prisma/client";
import { GestorAvaliacao } from "@models/GestorAvaliacao";

const prisma = new PrismaClient();

export class CriarGestosAvaliacaoService {
  async execute(gestorAvaliacao: GestorAvaliacao) {
    const gestorCriado = await prisma.gestorAvaliacao.create({
      data: {
        data_alteracao: gestorAvaliacao.data_alteracao,
        data_cadastro: gestorAvaliacao.data_cadastro,
        informacoes: gestorAvaliacao.informacoes,
        ativo: gestorAvaliacao.ativo,
      },
      select: {
        id: true,
        data_cadastro: true,
        data_alteracao: true,
        informacoes: true,
        ativo: true,
      },
    });

    return gestorCriado;
  }
}
