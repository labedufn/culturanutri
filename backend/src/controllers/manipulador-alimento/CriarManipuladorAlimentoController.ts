import { ManipuladorAlimento } from "@models/ManipuladorAlimento";
import { CriarManipuladorAlimentoService } from "@services/manipulador-alimento/CriarManipuladorAlimentoService";
import converterBase64JSON from "@utils/converterBase64JSON";
import { Request, Response } from "express";

export class CriarManipuladorAlimentoController {
  async handle(req: Request, res: Response) {
    const { json_informacoes } = req.body;

    try {
      const { informacoes } = await converterBase64JSON(json_informacoes);
      const data_cadastro = new Date();
      const data_alteracao = new Date();
      const ativo = 1;

      const novoManipuladorAlimento = new ManipuladorAlimento(informacoes, data_cadastro, data_alteracao, ativo);
      const criarManipuladorAlimentoService = new CriarManipuladorAlimentoService();
      const manipuladorAlimento = await criarManipuladorAlimentoService.execute(novoManipuladorAlimento);

      return res.json(manipuladorAlimento);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
