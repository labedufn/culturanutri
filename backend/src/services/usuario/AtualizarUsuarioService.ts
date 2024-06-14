import { prisma } from "@config/prismaClient";
import { Usuario } from "@models/Usuario";
import { validarCpf } from "@utils/validarCpf";
import { validarEmail } from "@utils/validarEmail";
import { compare, hash } from "bcrypt";

export class AtualizarUsuarioService {
  async execute(id: string, dadosParaAtualizar: Partial<Usuario>, senhaAtual?: string) {
    if (dadosParaAtualizar.email && !validarEmail(dadosParaAtualizar.email)) {
      throw new Error("E-mail inválido");
    }

    if (dadosParaAtualizar.cpf && !validarCpf(dadosParaAtualizar.cpf)) {
      throw new Error("CPF inválido");
    }

    if (dadosParaAtualizar.email) {
      const emailExistente = await prisma.usuario.findFirst({
        where: {
          email: dadosParaAtualizar.email,
          NOT: { id },
        },
      });

      if (emailExistente) {
        throw new Error("E-mail já cadastrado por outro usuário.");
      }
    }

    if (dadosParaAtualizar.cpf) {
      const cpfExistente = await prisma.usuario.findFirst({
        where: {
          cpf: dadosParaAtualizar.cpf,
          NOT: { id },
        },
      });

      if (cpfExistente) {
        throw new Error("CPF já cadastrado por outro usuário.");
      }
    }

    if (dadosParaAtualizar.senha && !senhaAtual) {
      throw new Error("Para atualizar a senha, a senha atual deve ser fornecida.");
    }

    if (dadosParaAtualizar.senha && senhaAtual) {
      const usuario = await prisma.usuario.findUnique({
        where: { id },
        select: { senha: true },
      });

      if (!usuario) throw new Error("Usuário não encontrado.");

      const senhaCorreta = await compare(senhaAtual, usuario.senha);
      if (!senhaCorreta) {
        throw new Error("Senha atual inválida.");
      }

      dadosParaAtualizar.senha = await hash(dadosParaAtualizar.senha, 10);
    }

    const usuarioAtualizado = await prisma.usuario.update({
      where: { id },
      data: {
        nome: dadosParaAtualizar.nome,
        sobrenome: dadosParaAtualizar.sobrenome,
        cpf: dadosParaAtualizar.cpf,
        email: dadosParaAtualizar.email,
        senha: dadosParaAtualizar.senha,
      },
      select: {
        id: true,
        nome: true,
        sobrenome: true,
        cpf: true,
        email: true,
      },
    });

    return usuarioAtualizado;
  }
}
