import { i } from "mathjs";

export class CalcularListaVerificacaoService {
  private somarValores(...valores) {
    return valores.reduce((soma, valor) => soma + valor, 0);
  }
  async execute(informacoes: JSON) {
    const informacoesCalculadas = {};

    informacoesCalculadas["abastecimento_agua"] = {
      ...informacoes["abastecimento_agua"],
      carga_fatorial: {
        0: "*",
        1: "*",
        2: "*",
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
      carga_fatorial: {
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
      carga_fatorial: {
        0:,
        1:,
        2:,
        3:,
        4:,
        5:,
      },
    };

    return { informacoesCalculadas: informacoes };
  }
}
