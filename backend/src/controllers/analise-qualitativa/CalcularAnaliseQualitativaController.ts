import { AnaliseQualitativa } from "@models/AnaliseQualitativa";
import { BuscarAnaliseQualitativaService } from "@services/analise-qualitativa/BuscarAnaliseQualitativaService";
import { EditarAnaliseQualitativaService } from "@services/analise-qualitativa/EditarAnaliseQualitativaService";
import { CalcularAnaliseQualitativaService } from "@services/calculos/analise-qualitativa/CalcularAnaliseQualitativaService";
import converterBase64JSON from "@utils/converterBase64JSON";
import { Request, Response } from "express";

export class CalcularAnaliseQualitativaController {
  async handle(req: Request, res: Response) {
    const { id_avaliacao } = req.body;

    try {
      const buscarAnaliseQualitativaService = new BuscarAnaliseQualitativaService();
      const calcularAnaliseQualitativaService = new CalcularAnaliseQualitativaService();
      const editarAnaliseQualitativaService = new EditarAnaliseQualitativaService();

      const ativo = 1;

      const analiseQualitativaBuscada = await buscarAnaliseQualitativaService.execute(id_avaliacao);
      const { json_informacoes } = await calcularAnaliseQualitativaService.execute(
        analiseQualitativaBuscada.informacoesDecodificadas,
      );

      const { informacoes } = await converterBase64JSON(json_informacoes, "informacoes");

      const analiseQualitativa = new AnaliseQualitativa(id_avaliacao, informacoes, ativo);
      const analiseQualitativaCalculada = await editarAnaliseQualitativaService.execute(
        analiseQualitativaBuscada.id,
        analiseQualitativa,
      );

      return res.json(analiseQualitativaCalculada);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
