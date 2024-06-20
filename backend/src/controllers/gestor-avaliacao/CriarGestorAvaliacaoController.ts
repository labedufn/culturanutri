import { GestorAvaliacao } from "@models/GestorAvaliacao";
import { CriarGestorAvaliacaoService } from "@services/gestor-avaliacao/CriarGestorAvaliacaoService";
import converterBase64JSON from "@utils/converterBase64JSON";
import { Request, Response } from "express";

export class CriarGestorAvaliacaoController {
  async handle(req: Request, res: Response) {
    const { json_informacoes } = req.body;

    try {
      const { informacoes } = await converterBase64JSON(json_informacoes);
      const data_cadastro = new Date();
      const data_alteracao = new Date();
      const ativo = 1;

      const novoGestorAvaliador = new GestorAvaliacao(informacoes, data_cadastro, data_alteracao, ativo);
      const criarGestorAvaliadorService = new CriarGestorAvaliacaoService();
      const gestorAvaliador = await criarGestorAvaliadorService.execute(novoGestorAvaliador);

      return res.json(gestorAvaliador);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
