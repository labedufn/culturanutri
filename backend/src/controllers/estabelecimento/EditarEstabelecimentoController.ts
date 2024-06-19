import { Estabelecimento } from "@models/Estabelecimento";
import { EditarEstabelecimentoService } from "@services/estabelecimento/EditarEstabelecimentoService";
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
      alterado_por,
    } = req.body;

    try {
      const estabelecimento = new Estabelecimento(
        nome,
        cnae,
        endereco,
        pessoal_ocupado,
        numero_refeicoes,
        possui_alvara_sanitario,
        possui_responsavel_boas_praticas,
        alterado_por,
      );

      const editarEstabelecimentoService = new EditarEstabelecimentoService();
      const estabelecimentoAlterado = await editarEstabelecimentoService.execute(id, estabelecimento);

      return res.json(estabelecimentoAlterado);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
