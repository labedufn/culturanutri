import { Usuario } from "@models/Usuario";
import { AtualizarUsuarioService } from "@services/usuario/AtualizarUsuarioService";
import { Request, Response } from "express";

export class AtualizarUsuarioController {
  async handle(req: Request, res: Response) {
    const { nome, sobrenome, cpf, email, novaSenha, senhaAtual } = req.body;

    const usuarioId = req.usuario_id;

    try {
      const atualizarUsuario = new AtualizarUsuarioService();

      const dadosParaAtualizar: Partial<Usuario> = {};
      if (nome) dadosParaAtualizar.nome = nome;
      if (sobrenome) dadosParaAtualizar.sobrenome = sobrenome;
      if (cpf) dadosParaAtualizar.cpf = cpf;
      if (email) dadosParaAtualizar.email = email;
      if (novaSenha) dadosParaAtualizar.senha = novaSenha;

      const usuarioAtualizado = await atualizarUsuario.execute(usuarioId, dadosParaAtualizar, senhaAtual);

      return res.json(usuarioAtualizado);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}
