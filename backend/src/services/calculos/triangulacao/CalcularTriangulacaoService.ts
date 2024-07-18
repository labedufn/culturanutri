export class CalcularTriangulacaoService {
  private calcularAnaliseQuantitativa(valor) {
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

  private analiseQuantitativaMultipla(v1, v2, v3) {
    if (v3 > v1) {
      return 1;
    } else if (v3 > v2) {
      return 1;
    } else if (v2 > v1) {
      return 2;
    } else if (v2 > v3) {
      return 2;
    } else if (v1 > v1) {
      return 3;
    } else if (v2 > v3) {
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
        0: this.calcularAnaliseQuantitativa(
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
    informacoes["lideranca"] = {
      ...informacoes["lideranca"],
      escore_elemento: this.escoreElemento(informacoes["lideranca"].valor_medio),
    };

    //informacoes comunicacao
    informacoes["comunicacao"] = {
      escore_analise_quantitativa: {
        0: this.calcularAnaliseQuantitativa(
          analiseQuantitativa["resultadosAvaliacaoQuantitativasCSADecodificadas"].comunicacao.manipuladores.media,
        ),
        1: this.calcularAnaliseQuantitativa(
          analiseQuantitativa["resultadosAvaliacaoQuantitativasCSADecodificadas"].comunicacao.manipuladores.media,
        ),
        2: analiseQualitativa["informacoesDecodificadas"].comunicacao
          .melhorias_seguranca_alimentos_comunicadas_informacoes_visiveis_importantes.valor,
        3: analiseQualitativa["informacoesDecodificadas"].comunicacao.instrucoes_visuais_area_producao.escore,
      },
      escore_analise_qualitativa: {
        0: this.calcularAnaliseQuantitativa(
          analiseQualitativa["informacoesDecodificadas"].comunicacao.instrucoes_corretas_comunicadas_vertical_horizontal
            .escore,
        ),
        1: this.calcularAnaliseQuantitativa(
          analiseQualitativa["informacoesDecodificadas"].comunicacao
            .manipuladores_ficam_avontade_comunicar_acoes_erradas_perguntar.escore,
        ),
        2: analiseQualitativa["informacoesDecodificadas"].comunicacao
          .melhorias_seguranca_alimentos_comunicadas_informacoes_visiveis_importantes.valor,
        3: analiseQualitativa["informacoesDecodificadas"].comunicacao.instrucoes_visuais_area_producao.escore,
      },
    };

    //informacoes conhecimento
    informacoes["conhecimento"] = {
      escore_analise_quantitativa: {
        0: this.calcularAnaliseQuantitativa(
          analiseQuantitativa["resultadosAvaliacaoQuantitativasCSADecodificadas"].conhecimento.manipuladores.media,
        ),
        1: analiseQualitativa["informacoesDecodificadas"].conhecimento.sabem_explicar_requisitos_tempo_temperatura
          .escore,
      },
      escore_analise_qualitativa: {
        0: this.calcularAnaliseQuantitativa(
          analiseQualitativa["informacoesDecodificadas"].conhecimento.conhecimento_aspectos_tempo_temperatura.escore,
        ),
        1: analiseQualitativa["informacoesDecodificadas"].conhecimento.sabem_explicar_requisitos_tempo_temperatura
          .escore,
      },
    };

    //informacoes comprometimento
    informacoes["comprometimento"] = {
      escore_analise_quantitativa: {
        0: this.analiseQuantitativaMultipla(
          analiseQuantitativa["resultadosAvaliacaoQuantitativasCSADecodificadas"].comprometimento.continuo.manipuladores
            .media,
          analiseQuantitativa["resultadosAvaliacaoQuantitativasCSADecodificadas"].comprometimento.afetivo.manipuladores
            .media,
          analiseQuantitativa["resultadosAvaliacaoQuantitativasCSADecodificadas"].comprometimento.normativo
            .manipuladores.media,
        ),
        1: this.calcularAnaliseQuantitativa(
          analiseQuantitativa["resultadosAvaliacaoQuantitativasCSADecodificadas"].comprometimento
            .com_seguranca_alimentos.manipuladores.media,
        ),
        2: analiseQualitativa["informacoesDecodificadas"].comprometimento
          .gerentes_priorizam_alocacao_recursos_financeiros_seguranca_alimentos.escore,
      },
      escore_analise_qualitativa: {
        0: this.calcularAnaliseQuantitativa(
          analiseQualitativa["informacoesDecodificadas"].comprometimento.manipuladores_gerentes_satisfeitos_trabalho
            .escore,
        ),
        1: this.calcularAnaliseQuantitativa(
          analiseQualitativa["informacoesDecodificadas"].comprometimento
            .manipuladores_responsaveis_seguranca_alimentos_comportamento_seguro.escore,
        ),
        2: analiseQualitativa["informacoesDecodificadas"].comprometimento
          .gerentes_priorizam_alocacao_recursos_financeiros_seguranca_alimentos.escore,
      },
    };

    //informacoes pressao_trabalho_crencas_normativas
    informacoes["pressao_trabalho_crencas_normativas"] = {
      escore_analise_quantitativa: {
        0: this.calcularAnaliseQuantitativa(
          analiseQuantitativa["resultadosAvaliacaoQuantitativasCSADecodificadas"].percepcao_risco
            .pressao_trabalho_crencas_normativas.manipuladores.media,
        ),
        1: this.calcularAnaliseQuantitativa(
          analiseQuantitativa["resultadosAvaliacaoQuantitativasCSADecodificadas"].percepcao_risco
            .pressao_trabalho_crencas_normativas.manipuladores.media,
        ),
      },
      escore_analise_qualitativa: {
        0: this.calcularAnaliseQuantitativa(
          analiseQualitativa["informacoesDecodificadas"].pressao_trabalho_crencas_normativas
            .manipuladores_carga_trabalho_pesada.escore,
        ),
        1: this.calcularAnaliseQuantitativa(
          analiseQualitativa["informacoesDecodificadas"].pressao_trabalho_crencas_normativas
            .manipuladores_pressao_trabalhar_rapidamente.escore,
        ),
      },
    };

    //falta fazer

    //informacoes percepcao_risco (esse ficará em falta pois precisa da Lista de verificação)
    informacoes["percepcao_risco"] = {};

    //informacoes ambiente_trabalho
    informacoes["ambiente_trabalho"] = {};

    //informacoes sistema_estilos_gestao
    informacoes["sistema_estilos_gestao"] = {};

    //informacoes valor_medio (geral)
    informacoes["valor_medio"] = {};

    //informacoes escore_elemento (geral)
    informacoes["valor_medio"] = {};

    return { informacoes };
  }
}
