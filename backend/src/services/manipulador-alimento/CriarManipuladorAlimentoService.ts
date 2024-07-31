import { ManipuladorAlimento } from "@models/ManipuladorAlimento";
import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class CriarManipuladorAlimentoService {
  async execute(manipuladorAlimento: ManipuladorAlimento) {
    let manipuladorCriado;
    const avaliacao = await prisma.avaliacao.findUnique({
      where: {
        id: manipuladorAlimento.id_avaliacao,
      },
    });

    if (!avaliacao) {
      manipuladorCriado = await prisma.manipuladorAlimento.create({
        data: {
          id_avaliacao: manipuladorAlimento.id_avaliacao,
          informacoes: manipuladorAlimento.informacoes,
          ativo: manipuladorAlimento.ativo,
        },
        select: {
          id: true,
          id_avaliacao: true,
          data_cadastro: true,
          data_alteracao: true,
          informacoes: true,
          ativo: true,
        },
      });
    } else {
      manipuladorCriado = await prisma.manipuladorAlimento.create({
        data: {
          id_avaliacao: manipuladorAlimento.id_avaliacao,
          informacoes: manipuladorAlimento.informacoes,
          ativo: manipuladorAlimento.ativo,
        },
        select: {
          id: true,
          id_avaliacao: true,
          data_cadastro: true,
          data_alteracao: true,
          informacoes: true,
          ativo: true,
        },
      });
    }

    const informacoesDecodificadas = await desconverterBase64JSON(manipuladorCriado.informacoes);

    return {
      ...manipuladorCriado,
      informacoesDecodificadas: informacoesDecodificadas,
    };
  }
}
