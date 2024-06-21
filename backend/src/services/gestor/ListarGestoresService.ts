import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class ListarGestoresService {
  async execute(idUsuario: string) {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: idUsuario,
      },
    });

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    } else {
      const gestores = await prisma.gestores.findMany({
        select: {
          id: true,
          data_cadastro: true,
          data_alteracao: true,
          informacoes: true,
          ativo: true,
        },
      });

      // Decode `informacoes` for each gestor
      const decodedGestores = await Promise.all(
        gestores.map(async (gestor) => ({
          ...gestor,
          informacoes: await desconverterBase64JSON(gestor.informacoes),
        })),
      );

      return decodedGestores;
    }
  }
}
