import { prisma } from "@config/prismaClient";

export async function buscarTipoUsuarioPorEmail(email) {
  const cadastroToken = await prisma.cadastroToken.findFirst({
    where: { email },
  });

  if (!cadastroToken) {
    throw new Error("Utilize o e-mail que foi enviado o link de cadastro.");
  }

  return cadastroToken.tipo_usuario;
}
