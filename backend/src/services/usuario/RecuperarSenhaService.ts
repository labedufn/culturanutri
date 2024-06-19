import { PrismaClient } from "@prisma/client";
import { sign } from "jsonwebtoken";
import moment from "moment-timezone";
import { createTransport } from "nodemailer";

const prisma = new PrismaClient();

export class RecuperarSenhaService {
  async execute(email) {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: email,
      },
    });

    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }

    const token = sign({ usuarioId: usuario.id }, process.env.SECRET_KEY, { expiresIn: "15m" });

    const expiraEm = moment.tz(Date.now() + 15 * 60000, "America/Sao_Paulo");
    const expiraEmDate = expiraEm.toDate();

    await prisma.resetSenhaToken.create({
      data: {
        token: token,
        id_usuario: usuario.id,
        expira_em: expiraEmDate,
      },
    });

    const transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
    });

    const resetPasswordLink = `${process.env.FRONTEND_URL}/autenticacao/redefinir-senha?token=${token}`;

    const mailOptions = {
      from: "culturanutri@teste.com",
      to: email,
      subject: "Redefinição de Senha",
      text: `Aqui está o seu link de recuperação de senha: ${resetPasswordLink}`,
    };

    await transporter.sendMail(mailOptions);
  }
}
