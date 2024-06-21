import { Gestor } from "@models/Gestor";
import { CriarGestorService } from "@services/gestor/CriarGestorService";
import converterBase64JSON from "@utils/converterBase64JSON";
import { Request, Response } from "express";

export class CriarGestorController {
  async handle(req: Request, res: Response) {
    const { json_informacoes } = req.body;

    try {
      const { informacoes } = await converterBase64JSON(json_informacoes);
      const data_cadastro = new Date();
      const data_alteracao = new Date();
      const ativo = 1;

      const novoGestor = new Gestor(informacoes, data_cadastro, data_alteracao, ativo);
      const criarGestorService = new CriarGestorService();
      const gestor = await criarGestorService.execute(novoGestor);

      return res.json(gestor);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
