import { Estabelecimento } from "@models/Estabelecimento";
import { EditarEstabelecimentoService } from "@services/estabelecimento/EditarEstabelecimentoService";
import { BuscarUsuarioService } from "@services/usuario/BuscarUsuarioService";
import { Request, Response } from "express";

export class EditarEstabelecimentoController {
  async handle(req: Request, res: Response) {
    const {
      id,
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

      const estabelecimento = new Estabelecimento(
        nome,
        cnae,
        endereco,
        pessoal_ocupado,
        numero_refeicoes,
        possui_alvara_sanitario,
        possui_responsavel_boas_praticas,
        usuarioAtual.usuario,
      );

      const editarEstabelecimentoService = new EditarEstabelecimentoService();
      const estabelecimentoAlterado = await editarEstabelecimentoService.execute(id, estabelecimento);

      return res.json(estabelecimentoAlterado);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
