<<<<<<< HEAD
import { ManipuladorAlimento } from "@models/ManipuladorAlimento";
import { PrismaClient } from "@prisma/client";
=======
import { ManipuladorAlimento, PrismaClient } from "@prisma/client";
>>>>>>> main
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class CriarManipuladorAlimentoService {
  async execute(manipuladorAlimento: ManipuladorAlimento) {
<<<<<<< HEAD
    console.log(manipuladorAlimento.id_estabelecimento);
=======
    const estabelecimento = await prisma.estabelecimento.findUnique({
      where: {
        id: manipuladorAlimento.id_estabelecimento,
      },
    });

    if (!estabelecimento) {
      throw new Error("Estabelecimento não encontrado");
    }

>>>>>>> main
    const manipuladorCriado = await prisma.manipuladorAlimento.create({
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

    const informacoesDecodificadas = await desconverterBase64JSON(manipuladorCriado.informacoes);

    return {
      ...manipuladorCriado,
      informacoesDecodificadas: informacoesDecodificadas,
    };
  }
}
