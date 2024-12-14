import { PrismaClient } from "@prisma/client";
import { sign } from "jsonwebtoken";
import moment from "moment-timezone";
import { createTransport } from "nodemailer";
import { generatePasswordResetEmailTemplate } from "templates/EmailTemplate";

const prisma = new PrismaClient();

export class RecuperarSenhaService {
  async execute(email: string) {
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }

    const token = sign({ usuarioId: usuario.id }, process.env.SECRET_KEY, { expiresIn: "15m" });

    const expiraEm = moment.tz(Date.now() + 15 * 60000, "America/Sao_Paulo");
    const expiraEmDate = expiraEm.toDate();

    await prisma.resetSenhaToken.create({
      data: {
        token,
        id_usuario: usuario.id,
        expira_em: expiraEmDate,
      },
    });

    const resetPasswordLink = `${process.env.FRONTEND_URL}/autenticacao/redefinir-senha?token=${token}`;

    const htmlContent = generatePasswordResetEmailTemplate({
      userName: usuario.nome,
      userEmail: email,
      resetLink: resetPasswordLink,
      frontendUrl: process.env.FRONTEND_URL,
    });

    const transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: "culturanutri@teste.com",
      to: email,
      subject: "Redefinição de Senha - CSA - Cultura de Segurança dos Alimentos",
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
  }
}
