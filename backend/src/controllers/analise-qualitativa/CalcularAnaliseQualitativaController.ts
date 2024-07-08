import { AnaliseQualitativa } from "@models/AnaliseQualitativa";
import { CriarAnaliseQualitativaService } from "@services/analise-qualitativa/CriarAnaliseQualitativaSerivce";
import converterBase64JSON from "@utils/converterBase64JSON";
import { Request, Response } from "express";

export class CalcularAnaliseQualitativaController {
  async handle(req: Request, res: Response) {
    const { id_estabelecimento } = req.body;

    try {
      const ativo = 1;

      // buscar as infomacoes pelo id_estabelecimento

      // depois decodificar para json

      // com as informacoes decodificadas enviar para a classe de calculo

      // depois transformar para string

      const analiseQualitativa = new AnaliseQualitativa(id_estabelecimento, informacoes, ativo);
      const criarAnaliseQualitativaService = new CriarAnaliseQualitativaService();
      const novaAnaliseQualitativa = await criarAnaliseQualitativaService.execute(analiseQualitativa);

      return res.json(novaAnaliseQualitativa);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
