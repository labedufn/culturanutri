import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class ListarManipuladoresAlimentoService {
  async execute() {
    const manipuladores = await prisma.manipuladorAlimento.findMany({
      where: {
        ativo: 1,
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

    const decodeManipulador = await Promise.all(
      manipuladores.map(async (manipulador) => ({
        ...manipulador,
        informacoes: await desconverterBase64JSON(manipulador.informacoes),
      })),
    );

    return decodeManipulador;
  }
}
