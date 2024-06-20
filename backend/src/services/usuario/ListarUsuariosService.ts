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
      const usuarios = await prisma.usuario.findMany();

      return {
        usuarios,
      };
    }
  }
}
