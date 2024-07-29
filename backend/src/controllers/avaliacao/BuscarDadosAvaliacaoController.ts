import { BuscarDadosAvaliacaoService } from "@services/avaliacao/BuscarDadosAvaliacaoService";
import { BuscarGestoresEstabelecimentoService } from "@services/gestor/BuscarGestoresEstabelecimentoService";

export class BuscarDadosAvaliacaoController {
  async handle(req: Request, res: Response) {
    const { id_estabelecimento } = req.body;
    try {
      const buscarDadosAvaliacaoService = new BuscarDadosAvaliacaoService();
      const avaliacoes = await buscarDadosAvaliacaoService.execute(id_estabelecimento);
      // ira me retornar um array de avaliacoes com ID
      const idAvaliacoes = avaliacoes.map((avaliacao) => avaliacao.id);
      //   const dados = {};

      const buscarGestoresEstabelecimentoService = new BuscarGestoresEstabelecimentoService();
      const gestores = await buscarGestoresEstabelecimentoService.execute(idAvaliacoes);

      // terei que criar um buscar diferente para cada prop, onde será passado um array de ids (avaliacoes)

      return res.json(gestores);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
