import { ExcluirAvaliacaoService } from "@services/avaliacao/ExcluirAvaliacaoService";

export class ExcluirAvaliacaoController {
  async handle(req: Request, res: Response) {
    const { id_avaliacao, ativo } = req.body;
    try {
      const excluirAvaliacaoService = new ExcluirAvaliacaoService();
      const avaliacao = await excluirAvaliacaoService.execute(id_avaliacao, ativo);

      return res.json(avaliacao);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
