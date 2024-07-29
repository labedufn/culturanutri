import { AnaliseQualitativa } from "@models/AnaliseQualitativa";
import { CriarAnaliseQualitativaService } from "@services/analise-qualitativa/CriarAnaliseQualitativaSerivce";
import converterBase64JSON from "@utils/converterBase64JSON";
import { Request, Response } from "express";

export class CriarAnaliseQualitativaController {
  async handle(req: Request, res: Response) {
    const { id_avaliacao, json_informacoes } = req.body;

    try {
      const ativo = 1;

      const { informacoes } = await converterBase64JSON(json_informacoes, "informacoes");
      const analiseQualitativa = new AnaliseQualitativa(id_avaliacao, informacoes, ativo);
      const criarAnaliseQualitativaService = new CriarAnaliseQualitativaService();
      const novaAnaliseQualitativa = await criarAnaliseQualitativaService.execute(analiseQualitativa);

      return res.json(novaAnaliseQualitativa);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
