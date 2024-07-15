import { prisma } from "@config/prismaClient";
import { Estabelecimento } from "@models/Estabelecimento";

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
        pessoal_ocupado: Number(estabelecimento.pessoal_ocupado),
        numero_refeicoes: Number(estabelecimento.numero_refeicoes),
        possui_alvara_sanitario: Number(estabelecimento.possui_alvara_sanitario),
        possui_responsavel_boas_praticas: Number(estabelecimento.possui_responsavel_boas_praticas),
        alterado_por: estabelecimento.alterado_por,
        ativo: estabelecimento.ativo,
      },
      select: {
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
      estabelecimentoAlterado,
    };
  }
}
