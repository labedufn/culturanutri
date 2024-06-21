import { Gestor } from "@models/Gestor";
import { EditarGestosService } from "@services/gestor/EditarGestorService";
import converterBase64JSON from "@utils/converterBase64JSON";
import { Request, Response } from "express";

export class EditarGestorController {
  async handle(req: Request, res: Response) {
    const { id_gestor, json_informacoes, ativo } = req.body;

    try {
      const { informacoes } = await converterBase64JSON(json_informacoes, "informacoes");
      const data_cadastro = new Date();
      const data_alteracao = new Date();

      const gestor = new Gestor(informacoes, data_cadastro, data_alteracao, ativo);
      const editarGestorService = new EditarGestosService();
      const gestorAlterado = await editarGestorService.execute(id_gestor, gestor);

      return res.json(gestorAlterado);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
