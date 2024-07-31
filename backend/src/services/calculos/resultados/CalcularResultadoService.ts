import { Triangulacao } from "@prisma/client";

export class CalcularResultadoService {
  private categorizar(value) {
    if (value === "1") {
      return "Reativo";
    } else if (value === "1->2") {
      return "Reativo-Ativo";
    } else if (value === "2") {
      return "Ativo";
    } else if (value === "2->3") {
      return "Ativo-Proativo";
    } else if (value === "3") {
      return "Proativo";
    } else {
      return "";
    }
  }

  private converterValor(celula) {
    if (celula === "1") {
      return 1;
    } else if (celula === "1->2") {
      return 1.5;
    } else if (celula === "2") {
      return 2;
    } else if (celula === "2->3") {
      return 2.5;
    } else if (celula === "3") {
      return 3;
    } else {
      return null;
    }
  }
  async execute(triangulacao: Triangulacao) {
    const informacoes = {
      triangulacao: {
        liderança: triangulacao["informacoesDecodificadas"].lideranca.triangulacao.escore_elemento,
        comunicacao: triangulacao["informacoesDecodificadas"].comunicacao.triangulacao.escore_elemento,
        conhecimento: triangulacao["informacoesDecodificadas"].conhecimento.triangulacao.escore_elemento,
        comprometimento: triangulacao["informacoesDecodificadas"].comprometimento.triangulacao.escore_elemento,
        percepcao_risco: triangulacao["informacoesDecodificadas"].percepcao_risco.triangulacao.escore_elemento,
        pressao_trabalho_crencas_normativas:
          triangulacao["informacoesDecodificadas"].pressao_trabalho_crencas_normativas.triangulacao.escore_elemento,
        ambiente_trabalho: triangulacao["informacoesDecodificadas"].ambiente_trabalho.triangulacao.escore_elemento,
        sistema_estilos_gestao:
          triangulacao["informacoesDecodificadas"].sistema_estilos_gestao.triangulacao.escore_elemento,
        csa: triangulacao["informacoesDecodificadas"].escore_elemento,
        resultado: this.categorizar(triangulacao["informacoesDecodificadas"].escore_elemento),
      },
    };

    informacoes["resultado"] = {
      liderança: this.converterValor(informacoes["triangulacao"].liderança),
      comunicacao: this.converterValor(informacoes["triangulacao"].comunicacao),
      conhecimento: this.converterValor(informacoes["triangulacao"].conhecimento),
      comprometimento: this.converterValor(informacoes["triangulacao"].comprometimento),
      percepcao_risco: this.converterValor(informacoes["triangulacao"].percepcao_risco),
      pressao_trabalho_crencas_normativas: this.converterValor(
        informacoes["triangulacao"].pressao_trabalho_crencas_normativas,
      ),
      ambiente_trabalho: this.converterValor(informacoes["triangulacao"].ambiente_trabalho),
      sistema_estilos_gestao: this.converterValor(informacoes["triangulacao"].sistema_estilos_gestao),
      csa: this.converterValor(informacoes["triangulacao"].csa),
    };

    return { informacoes };
  }
}
