import { prisma } from "@config/prismaClient";

export class ListarUsuariosService {
  async execute(idUsuario: string) {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: idUsuario,
      },
    });

    if (!usuario) {
      throw new Error("Usuário inválido");
    } else {
      const usuarios = await prisma.usuario.findMany({
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

      return {
        usuarios,
      };
    }
  }
}
