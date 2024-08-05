export const formatarDadosManipulador = (data: any, id: string) => {
  return {
    json_informacoes: {
      dados_individuais: {
        nome_completo: data.nomeCompleto,
        genero: Number(data.genero),
        idade: Number(data.idade),
        escolaridade: Number(data.escolaridade),
        formacao: data.formacao,
        participou_treinamento_manipulacao_alimentos: Number(data.participouTreinamento),
        tempo_trabalha_com_alimentos: {
          anos: Number(data.tempoTrabalhoAnos),
          meses: Number(data.tempoTrabalhoMeses),
        },
        boa_comunicacao_chefe: Number(data.aberturaComChefe),
        boa_comunicacao_entre_funcionarios: Number(data.boaComunicacaoEntreFuncionarios),
      },
      lideranca: {
        normas_higiene: Number(data.normasHigiene),
        lider_atento: Number(data.liderAtento),
        funcionarios_repreendidos: Number(data.funcionariosRepreendidos),
      },
      comunicacao: {
        tenho_liberdade_com_lider: Number(data.tenhoLiberdadeComLider),
        informacoes_necessarias_disponiveis: Number(data.informacoesNecessariasDisponiveis),
        informacoes_adequadas_normas_higiene: Number(data.informacoesAdequadasNormasHigiene),
        fornecer_sugestoes_melhoria: Number(data.fornecerSugestoesMelhoria),
      },
      conhecimento: {
        utilizacao_adornos_favorecer_contaminacao: Number(data.utilizacaoAdornosFavorecerContaminacao),
        agua_veiculo_transmissao_doencas: Number(data.aguaVeiculoTransmissaoDoencas),
        forma_higienizar_maos_evita_contaminacao: Number(data.formaHigienizarMaosEvitaContaminacao),
        contato_alimentos_contamina: Number(data.contatoAlimentosContamina),
        leite_vencimento_risco: Number(data.leiteVencimentoRisco),
        alimento_improprio_apresenta_cheiro_sabor: Number(data.alimentoImproprioApresentaCheiroSabor),
        carne_mal_passada: Number(data.carneMalPassada),
        lavar_vegetais_suficiente: Number(data.lavarVegetaisSuficiente),
        descongelamento_alimentos_bacia: Number(data.descongelamentoAlimentosBacia),
        manipulador_alimento_doente_contamina: Number(data.manipuladorAlimentoDoenteContamina),
      },
      comprometimento_afetivo: {
        problemas_restaurante_meus: Number(data.problemasRestauranteMeus),
        restaurante_tem_significado: Number(data.restauranteTemSignificado),
        restaurante_merece_minha_lealdade: Number(data.restauranteMereceMinhaLealdade),
        trabalhar_por_necessidade_e_desejo: Number(data.trabalharPorNecessidadeEDesejo),
        dedicar_minha_carreira_ao_restaurante: Number(data.dedicarMinhaCarreiraAoRestaurante),
      },
      comprometimento_normativo: {
        nao_deixa_emprego_pois_obrigacao_moral: Number(data.naoDeixaEmpregoPoisObrigacaoMoral),
        culpado_deixasse_emprego: Number(data.culpadoDeixasseEmprego),
        nao_seria_certo_deixar_emprego: Number(data.naoSeriaCertoDeixarEmprego),
        devo_esse_emprego: Number(data.devoEsseEmprego),
      },
      comprometimento_instrumental: {
        deixar_emprego_vida_desestruturada: Number(data.deixarEmpregoVidaDesestruturada),
        poucas_alternativas_caso_deixar_emprego: Number(data.poucasAlternativasCasoDeixarEmprego),
        muito_dificil_deixar_emprego: Number(data.muitoDificilDeixarEmprego),
      },
      comprometimento_seguranca_alimentos: {
        sigo_normas_higiene_responsabilidade: Number(data.sigoNormasHigieneResponsabilidade),
        seguranca_alta_prioridade: Number(data.segurancaAltaPrioridade),
        sigo_normas_higiene_importante: Number(data.sigoNormasHigieneImportante),
        empenhado_seguir_normas_higiene: Number(data.empenhadoSeguirNormasHigiene),
      },
      percepcao_risco: {
        risco_apresentar_dor_barriga_estabelecimento_similar: Number(
          data.riscoApresentarDorBarrigaEstabelecimentoSimilar,
        ),
        risco_apresentar_dor_barriga_estabelecimento_manipulado: Number(
          data.riscoApresentarDorBarrigaEstabelecimentoManipulado,
        ),
        risco_apresentar_dor_barriga_estabelecimento_colega_manipulado: Number(
          data.riscoApresentarDorBarrigaEstabelecimentoColegaManipulado,
        ),
        risco_doenca_transmitida_alimentos: Number(data.riscoDoencaTransmitidaAlimentos),
      },
      pressoes_trabalho_crencas_normativas: {
        chefe_seguir_boas_praticas: Number(data.chefeSeguirBoasPraticas),
        colegas_trabalho_normas_higiene: Number(data.colegasTrabalhoNormasHigiene),
        autoridades_vigilancia_sanitaria_normas_higiene: Number(data.autoridadesVigilanciaSanitariaNormasHigiene),
        clientes_normas_higiene: Number(data.clientesNormasHigiene),
        tempo_suficiente_normas_higiene: Number(data.tempoSuficienteNormasHigiene),
        numero_funcionarios_adequado_manipular_forma_segura: Number(
          data.numeroFuncionariosAdequadoManipularFormaSegura,
        ),
      },
      ambiente_trabalho: {
        equipamentos_necessarios_forma_segura: Number(data.equipamentosNecessariosFormaSegura),
        estrutura_adequada_normas_higiene: Number(data.estruturaAdequadaNormasHigiene),
        produtos_higienizacao_adequados_manipulacao_alimentos: Number(
          data.produtosHigienizacaoAdequadosManipulacaoAlimentos,
        ),
      },
      sistemas_gestao: {
        cooperacao_entre_areas_forma_segura: Number(data.cooperacaoEntreAreasFormaSegura),
        novos_funcionarios_antigos_funcionarios_boa_pratica_manipulacao_alimentos: Number(
          data.novosFuncionariosAntigosFuncionariosBoaPraticaManipulacaoAlimentos,
        ),
        muito_trabalho_rapidamente_funcionarios_trabalham_juntos: Number(
          data.muitoTrabalhoRapidamenteFuncionariosTrabalhamJuntos,
        ),
        funcionarios_lembram_seguir_boas_praticas_manipulacao_alimentos: Number(
          data.funcionariosLembramSeguirBoasPraticasManipulacaoAlimentos,
        ),
        acredito_legislacao_escrita_respaldo: Number(data.acreditoLegislacaoEscritaRespaldo),
        economizar_produtos_higienizacao_diminuir_custo: Number(data.economizarProdutosHigienizacaoDiminuirCusto),
      },
    },
    id_avaliacao: id,
  };
};
