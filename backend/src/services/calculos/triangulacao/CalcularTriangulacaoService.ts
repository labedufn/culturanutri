export class CalcularTriangulacaoService {
  private calcularAnaliseQuantitativaLideranca(valor) {
    if (valor === 1) {
      return 1;
    } else if (valor <= 2.5) {
      return 1;
    } else if (valor === 2.6) {
      return 2;
    } else if (valor <= 4) {
      return 2;
    } else if (valor === 4.1) {
      return 3;
    } else if (valor <= 5) {
      return 3;
    }
  }

  private calcularMedia(...numeros) {
    if (numeros.length === 0) {
      return 0;
    }

    const soma = numeros.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0);
    const media = soma / numeros.length;
    return media;
  }

  private escoreElemento(k) {
    if (k === 0) {
      return "1";
    } else if (k <= 1.2) {
      return "1";
    } else if (k === 1.3) {
      return "1->2";
    } else if (k <= 1.7) {
      return "1->2";
    } else if (k === 1.8) {
      return "2";
    } else if (k <= 2.2) {
      return "2";
    } else if (k === 2.3) {
      return "2->3";
    } else if (k <= 2.7) {
      return "2->3";
    } else if (k === 2.8) {
      return "3";
    } else if (k <= 3) {
      return "3";
    } else {
      return "4";
    }
  }

  private escoreCaracteristicas(h) {
    if (h === 1) {
      return 1;
    } else if (h <= 1.4) {
      return 1;
    } else if (h === 1.5) {
      return 2;
    } else if (h <= 2.5) {
      return 2;
    } else if (h <= 2.6) {
      return 3;
    } else if (h === 3) {
      return 3;
    } else {
      return 4;
    }
  }

  async execute(analiseQualitativa: JSON, analiseQuantitativa: JSON) {
    const informacoes = {};

    // informacoes liderança
    informacoes["lideranca"] = {
      escore_analise_quantitativa: {
        0: this.calcularAnaliseQuantitativaLideranca(
          analiseQuantitativa["resultadosAvaliacaoQuantitativasCSADecodificadas"].lideranca.manipuladores.media,
        ),
        1:
          analiseQualitativa["informacoesDecodificadas"].lideranca
            .gerentes_elogiam_manipuladores_praticas_seguras_manipulacao_alimentos.valor +
          analiseQualitativa["informacoesDecodificadas"].lideranca.gerentes_promovem_reconhecimento.valor,
        2:
          analiseQualitativa["informacoesDecodificadas"].lideranca
            .gerentes_comprometidos_organizacao_seguranca_alimentos.valor +
          analiseQualitativa["informacoesDecodificadas"].lideranca.comportamento_gerentes_consistente_praticas_seguras
            .valor,
        3: analiseQualitativa["informacoesDecodificadas"].lideranca
          .gerentes_trabalham_politicas_sistemas_processos_alinhados_seguranca_alimentos.valor,
      },
      escore_analise_qualitativa: {
        0:
          analiseQualitativa["informacoesDecodificadas"].lideranca
            .gerentes_elogiam_manipuladores_praticas_seguras_manipulacao_alimentos.valor +
          analiseQualitativa["informacoesDecodificadas"].lideranca.gerentes_promovem_reconhecimento.valor,
        1:
          analiseQualitativa["informacoesDecodificadas"].lideranca
            .gerentes_comprometidos_organizacao_seguranca_alimentos.valor +
          analiseQualitativa["informacoesDecodificadas"].lideranca.comportamento_gerentes_consistente_praticas_seguras
            .valor,
        2: analiseQualitativa["informacoesDecodificadas"].lideranca
          .gerentes_trabalham_politicas_sistemas_processos_alinhados_seguranca_alimentos.valor,
      },
    };
    informacoes["lideranca"] = {
      ...informacoes["lideranca"],
      triangulacao: {
        escore_caracteristicas: {
          0:
            informacoes["lideranca"].escore_analise_quantitativa["0"] +
            informacoes["lideranca"].escore_analise_qualitativa["0"],
          1: this.escoreCaracteristicas(informacoes["lideranca"].escore_analise_quantitativa["1"]),
          2: this.escoreCaracteristicas(informacoes["lideranca"].escore_analise_quantitativa["2"]),
          3: this.escoreCaracteristicas(informacoes["lideranca"].escore_analise_quantitativa["3"]),
        },
      },
    };
    informacoes["lideranca"] = {
      ...informacoes["lideranca"],
      valor_medio: this.calcularMedia(
        informacoes["lideranca"].triangulacao.escore_caracteristicas["0"],
        informacoes["lideranca"].triangulacao.escore_caracteristicas["1"],
        informacoes["lideranca"].triangulacao.escore_caracteristicas["2"],
        informacoes["lideranca"].triangulacao.escore_caracteristicas["3"],
      ),
    };

    //informacoes comunicacao

    informacoes["lideranca"] = {
      ...informacoes["lideranca"],
      escore_elemento: this.escoreElemento(informacoes["lideranca"].valor_medio),
    };

    return { informacoes };
  }
}
