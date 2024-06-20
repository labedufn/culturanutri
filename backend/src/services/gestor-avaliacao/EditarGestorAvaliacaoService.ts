import { PrismaClient } from "@prisma/client";
import { GestorAvaliacao } from "@models/GestorAvaliacao";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class EditarGestosAvaliacaoService {
  async execute(idGestor: string, gestorAvaliacao: GestorAvaliacao) {
    const gestorAlterado = await prisma.gestorAvaliacao.update({
      where: {
        id: idGestor,
      },
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

    const informacoesDecodificadas = await desconverterBase64JSON(gestorAlterado.informacoes);

    return {
      ...gestorAlterado,
      informacoesDecodificadas: informacoesDecodificadas,
    };
  }
}
