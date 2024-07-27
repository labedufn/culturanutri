import { prisma } from "@config/prismaClient";
import { Estabelecimento } from "@models/Estabelecimento";

export class CriarEstabelecimentoService {
  async execute(estabelecimento: Estabelecimento) {
    const estabelecimentoCriado = await prisma.estabelecimento.create({
      data: {
        nome: estabelecimento.nome,
        cnae: estabelecimento.cnae,
        endereco: estabelecimento.endereco,
        pessoal_ocupado: estabelecimento.pessoal_ocupado,
        numero_refeicoes: estabelecimento.numero_refeicoes,
        possui_alvara_sanitario: estabelecimento.possui_alvara_sanitario,
        possui_responsavel_boas_praticas: estabelecimento.possui_responsavel_boas_praticas,
        alterado_por: estabelecimento.alterado_por,
      },
      select: {
        id: true,
        nome: true,
        cnae: true,
        endereco: true,
        pessoal_ocupado: true,
        numero_refeicoes: true,
        possui_alvara_sanitario: true,
        possui_responsavel_boas_praticas: true,
        data_alteracao: true,
        alterado_por: true,
      },
    });

    return {
      estabelecimentoCriado,
    };
  }
}
