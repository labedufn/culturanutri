import { Triangulacao } from "@models/Triangulacao";
import { BuscarAnaliseQualitativaService } from "@services/analise-qualitativa/BuscarAnaliseQualitativaService";
import { BuscarAnaliseQuantitativaService } from "@services/analise-quantitativa/BuscarAnaliseQuantitativaService";
import { CalcularTriangulacaoService } from "@services/calculos/triangulacao/CalcularTriangulacaoService";
import { CriarTriangulacaoService } from "@services/triangulacao/CriarTriangulacaoService";
import { Request, Response } from "express";

export class CalcularTriangulacaoController {
  async handle(req: Request, res: Response) {
    const { id_estabelecimento } = req.body;

    try {
      const calcularTriangulacaoService = new CalcularTriangulacaoService();
      const criarTriangulacaoService = new CriarTriangulacaoService();
      const buscarAnaliseQualitativaService = new BuscarAnaliseQualitativaService();
      const buscarAnaliseQuantitativaService = new BuscarAnaliseQuantitativaService();

      const analiseQualitativa = await buscarAnaliseQualitativaService.execute(id_estabelecimento);
      const analiseQuantitativa = await buscarAnaliseQuantitativaService.execute(id_estabelecimento);

      const { informacoes } = calcularTriangulacaoService.execute(analiseQualitativa, analiseQuantitativa);

      const ativo = 1;

      const triangulacao = new Triangulacao(id_analise_qualitativa, id_analise_qualitativa, informacoes, ativo);
      const triangulacaoCalculada = await criarTriangulacaoService.execute(triangulacao);

      return res.json(triangulacaoCalculada);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
