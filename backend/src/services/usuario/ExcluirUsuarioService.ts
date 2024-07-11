import { prisma } from "@config/prismaClient";

export class ExcluirUsuarioService {
  async execute(idUsuario: string) {
    const usuarioTemVinculo = await prisma.estabelecimento.findFirst({
      where: {
        alterado_por: idUsuario,
      },
    });

    if (usuarioTemVinculo) {
      throw new Error("Não é possível excluir o usuário, pois ele possui vínculos.");
    }

    const usuarioTemVinculoEmTabelaAuxiliar = await prisma.cadastroToken.findFirst({
      where: {
        criado_por: idUsuario,
      },
    });

    if (usuarioTemVinculoEmTabelaAuxiliar) {
      throw new Error("Não é possível excluir o usuário, pois ele possui vínculos.");
    }

    await prisma.usuario.delete({
      where: {
        id: idUsuario,
      },
    });

    return { message: "Usuário excluído com sucesso!" };
  }
}
