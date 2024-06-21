import { AnaliseQuantitativa } from "@models/AnaliseQuantitativa";
import { CriarAnaliseQuantitativaService } from "@services/analise-quantitativa/CriarAnaliseQuantitativaService";
import converterBase64JSON from "@utils/converterBase64JSON";
import { Request, Response } from "express";

export class CriarAnaliseQuantitativaController {
  async handle(req: Request, res: Response) {
    const {
      id_gestor,
      id_manipulador_alimentos,
      json_caracteristicas_socio_demograficas,
      json_resultados_avaliacao_quantitativas_csa,
      json_vies_otimista,
    } = req.body;

    try {
      const { caracteristicas_socio_demograficas } = await converterBase64JSON(
        json_caracteristicas_socio_demograficas,
        "caracteristicas_socio_demograficas",
      );
      const { resultados_avaliacao_quantitativas_csa } = await converterBase64JSON(
        json_resultados_avaliacao_quantitativas_csa,
        "resultados_avaliacao_quantitativas_csa",
      );
      const { vies_otimista } = await converterBase64JSON(json_vies_otimista, "vies_otimista");
      const ativo = 1;

      //criar funcao na utils para realizar o calculo e preenchimento de campos vazios

      const analiseQuantitativa = new AnaliseQuantitativa(
        id_gestor,
        id_manipulador_alimentos,
        caracteristicas_socio_demograficas,
        resultados_avaliacao_quantitativas_csa,
        vies_otimista,
        ativo,
      );
      const criarAnaliseQuantitativaService = new CriarAnaliseQuantitativaService();
      const gestor = await criarAnaliseQuantitativaService.execute(analiseQuantitativa);

      return res.json(gestor);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
