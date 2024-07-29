import { Avaliacao } from "@models/Avaliacao";
import { CriarAvaliacaoService } from "@services/avaliacao/CriarAvaliacaoService";
import { BuscarEstabelecimentosService } from "@services/estabelecimento/BuscarEstabelecimentoService";

export class CriarAvaliacaoController {
  async handle(req: Request, res: Response) {
    const { id_estabelecimento } = req.body;
    const id_usuario = req.id_usuario;
    try {
      const ativo = 1;
      const buscarEstabelecimento = new BuscarEstabelecimentosService();
      const { estabelecimento } = await buscarEstabelecimento.execute(id_estabelecimento, id_usuario);
      const slug = "avaliacao/" + estabelecimento["id"];

      const novaAvaliacao = new Avaliacao(slug, ativo, id_estabelecimento);
      const criarAvaliacaoService = new CriarAvaliacaoService();
      const avaliacao = await criarAvaliacaoService.execute(novaAvaliacao);

      return res.json(avaliacao);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
