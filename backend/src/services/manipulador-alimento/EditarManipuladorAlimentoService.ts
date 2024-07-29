import { ManipuladorAlimento } from "@models/ManipuladorAlimento";
import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class EditarManipuladorAlimentoService {
  async execute(idManipulador: string, manipuladorAlimento: ManipuladorAlimento) {
    const manipuladorAlterado = await prisma.manipuladorAlimento.update({
      where: {
        id: idManipulador,
      },
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

    const informacoesDecodificadas = await desconverterBase64JSON(manipuladorAlterado.informacoes);

    return {
      ...manipuladorAlterado,
      informacoesDecodificadas: informacoesDecodificadas,
    };
  }
}
