import { BuscarAvaliacaoService } from "@services/avaliacao/BuscarAvaliacaoService";

export class BuscarAvaliacaoController {
  async handle(req: Request, res: Response) {
    const { id_avaliacao } = req.body;
    try {
      const buscarAvaliacaoService = new BuscarAvaliacaoService();
      const avaliacao = await buscarAvaliacaoService.execute(id_avaliacao);

      return res.json(avaliacao);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
