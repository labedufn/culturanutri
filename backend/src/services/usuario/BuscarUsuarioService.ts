import { prisma } from "@config/prismaClient";

export class BuscarUsuarioService {
  async execute(idUsuario: string) {
    const usuario = await prisma.usuario.findUniqueOrThrow({
      where: {
        id: idUsuario,
      },
    });

    return {
      usuario,
    };
  }
}
