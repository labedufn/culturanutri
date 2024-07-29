import { Gestor } from "@models/Gestor";
import { EditarGestosService } from "@services/gestor/EditarGestorService";
import converterBase64JSON from "@utils/converterBase64JSON";
import { Request, Response } from "express";

export class EditarGestorController {
  async handle(req: Request, res: Response) {
    const { id_gestor, json_informacoes, id_avaliacao, ativo } = req.body;

    try {
      const { informacoes } = await converterBase64JSON(json_informacoes, "informacoes");

      const gestor = new Gestor(informacoes, id_avaliacao, ativo);
      const editarGestorService = new EditarGestosService();
      const gestorAlterado = await editarGestorService.execute(id_gestor, gestor);

      return res.json(gestorAlterado);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
