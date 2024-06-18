import { Usuario } from "@models/Usuario";
import { CriarUsuarioService } from "@services/usuario/CriarUsuarioService";
import { buscarTipoUsuarioPorEmail } from "@utils/buscarTipoUsuarioPorEmail";
import { Request, Response } from "express";

export class CriarUsuarioController {
  async handle(req: Request, res: Response) {
    const { nome, sobrenome, cpf, email, senha, instituicao } = req.body;

    try {
      const tipo = await buscarTipoUsuarioPorEmail(email);
      const data_cadastro = new Date();
      const data_alteracao = new Date();
      const ativo = 1;
      const ultimo_login = new Date();

      const novoUsuario = new Usuario(
        nome,
        sobrenome,
        cpf,
        email,
        senha,
        tipo,
        instituicao,
        data_cadastro,
        data_alteracao,
        ativo,
        ultimo_login,
      );
      const criarUsuarioService = new CriarUsuarioService();
      const usuario = await criarUsuarioService.execute(novoUsuario);

      return res.json(usuario);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
