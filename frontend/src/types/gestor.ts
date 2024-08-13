export type DadosIndividuais = {
  nome_completo: string;
  genero: number;
  idade: number;
  escolaridade: number;
  formacao: string;
  nao_tenha_formacao_tem_treinamento: number;
  tempo_trabalha_com_alimentos: number;
  acredita_comunicacao_boa: number;
  realiza_treinamentos_boas_praticas_manipulacao: number;
  carga_horaria: string;
  frequencia_aplicacao: number;
  temas_treinamentos: string;
};

export type Conhecimento = {
  utilizacao_adornos_favorecer_contaminacao: number;
  agua_veiculo_transmissao_doencas: number;
  forma_higienizar_maos_evita_contaminacao: number;
  contato_alimentos_contamina: number;
  leite_vencimento_risco: number;
  alimento_improprio_apresenta_cheiro_sabor: number;
  carne_mal_passada: number;
  descongelamento_alimentos_bacia: number;
  manipulador_alimento_doente_contamina: number;
};

export type ComprometimentoAfetivo = {
  problemas_restaurante_meus: number;
  restaurante_tem_significado: number;
  restaurante_merece_minha_lealdade: number;
  trabalhar_por_necessidade_e_desejo: number;
  dedicar_minha_carreira_ao_restaurante: number;
};

export type ComprometimentoNormativo = {
  nao_deixa_emprego_pois_obrigacao_moral: number;
  culpado_deixasse_emprego: number;
  nao_seria_certo_deixar_emprego: number;
  devo_esse_emprego: number;
};

export type ComprometimentoInstrumental = {
  deixar_emprego_vida_desestruturada: number;
  poucas_alternativas_caso_deixar_emprego: number;
  muito_dificil_deixar_emprego: number;
};

export type PercepcaoRisco = {
  risco_apresentar_dor_barriga_estabelecimento_similar: number;
  risco_apresentar_dor_barriga_estabelecimento_gerenciado: number;
  risco_doenca_transmitida_alimentos: number;
};

export type SistemasGestao = {
  lideranca_modificada_consumidor_alta_percepcao_risco: number;
  comunicacao_modificada_consumidor_alta_percepcao_risco: number;
  gerenciar_seguranca_modificada_consumidor_alta_percepcao_risco: number;
  ambiente_trabalho_modificada_consumidor_alta_percepcao_risco: number;
  manipulador_alimentos_modificada_consumidor_alta_percepcao_risco: number;
  comprometimento_modificada_consumidor_alta_percepcao_risco: number;
  boas_praticas_consumidor_alta_percepcao_risco: number;
};

export type Gestor = {
  id: string;
  id_avaliacao: string;
  informacoes: {
    dados_individuais: DadosIndividuais;
    conhecimento: Conhecimento;
    comprometimento_afetivo: ComprometimentoAfetivo;
    comprometimento_normativo: ComprometimentoNormativo;
    comprometimento_instrumental: ComprometimentoInstrumental;
    percepcao_risco: PercepcaoRisco;
    sistemas_gestao: SistemasGestao;
  };
  ativo: number;
};

export const labelsDadosIndividuais: { [key in keyof DadosIndividuais]: string } = {
  nome_completo: "Nome completo",
  genero: "Gênero",
  idade: "Idade",
  escolaridade: "Escolaridade",
  formacao: "Formação (faculdade)",
  nao_tenha_formacao_tem_treinamento: "Participou de treinamento para manipulação de alimentos?",
  tempo_trabalha_com_alimentos: "Há quanto tempo trabalha com alimentos?",
  acredita_comunicacao_boa: "Você acredita que a comunicação entre os funcionários é boa?",
  realiza_treinamentos_boas_praticas_manipulacao:
    "Você realiza treinamentos com os funcionários a respeito de Boas práticas de manipulação?",
  carga_horaria: "Qual a carga horária, em média, por treinamento?",
  frequencia_aplicacao: "Qual a frequência de aplicação?",
  temas_treinamentos: "Quais temas costuma abordar nos treinamentos?",
};

export const labelsConhecimento: { [key in keyof Conhecimento]: string } = {
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
  descongelamento_alimentos_bacia:
    "O descongelamento de alimentos pode ser feito em uma bacia com ou sem água sobre a pia, mesa ou bancada?",
  manipulador_alimento_doente_contamina:
    "O manipulador de alimento com doenças como: diarreia, gripe e dor de garganta, representa risco para a contaminação de alimentos?",
};

export const labelsComprometimentoAfetivo: { [key in keyof ComprometimentoAfetivo]: string } = {
  problemas_restaurante_meus: "Eu realmente sinto os problemas do restaurante como se fossem meus",
  restaurante_tem_significado: "Este restaurante tem um imenso significado pessoal para mim",
  restaurante_merece_minha_lealdade: "Este restaurante merece minha lealdade",
  trabalhar_por_necessidade_e_desejo:
    "Na situação atual, trabalhar nesse restaurante é tanto uma necessidade quanto um desejo",
  dedicar_minha_carreira_ao_restaurante: "Eu seria muito feliz em dedicar o resto da minha carreira nesse restaurante",
};

export const labelsComprometimentoNormativo: { [key in keyof ComprometimentoNormativo]: string } = {
  nao_deixa_emprego_pois_obrigacao_moral:
    "Eu não deixaria meu emprego agora porque eu tenho uma obrigação moral com as pessoas daqui",
  culpado_deixasse_emprego: "Eu me sentiria culpado se deixasse meu emprego agora",
  nao_seria_certo_deixar_emprego:
    "Mesmo se fosse vantagem para mim, eu sinto que não seria certo deixar meu emprego agora",
  devo_esse_emprego: "Eu devo muito a esse meu emprego",
};

export const labelsComprometimentoInstrumental: { [key in keyof ComprometimentoInstrumental]: string } = {
  deixar_emprego_vida_desestruturada:
    "Se eu decidisse deixar meu emprego agora, minha vida ficaria bastante desestruturada",
  poucas_alternativas_caso_deixar_emprego: "Eu acho que teria poucas alternativas se deixasse este emprego",
  muito_dificil_deixar_emprego: "Mesmo se eu quisesse, seria muito difícil para mim deixar meu emprego agora",
};

export const labelsPercepcaoRisco: { [key in keyof PercepcaoRisco]: string } = {
  risco_apresentar_dor_barriga_estabelecimento_similar:
    "Qual o risco do cliente apresentar dor de barriga e/ou vômitos (intoxicação alimentar) após comer uma refeição preparada por um manipulador de alimentos no estabelecimento similar ao que você gerencia (que tenha estrutura, cardápio, tamanho e funcionamento similar ao seu)?",
  risco_apresentar_dor_barriga_estabelecimento_gerenciado:
    "Qual o risco do cliente apresentar dor de barriga e/ou vômitos (intoxicação alimentar) após comer uma refeição preparada no estabelecimento que você gerencia?",
  risco_doenca_transmitida_alimentos:
    "Se o cliente consumir um alimento contaminado qual o risco que uma doença transmitida por alimentos pode ser grave ou letal a ele?",
};

export const labelsSistemasGestao: { [key in keyof SistemasGestao]: string } = {
  lideranca_modificada_consumidor_alta_percepcao_risco:
    "A forma de liderança deve ser modificada somente quando o consumidor tem alta percepção de risco de doenças transmitidas por alimentos",
  comunicacao_modificada_consumidor_alta_percepcao_risco:
    "A forma de comunicação deve ser modificada somente quando o consumidor tem alta percepção de risco de doenças transmitidas por alimentos",
  gerenciar_seguranca_modificada_consumidor_alta_percepcao_risco:
    "A forma de gerenciar a segurança dos alimentos deve ser modificada somente quando o consumidor tem alta percepção de risco de doenças transmitidas por alimentos",
  ambiente_trabalho_modificada_consumidor_alta_percepcao_risco:
    "O ambiente de trabalho deve ser modificado somente quando o consumidor tem alta percepção de risco de doenças transmitidas por alimentos",
  manipulador_alimentos_modificada_consumidor_alta_percepcao_risco:
    "O manipulador de alimentos deve ser mais pressionado somente quando o consumidor tem alta percepção de risco de doenças transmitidas por alimentos",
  comprometimento_modificada_consumidor_alta_percepcao_risco:
    "O comprometimento dos manipuladores deve ser modificado somente quando o consumidor tem alta percepção de risco de doenças transmitidas por alimentos",
  boas_praticas_consumidor_alta_percepcao_risco:
    "As boas práticas devem ser melhoradas somente quando o consumidor tem alta percepção de risco de doenças transmitidas por alimentos",
};

export function converteSimNao(value: number | string): string {
  if (value === 1) return "Sim";
  if (value === 0) return "Não";
  return "Não informado";
}

export function converteFrequenciaAplicacao(value: number | string): string {
  const frequenciaMap: { [key: number]: string } = {
    1: "Diário",
    2: "Semanal",
    3: "Quinzenal",
    4: "Mensal",
    5: "Trimestral",
    6: "Semestral",
    7: "Anual",
    8: "A cada 2 anos",
    9: "A cada 3 anos ou mais",
    10: "Só fez uma vez",
  };
  return frequenciaMap[value as number] || "Não informado";
}

export function converteAvaliacao(value: number | string): string {
  const avaliacaoMap: { [key: number]: string } = {
    1: "Discordo totalmente",
    2: "Discordo parcialmente",
    3: "Nem discordo nem concordo",
    4: "Concordo parcialmente",
    5: "Concordo totalmente",
  };
  return avaliacaoMap[value as number] || "Não informado";
}

export function converteRisco(value: number | string): string {
  const riscoMap: { [key: number]: string } = {
    1: "Extremamente baixo",
    2: "Razoavelmente baixo",
    3: "Pouco baixo",
    4: "Regular",
    5: "Pouco alto",
    6: "Razoavelmente alto",
    7: "Extremamente alto",
  };
  return riscoMap[value as number] || "Não informado";
}

export function converteGenero(value: number | string): string {
  if (value === 1) return "Masculino";
  if (value === 0) return "Feminino";
  return "Não informado";
}

export function converteEscolaridade(value: number | string): string {
  const escolaridadeMap: { [key: number]: string } = {
    1: "Ensino fundamental incompleto",
    2: "Ensino fundamental completo",
    3: "Ensino médio incompleto",
    4: "Ensino médio completo",
    5: "Ensino superior incompleto",
    6: "Ensino superior completo",
  };
  return escolaridadeMap[value as number] || "Não informado";
}
