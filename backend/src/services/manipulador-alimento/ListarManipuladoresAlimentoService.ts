import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class ListarManipuladoresAlimentoService {
  async execute(idEstabelecimento: string) {
    const manipuladores = await prisma.manipuladorAlimento.findMany({
      where: {
        id_estabelecimento: idEstabelecimento,
      },
      select: {
        id: true,
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
