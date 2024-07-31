import { ListarAvaliacaoService } from "@services/avaliacao/ListarAvaliacaoService";

export class ListarAvaliacaoController {
  async handle(req: Request, res: Response) {
    try {
      const listarAvaliacaoService = new ListarAvaliacaoService();
      const avaliacoes = await listarAvaliacaoService.execute();

      return res.json(avaliacoes);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
