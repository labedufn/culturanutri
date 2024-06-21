import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class ListarManipuladoresAlimentoService {
  async execute(idUsuario: string) {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: idUsuario,
      },
    });

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    } else {
      const manipuladores = await prisma.manipuladorAlimento.findMany({
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
      const decodeManipulador = await Promise.all(
        manipuladores.map(async (manipulador) => ({
          ...manipulador,
          informacoes: await desconverterBase64JSON(manipulador.informacoes),
        })),
      );

      return decodeManipulador;
    }
  }
}
