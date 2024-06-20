import { GestorAvaliacao } from "@models/GestorAvaliacao";
import { EditarGestosAvaliacaoService } from "@services/gestor-avaliacao/EditarGestorAvaliacaoService";
import converterBase64JSON from "@utils/converterBase64JSON";
import { Request, Response } from "express";

export class EditarGestorAvaliacaoController {
  async handle(req: Request, res: Response) {
    const { id_gestor_avaliador, json_informacoes, ativo } = req.body;

    try {
      const { informacoes } = await converterBase64JSON(json_informacoes);
      const data_cadastro = new Date();
      const data_alteracao = new Date();

      const gestor = new GestorAvaliacao(informacoes, data_cadastro, data_alteracao, ativo);
      const editarGestorAvaliadorService = new EditarGestosAvaliacaoService();
      const gestorAlterado = await editarGestorAvaliadorService.execute(id_gestor_avaliador, gestor);

      return res.json(gestorAlterado);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
