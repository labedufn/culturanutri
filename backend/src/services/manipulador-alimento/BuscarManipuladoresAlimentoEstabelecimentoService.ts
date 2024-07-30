import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class BuscarManipuladoresAlimentoEstabelecimentoService {
  async execute(idAvaliacoes: string[]) {
    const manipuladores = await prisma.manipuladorAlimento.findMany({
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

    const manipuladoresComInformacoesDecodificadas = await Promise.all(
      manipuladores.map(async (manipulador) => {
        const informacoesDecodificadas = await desconverterBase64JSON(manipulador.informacoes);
        return {
          ...manipulador,
          informacoesDecodificadas,
        };
      }),
    );

    return manipuladoresComInformacoesDecodificadas;
  }
}
