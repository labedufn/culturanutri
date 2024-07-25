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

  private calcularAnaliseQualitativa(valor) {
    if (valor === 1) {
      return "1";
    } else if (valor <= 1.4) {
      return "1";
    } else if (valor === 1.5) {
      return "2";
    } else if (valor <= 2.5) {
      return "2";
    } else if (valor === 2.6) {
      return "3";
    } else if (valor <= 5) {
      return "3";
    } else {
      return null;
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

  private calcularAnaliseQuantitativa2(h) {
    if (h === 1) {
      return 1;
    } else if (h <= 2.5) {
      return 1;
    } else if (h === 2.6) {
      return 2;
    } else if (h <= 4) {
      return 2;
    } else if (h === 4.1) {
      return 3;
    } else if (h <= 5) {
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

  private calcularRisco(valor) {
    if (valor === 0) {
      return 1;
    } else if (valor <= 0.5) {
      return 1;
    } else if (valor === 0.51) {
      return 2;
    } else if (valor <= 0.75) {
      return 2;
    } else if (valor === 0.76) {
      return 3;
    } else if (valor <= 1.0) {
      return 3;
    }
    return null;
  }

  private calcularCategoria(percentual) {
    if (percentual === 0) {
      return 1;
    } else if (percentual <= 50) {
      return 1;
    } else if (percentual === 51) {
      return 2;
    } else if (percentual <= 75) {
      return 2;
    } else if (percentual === 76) {
      return 3;
    } else if (percentual <= 100) {
      return 3;
    } else {
      return null;
    }
  }

  private verificarRisco(risco) {
    switch (risco) {
      case "Muito Alto Risco":
      case "Alto Risco":
        return 1;
      case "Médio Risco":
        return 2;
      case "Baixo Risco":
      case "Muito Baixo Risco":
        return 3;
      default:
        return null;
    }
  }

  private verificarValor(k) {
    if (k === 0) {
      return "1";
    } else if (k <= 9) {
      return 9;
    } else if (k === 10) {
      return "1->2";
    } else if (k <= 14) {
      return 9;
    } else if (k === 15) {
      return "2";
    } else if (k <= 17) {
      return "2";
    } else if (k === 17) {
      return "2->3";
    } else if (k <= 22) {
      return "2->3";
    } else if (k === 22) {
      return "3";
    } else if (k <= 24) {
      return "3";
    } else {
      return null;
    }
  }

  async execute(analiseQualitativa: JSON, analiseQuantitativa: JSON, listaVerificacao: JSON) {
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
      triangulacao: {
        valor_medio: this.calcularMedia(
          informacoes["lideranca"].triangulacao.escore_caracteristicas["0"],
          informacoes["lideranca"].triangulacao.escore_caracteristicas["1"],
          informacoes["lideranca"].triangulacao.escore_caracteristicas["2"],
          informacoes["lideranca"].triangulacao.escore_caracteristicas["3"],
        ),
      },
    };
    informacoes["lideranca"] = {
      ...informacoes["lideranca"],
      triangulacao: {
        escore_elemento: this.escoreElemento(informacoes["lideranca"].valor_medio),
      },
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

    informacoes["comunicacao"] = {
      ...informacoes["comunicacao"],
      triangulacao: {
        escore_caracteristicas: {
          0:
            informacoes["comunicacao"].escore_analise_quantitativa["0"] +
            informacoes["comunicacao"].escore_analise_qualitativa["0"],
          1:
            informacoes["comunicacao"].escore_analise_quantitativa["1"] +
            informacoes["comunicacao"].escore_analise_qualitativa["1"],
          2: this.escoreCaracteristicas(informacoes["comunicacao"].escore_analise_quantitativa["2"]),
          3: this.escoreCaracteristicas(informacoes["comunicacao"].escore_analise_quantitativa["3"]),
        },
      },
    };

    informacoes["comunicacao"] = {
      ...informacoes["comunicacao"],
      triangulacao: {
        valor_medio: this.calcularMedia(
          informacoes["comunicacao"].triangulacao.escore_caracteristicas["0"],
          informacoes["comunicacao"].triangulacao.escore_caracteristicas["1"],
          informacoes["comunicacao"].triangulacao.escore_caracteristicas["2"],
          informacoes["comunicacao"].triangulacao.escore_caracteristicas["3"],
        ),
      },
    };

    informacoes["comunicacao"] = {
      ...informacoes["comunicacao"],
      triangulacao: {
        escore_elemento: this.escoreElemento(informacoes["comunicacao"].valor_medio),
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

    informacoes["conhecimento"] = {
      ...informacoes["conhecimento"],
      triangulacao: {
        escore_caracteristicas: {
          0:
            informacoes["conhecimento"].escore_analise_quantitativa["0"] +
            informacoes["conhecimento"].escore_analise_qualitativa["0"],
          1: this.escoreCaracteristicas(informacoes["conhecimento"].escore_analise_quantitativa["1"]),
        },
      },
    };

    informacoes["conhecimento"] = {
      ...informacoes["conhecimento"],
      triangulacao: {
        valor_medio: this.calcularMedia(
          informacoes["conhecimento"].triangulacao.escore_caracteristicas["0"],
          informacoes["conhecimento"].triangulacao.escore_caracteristicas["1"],
        ),
      },
    };

    informacoes["conhecimento"] = {
      ...informacoes["conhecimento"],
      triangulacao: {
        escore_elemento: this.escoreElemento(informacoes["conhecimento"].valor_medio),
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

    informacoes["comprometimento"] = {
      ...informacoes["comprometimento"],
      triangulacao: {
        escore_caracteristicas: {
          0:
            informacoes["comprometimento"].escore_analise_quantitativa["0"] +
            informacoes["comprometimento"].escore_analise_qualitativa["0"],
          1:
            informacoes["comprometimento"].escore_analise_quantitativa["1"] +
            informacoes["comprometimento"].escore_analise_qualitativa["1"],
          2: this.escoreCaracteristicas(informacoes["comprometimento"].escore_analise_quantitativa["2"]),
        },
      },
    };

    informacoes["comprometimento"] = {
      ...informacoes["comprometimento"],
      triangulacao: {
        valor_medio: this.calcularMedia(
          informacoes["comprometimento"].triangulacao.escore_caracteristicas["0"],
          informacoes["comprometimento"].triangulacao.escore_caracteristicas["1"],
          informacoes["comprometimento"].triangulacao.escore_caracteristicas["2"],
        ),
      },
    };

    informacoes["comprometimento"] = {
      ...informacoes["comprometimento"],
      triangulacao: {
        escore_elemento: this.escoreElemento(informacoes["comprometimento"].valor_medio),
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

    informacoes["pressao_trabalho_crencas_normativas"] = {
      ...informacoes["pressao_trabalho_crencas_normativas"],
      triangulacao: {
        escore_caracteristicas: {
          0:
            informacoes["pressao_trabalho_crencas_normativas"].escore_analise_quantitativa["0"] +
            informacoes["pressao_trabalho_crencas_normativas"].escore_analise_qualitativa["0"],
          1:
            informacoes["pressao_trabalho_crencas_normativas"].escore_analise_quantitativa["1"] +
            informacoes["pressao_trabalho_crencas_normativas"].escore_analise_qualitativa["1"],
        },
      },
    };

    informacoes["pressao_trabalho_crencas_normativas"] = {
      ...informacoes["pressao_trabalho_crencas_normativas"],
      triangulacao: {
        valor_medio: this.calcularMedia(
          informacoes["pressao_trabalho_crencas_normativas"].triangulacao.escore_caracteristicas["0"],
          informacoes["pressao_trabalho_crencas_normativas"].triangulacao.escore_caracteristicas["1"],
        ),
      },
    };

    informacoes["pressao_trabalho_crencas_normativas"] = {
      ...informacoes["pressao_trabalho_crencas_normativas"],
      triangulacao: {
        escore_elemento: this.escoreElemento(informacoes["pressao_trabalho_crencas_normativas"].valor_medio),
      },
    };

    //informacoes ambiente de trabalho
    informacoes["ambiente_trabalho"] = {
      escore_analise_quantitativa: {
        0: this.calcularAnaliseQuantitativa2(
          analiseQuantitativa["resultadosAvaliacaoQuantitativasCSADecodificadas"].ambiente_trabalho.manipuladores.media,
        ),
        1: this.calcularCategoria(listaVerificacao["informacoesDecodificadas"].porcentagem),
        2: analiseQualitativa["informacoesDecodificadas"].ambiente_trabalho
          .adequacao_ambiente_frequente_necessidade_local_nao_inspecoes.valor,
        3: analiseQualitativa["informacoesDecodificadas"].ambiente_trabalho.atmosfera_ambiente_trabalho.escore,
      },
      escore_analise_qualitativa: {
        0: this.calcularAnaliseQualitativa(
          analiseQualitativa["informacoesDecodificadas"].ambiente_trabalho
            .layout_permite_fluxo_adequado_preparacao_alimentos.escore,
        ),
        1: this.calcularCategoria(listaVerificacao["informacoesDecodificadas"].porcentagem),
        2: analiseQualitativa["informacoesDecodificadas"].ambiente_trabalho
          .adequacao_ambiente_frequente_necessidade_local_nao_inspecoes.valor,
        3: analiseQualitativa["informacoesDecodificadas"].ambiente_trabalho.atmosfera_ambiente_trabalho.escore,
      },
    };

    informacoes["ambiente_trabalho"] = {
      ...informacoes["ambiente_trabalho"],
      triangulacao: {
        escore_caracteristicas: {
          0:
            informacoes["ambiente_trabalho"].escore_analise_quantitativa[0] +
            informacoes["ambiente_trabalho"].escore_analise_qualitativa[0],
          1: this.escoreCaracteristicas(informacoes["ambiente_trabalho"].escore_analise_quantitativa[1]),
          2: this.escoreCaracteristicas(informacoes["ambiente_trabalho"].escore_analise_quantitativa[2]),
          3: this.escoreCaracteristicas(informacoes["ambiente_trabalho"].escore_analise_quantitativa[3]),
        },
      },
    };

    informacoes["ambiente_trabalho"] = {
      ...informacoes["ambiente_trabalho"],
      triangulacao: {
        valor_medio: this.calcularMedia(
          informacoes["ambiente_trabalho"].triangulacao.escore_caracteristicas[0],
          informacoes["ambiente_trabalho"].triangulacao.escore_caracteristicas[1],
          informacoes["ambiente_trabalho"].triangulacao.escore_caracteristicas[2],
          informacoes["ambiente_trabalho"].triangulacao.escore_caracteristicas[3],
        ),
      },
    };

    informacoes["ambiente_trabalho"] = {
      ...informacoes["ambiente_trabalho"],
      escore_elemento: this.escoreElemento(informacoes["ambiente_trabalho"].triangulacao.valor_medio),
    };

    //informacoes sistema_estilos_gestao
    informacoes["sistema_estilos_gestao"] = {
      escore_analise_quantitativa: {
        0: this.calcularAnaliseQuantitativa2(
          analiseQuantitativa["resultadosAvaliacaoQuantitativasCSADecodificadas"].sistema_gestao.manipuladores.media,
        ),
        1: analiseQualitativa["informacoesDecodificadas"].sistema_gestao.equipe_sabe_preencher_formularios_controle
          .escore,
        2: analiseQualitativa["informacoesDecodificadas"].sistema_gestao
          .programas_pre_requisito_haccp_sistema_boas_praticas_higiene_implementados.valor,
        3: this.verificarRisco(listaVerificacao["informacoesDecodificadas"].classificacao),
      },
      escore_analise_qualitativa: {
        0: this.calcularAnaliseQualitativa(
          analiseQualitativa["informacoesDecodificadas"].sistema_gestao
            .equipe_motivada_implementar_praticas_seguras_ferramentas_qualidade.escore,
        ),
        1: analiseQualitativa["informacoesDecodificadas"].sistema_gestao.equipe_sabe_preencher_formularios_controle
          .escore,
        2: analiseQualitativa["informacoesDecodificadas"].sistema_gestao
          .programas_pre_requisito_haccp_sistema_boas_praticas_higiene_implementados.valor,
        3: analiseQualitativa["informacoesDecodificadas"].ambiente_trabalho
          .adequacao_ambiente_frequente_necessidade_local_nao_inspecoes.valor,
      },
    };

    informacoes["sistema_estilos_gestao"] = {
      ...informacoes["sistema_estilos_gestao"],
      triangulacao: {
        escore_caracteristicas: {
          0:
            informacoes["sistema_estilos_gestao"].escore_analise_quantitativa[0] +
            informacoes["sistema_estilos_gestao"].escore_analise_qualitativa[0],
          1: this.escoreCaracteristicas(informacoes["sistema_estilos_gestao"].escore_analise_quantitativa[1]),
          2: this.escoreCaracteristicas(informacoes["sistema_estilos_gestao"].escore_analise_quantitativa[2]),
          3:
            informacoes["sistema_estilos_gestao"].escore_analise_quantitativa[3] +
            informacoes["sistema_estilos_gestao"].escore_analise_qualitativa[3],
        },
      },
    };

    informacoes["sistema_estilos_gestao"] = {
      triangulacao: {
        valor_medio: this.calcularMedia(
          informacoes["sistema_estilos_gestao"].triangulacao.escore_caracteristicas[0],
          informacoes["sistema_estilos_gestao"].triangulacao.escore_caracteristicas[1],
          informacoes["sistema_estilos_gestao"].triangulacao.escore_caracteristicas[2],
          informacoes["sistema_estilos_gestao"].triangulacao.escore_caracteristicas[3],
        ),
      },
    };

    informacoes["sistema_estilos_gestao"] = {
      ...informacoes["sistema_estilos_gestao"],
      triangulacao: {
        escore_elemento: this.escoreElemento(informacoes["sistema_estilos_gestao"].triangulacao.valor_medio),
      },
    };

    //informacoes valor_medio (geral)
    informacoes["valor_medio"] = this.calcularMedia(
      informacoes["lideranca"].triangulacao.valor_medio,
      informacoes["comunicacao"].triangulacao.valor_medio,
      informacoes["conhecimento"].triangulacao.valor_medio,
      informacoes["comprometimento"].triangulacao.valor_medio,
      informacoes["pressao_trabalho_crencas_normativas"].triangulacao.valor_medio,
      informacoes["ambiente_trabalho"].triangulacao.valor_medio,
      informacoes["sistema_estilos_gestao"].triangulacao.valor_medio,
    );

    //informacoes escore_elemento (geral)
    informacoes["valor_medio"] = this.verificarValor(informacoes["valor_medio"]);

    //falta fazer
    //informacoes percepcao_risco (esse ficará em falta pois possui erros no excel)
    informacoes["percepcao_risco"] = {};

    return { informacoes };
  }
}
