import { prisma } from "@config/prismaClient";

export class ListarEstabelecimentosService {
  async execute(idUsuario: string) {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: idUsuario,
      },
    });

    if (!usuario) {
      throw new Error("Usuário inválido");
    } else {
      const estabelecimentos = await prisma.estabelecimento.findMany();

      return {
        estabelecimentos,
      };
    }
  }
}
