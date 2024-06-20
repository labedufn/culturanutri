import { prisma } from "@config/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface AutenticarRequest {
  emailOuCpf: string;
  senha: string;
}

export class AutenticarUsuarioService {
  async execute({ emailOuCpf, senha }: AutenticarRequest) {
    const usuario = await prisma.usuario.findFirst({
      where: {
        OR: [{ email: emailOuCpf }, { cpf: emailOuCpf }],
        ativo: 1,
      },
    });

    if (!usuario || !(await compare(senha, usuario.senha))) {
      throw new Error("As credenciais fornecidas são inválidas.");
    }

    await prisma.usuario.update({
      where: { id: usuario.id },
      data: { ultimo_login: new Date() },
    });

    const token = sign(
      {
        nome: usuario.nome,
        email: usuario.email,
        tipo_usuario: usuario.tipo_usuario,
      },
      process.env.SECRET_KEY,
      {
        subject: usuario.id,
        expiresIn: "4h",
      },
    );

    return {
      id: usuario.id,
      nome: usuario.nome,
      sobrenome: usuario.sobrenome,
      email: usuario.email,
      tipo: usuario.tipo_usuario,
      token: token,
    };
  }
}
