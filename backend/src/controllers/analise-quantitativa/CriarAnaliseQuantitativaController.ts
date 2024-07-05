// import { AnaliseQuantitativa } from "@models/AnaliseQuantitativa";
// import { CriarAnaliseQuantitativaService } from "@services/analise-quantitativa/CriarAnaliseQuantitativaService";
import { CalcularAnaliseQuantitativaService } from "@services/calculos/analise-quantitativa/CalcularAnaliseQuantitativaService";
import { ListarGestoresService } from "@services/gestor/ListarGestoresService";
import { ListarManipuladoresAlimentoService } from "@services/manipulador-alimento/ListarManipuladoresAlimentoService";
import { Request, Response } from "express";

export class CriarAnaliseQuantitativaController {
  async handle(req: Request, res: Response) {
    const { id_estabelecimento } = req.body;

    try {
      // const ativo = 1;

      const listarGestoresService = new ListarGestoresService();
      const listarManipuladoresAlimentoService = new ListarManipuladoresAlimentoService();
      const calcularAnaliseQuantitativaService = new CalcularAnaliseQuantitativaService();

      const manipuladores = await listarManipuladoresAlimentoService.execute(id_estabelecimento);
      const gestores = await listarGestoresService.execute(id_estabelecimento);

      const { caracteristicas_socio_demograficas, resultados_avaliacao_quantitativas_csa, vies_otimista } =
        await calcularAnaliseQuantitativaService.execute(manipuladores, gestores);

      // const analiseQuantitativa = new AnaliseQuantitativa(
      //   id_gestor,
      //   id_manipulador_alimentos,
      //   caracteristicas_socio_demograficas,
      //   resultados_avaliacao_quantitativas_csa,
      //   vies_otimista,
      //   ativo,
      // );
      // const criarAnaliseQuantitativaService = new CriarAnaliseQuantitativaService();
      // const gestor = await criarAnaliseQuantitativaService.execute(analiseQuantitativa);

      // return res.json(gestor);
      return 500;
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
