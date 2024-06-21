import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class BuscarManipuladorAlimentoService {
  async execute(idUsuario: string, idManipulador: string) {
    console.log(idUsuario, idManipulador);
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: idUsuario,
      },
    });

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    } else {
      const manipuladorAlimento = await prisma.manipuladorAlimento.findUnique({
        where: {
          id: idManipulador,
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

      // Decode `informacoes` for each gestor
      const informacoesDecodificadas = await desconverterBase64JSON(manipuladorAlimento.informacoes);

      return {
        ...manipuladorAlimento,
        informacoesDecodificadas: informacoesDecodificadas,
      };
    }
  }
}
