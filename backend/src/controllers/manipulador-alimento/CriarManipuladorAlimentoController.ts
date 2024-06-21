import { ManipuladorAlimento } from "@models/ManipuladorAlimento";
import { CriarManipuladorAlimentoService } from "@services/manipulador-alimento/CriarManipuladorAlimentoService";
import converterBase64JSON from "@utils/converterBase64JSON";
import { Request, Response } from "express";

export class CriarManipuladorAlimentoController {
  async handle(req: Request, res: Response) {
    const { id_estabelecimento, json_informacoes } = req.body;

    try {
      const { informacoes } = await converterBase64JSON(json_informacoes);
      const ativo = 1;

      const novoManipuladorAlimento = new ManipuladorAlimento(informacoes, ativo, id_estabelecimento);
      const criarManipuladorAlimentoService = new CriarManipuladorAlimentoService();
      const manipuladorAlimento = await criarManipuladorAlimentoService.execute(novoManipuladorAlimento);

      return res.json(manipuladorAlimento);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
