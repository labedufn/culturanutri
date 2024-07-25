import { ManipuladorAlimento } from "@models/ManipuladorAlimento";
import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class EditarManipuladorAlimentoService {
  async execute(idManipulador: string, manipuladorAlimento: ManipuladorAlimento) {
    const estabelecimento = await prisma.estabelecimento.findUnique({
      where: {
        id: manipuladorAlimento.id_estabelecimento,
      },
    });

    if (!estabelecimento) {
      throw new Error("Estabelecimento não encontrado");
    }

    const manipuladorAlterado = await prisma.manipuladorAlimento.update({
      where: {
        id: idManipulador,
      },
      data: {
        id_estabelecimento: manipuladorAlimento.id_estabelecimento,
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

    if (!manipuladorAlterado) {
      throw new Error("Manipulador de alimento não encontrado");
    }

    const informacoesDecodificadas = await desconverterBase64JSON(manipuladorAlterado.informacoes);

    return {
      ...manipuladorAlterado,
      informacoesDecodificadas: informacoesDecodificadas,
    };
  }
}
