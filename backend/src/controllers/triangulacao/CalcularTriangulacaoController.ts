import { Triangulacao } from "@models/Triangulacao";
import { BuscarAnaliseQualitativaService } from "@services/analise-qualitativa/BuscarAnaliseQualitativaService";
import { BuscarAnaliseQuantitativaService } from "@services/analise-quantitativa/BuscarAnaliseQuantitativaService";
import { CalcularTriangulacaoService } from "@services/calculos/triangulacao/CalcularTriangulacaoService";
import { BuscarListaVerificacaoService } from "@services/lista-verificacao/BuscarListaVerificacaoService";
import { CriarTriangulacaoService } from "@services/triangulacao/CriarTriangulacaoService";
import converterBase64JSON from "@utils/converterBase64JSON";
import { Request, Response } from "express";

export class CalcularTriangulacaoController {
  async handle(req: Request, res: Response) {
    const { id_avaliacao } = req.body;

    try {
      const calcularTriangulacaoService = new CalcularTriangulacaoService();
      const criarTriangulacaoService = new CriarTriangulacaoService();
      const buscarAnaliseQualitativaService = new BuscarAnaliseQualitativaService();
      const buscarAnaliseQuantitativaService = new BuscarAnaliseQuantitativaService();
      const buscarListaVerificacao = new BuscarListaVerificacaoService();

      const analiseQualitativa = await buscarAnaliseQualitativaService.execute(id_avaliacao);
      const analiseQuantitativa = await buscarAnaliseQuantitativaService.execute(id_avaliacao);
      const listaVerificacao = await buscarListaVerificacao.execute(id_avaliacao);

      const { informacoes } = await calcularTriangulacaoService.execute(
        analiseQualitativa,
        analiseQuantitativa,
        listaVerificacao,
      );
      const ativo = 1;

      const { informacoesCodificadas } = await converterBase64JSON(informacoes, "informacoesCodificadas");

      const triangulacao = new Triangulacao(id_avaliacao, informacoesCodificadas, ativo);
      const triangulacaoCalculada = await criarTriangulacaoService.execute(triangulacao);

      return res.json(triangulacaoCalculada);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
