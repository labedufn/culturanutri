import { Gestor } from "@models/Gestor";
import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class ListarGestoresService {
  async execute(): Promise<Gestor[]> {
    const gestores = await prisma.gestores.findMany({
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

    const decodedGestores = await Promise.all(
      gestores.map(async (gestor) => ({
        ...gestor,
        informacoes: await desconverterBase64JSON(gestor.informacoes),
      })),
    );

    return decodedGestores;
  }
}
