import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class ListarGestoresService {
  async execute(idEstabelecimento: string) {
    const gestores = await prisma.gestores.findMany({
      where: {
        id_estabelecimento: idEstabelecimento,
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

    const decodedGestores = await Promise.all(
      gestores.map(async (gestor) => ({
        ...gestor,
        informacoes: await desconverterBase64JSON(gestor.informacoes),
      })),
    );

    return decodedGestores;
  }
}
