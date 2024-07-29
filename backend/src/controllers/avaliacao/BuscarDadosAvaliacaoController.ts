import { BuscarDadosAvaliacaoService } from "@services/avaliacao/BuscarDadosAvaliacaoService";

export class BuscarDadosAvaliacaoController {
  async handle(req: Request, res: Response) {
    const { id_estabelecimento } = req.body;
    try {
      const buscarDadosAvaliacaoService = new BuscarDadosAvaliacaoService();
      const avaliacoes = await buscarDadosAvaliacaoService.execute(id_estabelecimento);
      // ira me retornar um array de avaliacoes com ID
      // terei que criar um buscar diferente para cada prop, onde será passado um array de ids (avaliacoes)
      // com isso me retornar inumeros dados cada prop (funcao)
      // e entao retornarei um array gigante com os dados de todas as avaliações

      return res.json(avaliacoes);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
