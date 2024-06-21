import { GestorAvaliacao } from "@models/GestorAvaliacao";
import { CriarGestorAvaliacaoService } from "@services/gestor-avaliacao/CriarGestorAvaliacaoService";
import converterBase64JSON from "@utils/converterBase64JSON";
import { Request, Response } from "express";

export class CriarGestorAvaliacaoController {
  async handle(req: Request, res: Response) {
    const { json_informacoes, id_estabelecimento } = req.body;

    try {
      const { informacoes } = await converterBase64JSON(json_informacoes);
      const ativo = 1;
      const novoGestorAvaliador = new GestorAvaliacao(informacoes, ativo, id_estabelecimento);
      const criarGestorAvaliadorService = new CriarGestorAvaliacaoService();
      const gestorAvaliador = await criarGestorAvaliadorService.execute(novoGestorAvaliador, id_estabelecimento);

      return res.json(gestorAvaliador);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
