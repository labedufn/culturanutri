export class CalcularAnaliseQualitativaService {
  private calcularEscore(...valores: number[]): number {
    const numerosValidos = valores.filter((val) => typeof val === "number" && !isNaN(val));

    if (numerosValidos.length === 0) {
      throw new Error("Nenhum valor numérico válido fornecido.");
    }

    const soma = numerosValidos.reduce((acc, val) => acc + val, 0);
    const media = soma / numerosValidos.length;

    return parseFloat(media.toFixed(1));
  }

  async execute(informacoes: any) {
    const informacoesCalculadas: object = {};
    try {
      informacoesCalculadas["lideranca"] = {
        gerentes_fornecem_assistencia_orientacao_seguranca_alimentos: {
          valor: informacoes["lideranca"].gerentes_fornecem_assistencia_orientacao_seguranca_alimentos.valor,
          escore: this.calcularEscore(
            informacoes["lideranca"].gerentes_fornecem_assistencia_orientacao_seguranca_alimentos.valor,
            informacoes["lideranca"].gerentes_presentes_area_producao_manuseio_alimentos.valor,
          ),
        },
        gerentes_presentes_area_producao_manuseio_alimentos: {
          valor: informacoes["lideranca"].gerentes_presentes_area_producao_manuseio_alimentos.valor,
          escore: this.calcularEscore(
            informacoes["lideranca"].gerentes_presentes_area_producao_manuseio_alimentos.valor,
            informacoes["lideranca"].gerentes_elogiam_manipuladores_praticas_seguras_manipulacao_alimentos.valor,
          ),
        },
        gerentes_elogiam_manipuladores_praticas_seguras_manipulacao_alimentos: {
          valor: informacoes["lideranca"].gerentes_elogiam_manipuladores_praticas_seguras_manipulacao_alimentos.valor,
          escore: this.calcularEscore(
            informacoes["lideranca"].gerentes_elogiam_manipuladores_praticas_seguras_manipulacao_alimentos.valor,
            informacoes["lideranca"].gerentes_promovem_reconhecimento.valor,
          ),
        },
        gerentes_promovem_reconhecimento: {
          valor: informacoes["lideranca"].gerentes_promovem_reconhecimento.valor,
          escore: this.calcularEscore(
            informacoes["lideranca"].gerentes_elogiam_manipuladores_praticas_seguras_manipulacao_alimentos.valor,
            informacoes["lideranca"].gerentes_promovem_reconhecimento.valor,
          ),
        },
        gerentes_comprometidos_organizacao_seguranca_alimentos: {
          valor: informacoes["lideranca"].gerentes_comprometidos_organizacao_seguranca_alimentos.valor,
          escore: this.calcularEscore(
            informacoes["lideranca"].gerentes_comprometidos_organizacao_seguranca_alimentos.valor,
            informacoes["lideranca"].comportamento_gerentes_consistente_praticas_seguras.valor,
          ),
        },
        comportamento_gerentes_consistente_praticas_seguras: {
          valor: informacoes["lideranca"].comportamento_gerentes_consistente_praticas_seguras.valor,
          escore: this.calcularEscore(
            informacoes["lideranca"].gerentes_comprometidos_organizacao_seguranca_alimentos.valor,
            informacoes["lideranca"].comportamento_gerentes_consistente_praticas_seguras.valor,
          ),
        },
        gerentes_trabalham_politicas_sistemas_processos_alinhados_seguranca_alimentos: {
          valor:
            informacoes["lideranca"].gerentes_trabalham_politicas_sistemas_processos_alinhados_seguranca_alimentos
              .valor,
        },
      };
      informacoesCalculadas["comunicacao"] = {
        instrucoes_corretas_comunicadas_vertical_horizontal: {
          valor: informacoes["comunicacao"].instrucoes_corretas_comunicadas_vertical_horizontal.valor,
          escore: this.calcularEscore(
            informacoes["comunicacao"].instrucoes_corretas_comunicadas_vertical_horizontal.valor,
            informacoes["comunicacao"].instrucoes_consideram_nivel_educacional_manipuladores.valor,
          ),
        },
        instrucoes_consideram_nivel_educacional_manipuladores: {
          valor: informacoes["comunicacao"].instrucoes_consideram_nivel_educacional_manipuladores.valor,
          escore: this.calcularEscore(
            informacoes["comunicacao"].instrucoes_corretas_comunicadas_vertical_horizontal.valor,
            informacoes["comunicacao"].instrucoes_consideram_nivel_educacional_manipuladores.valor,
          ),
        },
        manipuladores_ficam_avontade_comunicar_acoes_erradas_perguntar: {
          valor: informacoes["comunicacao"].manipuladores_ficam_avontade_comunicar_acoes_erradas_perguntar.valor,
          escore: this.calcularEscore(
            informacoes["comunicacao"].manipuladores_ficam_avontade_comunicar_acoes_erradas_perguntar.valor,
            informacoes["comunicacao"].manipuladores_ficam_avontade_opinar_melhorar_seguranca_alimentos.valor,
            informacoes["comunicacao"]
              .manipuladores_ficam_avontade_avisar_falta_produtos_higiene_quebra_equipamentos_falta_utensilios.valor,
          ),
        },
        manipuladores_ficam_avontade_opinar_melhorar_seguranca_alimentos: {
          valor: informacoes["comunicacao"].manipuladores_ficam_avontade_opinar_melhorar_seguranca_alimentos.valor,
          escore: this.calcularEscore(
            informacoes["comunicacao"].manipuladores_ficam_avontade_comunicar_acoes_erradas_perguntar.valor,
            informacoes["comunicacao"].manipuladores_ficam_avontade_opinar_melhorar_seguranca_alimentos.valor,
            informacoes["comunicacao"]
              .manipuladores_ficam_avontade_avisar_falta_produtos_higiene_quebra_equipamentos_falta_utensilios.valor,
          ),
        },
        manipuladores_ficam_avontade_avisar_falta_produtos_higiene_quebra_equipamentos_falta_utensilios: {
          valor:
            informacoes["comunicacao"]
              .manipuladores_ficam_avontade_avisar_falta_produtos_higiene_quebra_equipamentos_falta_utensilios.valor,
          escore: this.calcularEscore(
            informacoes["comunicacao"].manipuladores_ficam_avontade_comunicar_acoes_erradas_perguntar.valor,
            informacoes["comunicacao"].manipuladores_ficam_avontade_opinar_melhorar_seguranca_alimentos.valor,
            informacoes["comunicacao"]
              .manipuladores_ficam_avontade_avisar_falta_produtos_higiene_quebra_equipamentos_falta_utensilios.valor,
          ),
        },
        instrucoes_visuais_area_producao: {
          valor: informacoes["comunicacao"].instrucoes_visuais_area_producao.valor,
          escore: this.calcularEscore(
            informacoes["comunicacao"].instrucoes_visuais_area_producao.valor,
            informacoes["comunicacao"].manipuladores_recebem_comunicacao_informal_seguranca_alimentos_trabalho.valor,
          ),
        },
        manipuladores_recebem_comunicacao_informal_seguranca_alimentos_trabalho: {
          valor:
            informacoes["comunicacao"].manipuladores_recebem_comunicacao_informal_seguranca_alimentos_trabalho.valor,
          escore: this.calcularEscore(
            informacoes["comunicacao"].instrucoes_visuais_area_producao.valor,
            informacoes["comunicacao"].manipuladores_recebem_comunicacao_informal_seguranca_alimentos_trabalho.valor,
          ),
        },
        melhorias_seguranca_alimentos_comunicadas_informacoes_visiveis_importantes: {
          valor:
            informacoes["comunicacao"].melhorias_seguranca_alimentos_comunicadas_informacoes_visiveis_importantes.valor,
        },
      };
      informacoesCalculadas["conhecimento"] = {
        conhecimento_aspectos_tempo_temperatura: {
          valor: informacoes["conhecimento"].conhecimento_aspectos_tempo_temperatura.valor.valor,
          escore: this.calcularEscore(
            informacoes["conhecimento"].conhecimento_aspectos_tempo_temperatura.valor.valor,
            informacoes["conhecimento"].conhecimento_medida_temperatura.valor.valor,
            informacoes["conhecimento"].conhecimento_metodo_usar_produtos_higiene_aplicar_processo_higienizacao.valor,
            informacoes["conhecimento"].conhecimento_contaminacao_cruzada.valor,
            informacoes["conhecimento"].conhecimento_metodo_descongelar_alimentos.valor,
            informacoes["conhecimento"].conhecimento_risco_perigo_biologico_fisico_quimico.valor,
            informacoes["conhecimento"].conhecimento_metodo_lavar_maos.valor,
            informacoes["conhecimento"].conhecimento_organizacao_alimentos_deposito.valor,
            informacoes["conhecimento"].conhecimento_doencas_transmitidas_alimentos.valor,
          ),
        },
        conhecimento_medida_temperatura: {
          valor: informacoes["conhecimento"].conhecimento_medida_temperatura.valor.valor,
          escore: this.calcularEscore(
            informacoes["conhecimento"].conhecimento_aspectos_tempo_temperatura.valor.valor,
            informacoes["conhecimento"].conhecimento_medida_temperatura.valor.valor,
            informacoes["conhecimento"].conhecimento_metodo_usar_produtos_higiene_aplicar_processo_higienizacao.valor,
            informacoes["conhecimento"].conhecimento_contaminacao_cruzada.valor,
            informacoes["conhecimento"].conhecimento_metodo_descongelar_alimentos.valor,
            informacoes["conhecimento"].conhecimento_risco_perigo_biologico_fisico_quimico.valor,
            informacoes["conhecimento"].conhecimento_metodo_lavar_maos.valor,
            informacoes["conhecimento"].conhecimento_organizacao_alimentos_deposito.valor,
            informacoes["conhecimento"].conhecimento_doencas_transmitidas_alimentos.valor,
          ),
        },
        conhecimento_metodo_usar_produtos_higiene_aplicar_processo_higienizacao: {
          valor:
            informacoes["conhecimento"].conhecimento_metodo_usar_produtos_higiene_aplicar_processo_higienizacao.valor,
          escore: this.calcularEscore(
            informacoes["conhecimento"].conhecimento_aspectos_tempo_temperatura.valor.valor,
            informacoes["conhecimento"].conhecimento_medida_temperatura.valor.valor,
            informacoes["conhecimento"].conhecimento_metodo_usar_produtos_higiene_aplicar_processo_higienizacao.valor,
            informacoes["conhecimento"].conhecimento_contaminacao_cruzada.valor,
            informacoes["conhecimento"].conhecimento_metodo_descongelar_alimentos.valor,
            informacoes["conhecimento"].conhecimento_risco_perigo_biologico_fisico_quimico.valor,
            informacoes["conhecimento"].conhecimento_metodo_lavar_maos.valor,
            informacoes["conhecimento"].conhecimento_organizacao_alimentos_deposito.valor,
            informacoes["conhecimento"].conhecimento_doencas_transmitidas_alimentos.valor,
          ),
        },
        conhecimento_contaminacao_cruzada: {
          valor: informacoes["conhecimento"].conhecimento_contaminacao_cruzada.valor,
          escore: this.calcularEscore(
            informacoes["conhecimento"].conhecimento_aspectos_tempo_temperatura.valor.valor,
            informacoes["conhecimento"].conhecimento_medida_temperatura.valor.valor,
            informacoes["conhecimento"].conhecimento_metodo_usar_produtos_higiene_aplicar_processo_higienizacao.valor,
            informacoes["conhecimento"].conhecimento_contaminacao_cruzada.valor,
            informacoes["conhecimento"].conhecimento_metodo_descongelar_alimentos.valor,
            informacoes["conhecimento"].conhecimento_risco_perigo_biologico_fisico_quimico.valor,
            informacoes["conhecimento"].conhecimento_metodo_lavar_maos.valor,
            informacoes["conhecimento"].conhecimento_organizacao_alimentos_deposito.valor,
            informacoes["conhecimento"].conhecimento_doencas_transmitidas_alimentos.valor,
          ),
        },
        conhecimento_metodo_descongelar_alimentos: {
          valor: informacoes["conhecimento"].conhecimento_metodo_descongelar_alimentos.valor,
          escore: this.calcularEscore(
            informacoes["conhecimento"].conhecimento_aspectos_tempo_temperatura.valor.valor,
            informacoes["conhecimento"].conhecimento_medida_temperatura.valor.valor,
            informacoes["conhecimento"].conhecimento_metodo_usar_produtos_higiene_aplicar_processo_higienizacao.valor,
            informacoes["conhecimento"].conhecimento_contaminacao_cruzada.valor,
            informacoes["conhecimento"].conhecimento_metodo_descongelar_alimentos.valor,
            informacoes["conhecimento"].conhecimento_risco_perigo_biologico_fisico_quimico.valor,
            informacoes["conhecimento"].conhecimento_metodo_lavar_maos.valor,
            informacoes["conhecimento"].conhecimento_organizacao_alimentos_deposito.valor,
            informacoes["conhecimento"].conhecimento_doencas_transmitidas_alimentos.valor,
          ),
        },
        conhecimento_risco_perigo_biologico_fisico_quimico: {
          valor: informacoes["conhecimento"].conhecimento_risco_perigo_biologico_fisico_quimico.valor,
          escore: this.calcularEscore(
            informacoes["conhecimento"].conhecimento_aspectos_tempo_temperatura.valor.valor,
            informacoes["conhecimento"].conhecimento_medida_temperatura.valor.valor,
            informacoes["conhecimento"].conhecimento_metodo_usar_produtos_higiene_aplicar_processo_higienizacao.valor,
            informacoes["conhecimento"].conhecimento_contaminacao_cruzada.valor,
            informacoes["conhecimento"].conhecimento_metodo_descongelar_alimentos.valor,
            informacoes["conhecimento"].conhecimento_risco_perigo_biologico_fisico_quimico.valor,
            informacoes["conhecimento"].conhecimento_metodo_lavar_maos.valor,
            informacoes["conhecimento"].conhecimento_organizacao_alimentos_deposito.valor,
            informacoes["conhecimento"].conhecimento_doencas_transmitidas_alimentos.valor,
          ),
        },
        conhecimento_metodo_lavar_maos: {
          valor: informacoes["conhecimento"].conhecimento_metodo_lavar_maos.valor,
          escore: this.calcularEscore(
            informacoes["conhecimento"].conhecimento_aspectos_tempo_temperatura.valor.valor,
            informacoes["conhecimento"].conhecimento_medida_temperatura.valor.valor,
            informacoes["conhecimento"].conhecimento_metodo_usar_produtos_higiene_aplicar_processo_higienizacao.valor,
            informacoes["conhecimento"].conhecimento_contaminacao_cruzada.valor,
            informacoes["conhecimento"].conhecimento_metodo_descongelar_alimentos.valor,
            informacoes["conhecimento"].conhecimento_risco_perigo_biologico_fisico_quimico.valor,
            informacoes["conhecimento"].conhecimento_metodo_lavar_maos.valor,
            informacoes["conhecimento"].conhecimento_organizacao_alimentos_deposito.valor,
            informacoes["conhecimento"].conhecimento_doencas_transmitidas_alimentos.valor,
          ),
        },
        conhecimento_organizacao_alimentos_deposito: {
          valor: informacoes["conhecimento"].conhecimento_organizacao_alimentos_deposito.valor,
          escore: this.calcularEscore(
            informacoes["conhecimento"].conhecimento_aspectos_tempo_temperatura.valor.valor,
            informacoes["conhecimento"].conhecimento_medida_temperatura.valor.valor,
            informacoes["conhecimento"].conhecimento_metodo_usar_produtos_higiene_aplicar_processo_higienizacao.valor,
            informacoes["conhecimento"].conhecimento_contaminacao_cruzada.valor,
            informacoes["conhecimento"].conhecimento_metodo_descongelar_alimentos.valor,
            informacoes["conhecimento"].conhecimento_risco_perigo_biologico_fisico_quimico.valor,
            informacoes["conhecimento"].conhecimento_metodo_lavar_maos.valor,
            informacoes["conhecimento"].conhecimento_organizacao_alimentos_deposito.valor,
            informacoes["conhecimento"].conhecimento_doencas_transmitidas_alimentos.valor,
          ),
        },
        conhecimento_doencas_transmitidas_alimentos: {
          valor: informacoes["conhecimento"].conhecimento_doencas_transmitidas_alimentos.valor,
          escore: this.calcularEscore(
            informacoes["conhecimento"].conhecimento_aspectos_tempo_temperatura.valor.valor,
            informacoes["conhecimento"].conhecimento_medida_temperatura.valor.valor,
            informacoes["conhecimento"].conhecimento_metodo_usar_produtos_higiene_aplicar_processo_higienizacao.valor,
            informacoes["conhecimento"].conhecimento_contaminacao_cruzada.valor,
            informacoes["conhecimento"].conhecimento_metodo_descongelar_alimentos.valor,
            informacoes["conhecimento"].conhecimento_risco_perigo_biologico_fisico_quimico.valor,
            informacoes["conhecimento"].conhecimento_metodo_lavar_maos.valor,
            informacoes["conhecimento"].conhecimento_organizacao_alimentos_deposito.valor,
            informacoes["conhecimento"].conhecimento_doencas_transmitidas_alimentos.valor,
          ),
        },
        sabem_explicar_requisitos_tempo_temperatura: {
          valor: informacoes["conhecimento"].sabem_explicar_requisitos_tempo_temperatura.valor,
          escore: this.calcularEscore(
            informacoes["conhecimento"].sabem_explicar_requisitos_tempo_temperatura.valor,
            informacoes["conhecimento"].sabem_explicar_requisitos_contaminacao_cruzada.valor,
            informacoes["conhecimento"].sabem_explicar_requisitos_descongelamento_alimentos_temperatura_refrigerada
              .valor,
            informacoes["conhecimento"].sabem_explicar_requisitos_lavagem_maos.valor,
            informacoes["conhecimento"].sabem_explicar_requisitos_organizacao_estoque.valor,
          ),
        },
        sabem_explicar_requisitos_contaminacao_cruzada: {
          valor: informacoes["conhecimento"].sabem_explicar_requisitos_contaminacao_cruzada.valor,
          escore: this.calcularEscore(
            informacoes["conhecimento"].sabem_explicar_requisitos_tempo_temperatura.valor,
            informacoes["conhecimento"].sabem_explicar_requisitos_contaminacao_cruzada.valor,
            informacoes["conhecimento"].sabem_explicar_requisitos_descongelamento_alimentos_temperatura_refrigerada
              .valor,
            informacoes["conhecimento"].sabem_explicar_requisitos_lavagem_maos.valor,
            informacoes["conhecimento"].sabem_explicar_requisitos_organizacao_estoque.valor,
          ),
        },
        sabem_explicar_requisitos_descongelamento_alimentos_temperatura_refrigerada: {
          valor:
            informacoes["conhecimento"].sabem_explicar_requisitos_descongelamento_alimentos_temperatura_refrigerada
              .valor,
          escore: this.calcularEscore(
            informacoes["conhecimento"].sabem_explicar_requisitos_tempo_temperatura.valor,
            informacoes["conhecimento"].sabem_explicar_requisitos_contaminacao_cruzada.valor,
            informacoes["conhecimento"].sabem_explicar_requisitos_descongelamento_alimentos_temperatura_refrigerada
              .valor,
            informacoes["conhecimento"].sabem_explicar_requisitos_lavagem_maos.valor,
            informacoes["conhecimento"].sabem_explicar_requisitos_organizacao_estoque.valor,
          ),
        },
        sabem_explicar_requisitos_lavagem_maos: {
          valor: informacoes["conhecimento"].sabem_explicar_requisitos_lavagem_maos.valor,
          escore: this.calcularEscore(
            informacoes["conhecimento"].sabem_explicar_requisitos_tempo_temperatura.valor,
            informacoes["conhecimento"].sabem_explicar_requisitos_contaminacao_cruzada.valor,
            informacoes["conhecimento"].sabem_explicar_requisitos_descongelamento_alimentos_temperatura_refrigerada
              .valor,
            informacoes["conhecimento"].sabem_explicar_requisitos_lavagem_maos.valor,
            informacoes["conhecimento"].sabem_explicar_requisitos_organizacao_estoque.valor,
          ),
        },
        sabem_explicar_requisitos_organizacao_estoque: {
          valor: informacoes["conhecimento"].sabem_explicar_requisitos_organizacao_estoque.valor,
          escore: this.calcularEscore(
            informacoes["conhecimento"].sabem_explicar_requisitos_tempo_temperatura.valor,
            informacoes["conhecimento"].sabem_explicar_requisitos_contaminacao_cruzada.valor,
            informacoes["conhecimento"].sabem_explicar_requisitos_descongelamento_alimentos_temperatura_refrigerada
              .valor,
            informacoes["conhecimento"].sabem_explicar_requisitos_lavagem_maos.valor,
            informacoes["conhecimento"].sabem_explicar_requisitos_organizacao_estoque.valor,
          ),
        },
      };
      informacoesCalculadas["comprometimento"] = {
        manipuladores_gerentes_satisfeitos_trabalho: {
          valor: informacoes["comprometimento"].manipuladores_gerentes_satisfeitos_trabalho.valor,
          escore: this.calcularEscore(
            informacoes["comprometimento"].manipuladores_gerentes_satisfeitos_trabalho.valor,
            informacoes["comprometimento"].manipuladores_sentem_importancia_trabalho_comprometidos_atividades.valor,
            informacoes["comprometimento"].manipuladores_gerentes_gostam_trabalhar_organizacao_sentem_parte.valor,
            informacoes["comprometimento"].manipuladores_responsaveis_trabalho.valor,
          ),
        },
        manipuladores_sentem_importancia_trabalho_comprometidos_atividades: {
          valor:
            informacoes["comprometimento"].manipuladores_sentem_importancia_trabalho_comprometidos_atividades.valor,
          escore: this.calcularEscore(
            informacoes["comprometimento"].manipuladores_gerentes_satisfeitos_trabalho.valor,
            informacoes["comprometimento"].manipuladores_sentem_importancia_trabalho_comprometidos_atividades.valor,
            informacoes["comprometimento"].manipuladores_gerentes_gostam_trabalhar_organizacao_sentem_parte.valor,
            informacoes["comprometimento"].manipuladores_responsaveis_trabalho.valor,
          ),
        },
        manipuladores_gerentes_gostam_trabalhar_organizacao_sentem_parte: {
          valor: informacoes["comprometimento"].manipuladores_gerentes_gostam_trabalhar_organizacao_sentem_parte.valor,
          escore: this.calcularEscore(
            informacoes["comprometimento"].manipuladores_gerentes_satisfeitos_trabalho.valor,
            informacoes["comprometimento"].manipuladores_sentem_importancia_trabalho_comprometidos_atividades.valor,
            informacoes["comprometimento"].manipuladores_gerentes_gostam_trabalhar_organizacao_sentem_parte.valor,
            informacoes["comprometimento"].manipuladores_responsaveis_trabalho.valor,
          ),
        },
        manipuladores_responsaveis_trabalho: {
          valor: informacoes["comprometimento"].manipuladores_responsaveis_trabalho.valor,
          escore: this.calcularEscore(
            informacoes["comprometimento"].manipuladores_gerentes_satisfeitos_trabalho.valor,
            informacoes["comprometimento"].manipuladores_sentem_importancia_trabalho_comprometidos_atividades.valor,
            informacoes["comprometimento"].manipuladores_gerentes_gostam_trabalhar_organizacao_sentem_parte.valor,
            informacoes["comprometimento"].manipuladores_responsaveis_trabalho.valor,
          ),
        },
        manipuladores_responsaveis_seguranca_alimentos_comportamento_seguro: {
          valor:
            informacoes["comprometimento"].manipuladores_responsaveis_seguranca_alimentos_comportamento_seguro.valor,
          escore: this.calcularEscore(
            informacoes["comprometimento"].manipuladores_responsaveis_seguranca_alimentos_comportamento_seguro.valor,
            informacoes["comprometimento"].manipuladores_mantem_alto_grau_limpeza_pessoal.valor,
            informacoes["comprometimento"].manipuladores_iniciativa_processos_higienizacao_ambiente_trabalho.valor,
            informacoes["comprometimento"]
              .manipuladores_atentos_tempo_temperatura_registram_temperaturas_implementam_acoes_corretivas,
            informacoes["comprometimento"]
              .manipuladores_armazenam_alimentos_estoques_adequados_evitar_contaminacao_cruzada.valor,
            informacoes["comprometimento"]
              .manipuladores_atendem_instrucoes_recepcao_armazenamento_pre_preparo_cozimento_distribuicao.valor,
          ),
        },
        manipuladores_mantem_alto_grau_limpeza_pessoal: {
          valor: informacoes["comprometimento"].manipuladores_mantem_alto_grau_limpeza_pessoal.valor,
          escore: this.calcularEscore(
            informacoes["comprometimento"].manipuladores_responsaveis_seguranca_alimentos_comportamento_seguro.valor,
            informacoes["comprometimento"].manipuladores_mantem_alto_grau_limpeza_pessoal.valor,
            informacoes["comprometimento"].manipuladores_iniciativa_processos_higienizacao_ambiente_trabalho.valor,
            informacoes["comprometimento"]
              .manipuladores_atentos_tempo_temperatura_registram_temperaturas_implementam_acoes_corretivas,
            informacoes["comprometimento"]
              .manipuladores_armazenam_alimentos_estoques_adequados_evitar_contaminacao_cruzada.valor,
            informacoes["comprometimento"]
              .manipuladores_atendem_instrucoes_recepcao_armazenamento_pre_preparo_cozimento_distribuicao.valor,
          ),
        },
        manipuladores_iniciativa_processos_higienizacao_ambiente_trabalho: {
          valor: informacoes["comprometimento"].manipuladores_iniciativa_processos_higienizacao_ambiente_trabalho.valor,
          escore: this.calcularEscore(
            informacoes["comprometimento"].manipuladores_responsaveis_seguranca_alimentos_comportamento_seguro.valor,
            informacoes["comprometimento"].manipuladores_mantem_alto_grau_limpeza_pessoal.valor,
            informacoes["comprometimento"].manipuladores_iniciativa_processos_higienizacao_ambiente_trabalho.valor,
            informacoes["comprometimento"]
              .manipuladores_atentos_tempo_temperatura_registram_temperaturas_implementam_acoes_corretivas,
            informacoes["comprometimento"]
              .manipuladores_armazenam_alimentos_estoques_adequados_evitar_contaminacao_cruzada.valor,
            informacoes["comprometimento"]
              .manipuladores_atendem_instrucoes_recepcao_armazenamento_pre_preparo_cozimento_distribuicao.valor,
          ),
        },
        manipuladores_atentos_tempo_temperatura_registram_temperaturas_implementam_acoes_corretivas: {
          valor:
            informacoes["comprometimento"]
              .manipuladores_atentos_tempo_temperatura_registram_temperaturas_implementam_acoes_corretivas.valor,
          escore: this.calcularEscore(
            informacoes["comprometimento"].manipuladores_responsaveis_seguranca_alimentos_comportamento_seguro.valor,
            informacoes["comprometimento"].manipuladores_mantem_alto_grau_limpeza_pessoal.valor,
            informacoes["comprometimento"].manipuladores_iniciativa_processos_higienizacao_ambiente_trabalho.valor,
            informacoes["comprometimento"]
              .manipuladores_atentos_tempo_temperatura_registram_temperaturas_implementam_acoes_corretivas,
            informacoes["comprometimento"]
              .manipuladores_armazenam_alimentos_estoques_adequados_evitar_contaminacao_cruzada.valor,
            informacoes["comprometimento"]
              .manipuladores_atendem_instrucoes_recepcao_armazenamento_pre_preparo_cozimento_distribuicao.valor,
          ),
        },
        manipuladores_armazenam_alimentos_estoques_adequados_evitar_contaminacao_cruzada: {
          valor:
            informacoes["comprometimento"]
              .manipuladores_armazenam_alimentos_estoques_adequados_evitar_contaminacao_cruzada.valor,
          escore: this.calcularEscore(
            informacoes["comprometimento"].manipuladores_responsaveis_seguranca_alimentos_comportamento_seguro.valor,
            informacoes["comprometimento"].manipuladores_mantem_alto_grau_limpeza_pessoal.valor,
            informacoes["comprometimento"].manipuladores_iniciativa_processos_higienizacao_ambiente_trabalho.valor,
            informacoes["comprometimento"]
              .manipuladores_atentos_tempo_temperatura_registram_temperaturas_implementam_acoes_corretivas,
            informacoes["comprometimento"]
              .manipuladores_armazenam_alimentos_estoques_adequados_evitar_contaminacao_cruzada.valor,
            informacoes["comprometimento"]
              .manipuladores_atendem_instrucoes_recepcao_armazenamento_pre_preparo_cozimento_distribuicao.valor,
          ),
        },
        manipuladores_atendem_instrucoes_recepcao_armazenamento_pre_preparo_cozimento_distribuicao: {
          valor:
            informacoes["comprometimento"]
              .manipuladores_atendem_instrucoes_recepcao_armazenamento_pre_preparo_cozimento_distribuicao.valor,
          escore: this.calcularEscore(
            informacoes["comprometimento"].manipuladores_responsaveis_seguranca_alimentos_comportamento_seguro.valor,
            informacoes["comprometimento"].manipuladores_mantem_alto_grau_limpeza_pessoal.valor,
            informacoes["comprometimento"].manipuladores_iniciativa_processos_higienizacao_ambiente_trabalho.valor,
            informacoes["comprometimento"]
              .manipuladores_atentos_tempo_temperatura_registram_temperaturas_implementam_acoes_corretivas,
            informacoes["comprometimento"]
              .manipuladores_armazenam_alimentos_estoques_adequados_evitar_contaminacao_cruzada.valor,
            informacoes["comprometimento"]
              .manipuladores_atendem_instrucoes_recepcao_armazenamento_pre_preparo_cozimento_distribuicao.valor,
          ),
        },
        gerentes_priorizam_alocacao_recursos_financeiros_seguranca_alimentos: {
          valor:
            informacoes["comprometimento"].gerentes_priorizam_alocacao_recursos_financeiros_seguranca_alimentos.valor,
          escore: this.calcularEscore(
            informacoes["comprometimento"].gerentes_priorizam_alocacao_recursos_financeiros_seguranca_alimentos.valor,
            informacoes["comprometimento"].gerentes_trabalham_politicas_sistemas_processos_alinhados_seguranca_alimentos
              .valor,
          ),
        },
        gerentes_trabalham_politicas_sistemas_processos_alinhados_seguranca_alimentos: {
          valor:
            informacoes["comprometimento"].gerentes_trabalham_politicas_sistemas_processos_alinhados_seguranca_alimentos
              .valor,
          escore: this.calcularEscore(
            informacoes["comprometimento"].gerentes_priorizam_alocacao_recursos_financeiros_seguranca_alimentos.valor,
            informacoes["comprometimento"].gerentes_trabalham_politicas_sistemas_processos_alinhados_seguranca_alimentos
              .valor,
          ),
        },
      };
      informacoesCalculadas["percepcao_risco"] = {
        manipuladores_percebem_risco_situacoes_alto_risco: {
          valor: informacoes["percepcao_risco"].manipuladores_percebem_risco_situacoes_alto_risco.valor,
          escore: this.calcularEscore(
            informacoes["percepcao_risco"].manipuladores_percebem_risco_situacoes_alto_risco.valor,
            informacoes["percepcao_risco"].trabalhadores_compreendem_percebem_situacao_alto_risco_todos_expostos.valor,
          ),
        },
        trabalhadores_compreendem_percebem_situacao_alto_risco_todos_expostos: {
          valor:
            informacoes["percepcao_risco"].trabalhadores_compreendem_percebem_situacao_alto_risco_todos_expostos.valor,
          escore: this.calcularEscore(
            informacoes["percepcao_risco"].manipuladores_percebem_risco_situacoes_alto_risco.valor,
            informacoes["percepcao_risco"].trabalhadores_compreendem_percebem_situacao_alto_risco_todos_expostos.valor,
          ),
        },
        trabalhadores_entendem_julgam_situacoes_risco_tomam_decisoes: {
          valor: informacoes["percepcao_risco"].trabalhadores_entendem_julgam_situacoes_risco_tomam_decisoes.valor,
          escore: this.calcularEscore(
            informacoes["percepcao_risco"].trabalhadores_entendem_julgam_situacoes_risco_tomam_decisoes.valor,
            informacoes["percepcao_risco"].decisao_gerentes_baseada_julgamento_risco.valor,
          ),
        },
        decisao_gerentes_baseada_julgamento_risco: {
          valor: informacoes["percepcao_risco"].decisao_gerentes_baseada_julgamento_risco.valor,
          escore: this.calcularEscore(
            informacoes["percepcao_risco"].trabalhadores_entendem_julgam_situacoes_risco_tomam_decisoes.valor,
            informacoes["percepcao_risco"].decisao_gerentes_baseada_julgamento_risco.valor,
          ),
        },
        trabalhadores_percebem_letalidade: {
          valor: informacoes["percepcao_risco"].trabalhadores_percebem_letalidade.valor,
        },
        trabalhadores_sem_vies_otimista_pessimista: {
          valor: informacoes["percepcao_risco"].trabalhadores_sem_vies_otimista_pessimista.valor,
        },
      };
      informacoesCalculadas["pressao_trabalho_crencas_normativas"] = {
        manipuladores_carga_trabalho_pesada: {
          valor: informacoes["pressao_trabalho_crencas_normativas"].manipuladores_carga_trabalho_pesada.valor,
          escore: this.calcularEscore(
            informacoes["pressao_trabalho_crencas_normativas"].manipuladores_carga_trabalho_pesada.valor,
            informacoes["pressao_trabalho_crencas_normativas"].tempo_trabalho_suficiente.valor,
            informacoes["pressao_trabalho_crencas_normativas"].quantidade_manipuladores_suficiente.valor,
          ),
        },
        tempo_trabalho_suficiente: {
          valor: informacoes["pressao_trabalho_crencas_normativas"].tempo_trabalho_suficiente.valor,
          escore: this.calcularEscore(
            informacoes["pressao_trabalho_crencas_normativas"].manipuladores_carga_trabalho_pesada.valor,
            informacoes["pressao_trabalho_crencas_normativas"].tempo_trabalho_suficiente.valor,
            informacoes["pressao_trabalho_crencas_normativas"].quantidade_manipuladores_suficiente.valor,
          ),
        },
        quantidade_manipuladores_suficiente: {
          valor: informacoes["pressao_trabalho_crencas_normativas"].quantidade_manipuladores_suficiente.valor,
          escore: this.calcularEscore(
            informacoes["pressao_trabalho_crencas_normativas"].manipuladores_carga_trabalho_pesada.valor,
            informacoes["pressao_trabalho_crencas_normativas"].tempo_trabalho_suficiente.valor,
            informacoes["pressao_trabalho_crencas_normativas"].quantidade_manipuladores_suficiente.valor,
          ),
        },
        manipuladores_pressao_trabalhar_rapidamente: {
          valor: informacoes["pressao_trabalho_crencas_normativas"].manipuladores_pressao_trabalhar_rapidamente.valor,
          escore: this.calcularEscore(
            informacoes["pressao_trabalho_crencas_normativas"].manipuladores_pressao_trabalhar_rapidamente.valor,
            informacoes["pressao_trabalho_crencas_normativas"].manipuladores_gerentes_relacao_respeito.valor,
          ),
        },
        manipuladores_gerentes_relacao_respeito: {
          valor: informacoes["pressao_trabalho_crencas_normativas"].manipuladores_gerentes_relacao_respeito.valor,
          escore: this.calcularEscore(
            informacoes["pressao_trabalho_crencas_normativas"].manipuladores_pressao_trabalhar_rapidamente.valor,
            informacoes["pressao_trabalho_crencas_normativas"].manipuladores_gerentes_relacao_respeito.valor,
          ),
        },
      };
      informacoesCalculadas["sistema_gestao"] = {
        equipe_motivada_implementar_praticas_seguras_ferramentas_qualidade: {
          valor: informacoes["sistema_gestao"].equipe_motivada_implementar_praticas_seguras_ferramentas_qualidade.valor,
          escore: this.calcularEscore(
            informacoes["sistema_gestao"].equipe_motivada_implementar_praticas_seguras_ferramentas_qualidade.valor,
            informacoes["sistema_gestao"].equipe_sabe_preencher_formularios_controle.valor,
          ),
        },
        manipuladores_integrados_sistemas_processos_seguranca_alimentos: {
          valor: informacoes["sistema_gestao"].manipuladores_integrados_sistemas_processos_seguranca_alimentos.valor,
          escore: this.calcularEscore(
            informacoes["sistema_gestao"].equipe_motivada_implementar_praticas_seguras_ferramentas_qualidade.valor,
            informacoes["sistema_gestao"].equipe_sabe_preencher_formularios_controle.valor,
          ),
        },
        equipe_sabe_preencher_formularios_controle: {
          valor: informacoes["sistema_gestao"].equipe_sabe_preencher_formularios_controle.valor,
          escore: this.calcularEscore(
            informacoes["sistema_gestao"].equipe_sabe_preencher_formularios_controle.valor,
            informacoes["sistema_gestao"].procedimentos_documentados_formularios_registro_atualizados.valor,
            informacoes["sistema_gestao"].registros_equipamentos_atualizados_refletem_status_real_desempenho_equipamento
              .valor,
          ),
        },
        procedimentos_documentados_formularios_registro_atualizados: {
          valor: informacoes["sistema_gestao"].procedimentos_documentados_formularios_registro_atualizados.valor,
          escore: this.calcularEscore(
            informacoes["sistema_gestao"].equipe_sabe_preencher_formularios_controle.valor,
            informacoes["sistema_gestao"].procedimentos_documentados_formularios_registro_atualizados.valor,
            informacoes["sistema_gestao"].registros_equipamentos_atualizados_refletem_status_real_desempenho_equipamento
              .valor,
          ),
        },
        registros_equipamentos_atualizados_refletem_status_real_desempenho_equipamento: {
          valor:
            informacoes["sistema_gestao"].registros_equipamentos_atualizados_refletem_status_real_desempenho_equipamento
              .valor,
          escore: this.calcularEscore(
            informacoes["sistema_gestao"].equipe_sabe_preencher_formularios_controle.valor,
            informacoes["sistema_gestao"].procedimentos_documentados_formularios_registro_atualizados.valor,
            informacoes["sistema_gestao"].registros_equipamentos_atualizados_refletem_status_real_desempenho_equipamento
              .valor,
          ),
        },
        programas_pre_requisito_haccp_sistema_boas_praticas_higiene_implementados: {
          valor:
            informacoes["sistema_gestao"].programas_pre_requisito_haccp_sistema_boas_praticas_higiene_implementados
              .valor,
        },
        processo_producao_alinhado_praticas_seguras_projetado_minimizar_riscos: {
          valor:
            informacoes["sistema_gestao"].processo_producao_alinhado_praticas_seguras_projetado_minimizar_riscos.valor,
        },
      };
      informacoesCalculadas["ambiente_trabalho"] = {
        layout_permite_fluxo_adequado_preparacao_alimentos: {
          valor: informacoes["ambiente_trabalho"].layout_permite_fluxo_adequado_preparacao_alimentos.valor,
          escore: this.calcularEscore(
            informacoes["ambiente_trabalho"].layout_permite_fluxo_adequado_preparacao_alimentos.valor,
            informacoes["ambiente_trabalho"].barreiras_fisicas_acessar_cada_area.valor,
            informacoes["ambiente_trabalho"].caixa_agua_exclusiva_conservada.valor,
            informacoes["ambiente_trabalho"].piso_parede_teto_portas_janelas_projetados_permitir_higienizacao.valor,
            informacoes["ambiente_trabalho"].quantidade_adequada_utensilios.valor,
            informacoes["ambiente_trabalho"].utensilios_projetados_permitir_sanitizacao.valor,
            informacoes["ambiente_trabalho"].utensilios_boas_condicoes.valor,
            informacoes["ambiente_trabalho"].utensilios_material_nao_toxico.valor,
            informacoes["ambiente_trabalho"].utensilios_atendem_necessidades_manipuladores.valor,
            informacoes["ambiente_trabalho"].equipamentos_suficientes.valor,
            informacoes["ambiente_trabalho"]
              .equipamentos_projetados_facilitar_acesso_limpeza_manutencao_inspecao_acidentes.valor,
            informacoes["ambiente_trabalho"].manutencao_corretiva_equipamento.valor,
            informacoes["ambiente_trabalho"].manutencao_preventiva_equipamento.valor,
            informacoes["ambiente_trabalho"].equipamento_funciona_corretamente_sem_vazamentos_desgaste_ruido.valor,
            informacoes["ambiente_trabalho"].superficies_contato_mobilia_material_compatível_inox_permite_higienizacao
              .valor,
            informacoes["ambiente_trabalho"].mobilia_suficiente_manipulacao_alimentos.valor,
            informacoes["ambiente_trabalho"].produtos_higiene_adequados_suficientes_procedimentos_saneamento.valor,
            informacoes["ambiente_trabalho"].ferramentas_limpeza_nao_permitem_contaminacao_cruzada_separadas_por_areas
              .valor,
            informacoes["ambiente_trabalho"].materiais_lavagem_maos_suficientes_reabastecidos.valor,
          ),
        },
        barreiras_fisicas_acessar_cada_area: {
          valor: informacoes["ambiente_trabalho"].barreiras_fisicas_acessar_cada_area.valor,
          escore: this.calcularEscore(
            informacoes["ambiente_trabalho"].layout_permite_fluxo_adequado_preparacao_alimentos.valor,
            informacoes["ambiente_trabalho"].barreiras_fisicas_acessar_cada_area.valor,
            informacoes["ambiente_trabalho"].caixa_agua_exclusiva_conservada.valor,
            informacoes["ambiente_trabalho"].piso_parede_teto_portas_janelas_projetados_permitir_higienizacao.valor,
            informacoes["ambiente_trabalho"].quantidade_adequada_utensilios.valor,
            informacoes["ambiente_trabalho"].utensilios_projetados_permitir_sanitizacao.valor,
            informacoes["ambiente_trabalho"].utensilios_boas_condicoes.valor,
            informacoes["ambiente_trabalho"].utensilios_material_nao_toxico.valor,
            informacoes["ambiente_trabalho"].utensilios_atendem_necessidades_manipuladores.valor,
            informacoes["ambiente_trabalho"].equipamentos_suficientes.valor,
            informacoes["ambiente_trabalho"]
              .equipamentos_projetados_facilitar_acesso_limpeza_manutencao_inspecao_acidentes.valor,
            informacoes["ambiente_trabalho"].manutencao_corretiva_equipamento.valor,
            informacoes["ambiente_trabalho"].manutencao_preventiva_equipamento.valor,
            informacoes["ambiente_trabalho"].equipamento_funciona_corretamente_sem_vazamentos_desgaste_ruido.valor,
            informacoes["ambiente_trabalho"].superficies_contato_mobilia_material_compatível_inox_permite_higienizacao
              .valor,
            informacoes["ambiente_trabalho"].mobilia_suficiente_manipulacao_alimentos.valor,
            informacoes["ambiente_trabalho"].produtos_higiene_adequados_suficientes_procedimentos_saneamento.valor,
            informacoes["ambiente_trabalho"].ferramentas_limpeza_nao_permitem_contaminacao_cruzada_separadas_por_areas
              .valor,
            informacoes["ambiente_trabalho"].materiais_lavagem_maos_suficientes_reabastecidos.valor,
          ),
        },
        caixa_agua_exclusiva_conservada: {
          valor: informacoes["ambiente_trabalho"].caixa_agua_exclusiva_conservada.valor,
          escore: this.calcularEscore(
            informacoes["ambiente_trabalho"].layout_permite_fluxo_adequado_preparacao_alimentos.valor,
            informacoes["ambiente_trabalho"].barreiras_fisicas_acessar_cada_area.valor,
            informacoes["ambiente_trabalho"].caixa_agua_exclusiva_conservada.valor,
            informacoes["ambiente_trabalho"].piso_parede_teto_portas_janelas_projetados_permitir_higienizacao.valor,
            informacoes["ambiente_trabalho"].quantidade_adequada_utensilios.valor,
            informacoes["ambiente_trabalho"].utensilios_projetados_permitir_sanitizacao.valor,
            informacoes["ambiente_trabalho"].utensilios_boas_condicoes.valor,
            informacoes["ambiente_trabalho"].utensilios_material_nao_toxico.valor,
            informacoes["ambiente_trabalho"].utensilios_atendem_necessidades_manipuladores.valor,
            informacoes["ambiente_trabalho"].equipamentos_suficientes.valor,
            informacoes["ambiente_trabalho"]
              .equipamentos_projetados_facilitar_acesso_limpeza_manutencao_inspecao_acidentes.valor,
            informacoes["ambiente_trabalho"].manutencao_corretiva_equipamento.valor,
            informacoes["ambiente_trabalho"].manutencao_preventiva_equipamento.valor,
            informacoes["ambiente_trabalho"].equipamento_funciona_corretamente_sem_vazamentos_desgaste_ruido.valor,
            informacoes["ambiente_trabalho"].superficies_contato_mobilia_material_compatível_inox_permite_higienizacao
              .valor,
            informacoes["ambiente_trabalho"].mobilia_suficiente_manipulacao_alimentos.valor,
            informacoes["ambiente_trabalho"].produtos_higiene_adequados_suficientes_procedimentos_saneamento.valor,
            informacoes["ambiente_trabalho"].ferramentas_limpeza_nao_permitem_contaminacao_cruzada_separadas_por_areas
              .valor,
            informacoes["ambiente_trabalho"].materiais_lavagem_maos_suficientes_reabastecidos.valor,
          ),
        },
        piso_parede_teto_portas_janelas_projetados_permitir_higienizacao: {
          valor:
            informacoes["ambiente_trabalho"].piso_parede_teto_portas_janelas_projetados_permitir_higienizacao.valor,
          escore: this.calcularEscore(
            informacoes["ambiente_trabalho"].layout_permite_fluxo_adequado_preparacao_alimentos.valor,
            informacoes["ambiente_trabalho"].barreiras_fisicas_acessar_cada_area.valor,
            informacoes["ambiente_trabalho"].caixa_agua_exclusiva_conservada.valor,
            informacoes["ambiente_trabalho"].piso_parede_teto_portas_janelas_projetados_permitir_higienizacao.valor,
            informacoes["ambiente_trabalho"].quantidade_adequada_utensilios.valor,
            informacoes["ambiente_trabalho"].utensilios_projetados_permitir_sanitizacao.valor,
            informacoes["ambiente_trabalho"].utensilios_boas_condicoes.valor,
            informacoes["ambiente_trabalho"].utensilios_material_nao_toxico.valor,
            informacoes["ambiente_trabalho"].utensilios_atendem_necessidades_manipuladores.valor,
            informacoes["ambiente_trabalho"].equipamentos_suficientes.valor,
            informacoes["ambiente_trabalho"]
              .equipamentos_projetados_facilitar_acesso_limpeza_manutencao_inspecao_acidentes.valor,
            informacoes["ambiente_trabalho"].manutencao_corretiva_equipamento.valor,
            informacoes["ambiente_trabalho"].manutencao_preventiva_equipamento.valor,
            informacoes["ambiente_trabalho"].equipamento_funciona_corretamente_sem_vazamentos_desgaste_ruido.valor,
            informacoes["ambiente_trabalho"].superficies_contato_mobilia_material_compatível_inox_permite_higienizacao
              .valor,
            informacoes["ambiente_trabalho"].mobilia_suficiente_manipulacao_alimentos.valor,
            informacoes["ambiente_trabalho"].produtos_higiene_adequados_suficientes_procedimentos_saneamento.valor,
            informacoes["ambiente_trabalho"].ferramentas_limpeza_nao_permitem_contaminacao_cruzada_separadas_por_areas
              .valor,
            informacoes["ambiente_trabalho"].materiais_lavagem_maos_suficientes_reabastecidos.valor,
          ),
        },
        quantidade_adequada_utensilios: {
          valor: informacoes["ambiente_trabalho"].quantidade_adequada_utensilios.valor,
          escore: this.calcularEscore(
            informacoes["ambiente_trabalho"].layout_permite_fluxo_adequado_preparacao_alimentos.valor,
            informacoes["ambiente_trabalho"].barreiras_fisicas_acessar_cada_area.valor,
            informacoes["ambiente_trabalho"].caixa_agua_exclusiva_conservada.valor,
            informacoes["ambiente_trabalho"].piso_parede_teto_portas_janelas_projetados_permitir_higienizacao.valor,
            informacoes["ambiente_trabalho"].quantidade_adequada_utensilios.valor,
            informacoes["ambiente_trabalho"].utensilios_projetados_permitir_sanitizacao.valor,
            informacoes["ambiente_trabalho"].utensilios_boas_condicoes.valor,
            informacoes["ambiente_trabalho"].utensilios_material_nao_toxico.valor,
            informacoes["ambiente_trabalho"].utensilios_atendem_necessidades_manipuladores.valor,
            informacoes["ambiente_trabalho"].equipamentos_suficientes.valor,
            informacoes["ambiente_trabalho"]
              .equipamentos_projetados_facilitar_acesso_limpeza_manutencao_inspecao_acidentes.valor,
            informacoes["ambiente_trabalho"].manutencao_corretiva_equipamento.valor,
            informacoes["ambiente_trabalho"].manutencao_preventiva_equipamento.valor,
            informacoes["ambiente_trabalho"].equipamento_funciona_corretamente_sem_vazamentos_desgaste_ruido.valor,
            informacoes["ambiente_trabalho"].superficies_contato_mobilia_material_compatível_inox_permite_higienizacao
              .valor,
            informacoes["ambiente_trabalho"].mobilia_suficiente_manipulacao_alimentos.valor,
            informacoes["ambiente_trabalho"].produtos_higiene_adequados_suficientes_procedimentos_saneamento.valor,
            informacoes["ambiente_trabalho"].ferramentas_limpeza_nao_permitem_contaminacao_cruzada_separadas_por_areas
              .valor,
            informacoes["ambiente_trabalho"].materiais_lavagem_maos_suficientes_reabastecidos.valor,
          ),
        },
        utensilios_projetados_permitir_sanitizacao: {
          valor: informacoes["ambiente_trabalho"].utensilios_projetados_permitir_sanitizacao.valor,
          escore: this.calcularEscore(
            informacoes["ambiente_trabalho"].layout_permite_fluxo_adequado_preparacao_alimentos.valor,
            informacoes["ambiente_trabalho"].barreiras_fisicas_acessar_cada_area.valor,
            informacoes["ambiente_trabalho"].caixa_agua_exclusiva_conservada.valor,
            informacoes["ambiente_trabalho"].piso_parede_teto_portas_janelas_projetados_permitir_higienizacao.valor,
            informacoes["ambiente_trabalho"].quantidade_adequada_utensilios.valor,
            informacoes["ambiente_trabalho"].utensilios_projetados_permitir_sanitizacao.valor,
            informacoes["ambiente_trabalho"].utensilios_boas_condicoes.valor,
            informacoes["ambiente_trabalho"].utensilios_material_nao_toxico.valor,
            informacoes["ambiente_trabalho"].utensilios_atendem_necessidades_manipuladores.valor,
            informacoes["ambiente_trabalho"].equipamentos_suficientes.valor,
            informacoes["ambiente_trabalho"]
              .equipamentos_projetados_facilitar_acesso_limpeza_manutencao_inspecao_acidentes.valor,
            informacoes["ambiente_trabalho"].manutencao_corretiva_equipamento.valor,
            informacoes["ambiente_trabalho"].manutencao_preventiva_equipamento.valor,
            informacoes["ambiente_trabalho"].equipamento_funciona_corretamente_sem_vazamentos_desgaste_ruido.valor,
            informacoes["ambiente_trabalho"].superficies_contato_mobilia_material_compatível_inox_permite_higienizacao
              .valor,
            informacoes["ambiente_trabalho"].mobilia_suficiente_manipulacao_alimentos.valor,
            informacoes["ambiente_trabalho"].produtos_higiene_adequados_suficientes_procedimentos_saneamento.valor,
            informacoes["ambiente_trabalho"].ferramentas_limpeza_nao_permitem_contaminacao_cruzada_separadas_por_areas
              .valor,
            informacoes["ambiente_trabalho"].materiais_lavagem_maos_suficientes_reabastecidos.valor,
          ),
        },
        utensilios_boas_condicoes: {
          valor: informacoes["ambiente_trabalho"].utensilios_boas_condicoes.valor,
          escore: this.calcularEscore(
            informacoes["ambiente_trabalho"].layout_permite_fluxo_adequado_preparacao_alimentos.valor,
            informacoes["ambiente_trabalho"].barreiras_fisicas_acessar_cada_area.valor,
            informacoes["ambiente_trabalho"].caixa_agua_exclusiva_conservada.valor,
            informacoes["ambiente_trabalho"].piso_parede_teto_portas_janelas_projetados_permitir_higienizacao.valor,
            informacoes["ambiente_trabalho"].quantidade_adequada_utensilios.valor,
            informacoes["ambiente_trabalho"].utensilios_projetados_permitir_sanitizacao.valor,
            informacoes["ambiente_trabalho"].utensilios_boas_condicoes.valor,
            informacoes["ambiente_trabalho"].utensilios_material_nao_toxico.valor,
            informacoes["ambiente_trabalho"].utensilios_atendem_necessidades_manipuladores.valor,
            informacoes["ambiente_trabalho"].equipamentos_suficientes.valor,
            informacoes["ambiente_trabalho"]
              .equipamentos_projetados_facilitar_acesso_limpeza_manutencao_inspecao_acidentes.valor,
            informacoes["ambiente_trabalho"].manutencao_corretiva_equipamento.valor,
            informacoes["ambiente_trabalho"].manutencao_preventiva_equipamento.valor,
            informacoes["ambiente_trabalho"].equipamento_funciona_corretamente_sem_vazamentos_desgaste_ruido.valor,
            informacoes["ambiente_trabalho"].superficies_contato_mobilia_material_compatível_inox_permite_higienizacao
              .valor,
            informacoes["ambiente_trabalho"].mobilia_suficiente_manipulacao_alimentos.valor,
            informacoes["ambiente_trabalho"].produtos_higiene_adequados_suficientes_procedimentos_saneamento.valor,
            informacoes["ambiente_trabalho"].ferramentas_limpeza_nao_permitem_contaminacao_cruzada_separadas_por_areas
              .valor,
            informacoes["ambiente_trabalho"].materiais_lavagem_maos_suficientes_reabastecidos.valor,
          ),
        },
        utensilios_material_nao_toxico: {
          valor: informacoes["ambiente_trabalho"].utensilios_material_nao_toxico.valor,
          escore: this.calcularEscore(
            informacoes["ambiente_trabalho"].layout_permite_fluxo_adequado_preparacao_alimentos.valor,
            informacoes["ambiente_trabalho"].barreiras_fisicas_acessar_cada_area.valor,
            informacoes["ambiente_trabalho"].caixa_agua_exclusiva_conservada.valor,
            informacoes["ambiente_trabalho"].piso_parede_teto_portas_janelas_projetados_permitir_higienizacao.valor,
            informacoes["ambiente_trabalho"].quantidade_adequada_utensilios.valor,
            informacoes["ambiente_trabalho"].utensilios_projetados_permitir_sanitizacao.valor,
            informacoes["ambiente_trabalho"].utensilios_boas_condicoes.valor,
            informacoes["ambiente_trabalho"].utensilios_material_nao_toxico.valor,
            informacoes["ambiente_trabalho"].utensilios_atendem_necessidades_manipuladores.valor,
            informacoes["ambiente_trabalho"].equipamentos_suficientes.valor,
            informacoes["ambiente_trabalho"]
              .equipamentos_projetados_facilitar_acesso_limpeza_manutencao_inspecao_acidentes.valor,
            informacoes["ambiente_trabalho"].manutencao_corretiva_equipamento.valor,
            informacoes["ambiente_trabalho"].manutencao_preventiva_equipamento.valor,
            informacoes["ambiente_trabalho"].equipamento_funciona_corretamente_sem_vazamentos_desgaste_ruido.valor,
            informacoes["ambiente_trabalho"].superficies_contato_mobilia_material_compatível_inox_permite_higienizacao
              .valor,
            informacoes["ambiente_trabalho"].mobilia_suficiente_manipulacao_alimentos.valor,
            informacoes["ambiente_trabalho"].produtos_higiene_adequados_suficientes_procedimentos_saneamento.valor,
            informacoes["ambiente_trabalho"].ferramentas_limpeza_nao_permitem_contaminacao_cruzada_separadas_por_areas
              .valor,
            informacoes["ambiente_trabalho"].materiais_lavagem_maos_suficientes_reabastecidos.valor,
          ),
        },
        utensilios_atendem_necessidades_manipuladores: {
          valor: informacoes["ambiente_trabalho"].utensilios_atendem_necessidades_manipuladores.valor,
          escore: this.calcularEscore(
            informacoes["ambiente_trabalho"].layout_permite_fluxo_adequado_preparacao_alimentos.valor,
            informacoes["ambiente_trabalho"].barreiras_fisicas_acessar_cada_area.valor,
            informacoes["ambiente_trabalho"].caixa_agua_exclusiva_conservada.valor,
            informacoes["ambiente_trabalho"].piso_parede_teto_portas_janelas_projetados_permitir_higienizacao.valor,
            informacoes["ambiente_trabalho"].quantidade_adequada_utensilios.valor,
            informacoes["ambiente_trabalho"].utensilios_projetados_permitir_sanitizacao.valor,
            informacoes["ambiente_trabalho"].utensilios_boas_condicoes.valor,
            informacoes["ambiente_trabalho"].utensilios_material_nao_toxico.valor,
            informacoes["ambiente_trabalho"].utensilios_atendem_necessidades_manipuladores.valor,
            informacoes["ambiente_trabalho"].equipamentos_suficientes.valor,
            informacoes["ambiente_trabalho"]
              .equipamentos_projetados_facilitar_acesso_limpeza_manutencao_inspecao_acidentes.valor,
            informacoes["ambiente_trabalho"].manutencao_corretiva_equipamento.valor,
            informacoes["ambiente_trabalho"].manutencao_preventiva_equipamento.valor,
            informacoes["ambiente_trabalho"].equipamento_funciona_corretamente_sem_vazamentos_desgaste_ruido.valor,
            informacoes["ambiente_trabalho"].superficies_contato_mobilia_material_compatível_inox_permite_higienizacao
              .valor,
            informacoes["ambiente_trabalho"].mobilia_suficiente_manipulacao_alimentos.valor,
            informacoes["ambiente_trabalho"].produtos_higiene_adequados_suficientes_procedimentos_saneamento.valor,
            informacoes["ambiente_trabalho"].ferramentas_limpeza_nao_permitem_contaminacao_cruzada_separadas_por_areas
              .valor,
            informacoes["ambiente_trabalho"].materiais_lavagem_maos_suficientes_reabastecidos.valor,
          ),
        },
        equipamentos_suficientes: {
          valor: informacoes["ambiente_trabalho"].equipamentos_suficientes.valor,
          escore: this.calcularEscore(
            informacoes["ambiente_trabalho"].layout_permite_fluxo_adequado_preparacao_alimentos.valor,
            informacoes["ambiente_trabalho"].barreiras_fisicas_acessar_cada_area.valor,
            informacoes["ambiente_trabalho"].caixa_agua_exclusiva_conservada.valor,
            informacoes["ambiente_trabalho"].piso_parede_teto_portas_janelas_projetados_permitir_higienizacao.valor,
            informacoes["ambiente_trabalho"].quantidade_adequada_utensilios.valor,
            informacoes["ambiente_trabalho"].utensilios_projetados_permitir_sanitizacao.valor,
            informacoes["ambiente_trabalho"].utensilios_boas_condicoes.valor,
            informacoes["ambiente_trabalho"].utensilios_material_nao_toxico.valor,
            informacoes["ambiente_trabalho"].utensilios_atendem_necessidades_manipuladores.valor,
            informacoes["ambiente_trabalho"].equipamentos_suficientes.valor,
            informacoes["ambiente_trabalho"]
              .equipamentos_projetados_facilitar_acesso_limpeza_manutencao_inspecao_acidentes.valor,
            informacoes["ambiente_trabalho"].manutencao_corretiva_equipamento.valor,
            informacoes["ambiente_trabalho"].manutencao_preventiva_equipamento.valor,
            informacoes["ambiente_trabalho"].equipamento_funciona_corretamente_sem_vazamentos_desgaste_ruido.valor,
            informacoes["ambiente_trabalho"].superficies_contato_mobilia_material_compatível_inox_permite_higienizacao
              .valor,
            informacoes["ambiente_trabalho"].mobilia_suficiente_manipulacao_alimentos.valor,
            informacoes["ambiente_trabalho"].produtos_higiene_adequados_suficientes_procedimentos_saneamento.valor,
            informacoes["ambiente_trabalho"].ferramentas_limpeza_nao_permitem_contaminacao_cruzada_separadas_por_areas
              .valor,
            informacoes["ambiente_trabalho"].materiais_lavagem_maos_suficientes_reabastecidos.valor,
          ),
        },
        equipamentos_projetados_facilitar_acesso_limpeza_manutencao_inspecao_acidentes: {
          valor:
            informacoes["ambiente_trabalho"]
              .equipamentos_projetados_facilitar_acesso_limpeza_manutencao_inspecao_acidentes.valor,
          escore: this.calcularEscore(
            informacoes["ambiente_trabalho"].layout_permite_fluxo_adequado_preparacao_alimentos.valor,
            informacoes["ambiente_trabalho"].barreiras_fisicas_acessar_cada_area.valor,
            informacoes["ambiente_trabalho"].caixa_agua_exclusiva_conservada.valor,
            informacoes["ambiente_trabalho"].piso_parede_teto_portas_janelas_projetados_permitir_higienizacao.valor,
            informacoes["ambiente_trabalho"].quantidade_adequada_utensilios.valor,
            informacoes["ambiente_trabalho"].utensilios_projetados_permitir_sanitizacao.valor,
            informacoes["ambiente_trabalho"].utensilios_boas_condicoes.valor,
            informacoes["ambiente_trabalho"].utensilios_material_nao_toxico.valor,
            informacoes["ambiente_trabalho"].utensilios_atendem_necessidades_manipuladores.valor,
            informacoes["ambiente_trabalho"].equipamentos_suficientes.valor,
            informacoes["ambiente_trabalho"]
              .equipamentos_projetados_facilitar_acesso_limpeza_manutencao_inspecao_acidentes.valor,
            informacoes["ambiente_trabalho"].manutencao_corretiva_equipamento.valor,
            informacoes["ambiente_trabalho"].manutencao_preventiva_equipamento.valor,
            informacoes["ambiente_trabalho"].equipamento_funciona_corretamente_sem_vazamentos_desgaste_ruido.valor,
            informacoes["ambiente_trabalho"].superficies_contato_mobilia_material_compatível_inox_permite_higienizacao
              .valor,
            informacoes["ambiente_trabalho"].mobilia_suficiente_manipulacao_alimentos.valor,
            informacoes["ambiente_trabalho"].produtos_higiene_adequados_suficientes_procedimentos_saneamento.valor,
            informacoes["ambiente_trabalho"].ferramentas_limpeza_nao_permitem_contaminacao_cruzada_separadas_por_areas
              .valor,
            informacoes["ambiente_trabalho"].materiais_lavagem_maos_suficientes_reabastecidos.valor,
          ),
        },
        manutencao_corretiva_equipamento: {
          valor: informacoes["ambiente_trabalho"].manutencao_corretiva_equipamento.valor,
          escore: this.calcularEscore(
            informacoes["ambiente_trabalho"].layout_permite_fluxo_adequado_preparacao_alimentos.valor,
            informacoes["ambiente_trabalho"].barreiras_fisicas_acessar_cada_area.valor,
            informacoes["ambiente_trabalho"].caixa_agua_exclusiva_conservada.valor,
            informacoes["ambiente_trabalho"].piso_parede_teto_portas_janelas_projetados_permitir_higienizacao.valor,
            informacoes["ambiente_trabalho"].quantidade_adequada_utensilios.valor,
            informacoes["ambiente_trabalho"].utensilios_projetados_permitir_sanitizacao.valor,
            informacoes["ambiente_trabalho"].utensilios_boas_condicoes.valor,
            informacoes["ambiente_trabalho"].utensilios_material_nao_toxico.valor,
            informacoes["ambiente_trabalho"].utensilios_atendem_necessidades_manipuladores.valor,
            informacoes["ambiente_trabalho"].equipamentos_suficientes.valor,
            informacoes["ambiente_trabalho"]
              .equipamentos_projetados_facilitar_acesso_limpeza_manutencao_inspecao_acidentes.valor,
            informacoes["ambiente_trabalho"].manutencao_corretiva_equipamento.valor,
            informacoes["ambiente_trabalho"].manutencao_preventiva_equipamento.valor,
            informacoes["ambiente_trabalho"].equipamento_funciona_corretamente_sem_vazamentos_desgaste_ruido.valor,
            informacoes["ambiente_trabalho"].superficies_contato_mobilia_material_compatível_inox_permite_higienizacao
              .valor,
            informacoes["ambiente_trabalho"].mobilia_suficiente_manipulacao_alimentos.valor,
            informacoes["ambiente_trabalho"].produtos_higiene_adequados_suficientes_procedimentos_saneamento.valor,
            informacoes["ambiente_trabalho"].ferramentas_limpeza_nao_permitem_contaminacao_cruzada_separadas_por_areas
              .valor,
            informacoes["ambiente_trabalho"].materiais_lavagem_maos_suficientes_reabastecidos.valor,
          ),
        },
        manutencao_preventiva_equipamento: {
          valor: informacoes["ambiente_trabalho"].manutencao_preventiva_equipamento.valor,
          escore: this.calcularEscore(
            informacoes["ambiente_trabalho"].layout_permite_fluxo_adequado_preparacao_alimentos.valor,
            informacoes["ambiente_trabalho"].barreiras_fisicas_acessar_cada_area.valor,
            informacoes["ambiente_trabalho"].caixa_agua_exclusiva_conservada.valor,
            informacoes["ambiente_trabalho"].piso_parede_teto_portas_janelas_projetados_permitir_higienizacao.valor,
            informacoes["ambiente_trabalho"].quantidade_adequada_utensilios.valor,
            informacoes["ambiente_trabalho"].utensilios_projetados_permitir_sanitizacao.valor,
            informacoes["ambiente_trabalho"].utensilios_boas_condicoes.valor,
            informacoes["ambiente_trabalho"].utensilios_material_nao_toxico.valor,
            informacoes["ambiente_trabalho"].utensilios_atendem_necessidades_manipuladores.valor,
            informacoes["ambiente_trabalho"].equipamentos_suficientes.valor,
            informacoes["ambiente_trabalho"]
              .equipamentos_projetados_facilitar_acesso_limpeza_manutencao_inspecao_acidentes.valor,
            informacoes["ambiente_trabalho"].manutencao_corretiva_equipamento.valor,
            informacoes["ambiente_trabalho"].manutencao_preventiva_equipamento.valor,
            informacoes["ambiente_trabalho"].equipamento_funciona_corretamente_sem_vazamentos_desgaste_ruido.valor,
            informacoes["ambiente_trabalho"].superficies_contato_mobilia_material_compatível_inox_permite_higienizacao
              .valor,
            informacoes["ambiente_trabalho"].mobilia_suficiente_manipulacao_alimentos.valor,
            informacoes["ambiente_trabalho"].produtos_higiene_adequados_suficientes_procedimentos_saneamento.valor,
            informacoes["ambiente_trabalho"].ferramentas_limpeza_nao_permitem_contaminacao_cruzada_separadas_por_areas
              .valor,
            informacoes["ambiente_trabalho"].materiais_lavagem_maos_suficientes_reabastecidos.valor,
          ),
        },
        equipamento_funciona_corretamente_sem_vazamentos_desgaste_ruido: {
          valor: informacoes["ambiente_trabalho"].equipamento_funciona_corretamente_sem_vazamentos_desgaste_ruido.valor,
          escore: this.calcularEscore(
            informacoes["ambiente_trabalho"].layout_permite_fluxo_adequado_preparacao_alimentos.valor,
            informacoes["ambiente_trabalho"].barreiras_fisicas_acessar_cada_area.valor,
            informacoes["ambiente_trabalho"].caixa_agua_exclusiva_conservada.valor,
            informacoes["ambiente_trabalho"].piso_parede_teto_portas_janelas_projetados_permitir_higienizacao.valor,
            informacoes["ambiente_trabalho"].quantidade_adequada_utensilios.valor,
            informacoes["ambiente_trabalho"].utensilios_projetados_permitir_sanitizacao.valor,
            informacoes["ambiente_trabalho"].utensilios_boas_condicoes.valor,
            informacoes["ambiente_trabalho"].utensilios_material_nao_toxico.valor,
            informacoes["ambiente_trabalho"].utensilios_atendem_necessidades_manipuladores.valor,
            informacoes["ambiente_trabalho"].equipamentos_suficientes.valor,
            informacoes["ambiente_trabalho"]
              .equipamentos_projetados_facilitar_acesso_limpeza_manutencao_inspecao_acidentes.valor,
            informacoes["ambiente_trabalho"].manutencao_corretiva_equipamento.valor,
            informacoes["ambiente_trabalho"].manutencao_preventiva_equipamento.valor,
            informacoes["ambiente_trabalho"].equipamento_funciona_corretamente_sem_vazamentos_desgaste_ruido.valor,
            informacoes["ambiente_trabalho"].superficies_contato_mobilia_material_compatível_inox_permite_higienizacao
              .valor,
            informacoes["ambiente_trabalho"].mobilia_suficiente_manipulacao_alimentos.valor,
            informacoes["ambiente_trabalho"].produtos_higiene_adequados_suficientes_procedimentos_saneamento.valor,
            informacoes["ambiente_trabalho"].ferramentas_limpeza_nao_permitem_contaminacao_cruzada_separadas_por_areas
              .valor,
            informacoes["ambiente_trabalho"].materiais_lavagem_maos_suficientes_reabastecidos.valor,
          ),
        },
        superficies_contato_mobilia_material_compatível_inox_permite_higienizacao: {
          valor:
            informacoes["ambiente_trabalho"].superficies_contato_mobilia_material_compatível_inox_permite_higienizacao
              .valor,
          escore: this.calcularEscore(
            informacoes["ambiente_trabalho"].layout_permite_fluxo_adequado_preparacao_alimentos.valor,
            informacoes["ambiente_trabalho"].barreiras_fisicas_acessar_cada_area.valor,
            informacoes["ambiente_trabalho"].caixa_agua_exclusiva_conservada.valor,
            informacoes["ambiente_trabalho"].piso_parede_teto_portas_janelas_projetados_permitir_higienizacao.valor,
            informacoes["ambiente_trabalho"].quantidade_adequada_utensilios.valor,
            informacoes["ambiente_trabalho"].utensilios_projetados_permitir_sanitizacao.valor,
            informacoes["ambiente_trabalho"].utensilios_boas_condicoes.valor,
            informacoes["ambiente_trabalho"].utensilios_material_nao_toxico.valor,
            informacoes["ambiente_trabalho"].utensilios_atendem_necessidades_manipuladores.valor,
            informacoes["ambiente_trabalho"].equipamentos_suficientes.valor,
            informacoes["ambiente_trabalho"]
              .equipamentos_projetados_facilitar_acesso_limpeza_manutencao_inspecao_acidentes.valor,
            informacoes["ambiente_trabalho"].manutencao_corretiva_equipamento.valor,
            informacoes["ambiente_trabalho"].manutencao_preventiva_equipamento.valor,
            informacoes["ambiente_trabalho"].equipamento_funciona_corretamente_sem_vazamentos_desgaste_ruido.valor,
            informacoes["ambiente_trabalho"].superficies_contato_mobilia_material_compatível_inox_permite_higienizacao
              .valor,
            informacoes["ambiente_trabalho"].mobilia_suficiente_manipulacao_alimentos.valor,
            informacoes["ambiente_trabalho"].produtos_higiene_adequados_suficientes_procedimentos_saneamento.valor,
            informacoes["ambiente_trabalho"].ferramentas_limpeza_nao_permitem_contaminacao_cruzada_separadas_por_areas
              .valor,
            informacoes["ambiente_trabalho"].materiais_lavagem_maos_suficientes_reabastecidos.valor,
          ),
        },
        mobilia_suficiente_manipulacao_alimentos: {
          valor: informacoes["ambiente_trabalho"].mobilia_suficiente_manipulacao_alimentos.valor,
          escore: this.calcularEscore(
            informacoes["ambiente_trabalho"].layout_permite_fluxo_adequado_preparacao_alimentos.valor,
            informacoes["ambiente_trabalho"].barreiras_fisicas_acessar_cada_area.valor,
            informacoes["ambiente_trabalho"].caixa_agua_exclusiva_conservada.valor,
            informacoes["ambiente_trabalho"].piso_parede_teto_portas_janelas_projetados_permitir_higienizacao.valor,
            informacoes["ambiente_trabalho"].quantidade_adequada_utensilios.valor,
            informacoes["ambiente_trabalho"].utensilios_projetados_permitir_sanitizacao.valor,
            informacoes["ambiente_trabalho"].utensilios_boas_condicoes.valor,
            informacoes["ambiente_trabalho"].utensilios_material_nao_toxico.valor,
            informacoes["ambiente_trabalho"].utensilios_atendem_necessidades_manipuladores.valor,
            informacoes["ambiente_trabalho"].equipamentos_suficientes.valor,
            informacoes["ambiente_trabalho"]
              .equipamentos_projetados_facilitar_acesso_limpeza_manutencao_inspecao_acidentes.valor,
            informacoes["ambiente_trabalho"].manutencao_corretiva_equipamento.valor,
            informacoes["ambiente_trabalho"].manutencao_preventiva_equipamento.valor,
            informacoes["ambiente_trabalho"].equipamento_funciona_corretamente_sem_vazamentos_desgaste_ruido.valor,
            informacoes["ambiente_trabalho"].superficies_contato_mobilia_material_compatível_inox_permite_higienizacao
              .valor,
            informacoes["ambiente_trabalho"].mobilia_suficiente_manipulacao_alimentos.valor,
            informacoes["ambiente_trabalho"].produtos_higiene_adequados_suficientes_procedimentos_saneamento.valor,
            informacoes["ambiente_trabalho"].ferramentas_limpeza_nao_permitem_contaminacao_cruzada_separadas_por_areas
              .valor,
            informacoes["ambiente_trabalho"].materiais_lavagem_maos_suficientes_reabastecidos.valor,
          ),
        },
        produtos_higiene_adequados_suficientes_procedimentos_saneamento: {
          valor: informacoes["ambiente_trabalho"].produtos_higiene_adequados_suficientes_procedimentos_saneamento.valor,
          escore: this.calcularEscore(
            informacoes["ambiente_trabalho"].layout_permite_fluxo_adequado_preparacao_alimentos.valor,
            informacoes["ambiente_trabalho"].barreiras_fisicas_acessar_cada_area.valor,
            informacoes["ambiente_trabalho"].caixa_agua_exclusiva_conservada.valor,
            informacoes["ambiente_trabalho"].piso_parede_teto_portas_janelas_projetados_permitir_higienizacao.valor,
            informacoes["ambiente_trabalho"].quantidade_adequada_utensilios.valor,
            informacoes["ambiente_trabalho"].utensilios_projetados_permitir_sanitizacao.valor,
            informacoes["ambiente_trabalho"].utensilios_boas_condicoes.valor,
            informacoes["ambiente_trabalho"].utensilios_material_nao_toxico.valor,
            informacoes["ambiente_trabalho"].utensilios_atendem_necessidades_manipuladores.valor,
            informacoes["ambiente_trabalho"].equipamentos_suficientes.valor,
            informacoes["ambiente_trabalho"]
              .equipamentos_projetados_facilitar_acesso_limpeza_manutencao_inspecao_acidentes.valor,
            informacoes["ambiente_trabalho"].manutencao_corretiva_equipamento.valor,
            informacoes["ambiente_trabalho"].manutencao_preventiva_equipamento.valor,
            informacoes["ambiente_trabalho"].equipamento_funciona_corretamente_sem_vazamentos_desgaste_ruido.valor,
            informacoes["ambiente_trabalho"].superficies_contato_mobilia_material_compatível_inox_permite_higienizacao
              .valor,
            informacoes["ambiente_trabalho"].mobilia_suficiente_manipulacao_alimentos.valor,
            informacoes["ambiente_trabalho"].produtos_higiene_adequados_suficientes_procedimentos_saneamento.valor,
            informacoes["ambiente_trabalho"].ferramentas_limpeza_nao_permitem_contaminacao_cruzada_separadas_por_areas
              .valor,
            informacoes["ambiente_trabalho"].materiais_lavagem_maos_suficientes_reabastecidos.valor,
          ),
        },
        ferramentas_limpeza_nao_permitem_contaminacao_cruzada_separadas_por_areas: {
          valor:
            informacoes["ambiente_trabalho"].ferramentas_limpeza_nao_permitem_contaminacao_cruzada_separadas_por_areas
              .valor,
          escore: this.calcularEscore(
            informacoes["ambiente_trabalho"].layout_permite_fluxo_adequado_preparacao_alimentos.valor,
            informacoes["ambiente_trabalho"].barreiras_fisicas_acessar_cada_area.valor,
            informacoes["ambiente_trabalho"].caixa_agua_exclusiva_conservada.valor,
            informacoes["ambiente_trabalho"].piso_parede_teto_portas_janelas_projetados_permitir_higienizacao.valor,
            informacoes["ambiente_trabalho"].quantidade_adequada_utensilios.valor,
            informacoes["ambiente_trabalho"].utensilios_projetados_permitir_sanitizacao.valor,
            informacoes["ambiente_trabalho"].utensilios_boas_condicoes.valor,
            informacoes["ambiente_trabalho"].utensilios_material_nao_toxico.valor,
            informacoes["ambiente_trabalho"].utensilios_atendem_necessidades_manipuladores.valor,
            informacoes["ambiente_trabalho"].equipamentos_suficientes.valor,
            informacoes["ambiente_trabalho"]
              .equipamentos_projetados_facilitar_acesso_limpeza_manutencao_inspecao_acidentes.valor,
            informacoes["ambiente_trabalho"].manutencao_corretiva_equipamento.valor,
            informacoes["ambiente_trabalho"].manutencao_preventiva_equipamento.valor,
            informacoes["ambiente_trabalho"].equipamento_funciona_corretamente_sem_vazamentos_desgaste_ruido.valor,
            informacoes["ambiente_trabalho"].superficies_contato_mobilia_material_compatível_inox_permite_higienizacao
              .valor,
            informacoes["ambiente_trabalho"].mobilia_suficiente_manipulacao_alimentos.valor,
            informacoes["ambiente_trabalho"].produtos_higiene_adequados_suficientes_procedimentos_saneamento.valor,
            informacoes["ambiente_trabalho"].ferramentas_limpeza_nao_permitem_contaminacao_cruzada_separadas_por_areas
              .valor,
            informacoes["ambiente_trabalho"].materiais_lavagem_maos_suficientes_reabastecidos.valor,
          ),
        },
        materiais_lavagem_maos_suficientes_reabastecidos: {
          valor: informacoes["ambiente_trabalho"].materiais_lavagem_maos_suficientes_reabastecidos.valor,
          escore: this.calcularEscore(
            informacoes["ambiente_trabalho"].layout_permite_fluxo_adequado_preparacao_alimentos.valor,
            informacoes["ambiente_trabalho"].barreiras_fisicas_acessar_cada_area.valor,
            informacoes["ambiente_trabalho"].caixa_agua_exclusiva_conservada.valor,
            informacoes["ambiente_trabalho"].piso_parede_teto_portas_janelas_projetados_permitir_higienizacao.valor,
            informacoes["ambiente_trabalho"].quantidade_adequada_utensilios.valor,
            informacoes["ambiente_trabalho"].utensilios_projetados_permitir_sanitizacao.valor,
            informacoes["ambiente_trabalho"].utensilios_boas_condicoes.valor,
            informacoes["ambiente_trabalho"].utensilios_material_nao_toxico.valor,
            informacoes["ambiente_trabalho"].utensilios_atendem_necessidades_manipuladores.valor,
            informacoes["ambiente_trabalho"].equipamentos_suficientes.valor,
            informacoes["ambiente_trabalho"]
              .equipamentos_projetados_facilitar_acesso_limpeza_manutencao_inspecao_acidentes.valor,
            informacoes["ambiente_trabalho"].manutencao_corretiva_equipamento.valor,
            informacoes["ambiente_trabalho"].manutencao_preventiva_equipamento.valor,
            informacoes["ambiente_trabalho"].equipamento_funciona_corretamente_sem_vazamentos_desgaste_ruido.valor,
            informacoes["ambiente_trabalho"].superficies_contato_mobilia_material_compatível_inox_permite_higienizacao
              .valor,
            informacoes["ambiente_trabalho"].mobilia_suficiente_manipulacao_alimentos.valor,
            informacoes["ambiente_trabalho"].produtos_higiene_adequados_suficientes_procedimentos_saneamento.valor,
            informacoes["ambiente_trabalho"].ferramentas_limpeza_nao_permitem_contaminacao_cruzada_separadas_por_areas
              .valor,
            informacoes["ambiente_trabalho"].materiais_lavagem_maos_suficientes_reabastecidos.valor,
          ),
        },
        atmosfera_ambiente_trabalho: {
          valor: informacoes["ambiente_trabalho"].atmosfera_ambiente_trabalho.valor,
          escore: this.calcularEscore(
            informacoes["ambiente_trabalho"].atmosfera_ambiente_trabalho.valor,
            informacoes["ambiente_trabalho"].manipuladores_espaco_se_sentem_confortaveis_seguros_trabalho.valor,
          ),
        },
        manipuladores_espaco_se_sentem_confortaveis_seguros_trabalho: {
          valor: informacoes["ambiente_trabalho"].manipuladores_espaco_se_sentem_confortaveis_seguros_trabalho.valor,
          escore: this.calcularEscore(
            informacoes["ambiente_trabalho"].atmosfera_ambiente_trabalho.valor,
            informacoes["ambiente_trabalho"].manipuladores_espaco_se_sentem_confortaveis_seguros_trabalho.valor,
          ),
        },
        adequacao_ambiente_frequente_necessidade_local_nao_inspecoes: {
          valor: informacoes["ambiente_trabalho"].adequacao_ambiente_frequente_necessidade_local_nao_inspecoes.valor,
        },
      };
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }

    return {
      json_informacoes: JSON.parse(JSON.stringify(informacoesCalculadas)),
    };
  }
}
