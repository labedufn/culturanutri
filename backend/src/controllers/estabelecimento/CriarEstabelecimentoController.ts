import { Estabelecimento } from "@models/Estabelecimento";
import { Request, Response } from "express";
import { BuscarUsuarioService } from "@services/usuario/BuscarUsuarioService";
import { CriarEstabelecimentoService } from "@services/estabelecimento/CriarEstabelecimentoService";

export class CriarEstabelecimentoController {
  async handle(req: Request, res: Response) {
    const {
      nome,
      cnae,
      endereco,
      pessoal_ocupado,
      numero_refeicoes,
      possui_alvara_sanitario,
      possui_responsavel_boas_praticas,
    } = req.body;

    const idUsuario = req.id_usuario;

    try {
      const buscarUsuarioService = new BuscarUsuarioService();
      const usuarioAtual = await buscarUsuarioService.execute(idUsuario);

      const novoEstabelecimento = new Estabelecimento(
        nome,
        cnae,
        endereco,
        pessoal_ocupado,
        numero_refeicoes,
        possui_alvara_sanitario,
        possui_responsavel_boas_praticas,
        usuarioAtual.usuario,
      );

      const criarEstabelecimentoService = new CriarEstabelecimentoService();
      const estabelecimento = await criarEstabelecimentoService.execute(novoEstabelecimento);

      return res.json(estabelecimento);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
