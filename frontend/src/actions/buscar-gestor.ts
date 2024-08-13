"use server";

import { apiErro } from "@/api/api-erros";
import { cookies } from "next/headers";
import axios from "axios";
import { BUSCAR_GESTOR } from "@/api/endpoints";

interface DadosIndividuais {
  nome_completo: string;
  genero: number;
  idade: number;
  escolaridade: number;
  formacao: string;
}

interface Conhecimento {
  utilizacao_adornos_favorecer_contaminacao: number;
  agua_veiculo_transmissao_doencas: number;
  forma_higienizar_maos_evita_contaminacao: number;
  contato_alimentos_contamina: number;
  leite_vencimento_risco: number;
  alimento_improprio_apresenta_cheiro_sabor: number;
  carne_mal_passada: number;
  descongelamento_alimentos_bacia: number;
  manipulador_alimento_doente_contamina: number;
}

interface ComprometimentoAfetivo {
  problemas_restaurante_meus: number;
  restaurante_tem_significado: number;
  restaurante_merece_minha_lealdade: number;
  trabalhar_por_necessidade_e_desejo: number;
  dedicar_minha_carreira_ao_restaurante: number;
}

interface ComprometimentoNormativo {
  nao_deixa_emprego_pois_obrigacao_moral: number;
  culpado_deixasse_emprego: number;
  nao_seria_certo_deixar_emprego: number;
  devo_esse_emprego: number;
}

interface ComprometimentoInstrumental {
  deixar_emprego_vida_desestruturada: number;
  poucas_alternativas_caso_deixar_emprego: number;
  muito_dificil_deixar_emprego: number;
}

interface PercepcaoRisco {
  risco_apresentar_dor_barriga_estabelecimento_similar: number;
  risco_apresentar_dor_barriga_estabelecimento_gerenciado: number;
  risco_doenca_transmitida_alimentos: number;
}

interface SistemasGestao {
  lideranca_modificada_consumidor_alta_percepcao_risco: number;
  comunicacao_modificada_consumidor_alta_percepcao_risco: number;
  gerenciar_seguranca_modificada_consumidor_alta_percepcao_risco: number;
  ambiente_trabalho_modificada_consumidor_alta_percepcao_risco: number;
  manipulador_alimentos_modificada_consumidor_alta_percepcao_risco: number;
  comprometimento_modificada_consumidor_alta_percepcao_risco: number;
  boas_praticas_consumidor_alta_percepcao_risco: number;
}

interface InformacoesDecodificadas {
  dados_individuais: DadosIndividuais;
  conhecimento: Conhecimento;
  comprometimento_afetivo: ComprometimentoAfetivo;
  comprometimento_normativo: ComprometimentoNormativo;
  comprometimento_instrumental: ComprometimentoInstrumental;
  percepcao_risco: PercepcaoRisco;
  sistemas_gestao: SistemasGestao;
}

interface Gestor {
  id: string;
  informacoesDecodificadas: InformacoesDecodificadas;
  ativo: number;
}

interface GestorResponse {
  success: boolean;
  data?: Gestor;
  message?: string;
}

export async function buscarGestor(id_gestor: string): Promise<GestorResponse> {
  const cookieData = cookies().get("token");
  const token = cookieData ? cookieData.value : null;

  try {
    const { url } = BUSCAR_GESTOR();
    const response = await axios.get(`${url}?id_gestor=${id_gestor}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const dados = response.data;
    return {
      success: true,
      data: dados,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: apiErro(error),
    };
  }
}
