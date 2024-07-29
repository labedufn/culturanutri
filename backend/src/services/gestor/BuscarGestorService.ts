import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class BuscarGestorService {
  async execute(idUsuario: string, idGestor: string) {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: idUsuario,
      },
    });

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    } else {
      const gestor = await prisma.gestores.findFirstOrThrow({
        where: {
          id: idGestor,
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

      // Decode `informacoes` for each gestor
      const informacoesDecodificadas = await desconverterBase64JSON(gestor.informacoes);

      return {
        ...gestor,
        informacoesDecodificadas: informacoesDecodificadas,
      };
    }
  }
}
