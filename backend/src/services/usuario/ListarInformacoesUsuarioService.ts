import { prisma } from "@config/prismaClient";

export class ListarInformacoesUsuarioService {
  async execute(idUsuario: string) {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: idUsuario,
      },
      select: {
        id: true,
        nome: true,
        sobrenome: true,
        cpf: true,
        email: true,
        instituicao: true,
        tipo_usuario: true,
        ativo: true,
        data_cadastro: true,
        data_alteracao: true,
        ultimo_login: true,
      },
    });

    if (!usuario) {
      throw new Error("Usuário inválido.");
    }

    return {
      usuario,
    };
  }
}
