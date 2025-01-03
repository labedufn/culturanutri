import { ManipuladorAlimento } from "@models/ManipuladorAlimento";
import { CriarManipuladorAlimentoService } from "@services/manipulador-alimento/CriarManipuladorAlimentoService";
import converterBase64JSON from "@utils/converterBase64JSON";
import { Request, Response } from "express";

export class CriarManipuladorAlimentoController {
  async handle(req: Request, res: Response) {
    const { json_informacoes, id_avaliacao } = req.body;

    try {
      const { informacoes } = await converterBase64JSON(json_informacoes, "informacoes");

      const novoManipuladorAlimento = new ManipuladorAlimento(informacoes, id_avaliacao);
      const criarManipuladorAlimentoService = new CriarManipuladorAlimentoService();
      const manipuladorAlimento = await criarManipuladorAlimentoService.execute(novoManipuladorAlimento);

      return res.json(manipuladorAlimento);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
