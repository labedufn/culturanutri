import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class BuscarListaVerificacaoService {
  async execute(id_estabelecimento: string) {
    const listaVerificacaoBuscada = await prisma.listaVerificacao.findFirst({
      where: {
        id_estabelecimento: id_estabelecimento,
        ativo: 1,
      },
      select: {
        id: true,
        data_cadastro: true,
        data_alteracao: true,
        informacoes: true,
        ativo: true,
      },
    });

    const informacoesDecodificadas = await desconverterBase64JSON(listaVerificacaoBuscada.informacoes);

    return {
      ...listaVerificacaoBuscada,
      informacoesDecodificadas: informacoesDecodificadas,
    };
  }
}
