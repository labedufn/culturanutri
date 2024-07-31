import { PrismaClient } from "@prisma/client";
import { GestorAvaliacao } from "@models/GestorAvaliacao";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class CriarGestorAvaliacaoService {
  async execute(gestorAvaliacao: GestorAvaliacao, idEstabelecimento: string) {
    const estabelecimento = await prisma.estabelecimento.findUnique({
      where: {
        id: idEstabelecimento,
      },
    });

    const gestorCriado = await prisma.gestorAvaliacao.create({
      data: {
        id_estabelecimento: estabelecimento.id,
        informacoes: gestorAvaliacao.informacoes,
        ativo: gestorAvaliacao.ativo,
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

    const informacoesDecodificadas = await desconverterBase64JSON(gestorCriado.informacoes);

    return {
      ...gestorCriado,
      informacoesDecodificadas: informacoesDecodificadas,
    };
  }
}
