import { ManipuladorAlimento } from "@models/ManipuladorAlimento";
import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class ListarManipuladoresAlimentoService {
  async execute(id_estabelecimento: string): Promise<ManipuladorAlimento[]> {
    const manipuladores = await prisma.manipuladorAlimento.findMany({
      where: {
        id_estabelecimento,
      },
      select: {
        id: true,
        data_cadastro: true,
        data_alteracao: true,
        informacoes: true,
        ativo: true,
      },
    });

    const decodeManipulador = await Promise.all(
      manipuladores.map(async (manipulador) => ({
        id_estabelecimento,
        ...manipulador,
        informacoes: await desconverterBase64JSON(manipulador.informacoes),
      })),
    );

    return decodeManipulador;
  }
}
