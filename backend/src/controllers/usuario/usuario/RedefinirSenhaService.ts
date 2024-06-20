import { prisma } from "@config/prismaClient";
import { hash } from "bcrypt";
import { verify } from "jsonwebtoken";

interface MeuToken {
  usuarioId: string;
}

export class RedefinirSenhaService {
  async execute(token: string, novaSenha: string) {
    try {
      if (typeof token !== "string") {
        throw new Error("Token inválido.");
      }

      const decodedToken = verify(token, process.env.SECRET_KEY) as MeuToken;
      const usuarioId = decodedToken.usuarioId;

      if (!usuarioId) {
        throw new Error("Token inválido ou expirado.");
      }

      const tokenInfo = await prisma.resetSenhaToken.findFirst({
        where: {
          token: token,
          id_usuario: usuarioId,
          usado: 0,
          expira_em: {
            gt: new Date(),
          },
        },
      });

      if (!tokenInfo) {
        throw new Error("Token inválido, expirado ou já utilizado.");
      }

      const novaSenhaCriptografada = await hash(novaSenha, 8);

      await prisma.usuario.update({
        where: { id: usuarioId },
        data: { senha: novaSenhaCriptografada },
      });

      await prisma.resetSenhaToken.update({
        where: { id: tokenInfo.id },
        data: { usado: 1 },
      });

      return { message: "Senha redefinida com sucesso." };
    } catch (error) {
      console.error("Erro ao redefinir a senha:", error);
      throw error;
    }
  }
}
