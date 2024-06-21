import { GestorAvaliacao } from "@models/GestorAvaliacao";
import { EditarGestorAvaliacaoService } from "@services/gestor-avaliacao/EditarGestorAvaliacaoService";
import converterBase64JSON from "@utils/converterBase64JSON";
import { Request, Response } from "express";

export class EditarGestorAvaliacaoController {
  async handle(req: Request, res: Response) {
    const { id_gestor_avaliador, id_estabelecimento, json_informacoes, ativo } = req.body;

    try {
      const { informacoes } = await converterBase64JSON(json_informacoes);

      const gestor = new GestorAvaliacao(informacoes, ativo, id_estabelecimento);
      const editarGestorAvaliadorService = new EditarGestorAvaliacaoService();
      const gestorAlterado = await editarGestorAvaliadorService.execute(id_gestor_avaliador, gestor);

      return res.json(gestorAlterado);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
