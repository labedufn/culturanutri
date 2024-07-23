export class CalcularListaVerificacaoService {
  private somarValores(...valores) {
    return valores.reduce((soma, valor) => soma + valor, 0);
  }

  private somarCargasFatoriais(informacoesCalculadas: any): number {
    let somaTotal = 0;

    for (const key in informacoesCalculadas) {
      if (Object.prototype.hasOwnProperty.call(informacoesCalculadas, key)) {
        const cargaFatorialKey = `carga_fatorial_${key}`;
        const cargasFatoriais = informacoesCalculadas[key][cargaFatorialKey];

        if (cargasFatoriais) {
          for (const indice in cargasFatoriais) {
            if (Object.prototype.hasOwnProperty.call(cargasFatoriais, indice)) {
              const valor = cargasFatoriais[indice];
              if (isNaN(valor)) {
                console.log(`Valor inválido (NaN) no índice ${indice}`);
              } else {
                somaTotal += valor;
              }
            } else {
              console.log(`Índice ${indice} não encontrado em cargasFatoriais.`);
            }
          }
        }
      }
    }

    return somaTotal;
  }

  private classificacao(valor) {
    if (valor === 0) {
      return "Muito Baixo Risco";
    } else if (valor <= 1) {
      return "Baixo Risco";
    } else if (valor <= 13.2) {
      return "Baixo Risco";
    } else if (valor <= 13.3) {
      return "Médio Risco";
    } else if (valor <= 502.6) {
      return "Médio Risco";
    } else if (valor <= 502.7) {
      return "Alto Risco";
    } else if (valor <= 1152.1) {
      return "Alto Risco";
    } else if (valor <= 1152.2) {
      return "Muito Alto Risco";
    } else if (valor <= 2565.95) {
      return "Muito Alto Risco";
    }
  }

  private somaSe(informacoesCalculadas, criterio) {
    let somaTotal = 0;

    for (const key in informacoesCalculadas) {
      if (Object.prototype.hasOwnProperty.call(informacoesCalculadas, key)) {
        const item = informacoesCalculadas[key];

        if (typeof item === "object" && item !== null) {
          for (const subKey in item) {
            if (Object.prototype.hasOwnProperty.call(item, subKey)) {
              if (item[subKey] === criterio) {
                somaTotal += item[subKey];
              }
            }
          }
        } else {
          if (item === criterio) {
            somaTotal += item;
          }
        }
      }
    }

    return somaTotal;
  }

  private contarValores(informacoesCalculadas) {
    let count = 0;

    for (const key in informacoesCalculadas) {
      if (Object.prototype.hasOwnProperty.call(informacoesCalculadas, key)) {
        const subObjeto = informacoesCalculadas[key];
        for (const subKey in subObjeto) {
          if (Object.prototype.hasOwnProperty.call(subObjeto, subKey)) {
            const valor = subObjeto[subKey];
            if (valor === 0 || valor === 1) {
              count++;
            }
          }
        }
      }
    }

    return count;
  }

  async execute(informacoes: JSON) {
    const informacoesCalculadas = {};

    informacoesCalculadas["abastecimento_agua"] = {
      ...informacoes["abastecimento_agua"],
      carga_fatorial_abastecimento_agua: {
        0: 0,
        1: 0,
        2: 0,
        3: informacoes["abastecimento_agua"].reservatorio_em_adequado_estado_de_higiene * 9.3,
        4:
          informacoes["abastecimento_agua"]
            .reservatorio_devidamente_tampado_e_conservado_livre_de_rachaduras_vazamentos_infiltracoes_descascamentos_dentre_outros_defeitos *
          9.48,
        5:
          informacoes["abastecimento_agua"]
            .reservatorio_de_agua_higienizado_em_intervalo_maximo_de_seis_meses_sendo_mantidos_registros_da_operacao *
          15.16,
        6:
          informacoes["abastecimento_agua"]
            .material_que_reveste_internamente_o_reservatorio_de_agua_nao_compromete_a_qualidade_da_agua * 0.76,
      },
    };

    informacoesCalculadas["estrutura"] = {
      ...informacoes["estrutura"],
      carga_fatorial_estrutura: {
        0:
          informacoes["estrutura"]
            .instalacoes_sanitarias_possuem_lavatorios_de_maos_e_os_produtos_destinados_a_higiene_pessoal_papel_higienico_sabonete_liquido_inodoro_antisseptico_ou_sabonete_liquido_inodoro_e_antisseptico_coletores_com_tampa_e_acionados_sem_contato_manual_e_toalhas_de_papel_nao_reciclado_ou_outro_sistema_higienico_e_seguros_para_secagem_das_maos *
          41.05,
        1:
          informacoes["estrutura"]
            .existe_separacao_entre_as_diferentes_atividades_por_meios_fisicos_ou_por_outros_meios_eficazes_de_forma_a_evitar_a_contaminacao_cruzada *
          49.48,
      },
    };

    informacoesCalculadas["higienizacao_instalacoes_equipamentos_moveis_utensilios"] = {
      ...informacoes["higienizacao_instalacoes_equipamentos_moveis_utensilios"],
      carga_fatorial_higienizacao_instalacoes_equipamentos_moveis_utensilios: {
        0:
          informacoes["higienizacao_instalacoes_equipamentos_moveis_utensilios"]
            .instalacoes_equipamentos_moveis_e_utensilios_mantidos_em_condicoes_higienico_sanitaria_adequadas * 75.28,
        1:
          informacoes["higienizacao_instalacoes_equipamentos_moveis_utensilios"]
            .frequencia_adequada_de_higienizacao_dos_equipamentos_moveis_e_utensilios * 74.22,
        2:
          informacoes["higienizacao_instalacoes_equipamentos_moveis_utensilios"]
            .utensilios_utilizados_na_higienizacao_de_instalacoes_distintos_daqueles_usados_para_higienizacao_das_partes_dos_equipamentos_e_utensilios_que_entrem_em_contato_com_o_alimento *
          52.64,
        3:
          informacoes["higienizacao_instalacoes_equipamentos_moveis_utensilios"]
            .diluicao_tempo_de_contato_e_modo_de_uso_ou_aplicacao_dos_produtos_saneantes_obedece_as_instrucoes_recomendadas_pelo_fabricante *
          29.36,
        4:
          informacoes["higienizacao_instalacoes_equipamentos_moveis_utensilios"]
            .produtos_saneantes_regularizados_pelo_ministerio_da_saude * 20.78,
        5:
          informacoes["higienizacao_instalacoes_equipamentos_moveis_utensilios"]
            .areas_de_preparacao_higienizadas_quantas_vezes_fore_menecessarias_e_imediatamente_apos_o_termino_do_trabalho *
          25.72,
      },
    };

    informacoesCalculadas["controle_integrado_de_vetores_e_pragas_urbanas"] = {
      ...informacoes["controle_integrado_de_vetores_e_pragas_urbanas"],
      carga_fatorial_controle_integrado_de_vetores_e_pragas_urbanas: {
        0:
          informacoes["controle_integrado_de_vetores_e_pragas_urbanas"]
            .controle_de_vetores_e_pragas_urbanas_executados_por_empresa_especializada_devidamente_regularizada * 3.29,
        1:
          informacoes["controle_integrado_de_vetores_e_pragas_urbanas"]
            .existencia_de_um_conjunto_de_acoes_eficazes_e_continua_com_o_objetivo_de_impedir_a_atracao_o_abrigo_o_acesso_e_ou_proliferacao_de_vetores_e_pragas_urbanas *
          5.73,
        2:
          informacoes["controle_integrado_de_vetores_e_pragas_urbanas"]
            .edificacoes_instalacoes_equipamentos_moveis_e_utensilios_livres_da_presenca_de_animais_incluindo_vetores_e_pragas_urbanas *
          3.45,
      },
    };

    informacoesCalculadas["manipuladores"] = {
      ...informacoes["manipuladores"],
      carga_fatorial_manipuladores: {
        0:
          informacoes["manipuladores"]
            .os_manipuladores_sao_afastados_da_preparacao_de_alimentos_quando_apresentam_lesoes_e_ou_sintomas_de_enfermidades *
          39.31,
        1:
          informacoes["manipuladores"]
            .lavam_cuidadosamente_as_maos_ao_chegar_ao_trabalho_antes_e_apos_manipular_o_alimento_apos_qualquer_interrupcao_do_servico_apos_tocar_materiais_contaminados_apos_usar_os_sanitarios_e_sempre_que_se_fizer_necessario *
          73.44,
        2:
          informacoes["manipuladores"]
            .nao_fumam_e_falam_quando_desnecessario_cantam_assobiam_espirram_cospem_tossem_comem_manipulam_dinheiro_ou_praticam_outros_atos_que_possam_contaminar_o_alimento_durante_o_desempenho_das_atividades *
          11.7,
      },
    };

    informacoesCalculadas["materia_prima_ingredientes_embalagens"] = {
      ...informacoes["materia_prima_ingredientes_embalagens"],
      carga_fatorial_materia_prima_ingredientes_embalagens: {
        0: informacoes["materia_prima_ingredientes_embalagens"].submetidos_a_inspecao_e_aprovacao_na_recepcao * 25.96,
        1:
          informacoes["materia_prima_ingredientes_embalagens"]
            .materias_primas_ingredientes_e_embalagens_utilizados_para_preparacao_em_condicoes_higienico_sanitarias_adequadas *
          51.64,
        2:
          informacoes["materia_prima_ingredientes_embalagens"]
            .embalagens_primarias_das_materias_primas_e_dos_ingredientes_integras * 28.35,
        3:
          informacoes["materia_prima_ingredientes_embalagens"]
            .utilizacao_das_materias_primas_e_ingredientes_respeita_o_prazo_de_validade_ou_se_observa_a_ordem_de_entrada *
          25.95,
        4:
          informacoes["materia_prima_ingredientes_embalagens"]
            .materias_primas_fracionadas_adequadamente_acondicionadas_e_identificadas_com_no_minimo_as_seguintes_informacoes_designacao_do_produto_data_de_fracionamento_e_prazo_de_validade_apos_abertura_ou_retirada_da_embalagem_original *
          42.65,
        5:
          informacoes["materia_prima_ingredientes_embalagens"]
            .temperatura_das_materias_primas_e_ingredientes_pereciveis_verificada_na_recepcao_e_no_armazenamento *
          36.61,
        6:
          informacoes["materia_prima_ingredientes_embalagens"]
            .gelo_utilizado_em_alimentos_fabricado_a_partir_de_agua_potavel_e_mantido_em_condicao_higienico_sanitaria *
          24.97,
      },
    };

    informacoesCalculadas["preparo_do_alimento"] = {
      ...informacoes["preparo_do_alimento"],
      carga_fatorial_preparo_do_alimento: {
        0:
          informacoes["preparo_do_alimento"]
            .lavatorios_da_area_de_preparacao_dotados_dos_produtos_destinados_a_higiene_das_maos_sabonete_liquido_inodoro_antisseptico_ou_sabonete_liquido_inodoro_e_produto_antisseptico_toalhas_de_papel_nao_reciclado_ou_outro_sistema_higienico_e_seguro_de_secagem_das_maos *
          55.94,
        1:
          informacoes["preparo_do_alimento"]
            .durante_o_preparo_aqueles_que_manipulam_alimentos_crus_realizam_a_lavagem_e_a_antissepsia_das_maos_antes_de_manusear_alimentos_preparados *
          67.06,
        2:
          informacoes["preparo_do_alimento"]
            .produtos_pereciveis_expostos_a_temperatura_ambiente_somente_pelo_tempo_minimo_necessario_para_preparacao_do_alimento *
          58.85,
        3:
          informacoes["preparo_do_alimento"]
            .descongelamento_conduzido_conforme_orientacao_do_fabricante_e_utilizando_uma_das_seguintes_tecnicas_refrigeracao_a_temperatura_inferior_a_5C_ou_em_forno_de_micro_ondas_quando_o_alimento_for_submetido_imediatamente_a_cocao *
          88.61,
        4:
          informacoes["preparo_do_alimento"]
            .alimentos_submetidos_ao_descongelamento_mantidos_sob_refrigeracao_se_nao_fore_imediatamente_utilizados_e_nao_se_recongela *
          80.65,
        5:
          informacoes["preparo_do_alimento"]
            .tratamento_termico_garante_que_todas_as_partes_do_alimento_atinjam_a_temperatura_de_no_minimo_70C_ou_outra_combinacao_de_tempo_e_temperatura_desde_que_assegure_a_qualidade_higienico_sanitaria_dos_alimentos *
          110.25,
        6: informacoes["preparo_do_alimento"].avalia_se_a_eficacia_do_tratamento_termico * 26.64,
        7:
          informacoes["preparo_do_alimento"]
            .possuem_termometro_comprovadamente_calibrado_para_a_afericao_da_temperatura_dos_alimentos * 36.69,
        8:
          informacoes["preparo_do_alimento"]
            .apos_o_resfriamento_alimento_preparado_conservado_sob_refrigeracao_a_temperaturas_inferiores_a_5C_ou_congelado_a_temperatura_igual_ou_inferior_a_18 *
          138.67,
        9:
          informacoes["preparo_do_alimento"]
            .alimentos_consumidos_crus_quando_aplicavel_submetidos_a_processo_de_higienizacao_com_produtos_regularizados_e_aplicados_de_forma_a_evitar_a_presenca_de_residuos *
          125.76,
        10:
          informacoes["preparo_do_alimento"]
            .evita_se_o_contato_direto_ou_indireto_entre_alimentos_crus_semi_prontos_e_prontos_para_o_consumo * 105.94,
        11:
          informacoes["preparo_do_alimento"]
            .temperatura_do_alimento_preparado_no_resfriamento_reduzida_de_60C_a_10C_em_ate_2_horas * 0.02,
      },
    };

    informacoesCalculadas["armazenamento_transporte_exposicao_do_alimento_preparado"] = {
      ...informacoes["armazenamento_transporte_exposicao_do_alimento_preparado"],
      carga_fatorial_armazenamento_transporte_exposicao_do_alimento_preparado: {
        0:
          informacoes["armazenamento_transporte_exposicao_do_alimento_preparado"]
            .alimento_preparado_armazenado_identificado * 42.37,
        1:
          informacoes["armazenamento_transporte_exposicao_do_alimento_preparado"]
            .prazo_maximo_consumo_5_dias_4C_ou_inferior * 98.64,
        2:
          informacoes["armazenamento_transporte_exposicao_do_alimento_preparado"]
            .prazo_maximo_consumo_acima_4C_abaixo_5C * 73.51,
        3:
          informacoes["armazenamento_transporte_exposicao_do_alimento_preparado"]
            .manipuladores_minimizam_risco_contaminacao * 134.25,
        4:
          informacoes["armazenamento_transporte_exposicao_do_alimento_preparado"]
            .alimento_preparado_conservado_5C_ou_inferior * 139.27,
        5:
          informacoes["armazenamento_transporte_exposicao_do_alimento_preparado"].alimentos_preparados_acima_60C *
          50.96,
        6:
          informacoes["armazenamento_transporte_exposicao_do_alimento_preparado"]
            .temperatura_equipamentos_exposicao_monitorada * 27.56,
        7:
          informacoes["armazenamento_transporte_exposicao_do_alimento_preparado"]
            .alimentos_armazenados_identificados_protegidos * 127.89,
        8:
          informacoes["armazenamento_transporte_exposicao_do_alimento_preparado"]
            .armazenamento_transporte_temperatura_adequada * 132.88,
      },
    };

    informacoesCalculadas["responsabilidade_documentacao_registro"] = {
      ...informacoes["responsabilidade_documentacao_registro"],
      carga_fatorial_responsabilidade_documentacao_registro: {
        0: 0,
        1: 0,
      },
    };

    informacoesCalculadas["resultado"] = this.somarCargasFatoriais(informacoesCalculadas);
    informacoesCalculadas["classificacao"] = this.classificacao(informacoesCalculadas["resultado"]);

    const informacoesSemCargasFatoriais = {
      ...informacoes["areas_externas"],
      ...informacoes["areas_internas"],
      ...informacoes["edificacao_e_instalacoes"],
      ...informacoes["instalacoes_fisicas_pisos"],
      ...informacoes["instalacoes_fisicas_paredes"],
      ...informacoes["instalacoes_fisicas_tetos"],
      ...informacoes["portas"],
      ...informacoes["janelas_e_outras_aberturas_sistema_de_exaustao"],
      ...informacoes["ralos_e_grelhas"],
      ...informacoes["caixa_de_gordura_e_esgoto"],
      ...informacoes["iluminacao"],
      ...informacoes["instalacoes_eletricas"],
      ...informacoes["ventilacao"],
      ...informacoes["instalacoes_sanitarias_e_vestarios"],
      ...informacoes["lavatorio_area_de_manipulacao"],
      ...informacoes["equipamentos"],
      ...informacoes["utensilios"],
      ...informacoes["moveis"],
    };

    informacoesCalculadas["total_adequacoes"] = this.somaSe(informacoesSemCargasFatoriais, 1);
    informacoesCalculadas["total_aplicavel"] = this.contarValores(informacoesSemCargasFatoriais);
    informacoesCalculadas["porcentagem"] =
      (informacoesCalculadas["total_adequacoes"] / informacoesCalculadas["total_aplicavel"]) * 100;

    const informacoesConcatenadas = {
      ...informacoes,
      ...informacoesCalculadas,
    };

    return { informacoesCalculadas: informacoesConcatenadas };
  }
}
