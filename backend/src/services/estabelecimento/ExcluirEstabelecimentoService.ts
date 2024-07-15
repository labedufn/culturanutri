import { prisma } from "@config/prismaClient";

export class ExcluirEstabelecimentoService {
  async execute(idEstabelecimento: string) {
    const estabelecimentoVinculoAnaliseQuantitativa = await prisma.analiseQuantitativa.findFirst({
      where: {
        id_estabelecimento: idEstabelecimento,
      },
    });

    if (estabelecimentoVinculoAnaliseQuantitativa) {
      throw new Error("Não é possível excluir o estabelecimento, pois ele possui vínculos.");
    }

    const estabelecimentoVinculoResultados = await prisma.resultado.findFirst({
      where: {
        id_estabelecimento: idEstabelecimento,
      },
    });

    if (estabelecimentoVinculoResultados) {
      throw new Error("Não é possível excluir o estabelecimento, pois ele possui vínculos.");
    }

    await prisma.estabelecimento.delete({
      where: {
        id: idEstabelecimento,
      },
    });

    return { message: "Estabelecimento excluído com sucesso!" };
  }
}
