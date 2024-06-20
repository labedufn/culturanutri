import { prisma } from "@config/prismaClient";
import { Estabelecimento } from "@prisma/client";

export class EditarEstabelecimentoService {
  async execute(idEstabelecimento: string, estabelecimento: Estabelecimento) {
    const estabelecimentoAlterado = await prisma.estabelecimento.update({
      where: {
        id: idEstabelecimento,
      },
      data: {
        nome: estabelecimento.nome,
        cnae: estabelecimento.cnae,
        endereco: estabelecimento.endereco,
        pessoal_ocupado: estabelecimento.pessoal_ocupado,
        numero_refeicoes: estabelecimento.numero_refeicoes,
        possui_alvara_sanitario: estabelecimento.possui_alvara_sanitario,
        possui_responsavel_boas_praticas: estabelecimento.possui_responsavel_boas_praticas,
        data_criacao: new Date(),
        data_alteracao: new Date(),
        alterado_por: estabelecimento.alterado_por,
        ativo: estabelecimento.ativo,
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
        data_criacao: true,
        data_alteracao: true,
        alterado_por: true,
        ativo: true,
      },
    });

    return {
      estabelecimentoAlterado,
    };
  }
}