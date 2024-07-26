import { Resultado } from "@models/Resultado";
import { CalcularResultadoService } from "@services/calculos/resultados/CalcularResultadoService";
import { CriarResultadoService } from "@services/resultado/CriarResultadoService";
import { BuscarTriangulacaoService } from "@services/triangulacao/BuscarTriangulacaoService";
import converterBase64JSON from "@utils/converterBase64JSON";
import { Request, Response } from "express";

export class CriarResultadoController {
  async handle(req: Request, res: Response) {
    const { id_estabelecimento } = req.body;

    try {
      const buscarTriangulacaoService = new BuscarTriangulacaoService();
      const criarResultadoService = new CriarResultadoService();
      const calcularResultadoService = new CalcularResultadoService();
      const triangulacao = await buscarTriangulacaoService.execute(id_estabelecimento);

      const { informacoes } = await calcularResultadoService.execute(triangulacao);

      const { informacoesCodificadas } = await converterBase64JSON(informacoes, "informacoesCodificadas");

      const resultado = new Resultado(informacoesCodificadas, id_estabelecimento, triangulacao.id);
      const resultadoCriado = await criarResultadoService.execute(resultado);

      return res.json(resultadoCriado);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
