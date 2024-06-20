import { prisma } from "@config/prismaClient";

export class BuscarEstabelecimentosService {
  async execute(idEstabelecimento: string, idUsuario: string) {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: idUsuario,
      },
    });

    if (!usuario) {
      throw new Error("Usuário inválido");
    } else {
      const estabelecimento = await prisma.estabelecimento.findUniqueOrThrow({
        where: {
          id: idEstabelecimento,
        },
      });
      return {
        estabelecimento,
      };
    }
  }
}
