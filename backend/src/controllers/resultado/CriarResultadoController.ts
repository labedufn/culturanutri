import { Resultado } from "@models/Resultado";
import { CriarResultadoService } from "@services/resultado/CriarResultadoService";
import { BuscarTriangulacaoService } from "@services/triangulacao/BuscarTriangulacaoService";
import converterBase64JSON from "@utils/converterBase64JSON";
import { Request, Response } from "express";

export class CriarResultadoController {
  private classificarEstado(valor) {
    if (valor === "1") {
      return "Reativo";
    } else if (valor === "1->2") {
      return "Reativo-Ativo";
    } else if (valor === "2") {
      return "Ativo";
    } else if (valor === "2->3") {
      return "Ativo-Proativo";
    } else if (valor === "3") {
      return "Proativo";
    } else {
      return "Valor inválido";
    }
  }
  async handle(req: Request, res: Response) {
    const { id_estabelecimento } = req.body;

    try {
      const buscarTriangulacao = new BuscarTriangulacaoService();
      const triangulacao = await buscarTriangulacao.execute(id_estabelecimento);
      console.log(triangulacao["informacoesDecodificadas"]);
      //   const informacoes = {};

      //   informacoes["triangulacao"] = {
      //     lideranca: triangulacao["informacoesDecodificadas"].lideranca.triangulacao.escore_elemento,
      //     comunicacao: triangulacao["informacoesDecodificadas"].comunicacao.triangulacao.escore_elemento,
      //     conhecimento: triangulacao["informacoesDecodificadas"].conhecimento.triangulacao.escore_elemento,
      //     comprometimento: triangulacao["informacoesDecodificadas"].comprometimento.triangulacao.escore_elemento,
      //     percepcao_risco: triangulacao["informacoesDecodificadas"].percepcao_risco.triangulacao.escore_elemento,
      //     pressao_trabalho: triangulacao["informacoesDecodificadas"].pressao_trabalho.triangulacao.escore_elemento,
      //     ambiente_trabalho: triangulacao["informacoesDecodificadas"].ambiente_trabalho.triangulacao.escore_elemento,
      //     sistemas_estilos_gestao:
      //       triangulacao["informacoesDecodificadas"].sistemas_estilos_gestao.triangulacao.escore_elemento,
      //     CSA: triangulacao["informacoesDecodificadas"].lideranca.triangulacao.escore_elemento,
      //   };

      //   informacoes["triangulacao"] = {
      //     ...informacoes["triangulacao"],
      //     resultado: this.classificarEstado(informacoes["triangulacao"].CSA),
      //   };

      //   const { informacoesCodificadas } = await converterBase64JSON(informacoes, "informacoesCodificadas");

      //   const criarResultadoService = new CriarResultadoService();
      //   const resultado = new Resultado(id_estabelecimento, triangulacao.id, informacoesCodificadas);
      //   const resultadoCriado = await criarResultadoService.execute(resultado);

      return res.json(triangulacao);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
