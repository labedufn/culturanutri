import { prisma } from "@config/prismaClient";
import { TipoUsuario, Usuario } from "@models/Usuario";
import { validarCpf } from "@utils/validarCpf";
import { validarEmail } from "@utils/validarEmail";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";

interface UsuarioUpdate extends Partial<Usuario> {
  tipo?: TipoUsuario;
}

export class EditarUsuarioService {
  async execute(idUsuario: string, usuario: UsuarioUpdate, isAdmin: boolean = false) {
    if (usuario.email && !validarEmail(usuario.email)) {
      throw new Error("E-mail inválido");
    }

    if (usuario.cpf && !validarCpf(usuario.cpf)) {
      throw new Error("CPF inválido");
    }

    if (usuario.email || usuario.cpf) {
      const usuarioExiste = await prisma.usuario.findFirst({
        where: {
          OR: [{ email: usuario.email }, { cpf: usuario.cpf }],
          NOT: {
            id: idUsuario,
          },
        },
      });

      if (usuarioExiste) {
        throw new Error("E-mail ou CPF já cadastrados.");
      }
    }

    const token = sign(
      {
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo,
      },
      process.env.SECRET_KEY as string,
      {
        subject: usuario.nome,
        expiresIn: "4h",
      },
    );

    const dadosAtualizados: Partial<Usuario> = {
      nome: usuario.nome,
      sobrenome: usuario.sobrenome,
      cpf: usuario.cpf,
      email: usuario.email,
      instituicao: usuario.instituicao,
    };

    if (isAdmin && usuario.tipo) {
      dadosAtualizados.tipo = usuario.tipo;
    }

    const usuarioAlterado = await prisma.usuario.update({
      where: {
        id: idUsuario,
      },
      data: dadosAtualizados,
      select: {
        id: true,
        nome: true,
        sobrenome: true,
        cpf: true,
        email: true,
        instituicao: true,
        tipo_usuario: true,
        ativo: true,
      },
    });

    return {
      usuarioAlterado,
      token: token,
    };
  }

  async atualizarSenha(idUsuario: string, novaSenha: string) {
    const senhaHash = await hash(novaSenha, 8);

    const usuarioAlterado = await prisma.usuario.update({
      where: {
        id: idUsuario,
      },
      data: {
        senha: senhaHash,
      },
      select: {
        id: true,
        nome: true,
        sobrenome: true,
        cpf: true,
        email: true,
        instituicao: true,
        tipo_usuario: true,
        ativo: true,
      },
    });

    return {
      message: "Senha atualizada com sucesso.",
      usuario: usuarioAlterado,
    };
  }
}
