import { prisma } from "@config/prismaClient";
import { TipoUsuario, Usuario } from "@models/Usuario";
import { validarEmail } from "@utils/validarEmail";
import { sign } from "jsonwebtoken";
import moment from "moment-timezone";
import { createTransport } from "nodemailer";

function converterTipoUsuario(tipo: string): TipoUsuario {
  if (!Object.values(TipoUsuario).includes(tipo as TipoUsuario)) {
    throw new Error("Tipo de usuário inválido");
  }
  return tipo as TipoUsuario;
}

export class SolicitarCadastroService {
  async execute(criado_por: string, email: string, tipo_usuario: string) {
    const usuarioCriadorId = criado_por;
    if (!validarEmail(email)) {
      throw new Error("Email inválido.");
    }

    const verificarEmail = await prisma.usuario.findUnique({
      where: {
        id: undefined,
        email: email,
      },
    });

    if (verificarEmail) {
      throw new Error("Usuário já existe.");
    }

    const token = sign({ usuarioId: usuarioCriadorId }, process.env.SECRET_KEY, { expiresIn: "15m" });

    type PartialUsuario = Partial<Usuario>;

    const tipoUsuario = converterTipoUsuario(tipo_usuario);

    const usuario: PartialUsuario = {
      email: email,
      tipo: tipoUsuario,
    };

    const expiraEm = moment.tz(Date.now() + 15 * 60000, "America/Sao_Paulo");
    const expiraEmDate = expiraEm.toDate();

    await prisma.cadastroToken.create({
      data: {
        token: token,
        email: usuario.email,
        tipo_usuario: usuario.tipo,
        criado_por: usuarioCriadorId,
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
