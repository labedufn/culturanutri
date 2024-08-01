import { BuscarAnalisesQualitativaEstabelecimentoService } from "@services/analise-qualitativa/BuscarAnalisesQualitativaEstabelecimentoService";
import { BuscarAnalisesQuantitativaEstabelecimentoService } from "@services/analise-quantitativa/BuscarAnalisesQuantitativaEstabelecimentoService";
import { BuscarDadosAvaliacaoService } from "@services/avaliacao/BuscarDadosAvaliacaoService";
import { BuscarGestoresEstabelecimentoService } from "@services/gestor/BuscarGestoresEstabelecimentoService";
import { BuscarListasVerificacaoEstabelecimentoService } from "@services/lista-verificacao/BuscarListasVerificacaoEstabelecimentoService";
import { BuscarManipuladoresAlimentoEstabelecimentoService } from "@services/manipulador-alimento/BuscarManipuladoresAlimentoEstabelecimentoService";
import { BuscarResultadosEstabelecimentoService } from "@services/resultado/BuscarResultadosEstabelecimentoService";
import { BuscarTriangulacoesEstabelecimentoService } from "@services/triangulacao/BuscarTriangulacoesEstabelecimentoService";
import { Request, Response } from "express";

export class BuscarDadosAvaliacaoController {
  async handle(req: Request, res: Response) {
    const { id_estabelecimento } = req.body;

    try {
      const buscarDadosAvaliacaoService = new BuscarDadosAvaliacaoService();
      const avaliacoes = await buscarDadosAvaliacaoService.execute(id_estabelecimento);
      const idAvaliacoes = avaliacoes.map((avaliacao: any) => avaliacao.id);
      const dados: any = {};

      const buscarGestoresEstabelecimentoService = new BuscarGestoresEstabelecimentoService();
      dados["gestores"] = await buscarGestoresEstabelecimentoService.execute(idAvaliacoes);

      const buscarManipuladoresAlimentoEstabelecimentoService = new BuscarManipuladoresAlimentoEstabelecimentoService();
      dados["manipuladoresAlimento"] = await buscarManipuladoresAlimentoEstabelecimentoService.execute(idAvaliacoes);

      const buscarAnalisesQualitativaEstabelecimentoService = new BuscarAnalisesQualitativaEstabelecimentoService();
      dados["analisesQualitativa"] = await buscarAnalisesQualitativaEstabelecimentoService.execute(idAvaliacoes);

      const buscarAnalisesQuantitativaEstabelecimentoService = new BuscarAnalisesQuantitativaEstabelecimentoService();
      dados["analisesQuantitativa"] = await buscarAnalisesQuantitativaEstabelecimentoService.execute(idAvaliacoes);

      const buscarListasVerificacaoEstabelecimentoService = new BuscarListasVerificacaoEstabelecimentoService();
      dados["listasVerificacao"] = await buscarListasVerificacaoEstabelecimentoService.execute(idAvaliacoes);

      const buscarTriangulacoesEstabelecimentoService = new BuscarTriangulacoesEstabelecimentoService();
      dados["triangulacoes"] = await buscarTriangulacoesEstabelecimentoService.execute(idAvaliacoes);

      const buscarResultadosEstabelecimentoService = new BuscarResultadosEstabelecimentoService();
      dados["resultados"] = await buscarResultadosEstabelecimentoService.execute(idAvaliacoes);

      return res.json(dados);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
