import { Gestor } from "@models/Gestor";
import { CriarGestorService } from "@services/gestor/CriarGestorService";
import converterBase64JSON from "@utils/converterBase64JSON";
import { Request, Response } from "express";

export class CriarGestorController {
  async handle(req: Request, res: Response) {
    const { json_informacoes, id_avaliacao } = req.body;

    try {
      const { informacoes } = await converterBase64JSON(json_informacoes, "informacoes");

      const novoGestor = new Gestor(informacoes, id_avaliacao);
      const criarGestorService = new CriarGestorService();
      const gestor = await criarGestorService.execute(novoGestor);

      return res.json(gestor);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
