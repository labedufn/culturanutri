import { prisma } from "@config/prismaClient";
import { Usuario } from "@models/Usuario";
import { validarCpf } from "@utils/validarCpf";
import { validarEmail } from "@utils/validarEmail";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";

export class CriarUsuarioService {
  async execute(usuario: Usuario) {
    if (!validarEmail(usuario.email)) {
      throw new Error("E-mail inválido");
    }

    if (!validarCpf(usuario.cpf)) {
      throw new Error("CPF inválido");
    }

    const usuarioExiste = await prisma.usuario.findFirst({
      where: {
        OR: [{ email: usuario.email }, { cpf: usuario.cpf }],
      },
    });

    if (usuarioExiste) {
      throw new Error("E-mail ou CPF já cadastrados.");
    }

    const tokenExistente = await prisma.cadastroToken.findFirst({
      where: {
        email: usuario.email,
      },
    });

    if (tokenExistente) {
      await prisma.cadastroToken.update({
        where: {
          id: tokenExistente.id,
        },
        data: {
          usado: 1,
        },
      });
    }

    const senhaCriptografada = await hash(usuario.senha, 10);

    const token = sign(
      {
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo,
      },
      process.env.SECRET_KEY,
      {
        subject: usuario.nome,
        expiresIn: "4h",
      },
    );

    const usuarioCriado = await prisma.usuario.create({
      data: {
        nome: usuario.nome,
        sobrenome: usuario.sobrenome,
        cpf: usuario.cpf,
        email: usuario.email,
        senha: senhaCriptografada,
        tipo_usuario: usuario.tipo,
        instituicao: usuario.instituicao,
      },
      select: {
        id: true,
        nome: true,
        sobrenome: true,
        cpf: true,
        email: true,
        instituicao: true,
        tipo_usuario: true,
      },
    });

    return {
      usuarioCriado,
      token: token,
    };
  }
}
