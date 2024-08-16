export const formatarDadosListaVerificacao = (data: any, id: string) => {
  return {
    json_informacoes: {
      abastecimento_agua: {
        utiliza_se_exclusivamente_agua_potavel_para_manipulacao_de_alimentos_agua_de_abastecimento_publico_ou_solucao_alternativa_com_potabilidade_atestada_semestralmente_por_meio_de_laudos_laboratoriais:
          Number(
            data.abastecimento_agua
              .utiliza_se_exclusivamente_agua_potavel_para_manipulacao_de_alimentos_agua_de_abastecimento_publico_ou_solucao_alternativa_com_potabilidade_atestada_semestralmente_por_meio_de_laudos_laboratoriais,
          ),
        instalacoes_abastecidas_de_agua_corrente: Number(
          data.abastecimento_agua.instalacoes_abastecidas_de_agua_corrente,
        ),
        instalacoes_dispoem_de_conexoes_com_rede_de_esgoto_ou_fossa_septica: Number(
          data.abastecimento_agua.instalacoes_dispoem_de_conexoes_com_rede_de_esgoto_ou_fossa_septica,
        ),
        reservatorio_em_adequado_estado_de_higiene: Number(
          data.abastecimento_agua.reservatorio_em_adequado_estado_de_higiene,
        ),
        reservatorio_devidamente_tampado_e_conservado_livre_de_rachaduras_vazamentos_infiltracoes_descascamentos_dentre_outros_defeitos:
          Number(
            data.abastecimento_agua
              .reservatorio_devidamente_tampado_e_conservado_livre_de_rachaduras_vazamentos_infiltracoes_descascamentos_dentre_outros_defeitos,
          ),
        reservatorio_de_agua_higienizado_em_intervalo_maximo_de_seis_meses_sendo_mantidos_registros_da_operacao: Number(
          data.abastecimento_agua
            .reservatorio_de_agua_higienizado_em_intervalo_maximo_de_seis_meses_sendo_mantidos_registros_da_operacao,
        ),
        material_que_reveste_internamente_o_reservatorio_de_agua_nao_compromete_a_qualidade_da_agua: Number(
          data.abastecimento_agua
            .material_que_reveste_internamente_o_reservatorio_de_agua_nao_compromete_a_qualidade_da_agua,
        ),
      },
      estrutura: {
        instalacoes_sanitarias_possuem_lavatorios_de_maos_e_os_produtos_destinados_a_higiene_pessoal_papel_higienico_sabonete_liquido_inodoro_antisseptico_ou_sabonete_liquido_inodoro_e_antisseptico_coletores_com_tampa_e_acionados_sem_contato_manual_e_toalhas_de_papel_nao_reciclado_ou_outro_sistema_higienico_e_seguros_para_secagem_das_maos:
          Number(
            data.estrutura
              .instalacoes_sanitarias_possuem_lavatorios_de_maos_e_os_produtos_destinados_a_higiene_pessoal_papel_higienico_sabonete_liquido_inodoro_antisseptico_ou_sabonete_liquido_inodoro_e_antisseptico_coletores_com_tampa_e_acionados_sem_contato_manual_e_toalhas_de_papel_nao_reciclado_ou_outro_sistema_higienico_e_seguros_para_secagem_das_maos,
          ),
        existe_separacao_entre_as_diferentes_atividades_por_meios_fisicos_ou_por_outros_meios_eficazes_de_forma_a_evitar_a_contaminacao_cruzada:
          Number(
            data.estrutura
              .existe_separacao_entre_as_diferentes_atividades_por_meios_fisicos_ou_por_outros_meios_eficazes_de_forma_a_evitar_a_contaminacao_cruzada,
          ),
      },
      higienizacao_instalacoes_equipamentos_moveis_utensilios: {
        instalacoes_equipamentos_moveis_e_utensilios_mantidos_em_condicoes_higienico_sanitaria_adequadas: Number(
          data.higienizacao_instalacoes_equipamentos_moveis_utensilios
            .instalacoes_equipamentos_moveis_e_utensilios_mantidos_em_condicoes_higienico_sanitaria_adequadas,
        ),
        frequencia_adequada_de_higienizacao_dos_equipamentos_moveis_e_utensilios: Number(
          data.higienizacao_instalacoes_equipamentos_moveis_utensilios
            .frequencia_adequada_de_higienizacao_dos_equipamentos_moveis_e_utensilios,
        ),
        utensilios_utilizados_na_higienizacao_de_instalacoes_distintos_daqueles_usados_para_higienizacao_das_partes_dos_equipamentos_e_utensilios_que_entrem_em_contato_com_o_alimento:
          Number(
            data.higienizacao_instalacoes_equipamentos_moveis_utensilios
              .utensilios_utilizados_na_higienizacao_de_instalacoes_distintos_daqueles_usados_para_higienizacao_das_partes_dos_equipamentos_e_utensilios_que_entrem_em_contato_com_o_alimento,
          ),
        diluicao_tempo_de_contato_e_modo_de_uso_ou_aplicacao_dos_produtos_saneantes_obedece_as_instrucoes_recomendadas_pelo_fabricante:
          Number(
            data.higienizacao_instalacoes_equipamentos_moveis_utensilios
              .diluicao_tempo_de_contato_e_modo_de_uso_ou_aplicacao_dos_produtos_saneantes_obedece_as_instrucoes_recomendadas_pelo_fabricante,
          ),
        produtos_saneantes_regularizados_pelo_ministerio_da_saude: Number(
          data.higienizacao_instalacoes_equipamentos_moveis_utensilios
            .produtos_saneantes_regularizados_pelo_ministerio_da_saude,
        ),
        areas_de_preparacao_higienizadas_quantas_vezes_fore_menecessarias_e_imediatamente_apos_o_termino_do_trabalho:
          Number(
            data.higienizacao_instalacoes_equipamentos_moveis_utensilios
              .areas_de_preparacao_higienizadas_quantas_vezes_fore_menecessarias_e_imediatamente_apos_o_termino_do_trabalho,
          ),
      },
      controle_integrado_de_vetores_e_pragas_urbanas: {
        controle_de_vetores_e_pragas_urbanas_executados_por_empresa_especializada_devidamente_regularizada: Number(
          data.controle_integrado_de_vetores_e_pragas_urbanas
            .controle_de_vetores_e_pragas_urbanas_executados_por_empresa_especializada_devidamente_regularizada,
        ),
        existencia_de_um_conjunto_de_acoes_eficazes_e_continua_com_o_objetivo_de_impedir_a_atracao_o_abrigo_o_acesso_e_ou_proliferacao_de_vetores_e_pragas_urbanas:
          Number(
            data.controle_integrado_de_vetores_e_pragas_urbanas
              .existencia_de_um_conjunto_de_acoes_eficazes_e_continua_com_o_objetivo_de_impedir_a_atracao_o_abrigo_o_acesso_e_ou_proliferacao_de_vetores_e_pragas_urbanas,
          ),
        edificacoes_instalacoes_equipamentos_moveis_e_utensilios_livres_da_presenca_de_animais_incluindo_vetores_e_pragas_urbanas:
          Number(
            data.controle_integrado_de_vetores_e_pragas_urbanas
              .edificacoes_instalacoes_equipamentos_moveis_e_utensilios_livres_da_presenca_de_animais_incluindo_vetores_e_pragas_urbanas,
          ),
      },
      manipuladores: {
        os_manipuladores_sao_afastados_da_preparacao_de_alimentos_quando_apresentam_lesoes_e_ou_sintomas_de_enfermidades:
          Number(
            data.manipuladores
              .os_manipuladores_sao_afastados_da_preparacao_de_alimentos_quando_apresentam_lesoes_e_ou_sintomas_de_enfermidades,
          ),
        lavam_cuidadosamente_as_maos_ao_chegar_ao_trabalho_antes_e_apos_manipular_o_alimento_apos_qualquer_interrupcao_do_servico_apos_tocar_materiais_contaminados_apos_usar_os_sanitarios_e_sempre_que_se_fizer_necessario:
          Number(
            data.manipuladores
              .lavam_cuidadosamente_as_maos_ao_chegar_ao_trabalho_antes_e_apos_manipular_o_alimento_apos_qualquer_interrupcao_do_servico_apos_tocar_materiais_contaminados_apos_usar_os_sanitarios_e_sempre_que_se_fizer_necessario,
          ),
        nao_fumam_e_falam_quando_desnecessario_cantam_assobiam_espirram_cospem_tossem_comem_manipulam_dinheiro_ou_praticam_outros_atos_que_possam_contaminar_o_alimento_durante_o_desempenho_das_atividades:
          Number(
            data.manipuladores
              .nao_fumam_e_falam_quando_desnecessario_cantam_assobiam_espirram_cospem_tossem_comem_manipulam_dinheiro_ou_praticam_outros_atos_que_possam_contaminar_o_alimento_durante_o_desempenho_das_atividades,
          ),
      },
      materia_prima_ingredientes_embalagens: {
        submetidos_a_inspecao_e_aprovacao_na_recepcao: Number(
          data.materia_prima_ingredientes_embalagens.submetidos_a_inspecao_e_aprovacao_na_recepcao,
        ),
        materias_primas_ingredientes_e_embalagens_utilizados_para_preparacao_em_condicoes_higienico_sanitarias_adequadas:
          Number(
            data.materia_prima_ingredientes_embalagens
              .materias_primas_ingredientes_e_embalagens_utilizados_para_preparacao_em_condicoes_higienico_sanitarias_adequadas,
          ),
        embalagens_primarias_das_materias_primas_e_dos_ingredientes_integras: Number(
          data.materia_prima_ingredientes_embalagens
            .embalagens_primarias_das_materias_primas_e_dos_ingredientes_integras,
        ),
        utilizacao_das_materias_primas_e_ingredientes_respeita_o_prazo_de_validade_ou_se_observa_a_ordem_de_entrada:
          Number(
            data.materia_prima_ingredientes_embalagens
              .utilizacao_das_materias_primas_e_ingredientes_respeita_o_prazo_de_validade_ou_se_observa_a_ordem_de_entrada,
          ),
        materias_primas_fracionadas_adequadamente_acondicionadas_e_identificadas_com_no_minimo_as_seguintes_informacoes_designacao_do_produto_data_de_fracionamento_e_prazo_de_validade_apos_abertura_ou_retirada_da_embalagem_original:
          Number(
            data.materia_prima_ingredientes_embalagens
              .materias_primas_fracionadas_adequadamente_acondicionadas_e_identificadas_com_no_minimo_as_seguintes_informacoes_designacao_do_produto_data_de_fracionamento_e_prazo_de_validade_apos_abertura_ou_retirada_da_embalagem_original,
          ),
        temperatura_das_materias_primas_e_ingredientes_pereciveis_verificada_na_recepcao_e_no_armazenamento: Number(
          data.materia_prima_ingredientes_embalagens
            .temperatura_das_materias_primas_e_ingredientes_pereciveis_verificada_na_recepcao_e_no_armazenamento,
        ),
        gelo_utilizado_em_alimentos_fabricado_a_partir_de_agua_potavel_e_mantido_em_condicao_higienico_sanitaria:
          Number(
            data.materia_prima_ingredientes_embalagens
              .gelo_utilizado_em_alimentos_fabricado_a_partir_de_agua_potavel_e_mantido_em_condicao_higienico_sanitaria,
          ),
      },
      preparo_do_alimento: {
        lavatorios_da_area_de_preparacao_dotados_dos_produtos_destinados_a_higiene_das_maos_sabonete_liquido_inodoro_antisseptico_ou_sabonete_liquido_inodoro_e_produto_antisseptico_toalhas_de_papel_nao_reciclado_ou_outro_sistema_higienico_e_seguro_de_secagem_das_maos:
          Number(
            data.preparo_do_alimento
              .lavatorios_da_area_de_preparacao_dotados_dos_produtos_destinados_a_higiene_das_maos_sabonete_liquido_inodoro_antisseptico_ou_sabonete_liquido_inodoro_e_produto_antisseptico_toalhas_de_papel_nao_reciclado_ou_outro_sistema_higienico_e_seguro_de_secagem_das_maos,
          ),
        durante_o_preparo_aqueles_que_manipulam_alimentos_crus_realizam_a_lavagem_e_a_antissepsia_das_maos_antes_de_manusear_alimentos_preparados:
          Number(
            data.preparo_do_alimento
              .durante_o_preparo_aqueles_que_manipulam_alimentos_crus_realizam_a_lavagem_e_a_antissepsia_das_maos_antes_de_manusear_alimentos_preparados,
          ),
        produtos_pereciveis_expostos_a_temperatura_ambiente_somente_pelo_tempo_minimo_necessario_para_preparacao_do_alimento:
          Number(
            data.preparo_do_alimento
              .produtos_pereciveis_expostos_a_temperatura_ambiente_somente_pelo_tempo_minimo_necessario_para_preparacao_do_alimento,
          ),
        descongelamento_conduzido_conforme_orientacao_do_fabricante_e_utilizando_uma_das_seguintes_tecnicas_refrigeracao_a_temperatura_inferior_a_5C_ou_em_forno_de_micro_ondas_quando_o_alimento_for_submetido_imediatamente_a_cocao:
          Number(
            data.preparo_do_alimento
              .descongelamento_conduzido_conforme_orientacao_do_fabricante_e_utilizando_uma_das_seguintes_tecnicas_refrigeracao_a_temperatura_inferior_a_5C_ou_em_forno_de_micro_ondas_quando_o_alimento_for_submetido_imediatamente_a_cocao,
          ),
        alimentos_submetidos_ao_descongelamento_mantidos_sob_refrigeracao_se_nao_fore_imediatamente_utilizados_e_nao_se_recongela:
          Number(
            data.preparo_do_alimento
              .alimentos_submetidos_ao_descongelamento_mantidos_sob_refrigeracao_se_nao_fore_imediatamente_utilizados_e_nao_se_recongela,
          ),
        tratamento_termico_garante_que_todas_as_partes_do_alimento_atinjam_a_temperatura_de_no_minimo_70C_ou_outra_combinacao_de_tempo_e_temperatura_desde_que_assegure_a_qualidade_higienico_sanitaria_dos_alimentos:
          Number(
            data.preparo_do_alimento
              .tratamento_termico_garante_que_todas_as_partes_do_alimento_atinjam_a_temperatura_de_no_minimo_70C_ou_outra_combinacao_de_tempo_e_temperatura_desde_que_assegure_a_qualidade_higienico_sanitaria_dos_alimentos,
          ),
        avalia_se_a_eficacia_do_tratamento_termico: Number(
          data.preparo_do_alimento.avalia_se_a_eficacia_do_tratamento_termico,
        ),
        possuem_termometro_comprovadamente_calibrado_para_a_afericao_da_temperatura_dos_alimentos: Number(
          data.preparo_do_alimento
            .possuem_termometro_comprovadamente_calibrado_para_a_afericao_da_temperatura_dos_alimentos,
        ),
        apos_o_resfriamento_alimento_preparado_conservado_sob_refrigeracao_a_temperaturas_inferiores_a_5C_ou_congelado_a_temperatura_igual_ou_inferior_a_18:
          Number(
            data.preparo_do_alimento
              .apos_o_resfriamento_alimento_preparado_conservado_sob_refrigeracao_a_temperaturas_inferiores_a_5C_ou_congelado_a_temperatura_igual_ou_inferior_a_18,
          ),
        alimentos_consumidos_crus_quando_aplicavel_submetidos_a_processo_de_higienizacao_com_produtos_regularizados_e_aplicados_de_forma_a_evitar_a_presenca_de_residuos:
          Number(
            data.preparo_do_alimento
              .alimentos_consumidos_crus_quando_aplicavel_submetidos_a_processo_de_higienizacao_com_produtos_regularizados_e_aplicados_de_forma_a_evitar_a_presenca_de_residuos,
          ),
        evita_se_o_contato_direto_ou_indireto_entre_alimentos_crus_semi_prontos_e_prontos_para_o_consumo: Number(
          data.preparo_do_alimento
            .evita_se_o_contato_direto_ou_indireto_entre_alimentos_crus_semi_prontos_e_prontos_para_o_consumo,
        ),
        temperatura_do_alimento_preparado_no_resfriamento_reduzida_de_60C_a_10C_em_ate_2_horas: Number(
          data.preparo_do_alimento
            .temperatura_do_alimento_preparado_no_resfriamento_reduzida_de_60C_a_10C_em_ate_2_horas,
        ),
      },
      armazenamento_transporte_exposicao_do_alimento_preparado: {
        alimento_preparado_armazenado_identificado: Number(
          data.armazenamento_transporte_exposicao_do_alimento_preparado.alimento_preparado_armazenado_identificado,
        ),
        prazo_maximo_consumo_5_dias_4C_ou_inferior: Number(
          data.armazenamento_transporte_exposicao_do_alimento_preparado.prazo_maximo_consumo_5_dias_4C_ou_inferior,
        ),
        prazo_maximo_consumo_acima_4C_abaixo_5C: Number(
          data.armazenamento_transporte_exposicao_do_alimento_preparado.prazo_maximo_consumo_acima_4C_abaixo_5C,
        ),
        manipuladores_minimizam_risco_contaminacao: Number(
          data.armazenamento_transporte_exposicao_do_alimento_preparado.manipuladores_minimizam_risco_contaminacao,
        ),
        alimento_preparado_conservado_5C_ou_inferior: Number(
          data.armazenamento_transporte_exposicao_do_alimento_preparado.alimento_preparado_conservado_5C_ou_inferior,
        ),
        alimentos_preparados_acima_60C: Number(
          data.armazenamento_transporte_exposicao_do_alimento_preparado.alimentos_preparados_acima_60C,
        ),
        temperatura_equipamentos_exposicao_monitorada: Number(
          data.armazenamento_transporte_exposicao_do_alimento_preparado.temperatura_equipamentos_exposicao_monitorada,
        ),
        alimentos_armazenados_identificados_protegidos: Number(
          data.armazenamento_transporte_exposicao_do_alimento_preparado.alimentos_armazenados_identificados_protegidos,
        ),
        armazenamento_transporte_temperatura_adequada: Number(
          data.armazenamento_transporte_exposicao_do_alimento_preparado.armazenamento_transporte_temperatura_adequada,
        ),
      },
      responsabilidade_documentacao_registro: {
        possui_um_responsavel_pelas_atividades_de_manipulacao_de_alimentos_responsavel_tecnico_proprietario_ou_funcionario_designado_devidamente_capacitado:
          Number(
            data.responsabilidade_documentacao_registro
              .possui_um_responsavel_pelas_atividades_de_manipulacao_de_alimentos_responsavel_tecnico_proprietario_ou_funcionario_designado_devidamente_capacitado,
          ),
        empresa_segue_o_manual_de_boas_praticas_e_os_procedimentos_operacionais_padronizados: Number(
          data.responsabilidade_documentacao_registro
            .empresa_segue_o_manual_de_boas_praticas_e_os_procedimentos_operacionais_padronizados,
        ),
      },
      areas_externas: {
        livres_de_objetos_em_desuso_ou_estranhos_ao_ambiente: Number(
          data.areas_externas.livres_de_objetos_em_desuso_ou_estranhos_ao_ambiente,
        ),
      },
      areas_internas: {
        livres_de_objetos_em_desuso_ou_estranhos_ao_ambiente: Number(
          data.areas_internas.livres_de_objetos_em_desuso_ou_estranhos_ao_ambiente,
        ),
      },
      edificacao_e_instalacoes: {
        projetadas_de_forma_a_possibilitar_um_fluxo_ordenado_e_sem_cruzamentos_em_todas_as_etapas_de_preparacao_de_alimentos:
          Number(
            data.edificacao_e_instalacoes
              .projetadas_de_forma_a_possibilitar_um_fluxo_ordenado_e_sem_cruzamentos_em_todas_as_etapas_de_preparacao_de_alimentos,
          ),
        projetadas_para_facilitar_as_operacoes_de_manutencao_limpeza_e_quando_for_o_caso_desinfeccao: Number(
          data.edificacao_e_instalacoes
            .projetadas_para_facilitar_as_operacoes_de_manutencao_limpeza_e_quando_for_o_caso_desinfeccao,
        ),
        acesso_as_instalacoes_independente_e_nao_comum_a_outros_usos: Number(
          data.edificacao_e_instalacoes.acesso_as_instalacoes_independente_e_nao_comum_a_outros_usos,
        ),
        existe_controle_do_acesso_de_pessoal: Number(
          data.edificacao_e_instalacoes.existe_controle_do_acesso_de_pessoal,
        ),
        dimensionamento_compativel_com_todas_as_operacoes: Number(
          data.edificacao_e_instalacoes.dimensionamento_compativel_com_todas_as_operacoes,
        ),
        existe_separacao_entre_as_diferentes_atividades_por_meios_fisicos_ou_por_outros_meios_eficazes_de_forma_a_evitar_a_contaminacao_cruzada:
          Number(
            data.edificacao_e_instalacoes
              .existe_separacao_entre_as_diferentes_atividades_por_meios_fisicos_ou_por_outros_meios_eficazes_de_forma_a_evitar_a_contaminacao_cruzada,
          ),
      },
      instalacoes_fisicas_pisos: {
        possuem_revestimentos_lisos_impermeaveis_e_lavaveis: Number(
          data.instalacoes_fisicas_pisos.possuem_revestimentos_lisos_impermeaveis_e_lavaveis,
        ),
        em_adequado_estado_de_conservacao_livres_de_rachaduras_trincas_buracos_e_outros_defeitos: Number(
          data.instalacoes_fisicas_pisos
            .em_adequado_estado_de_conservacao_livres_de_rachaduras_trincas_buracos_e_outros_defeitos,
        ),
      },
      instalacoes_fisicas_paredes: {
        possuem_revestimentos_lisos_impermeaveis_e_lavaveis: Number(
          data.instalacoes_fisicas_paredes.possuem_revestimentos_lisos_impermeaveis_e_lavaveis,
        ),
        em_adequado_estado_de_conservacao_livres_de_rachaduras_trincas_infiltracoes_bolores_descascamentos_dentre_outros_defeitos:
          Number(
            data.instalacoes_fisicas_paredes
              .em_adequado_estado_de_conservacao_livres_de_rachaduras_trincas_infiltracoes_bolores_descascamentos_dentre_outros_defeitos,
          ),
      },
      instalacoes_fisicas_tetos: {
        possuem_revestimentos_lisos_impermeaveis_e_lavaveis: Number(
          data.instalacoes_fisicas_tetos.possuem_revestimentos_lisos_impermeaveis_e_lavaveis,
        ),
        teto_da_area_de_manipulacao_e_armazenamento_de_alimentos_mantido_em_adequado_estado_de_conservacao_livre_de_goteiras_vazamentos_infiltracoes_bolores_descascamentos_dentre_outros_defeitos:
          Number(
            data.instalacoes_fisicas_tetos
              .teto_da_area_de_manipulacao_e_armazenamento_de_alimentos_mantido_em_adequado_estado_de_conservacao_livre_de_goteiras_vazamentos_infiltracoes_bolores_descascamentos_dentre_outros_defeitos,
          ),
        teto_das_demais_areas_mantido_em_adequado_estado_de_conservacao_livre_de_goteiras_vazamentos_infiltracoes_bolores_descascamentos_dentre_outros_defeitos:
          Number(
            data.instalacoes_fisicas_tetos
              .teto_das_demais_areas_mantido_em_adequado_estado_de_conservacao_livre_de_goteiras_vazamentos_infiltracoes_bolores_descascamentos_dentre_outros_defeitos,
          ),
      },
      portas: {
        portas_mantidas_ajustadas_aos_batentes_bem_fechadas_e_vedadas: Number(
          data.portas.portas_mantidas_ajustadas_aos_batentes_bem_fechadas_e_vedadas,
        ),
        portas_da_area_de_preparacao_e_armazenamento_possuem_fechamento_automatico: Number(
          data.portas.portas_da_area_de_preparacao_e_armazenamento_possuem_fechamento_automatico,
        ),
        portas_externas_na_area_de_preparacao_e_armazenamento_providas_de_telas_milimetradas_limpas_em_bom_estado_de_conservacao_e_ajustadas_aos_batentes:
          Number(
            data.portas
              .portas_externas_na_area_de_preparacao_e_armazenamento_providas_de_telas_milimetradas_limpas_em_bom_estado_de_conservacao_e_ajustadas_aos_batentes,
          ),
        telas_removiveis_para_facilitar_a_limpeza_periodica: Number(
          data.portas.telas_removiveis_para_facilitar_a_limpeza_periodica,
        ),
      },
      janelas_e_outras_aberturas_sistema_de_exaustao: {
        janelas_mantidas_ajustadas_aos_batentes_bem_fechadas_e_vedadas: Number(
          data.janelas_e_outras_aberturas_sistema_de_exaustao
            .janelas_mantidas_ajustadas_aos_batentes_bem_fechadas_e_vedadas,
        ),
        area_de_preparacao_e_armazenamento_providas_de_telas_milimetradas_limpas_em_bom_estado_de_conservacao_e_ajustadas_aos_batentes:
          Number(
            data.janelas_e_outras_aberturas_sistema_de_exaustao
              .area_de_preparacao_e_armazenamento_providas_de_telas_milimetradas_limpas_em_bom_estado_de_conservacao_e_ajustadas_aos_batentes,
          ),
        telas_removiveis_para_facilitar_a_limpeza_periodica: Number(
          data.janelas_e_outras_aberturas_sistema_de_exaustao.telas_removiveis_para_facilitar_a_limpeza_periodica,
        ),
      },
      ralos_e_grelhas: {
        ralos_sifonados_quando_presentes: Number(data.ralos_e_grelhas.ralos_sifonados_quando_presentes),
        quando_presentes_as_grelhas_possuem_dispositivo_de_fechamento: Number(
          data.ralos_e_grelhas.quando_presentes_as_grelhas_possuem_dispositivo_de_fechamento,
        ),
      },
      caixa_de_gordura_e_esgoto: {
        possuem_dimensao_compativel_ao_volume_de_residuos: Number(
          data.caixa_de_gordura_e_esgoto.possuem_dimensao_compativel_ao_volume_de_residuos,
        ),
        localizadas_fora_da_area_de_preparacao_e_armazenamento_de_alimentos: Number(
          data.caixa_de_gordura_e_esgoto.localizadas_fora_da_area_de_preparacao_e_armazenamento_de_alimentos,
        ),
        apresentam_adequado_estado_de_conservacao_e_funcionamento: Number(
          data.caixa_de_gordura_e_esgoto.apresentam_adequado_estado_de_conservacao_e_funcionamento,
        ),
      },
      iluminacao: {
        iluminacao_da_area_de_preparacao_proporciona_a_visualizacao_adequada: Number(
          data.iluminacao.iluminacao_da_area_de_preparacao_proporciona_a_visualizacao_adequada,
        ),
        luminarias_localizadas_sobre_a_area_de_preparacao_dos_alimentos_apropriadas_e_protegidas_contra_explosao_e_quedas_acidentais:
          Number(
            data.iluminacao
              .luminarias_localizadas_sobre_a_area_de_preparacao_dos_alimentos_apropriadas_e_protegidas_contra_explosao_e_quedas_acidentais,
          ),
      },
      instalacoes_eletricas: {
        embutidas_ou_protegidas_em_tubulacoes_externas: Number(
          data.instalacoes_eletricas.embutidas_ou_protegidas_em_tubulacoes_externas,
        ),
        integrais_possibilitando_a_higienizacao_dos_ambientes: Number(
          data.instalacoes_eletricas.integrais_possibilitando_a_higienizacao_dos_ambientes,
        ),
      },
      ventilacao: {
        garante_a_renovacao_do_ar_e_a_manutencao_do_ambiente_em_condicoes_que_nao_comprometam_a_qualidade_higienico_sanitaria_do_alimento_livre_de_fungos_fumaca_pos_condensacao_de_vapores:
          Number(
            data.ventilacao
              .garante_a_renovacao_do_ar_e_a_manutencao_do_ambiente_em_condicoes_que_nao_comprometam_a_qualidade_higienico_sanitaria_do_alimento_livre_de_fungos_fumaca_pos_condensacao_de_vapores,
          ),
        adequado_fluxo_de_ar_nao_incide_diretamente_sobre_os_alimentos: Number(
          data.ventilacao.adequado_fluxo_de_ar_nao_incide_diretamente_sobre_os_alimentos,
        ),
        fluxo_de_ar_nao_circula_de_areas_contaminadas_para_areas_limpas: Number(
          data.ventilacao.fluxo_de_ar_nao_circula_de_areas_contaminadas_para_areas_limpas,
        ),
        equipamentos_e_os_filtros_para_climatizacao_bem_conservados: Number(
          data.ventilacao.equipamentos_e_os_filtros_para_climatizacao_bem_conservados,
        ),
        realiza_se_limpeza_dos_componentes_do_sistema_de_climatizacao_a_troca_de_filtros_e_a_manutencao_programada_e_periodica_destes_equipamentos:
          Number(
            data.ventilacao
              .realiza_se_limpeza_dos_componentes_do_sistema_de_climatizacao_a_troca_de_filtros_e_a_manutencao_programada_e_periodica_destes_equipamentos,
          ),
        existe_registro_da_limpeza_dos_componentes_dos_sistemas_de_climatizacao_da_troca_de_filtros_e_da_manutencao_programada_e_periodica_destes_equipamentos:
          Number(
            data.ventilacao
              .existe_registro_da_limpeza_dos_componentes_dos_sistemas_de_climatizacao_da_troca_de_filtros_e_da_manutencao_programada_e_periodica_destes_equipamentos,
          ),
      },
      instalacoes_sanitarias_e_vestarios: {
        localizados_sem_comunicacao_direta_com_a_area_de_preparacao_e_armazenamento: Number(
          data.instalacoes_sanitarias_e_vestarios
            .localizados_sem_comunicacao_direta_com_a_area_de_preparacao_e_armazenamento,
        ),
        mantidos_organizados_limpos_e_em_adequado_estado_de_conservacao: Number(
          data.instalacoes_sanitarias_e_vestarios.mantidos_organizados_limpos_e_em_adequado_estado_de_conservacao,
        ),
        portas_externas_com_fechamento_automatico: Number(
          data.instalacoes_sanitarias_e_vestarios.portas_externas_com_fechamento_automatico,
        ),
        instalacoes_sanitarias_possuem_lavatorios_de_maos_e_os_produtos_destinados_a_higiene_pessoal: Number(
          data.instalacoes_sanitarias_e_vestarios
            .instalacoes_sanitarias_possuem_lavatorios_de_maos_e_os_produtos_destinados_a_higiene_pessoal,
        ),
      },
      lavatorio_area_de_manipulacao: {
        existe_lavatorio_exclusivo_para_a_higiene_das_maos_na_area_de_manipulacao_em_posicoes_estrategicas_em_relacao_ao_fluxo_de_preparo:
          Number(
            data.lavatorio_area_de_manipulacao
              .existe_lavatorio_exclusivo_para_a_higiene_das_maos_na_area_de_manipulacao_em_posicoes_estrategicas_em_relacao_ao_fluxo_de_preparo,
          ),
        em_numero_suficiente_de_modo_a_atender_toda_a_area_de_preparacao: Number(
          data.lavatorio_area_de_manipulacao.em_numero_suficiente_de_modo_a_atender_toda_a_area_de_preparacao,
        ),
        possuem_sabonete_liquido_inodoro_antisseptico_ou_sabonete_liquido_inodoro_e_produto_antisseptico_toalhas_de_papel_nao_reciclado_ou_outro_sistema_higienico_e_seguro_de_secagem_das_maos:
          Number(
            data.lavatorio_area_de_manipulacao
              .possuem_sabonete_liquido_inodoro_antisseptico_ou_sabonete_liquido_inodoro_e_produto_antisseptico_toalhas_de_papel_nao_reciclado_ou_outro_sistema_higienico_e_seguro_de_secagem_das_maos,
          ),
        possuem_coletores_de_papel_acionados_sem_contato_manual: Number(
          data.lavatorio_area_de_manipulacao.possuem_coletores_de_papel_acionados_sem_contato_manual,
        ),
      },
      equipamentos: {
        equipamentos_que_entram_em_contato_com_alimentos_de_materiais_que_nao_transmitam_substancias_toxicas_odores_nem_sabores_aos_alimentos:
          Number(
            data.equipamentos
              .equipamentos_que_entram_em_contato_com_alimentos_de_materiais_que_nao_transmitam_substancias_toxicas_odores_nem_sabores_aos_alimentos,
          ),
        mantidos_em_adequado_estado_de_conservacao_resistentes_a_corrosao_e_a_repetidas_operacoes_de_limpeza_e_desinfeccao:
          Number(
            data.equipamentos
              .mantidos_em_adequado_estado_de_conservacao_resistentes_a_corrosao_e_a_repetidas_operacoes_de_limpeza_e_desinfeccao,
          ),
        equipamentos_utilizados_na_preparacao_embalagem_armazenamento_transporte_distribuicao_e_exposicao_a_venda_dos_alimentos_possuem_as_superficies_lisas_impermeaveis_lavaveis_e_isentas_de_rugosidades_frestas_e_outras_imperfeicoes:
          Number(
            data.equipamentos
              .equipamentos_utilizados_na_preparacao_embalagem_armazenamento_transporte_distribuicao_e_exposicao_a_venda_dos_alimentos_possuem_as_superficies_lisas_impermeaveis_lavaveis_e_isentas_de_rugosidades_frestas_e_outras_imperfeicoes,
          ),
        realizam_se_manutencoes_programadas_e_periodicas_bem_como_o_registro_dessa_operacao: Number(
          data.equipamentos.realizam_se_manutencoes_programadas_e_periodicas_bem_como_o_registro_dessa_operacao,
        ),
        possuem_termometro_comprovadamente_calibrado_para_a_afericao_da_temperatura_dos_alimentos: Number(
          data.equipamentos.possuem_termometro_comprovadamente_calibrado_para_a_afericao_da_temperatura_dos_alimentos,
        ),
      },
      utensilios: {
        utensilios_que_entram_em_contato_com_alimentos_de_materiais_que_nao_transmitam_substancias_toxicas_odores_nem_sabores_aos_alimentos:
          Number(
            data.utensilios
              .utensilios_que_entram_em_contato_com_alimentos_de_materiais_que_nao_transmitam_substancias_toxicas_odores_nem_sabores_aos_alimentos,
          ),
        mantidos_em_adequado_estado_de_conservacao_resistentes_a_corrosao_e_a_repetidas_operacoes_de_limpeza_e_desinfeccao:
          Number(
            data.utensilios
              .mantidos_em_adequado_estado_de_conservacao_resistentes_a_corrosao_e_a_repetidas_operacoes_de_limpeza_e_desinfeccao,
          ),
        utensilios_utilizados_na_preparacao_embalagem_armazenamento_transporte_distribuicao_e_exposicao_a_venda_dos_alimentos_possuem_as_superficies_lisas_impermeaveis_lavaveis_e_isentas_de_rugosidades_frestas_e_outras_imperfeicoes:
          Number(
            data.utensilios
              .utensilios_utilizados_na_preparacao_embalagem_armazenamento_transporte_distribuicao_e_exposicao_a_venda_dos_alimentos_possuem_as_superficies_lisas_impermeaveis_lavaveis_e_isentas_de_rugosidades_frestas_e_outras_imperfeicoes,
          ),
      },
      moveis: {
        moveis_que_entram_em_contato_com_alimentos_de_materiais_que_nao_transmitam_substancias_toxicas_odores_nem_sabores_aos_alimentos:
          Number(
            data.moveis
              .moveis_que_entram_em_contato_com_alimentos_de_materiais_que_nao_transmitam_substancias_toxicas_odores_nem_sabores_aos_alimentos,
          ),
        mantidos_em_adequado_estado_de_conservacao_resistentes_a_corrosao_e_a_repetidas_operacoes_de_limpeza_e_desinfeccao:
          Number(
            data.moveis
              .mantidos_em_adequado_estado_de_conservacao_resistentes_a_corrosao_e_a_repetidas_operacoes_de_limpeza_e_desinfeccao,
          ),
        moveis_utilizados_na_preparacao_embalagem_armazenamento_transporte_distribuicao_e_exposicao_a_venda_dos_alimentos_possuem_as_superficies_lisas_impermeaveis_lavaveis_e_isentas_de_rugosidades_frestas_e_outras_imperfeicoes:
          Number(
            data.moveis
              .moveis_utilizados_na_preparacao_embalagem_armazenamento_transporte_distribuicao_e_exposicao_a_venda_dos_alimentos_possuem_as_superficies_lisas_impermeaveis_lavaveis_e_isentas_de_rugosidades_frestas_e_outras_imperfeicoes,
          ),
      },
    },
    id_avaliacao: id,
  };
};
