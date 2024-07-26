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
  async execute(triangulacao: Triangulacao) {
    const informacoes = {
      triangulacao: {
        liderança: triangulacao["informacoesDecodificadas"].lideranca.triangulacao.escore_elemento,
        comunicacao: triangulacao["informacoesDecodificadas"].comunicacao.triangulacao.escore_elemento,
        conhecimento: triangulacao["informacoesDecodificadas"].conhecimento.triangulacao.escore_elemento,
        comprometimento: triangulacao["informacoesDecodificadas"].comprometimento.triangulacao.escore_elemento,
        percepcao_risco: "",
        pressao_trabalho_crencas_normativas:
          triangulacao["informacoesDecodificadas"].pressao_trabalho_crencas_normativas.triangulacao.escore_elemento,
        ambiente_trabalho: triangulacao["informacoesDecodificadas"].ambiente_trabalho.triangulacao.escore_elemento,
        sistema_estilos_gestao:
          triangulacao["informacoesDecodificadas"].sistema_estilos_gestao.triangulacao.escore_elemento,
        csa: triangulacao["informacoesDecodificadas"].escore_elemento,
        resultado: this.categorizar(triangulacao["informacoesDecodificadas"].escore_elemento),
      },
    };

    return { informacoes };
  }
}
