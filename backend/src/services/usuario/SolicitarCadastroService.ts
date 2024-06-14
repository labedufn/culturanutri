import { prisma } from "@config/prismaClient";
import { TipoUsuario } from "@prisma/client";
import { validarEmail } from "@utils/validarEmail";
import { sign } from "jsonwebtoken";
import moment from "moment-timezone";
import { createTransport } from "nodemailer";

export class SolicitarCadastroService {
  async execute(usuarioCriadorId: string, email: string, tipo: TipoUsuario) {
    if (!validarEmail(email)) {
      throw new Error("Email inválido.");
    }

    const verificarEmail = await prisma.usuario.findUnique({
      where: {
        email: email,
      },
    });

    if (verificarEmail) {
      throw new Error("Usuário já existe.");
    }

    const token = sign({ usuarioId: usuarioCriadorId }, process.env.SECRET_KEY, { expiresIn: "15m" });

    const expiraEm = moment.tz(Date.now() + 15 * 60000, "America/Sao_Paulo");
    const expiraEmDate = expiraEm.toDate();

    await prisma.cadastroToken.create({
      data: {
        token: token,
        email: email,
        tipo: tipo,
        usuario_id: usuarioCriadorId,
        expira_em: expiraEmDate,
      },
    });

    const transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
    });

    const cadastroLink = `${process.env.FRONTEND_URL}/autenticacao/cadastro?token=${token}`;
    const mailOptions = {
      from: "culturanutri@teste.com",
      to: email,
      subject: "Realize seu Cadastro no Sistema",
      html: `<p>Para Realizar seu cadastro, por favor, clique no link abaixo:</p><a href="${cadastroLink}">Realizar Cadastro</a>`,
    };

    await transporter.sendMail(mailOptions);
  }
}
