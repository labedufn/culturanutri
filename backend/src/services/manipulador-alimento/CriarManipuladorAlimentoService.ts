import { ManipuladorAlimento, PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class CriarManipuladorAlimentoService {
  async execute(manipuladorAlimento: ManipuladorAlimento) {
    const manipuladorCriado = await prisma.manipuladorAlimento.create({
      data: {
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

    const informacoesDecodificadas = await desconverterBase64JSON(manipuladorCriado.informacoes);

    return {
      ...manipuladorCriado,
      informacoesDecodificadas: informacoesDecodificadas,
    };
  }
}
