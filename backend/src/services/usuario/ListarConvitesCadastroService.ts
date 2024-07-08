import { prisma } from "@config/prismaClient";

export class ListarConvitesCadastroService {
  async execute(idUsuario: string) {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: idUsuario,
      },
    });

    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }

    const cadastroTokens = await prisma.cadastroToken.findMany({
      where: {
        criado_por: idUsuario,
      },
      select: {
        email: true,
        tipo_usuario: true,
        usado: true,
        expira_em: true,
        criado_em: true,
      },
    });

    return cadastroTokens;
  }
}
