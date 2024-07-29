import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class BuscarGestoresEstabelecimentoService {
  async execute(idAvaliacoes: string[]) {
    const gestores = await prisma.gestores.findMany({
      where: {
        id_avaliacao: {
          in: idAvaliacoes,
        },
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

    const gestoresComInformacoesDecodificadas = await Promise.all(
      gestores.map(async (gestor) => {
        const informacoesDecodificadas = await desconverterBase64JSON(gestor.informacoes);
        return {
          ...gestor,
          informacoesDecodificadas,
        };
      }),
    );

    return gestoresComInformacoesDecodificadas;
  }
}
