export interface DadosIndividuais {
  nome_completo: string;
  genero: number;
  idade: number;
  escolaridade: number;
  formacao: string;
  participou_treinamento_manipulacao_alimentos: number;
  tempo_trabalha_com_alimentos: number;
  boa_comunicacao_chefe: number;
  boa_comunicacao_entre_funcionarios: number;
}

export interface Conhecimento {
  utilizacao_adornos_favorecer_contaminacao: number;
  agua_veiculo_transmissao_doencas: number;
  forma_higienizar_maos_evita_contaminacao: number;
  contato_alimentos_contamina: number;
  leite_vencimento_risco: number;
  alimento_improprio_apresenta_cheiro_sabor: number;
  carne_mal_passada: number;
  lavar_vegetais_suficiente: number;
  descongelamento_alimentos_bacia: number;
  manipulador_alimento_doente_contamina: number;
}

export interface ComprometimentoAfetivo {
  problemas_restaurante_meus: number;
  restaurante_tem_significado: number;
  restaurante_merece_minha_lealdade: number;
  trabalhar_por_necessidade_e_desejo: number;
  dedicar_minha_carreira_ao_restaurante: number;
}

export interface ComprometimentoNormativo {
  nao_deixa_emprego_pois_obrigacao_moral: number;
  culpado_deixasse_emprego: number;
  nao_seria_certo_deixar_emprego: number;
  devo_esse_emprego: number;
}

export interface ComprometimentoInstrumental {
  deixar_emprego_vida_desestruturada: number;
  poucas_alternativas_caso_deixar_emprego: number;
  muito_dificil_deixar_emprego: number;
}

export interface ComprometimentoSegurancaAlimentos {
  sigo_normas_higiene_responsabilidade: number;
  seguranca_alta_prioridade: number;
  sigo_normas_higiene_importante: number;
  empenhado_seguir_normas_higiene: number;
}

export interface PercepcaoRisco {
  risco_apresentar_dor_barriga_estabelecimento_similar: number;
  risco_apresentar_dor_barriga_estabelecimento_manipulado: number;
  risco_apresentar_dor_barriga_estabelecimento_colega_manipulado: number;
  risco_doenca_transmitida_alimentos: number;
}

export interface PressoesTrabalho {
  chefe_seguir_boas_praticas: number;
  colegas_trabalho_normas_higiene: number;
  autoridades_vigilancia_sanitaria_normas_higiene: number;
  clientes_normas_higiene: number;
  tempo_suficiente_normas_higiene: number;
  numero_funcionarios_adequado_manipular_forma_segura: number;
}

export interface AmbienteTrabalho {
  equipamentos_necessarios_forma_segura: number;
  estrutura_adequada_normas_higiene: number;
  produtos_higienizacao_adequados_manipulacao_alimentos: number;
}

export interface SistemasGestao {
  cooperacao_entre_areas_forma_segura: number;
  novos_funcionarios_antigos_funcionarios_boa_pratica_manipulacao_alimentos: number;
  muito_trabalho_rapidamente_funcionarios_trabalham_juntos: number;
  funcionarios_lembram_seguir_boas_praticas_manipulacao_alimentos: number;
  acredito_legislacao_escrita_respaldo: number;
  economizar_produtos_higienizacao_diminuir_custo: number;
}

export interface Manipulador {
  id: string;
  id_avaliacao: string;
  informacoes: {
    dados_individuais: DadosIndividuais;
    conhecimento: Conhecimento;
    comprometimento_afetivo: ComprometimentoAfetivo;
    comprometimento_normativo: ComprometimentoNormativo;
    comprometimento_instrumental: ComprometimentoInstrumental;
    comprometimento_seguranca_alimentos: ComprometimentoSegurancaAlimentos;
    percepcao_risco: PercepcaoRisco;
    pressoes_trabalho_crencas_normativas: PressoesTrabalho;
    ambiente_trabalho: AmbienteTrabalho;
    sistemas_gestao: SistemasGestao;
  };
  ativo: number;
}

export const labelsDadosIndividuais = {
  nome_completo: "Nome Completo",
  genero: "Gênero",
  idade: "Idade",
  escolaridade: "Escolaridade",
  formacao: "Formação",
  participou_treinamento_manipulacao_alimentos: "Participou de treinamento para manipulação de alimentos",
  tempo_trabalha_com_alimentos: "Tempo de trabalho com alimentos",
  boa_comunicacao_chefe: "Boa comunicação com o chefe",
  boa_comunicacao_entre_funcionarios: "Boa comunicação entre funcionários",
};

export const labelsConhecimento = {
  utilizacao_adornos_favorecer_contaminacao: "Utilização de adornos favorece a contaminação",
  agua_veiculo_transmissao_doencas: "Água é veículo de transmissão de doenças",
  forma_higienizar_maos_evita_contaminacao: "Forma correta de higienizar as mãos evita contaminação",
  contato_alimentos_contamina: "Contato entre alimentos crus e cozidos contamina",
  leite_vencimento_risco: "Leite vencido apresenta risco",
  alimento_improprio_apresenta_cheiro_sabor: "Alimento impróprio apresenta cheiro ou sabor",
  carne_mal_passada: "Carne mal passada apresenta risco",
  lavar_vegetais_suficiente: "Lavar vegetais é suficiente para higienização",
  descongelamento_alimentos_bacia: "Descongelamento de alimentos em bacia é seguro",
  manipulador_alimento_doente_contamina: "Manipulador de alimento doente contamina o alimento",
};

export const labelsComprometimentoAfetivo = {
  problemas_restaurante_meus: "Os problemas do restaurante são meus",
  restaurante_tem_significado: "O restaurante tem significado para mim",
  restaurante_merece_minha_lealdade: "O restaurante merece minha lealdade",
  trabalhar_por_necessidade_e_desejo: "Trabalho aqui por necessidade e desejo",
  dedicar_minha_carreira_ao_restaurante: "Dedico minha carreira ao restaurante",
};

export const labelsComprometimentoNormativo = {
  nao_deixa_emprego_pois_obrigacao_moral: "Não deixo o emprego por obrigação moral",
  culpado_deixasse_emprego: "Me sentiria culpado se deixasse o emprego",
  nao_seria_certo_deixar_emprego: "Não seria certo deixar o emprego",
  devo_esse_emprego: "Devo muito a este emprego",
};

export const labelsComprometimentoInstrumental = {
  deixar_emprego_vida_desestruturada: "Deixar o emprego desestruturaria minha vida",
  poucas_alternativas_caso_deixar_emprego: "Tenho poucas alternativas se deixar o emprego",
  muito_dificil_deixar_emprego: "Seria muito difícil deixar o emprego",
};

export const labelsComprometimentoSegurancaAlimentos = {
  sigo_normas_higiene_responsabilidade: "Sigo as normas de higiene por responsabilidade",
  seguranca_alta_prioridade: "A segurança é minha alta prioridade",
  sigo_normas_higiene_importante: "Sigo as normas de higiene porque é importante",
  empenhado_seguir_normas_higiene: "Estou empenhado em seguir as normas de higiene",
};

export const labelsPercepcaoRisco = {
  risco_apresentar_dor_barriga_estabelecimento_similar: "Risco de apresentar dor de barriga em estabelecimento similar",
  risco_apresentar_dor_barriga_estabelecimento_manipulado: "Risco de apresentar dor de barriga no meu estabelecimento",
  risco_apresentar_dor_barriga_estabelecimento_colega_manipulado:
    "Risco de apresentar dor de barriga em estabelecimento de colega",
  risco_doenca_transmitida_alimentos: "Risco de doença transmitida por alimentos",
};

export const labelsPressoesTrabalho = {
  chefe_seguir_boas_praticas: "Meu chefe segue boas práticas",
  colegas_trabalho_normas_higiene: "Meus colegas seguem as normas de higiene",
  autoridades_vigilancia_sanitaria_normas_higiene: "As autoridades de vigilância sanitária seguem as normas de higiene",
  clientes_normas_higiene: "Os clientes esperam normas de higiene",
  tempo_suficiente_normas_higiene: "Tenho tempo suficiente para seguir normas de higiene",
  numero_funcionarios_adequado_manipular_forma_segura:
    "O número de funcionários é adequado para manipular alimentos de forma segura",
};

export const labelsAmbienteTrabalho = {
  equipamentos_necessarios_forma_segura: "Tenho equipamentos necessários para trabalhar de forma segura",
  estrutura_adequada_normas_higiene: "A estrutura é adequada para seguir as normas de higiene",
  produtos_higienizacao_adequados_manipulacao_alimentos:
    "Tenho produtos de higienização adequados para manipulação de alimentos",
};

export const labelsSistemasGestao = {
  cooperacao_entre_areas_forma_segura: "Há cooperação entre áreas para trabalhar de forma segura",
  novos_funcionarios_antigos_funcionarios_boa_pratica_manipulacao_alimentos:
    "Novos e antigos funcionários seguem boas práticas de manipulação de alimentos",
  muito_trabalho_rapidamente_funcionarios_trabalham_juntos: "Muito trabalho rapidamente, funcionários trabalham juntos",
  funcionarios_lembram_seguir_boas_praticas_manipulacao_alimentos:
    "Funcionários lembram de seguir boas práticas de manipulação de alimentos",
  acredito_legislacao_escrita_respaldo: "Acredito na legislação escrita como respaldo",
  economizar_produtos_higienizacao_diminuir_custo: "Economizar em produtos de higienização para diminuir custo",
};

export function converteGenero(value: number): string {
  return value === 0 ? "Feminino" : "Masculino";
}

export function converteEscolaridade(value: number): string {
  const escolaridadeMap: { [key: number]: string } = {
    1: "Fundamental incompleto",
    2: "Fundamental completo",
    3: "Ensino médio incompleto",
    4: "Ensino médio completo",
    5: "Ensino superior incompleto",
    6: "Ensino superior completo",
  };
  return escolaridadeMap[value] || "Não informado";
}

export function converteSimNao(value: number): string {
  return value === 1 ? "Sim" : "Não";
}

export function converteAvaliacao(value: number): string {
  const avaliacaoMap: { [key: number]: string } = {
    1: "Discordo totalmente",
    2: "Discordo parcialmente",
    3: "Nem discordo nem concordo",
    4: "Concordo parcialmente",
    5: "Concordo totalmente",
  };
  return avaliacaoMap[value] || "Não informado";
}

export function converteRisco(value: number): string {
  const riscoMap: { [key: number]: string } = {
    1: "Extremamente baixo",
    2: "Razoavelmente baixo",
    3: "Pouco baixo",
    4: "Regular",
    5: "Pouco alto",
    6: "Razoavelmente alto",
    7: "Extremamente alto",
  };
  return riscoMap[value] || "Não informado";
}
