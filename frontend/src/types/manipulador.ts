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

export interface Lideranca {
  normas_higiene: number;
  lider_atento: number;
  funcionarios_repreendidos: number;
}

export interface Comunicacao {
  tenho_liberdade_com_lider: number;
  informacoes_necessarias_disponiveis: number;
  informacoes_adequadas_normas_higiene: number;
  fornecer_sugestoes_melhoria: number;
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
    lideranca: Lideranca;
    comunicacao: Comunicacao;
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
  participou_treinamento_manipulacao_alimentos: "Participou de treinamento para manipulação de alimentos?",
  tempo_trabalha_com_alimentos: "Há quanto tempo trabalha com alimentos? (meses)",
  boa_comunicacao_chefe: "Você tem abertura de conversar com seu chefe sobre os problemas do restaurante?",
  boa_comunicacao_entre_funcionarios: "Você acredita que a comunicação entre os funcionários é boa?",
};

export const labelsLideranca = {
  normas_higiene: "A gestão impõe normas de higiene para todos os funcionários",
  lider_atento:
    "O meu líder está sempre atento para ver se os funcionários estão praticando as boas práticas de manipulação de alimentos",
  funcionarios_repreendidos:
    "Os funcionários são repreendidos quando não seguem as boas práticas de manipulação de alimentos",
};

export const labelsComunicacao = {
  tenho_liberdade_com_lider:
    "Eu tenho liberdade de falar com o meu líder se eu ver algo que pode afetar a segurança dos alimentos",
  informacoes_necessarias_disponiveis:
    "Todas as informações necessárias para a manipulação de alimentos de forma segura são prontamente disponíveis para mim",
  informacoes_adequadas_normas_higiene:
    "O líder fornece informações adequadas e atualizadas sobre as normas de higiene",
  fornecer_sugestoes_melhoria:
    "Sinto-me encorajado a fornecer sugestões para a melhoria das práticas de segurança dos alimentos",
};

export const labelsConhecimento = {
  utilizacao_adornos_favorecer_contaminacao:
    "A utilização de adornos como: brincos, anéis, aliança, relógio e outros, pode favorecer a contaminação dos alimentos?",
  agua_veiculo_transmissao_doencas:
    "A água pode ser veículo de transmissão de doenças, porém ao ser transformada em gelo o risco da transmissão de doenças é menor?",
  forma_higienizar_maos_evita_contaminacao:
    "A forma de higienizar as mãos, para evitar a contaminação de alimentos, consiste em molhar as mãos em água corrente, utilizar detergente neutro e secar com papel?",
  contato_alimentos_contamina:
    "O contato entre alimentos crus e cozidos, como utilizar alface na decoração de porções fritas, possibilita a contaminação desses alimentos?",
  leite_vencimento_risco: "Utilizar leite um dia após a data de seu vencimento traz riscos à saúde?",
  alimento_improprio_apresenta_cheiro_sabor:
    "O alimento impróprio para consumo sempre apresenta cheiro ruim e sabor de estragado?",
  carne_mal_passada:
    "O consumo de carne mal passada pode levar a doenças transmitidas por alimentos que podem causar vômitos e diarreia?",
  lavar_vegetais_suficiente:
    "Lavar os vegetais e deixá-los de molho na água com vinagre é suficiente para esse alimento ser seguro para o consumo?",
  descongelamento_alimentos_bacia:
    "O descongelamento de alimentos pode ser feito em uma bacia com ou sem água sobre a pia, mesa ou bancada?",
  manipulador_alimento_doente_contamina:
    "O manipulador de alimento com doenças como: diarreia, gripe e dor de garganta, representa risco para a contaminação de alimentos?",
};

export const labelsComprometimentoAfetivo = {
  problemas_restaurante_meus: "Eu realmente sinto os problemas do restaurante como se fossem meus",
  restaurante_tem_significado: "Este restaurante tem um imenso significado pessoal para mim",
  restaurante_merece_minha_lealdade: "Este restaurante merece minha lealdade",
  trabalhar_por_necessidade_e_desejo:
    "Na situação atual, trabalhar nesse restaurante é tanto uma necessidade quanto um desejo",
  dedicar_minha_carreira_ao_restaurante: "Eu seria muito feliz em dedicar o resto da minha carreira nesse restaurante",
};

export const labelsComprometimentoNormativo = {
  nao_deixa_emprego_pois_obrigacao_moral:
    "Eu não deixaria meu emprego agora porque eu tenho uma obrigação moral com as pessoas daqui",
  culpado_deixasse_emprego: "Eu me sentiria culpado se deixasse meu emprego agora",
  nao_seria_certo_deixar_emprego:
    "Mesmo se fosse vantagem para mim, eu sinto que não seria certo deixar meu emprego agora",
  devo_esse_emprego: "Eu devo muito a esse meu emprego",
};

export const labelsComprometimentoInstrumental = {
  deixar_emprego_vida_desestruturada:
    "Se eu decidisse deixar meu emprego agora, minha vida ficaria bastante desestruturada",
  poucas_alternativas_caso_deixar_emprego: "Eu acho que teria poucas alternativas se deixasse este emprego",
  muito_dificil_deixar_emprego: "Mesmo se eu quisesse, seria muito difícil para mim deixar meu emprego agora",
};

export const labelsComprometimentoSegurancaAlimentos = {
  sigo_normas_higiene_responsabilidade: "Eu sigo as normas de higiene porque é minha responsabilidade",
  seguranca_alta_prioridade: "A segurança dos alimentos é uma alta prioridade para mim",
  sigo_normas_higiene_importante: "Eu sigo as normas de higiene, porque eu acho que elas são importantes",
  empenhado_seguir_normas_higiene: "Estou empenhado em seguir todas as normas de higiene",
};

export const labelsPercepcaoRisco = {
  risco_apresentar_dor_barriga_estabelecimento_similar:
    "Qual o risco do cliente apresentar dor de barriga e/ou vômitos (intoxicação alimentar) após comer uma refeição preparada por um manipulador de alimentos similar a você (que. tenha idade similar a sua e tenha participado da mesma quantidade de treinamentos que você), mas que trabalha em outra empresa?",
  risco_apresentar_dor_barriga_estabelecimento_manipulado:
    "Qual o risco do cliente apresentar dor de barriga e/ou vômitos (intoxicação alimentar) após comer uma refeição preparada por você?",
  risco_apresentar_dor_barriga_estabelecimento_colega_manipulado:
    "Qual o risco do cliente apresentar dor de barriga e/ou vômitos (intoxicação alimentar) após consumir uma refeição preparada por um colega seu (manipulador de alimentos que trabalhe no mesmo local que você)?",
  risco_doenca_transmitida_alimentos:
    "Se o cliente consumir um alimento contaminado qual o risco que uma doença transmitida por alimentos pode ser grave ou letal a ele?",
};

export const labelsPressoesTrabalho = {
  chefe_seguir_boas_praticas:
    "Meu chefe acha que eu devo seguir as boas práticas de manipulação em todas as minhas tarefas",
  colegas_trabalho_normas_higiene:
    "Meus colegas de trabalho acham que eu devo seguir as normas de higiene em todas as minhas tarefas",
  autoridades_vigilancia_sanitaria_normas_higiene:
    "As autoridades da vigilância sanitária acham que eu devo seguir as normas de higiene em todas as minhas tarefas",
  clientes_normas_higiene:
    "Os clientes desse estabelecimento acham que eu devo seguir as normas de higiene em todas as minhas tarefas",
  tempo_suficiente_normas_higiene:
    "Eu sempre tenho tempo suficiente para seguir as normas de higiene, mesmo durante as horas de fluxo intenso de trabalho",
  numero_funcionarios_adequado_manipular_forma_segura:
    "O número de funcionários programado é adequado para eu fazer o meu trabalho e manipular os alimentos de forma segura",
};

export const labelsAmbienteTrabalho = {
  equipamentos_necessarios_forma_segura:
    "Tenho equipamentos e utensílios necessários para preparar os alimentos de forma segura",
  estrutura_adequada_normas_higiene: "A estrutura da cozinha é adequada para seguir as normas de higiene",
  produtos_higienizacao_adequados_manipulacao_alimentos:
    "Tenho os produtos para higienização adequados para realizar as boas práticas de manipulação de alimentos",
};

export const labelsSistemasGestao = {
  cooperacao_entre_areas_forma_segura:
    "Existe uma boa cooperação entre as áreas para garantir que os consumidores recebam alimentos preparados de forma segura",
  novos_funcionarios_antigos_funcionarios_boa_pratica_manipulacao_alimentos:
    "Os novos funcionários e empregados experientes trabalham em conjunto para garantir as boas práticas de manipulação de alimentos",
  muito_trabalho_rapidamente_funcionarios_trabalham_juntos:
    "Quando há muito trabalho a ser feito rapidamente, os funcionários trabalham juntos como uma equipe para obter as tarefas concluídas com segurança",
  funcionarios_lembram_seguir_boas_praticas_manipulacao_alimentos:
    "Os funcionários lembram um ao outro sobre seguir as boas práticas de manipulação de alimentos",
  acredito_legislacao_escrita_respaldo:
    "Eu acredito que a legislação escrita seja nada mais do que um respaldo para processos judiciais",
  economizar_produtos_higienizacao_diminuir_custo:
    "Às vezes temos que economizar em produtos para higienização para diminuir o custo da produção",
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
