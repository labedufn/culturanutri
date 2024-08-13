export const formatarDadosGestor = (data: any, id: string) => {
  return {
    json_informacoes: {
      dados_individuais: {
        nome_completo: data.nomeCompleto,
        genero: Number(data.genero),
        idade: Number(data.idade),
        escolaridade: Number(data.escolaridade),
        formacao: data.formacao,
        nao_tenha_formacao_tem_treinamento: Number(data.naoTenhaFormacaoTemTreinamento),
        tempo_trabalha_com_alimentos: Number(data.tempoTrabalhaComAlimentos),
        acredita_comunicacao_boa: Number(data.acreditaComunicacaoBoa),
        realiza_treinamentos_boas_praticas_manipulacao: Number(data.realizaTreinamentosBoasPraticas),
        carga_horaria: data.cargaHoraria,
        frequencia_aplicacao: 0,
        temas_treinamentos: data.temasTreinamentos,
      },
      conhecimento: {
        utilizacao_adornos_favorecer_contaminacao: Number(data.adornosContaminacao),
        agua_veiculo_transmissao_doencas: Number(data.aguaTransmissaoDoencas),
        forma_higienizar_maos_evita_contaminacao: Number(data.higienizacaoMaos),
        contato_alimentos_contamina: Number(data.contatoAlimentosCruCozido),
        leite_vencimento_risco: Number(data.leiteVencido),
        alimento_improprio_apresenta_cheiro_sabor: Number(data.alimentoImproprio),
        carne_mal_passada: Number(data.carneMalPassada),
        descongelamento_alimentos_bacia: Number(data.descongelamentoAlimentos),
        manipulador_alimento_doente_contamina: Number(data.manipuladorDoente),
      },
      comprometimento_afetivo: {
        problemas_restaurante_meus: Number(data.problemasRestaurante),
        restaurante_tem_significado: Number(data.significadoPessoal),
        restaurante_merece_minha_lealdade: Number(data.mereceLealdade),
        trabalhar_por_necessidade_e_desejo: Number(data.necessidadeDesejo),
        dedicar_minha_carreira_ao_restaurante: Number(data.dedicarCarreira),
      },
      comprometimento_normativo: {
        nao_deixa_emprego_pois_obrigacao_moral: Number(data.obrigacaoMoral),
        culpado_deixasse_emprego: Number(data.sentirCulpado),
        nao_seria_certo_deixar_emprego: Number(data.naoSeriaCerto),
        devo_esse_emprego: Number(data.devoMuito),
      },
      comprometimento_instrumental: {
        deixar_emprego_vida_desestruturada: Number(data.vidaDesestruturada),
        poucas_alternativas_caso_deixar_emprego: Number(data.poucasAlternativas),
        muito_dificil_deixar_emprego: Number(data.dificilDeixarEmprego),
      },
      percepcao_risco: {
        risco_apresentar_dor_barriga_estabelecimento_similar: Number(data.riscoIntoxicacaoSimilar),
        risco_apresentar_dor_barriga_estabelecimento_gerenciado: Number(data.riscoIntoxicacaoGerencia),
        risco_doenca_transmitida_alimentos: Number(data.riscoDoencaGrave),
      },
      sistemas_gestao: {
        lideranca_modificada_consumidor_alta_percepcao_risco: Number(data.modificarLideranca),
        comunicacao_modificada_consumidor_alta_percepcao_risco: Number(data.modificarComunicacao),
        gerenciar_seguranca_modificada_consumidor_alta_percepcao_risco: Number(data.modificarSegurancaAlimentos),
        ambiente_trabalho_modificada_consumidor_alta_percepcao_risco: Number(data.modificarAmbienteTrabalho),
        manipulador_alimentos_modificada_consumidor_alta_percepcao_risco: Number(data.pressionarManipulador),
        comprometimento_modificada_consumidor_alta_percepcao_risco: Number(data.modificarComprometimento),
        boas_praticas_consumidor_alta_percepcao_risco: Number(data.melhorarBoasPraticas),
      },
    },
    id_avaliacao: id,
  };
};
