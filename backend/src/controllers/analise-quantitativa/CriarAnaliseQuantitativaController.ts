import { AnaliseQuantitativa } from "@models/AnaliseQuantitativa";
import { CriarAnaliseQuantitativaService } from "@services/analise-quantitativa/CriarAnaliseQuantitativaService";
import { CalcularAnaliseQuantitativaService } from "@services/calculos/analise-quantitativa/CalcularAnaliseQuantitativaService";
import { ListarGestoresService } from "@services/gestor/ListarGestoresService";
import { ListarManipuladoresAlimentoService } from "@services/manipulador-alimento/ListarManipuladoresAlimentoService";
import converterBase64JSON from "@utils/converterBase64JSON";
import { Request, Response } from "express";

export class CriarAnaliseQuantitativaController {
  async handle(req: Request, res: Response) {
    const { id_estabelecimento } = req.body;

    try {
      const listarGestoresService = new ListarGestoresService();
      const listarManipuladoresAlimentoService = new ListarManipuladoresAlimentoService();
      const calcularAnaliseQuantitativaService = new CalcularAnaliseQuantitativaService();

      const manipuladores = await listarManipuladoresAlimentoService.execute(id_estabelecimento);
      const gestores = await listarGestoresService.execute(id_estabelecimento);

      const {
        json_caracteristicas_socio_demograficas,
        json_resultados_avaliacao_quantitativas_csa,
        json_vies_otimista,
      } = await calcularAnaliseQuantitativaService.execute(manipuladores, gestores);

      const { caracteristicas_socio_demograficas } = await converterBase64JSON(
        json_caracteristicas_socio_demograficas,
        "caracteristicas_socio_demograficas",
      );

      const { resultados_avaliacao_quantitativas_csa } = await converterBase64JSON(
        json_resultados_avaliacao_quantitativas_csa,
        "resultados_avaliacao_quantitativas_csa",
      );

      const { vies_otimista } = await converterBase64JSON(json_vies_otimista, "vies_otimista");

      const analiseQuantitativa = new AnaliseQuantitativa(
        id_estabelecimento,
        caracteristicas_socio_demograficas,
        resultados_avaliacao_quantitativas_csa,
        vies_otimista,
      );
      const criarAnaliseQuantitativaService = new CriarAnaliseQuantitativaService();
      const novaAnaliseQuantitativa = await criarAnaliseQuantitativaService.execute(analiseQuantitativa);

      return res.json(novaAnaliseQuantitativa);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
