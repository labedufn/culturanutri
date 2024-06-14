import { prisma } from "@config/prismaClient";

async function obterInfoUsuarioPorEmail(email: string): Promise<{ id: string; ativo: boolean } | null> {
  try {
    const usuario = await prisma.usuario.findFirst({
      where: { email },
      select: { id: true, ativo: true },
    });

    if (usuario && usuario.id && typeof usuario.ativo !== "undefined") {
      return { id: usuario.id, ativo: usuario.ativo };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Erro ao obter informações do usuário por e-mail:", error);
    return null;
  }
}

export default obterInfoUsuarioPorEmail;
