import { z } from "zod";

export const schema = z
  .object({
    nomeCompleto: z.string().min(1, "O campo nome completo é obrigatório."),
    genero: z.string().min(1, "O campo gênero é obrigatório."),
    idade: z.preprocess(
      (value) => (value === "" ? NaN : Number(value)),
      z
        .number({ invalid_type_error: "O campo idade é obrigatório." })
        .min(18, "A idade deve ser maior que 18 anos.")
        .refine((value) => !isNaN(value), "O campo idade é obrigatório."),
    ),
    escolaridade: z.string().min(1, "O campo escolaridade é obrigatório."),
    formacao: z.string().optional().nullable(),
    naoTenhaFormacaoTemTreinamento: z.string().min(1, "Este campo é obrigatório."),
    tempoTrabalhaComAlimentos: z.preprocess(
      (value) => (value === "" ? NaN : Number(value)),
      z
        .number({ invalid_type_error: "O campo tempo de trabalho com alimentos é obrigatório." })
        .min(1, "Há quanto tempo trabalha com alimentos deve ser maior que 0.")
        .refine((value) => !isNaN(value), "O campo tempo de trabalho com alimentos é obrigatório."),
    ),
    acreditaComunicacaoBoa: z.string().min(1, "Este campo é obrigatório."),
    realizaTreinamentosBoasPraticas: z.string().min(1, "Este campo é obrigatório."),
    cargaHoraria: z.string().nullable().optional(),
    temasTreinamentos: z.string().nullable().optional(),
    adornosContaminacao: z.string().min(1, "Este campo é obrigatório."),
    aguaTransmissaoDoencas: z.string().min(1, "Este campo é obrigatório."),
    higienizacaoMaos: z.string().min(1, "Este campo é obrigatório."),
    contatoAlimentosCruCozido: z.string().min(1, "Este campo é obrigatório."),
    leiteVencido: z.string().min(1, "Este campo é obrigatório."),
    alimentoImproprio: z.string().min(1, "Este campo é obrigatório."),
    carneMalPassada: z.string().min(1, "Este campo é obrigatório."),
    lavagemVegetais: z.string().min(1, "Este campo é obrigatório."),
    descongelamentoAlimentos: z.string().min(1, "Este campo é obrigatório."),
    manipuladorDoente: z.string().min(1, "Este campo é obrigatório."),
    obrigacaoMoral: z.string().min(1, "Este campo é obrigatório."),
    sentirCulpado: z.string().min(1, "Este campo é obrigatório."),
    naoSeriaCerto: z.string().min(1, "Este campo é obrigatório."),
    devoMuito: z.string().min(1, "Este campo é obrigatório."),
    vidaDesestruturada: z.string().min(1, "Este campo é obrigatório."),
    poucasAlternativas: z.string().min(1, "Este campo é obrigatório."),
    dificilDeixarEmprego: z.string().min(1, "Este campo é obrigatório."),
    riscoIntoxicacaoSimilar: z.string().min(1, "Este campo é obrigatório."),
    riscoIntoxicacaoGerencia: z.string().min(1, "Este campo é obrigatório."),
    riscoDoencaGrave: z.string().min(1, "Este campo é obrigatório."),
    modificarLideranca: z.string().min(1, "Este campo é obrigatório."),
    modificarComunicacao: z.string().min(1, "Este campo é obrigatório."),
    modificarSegurancaAlimentos: z.string().min(1, "Este campo é obrigatório."),
    modificarAmbienteTrabalho: z.string().min(1, "Este campo é obrigatório."),
    pressionarManipulador: z.string().min(1, "Este campo é obrigatório."),
    modificarComprometimento: z.string().min(1, "Este campo é obrigatório."),
    melhorarBoasPraticas: z.string().min(1, "Este campo é obrigatório."),
    problemasRestaurante: z.string().min(1, "Este campo é obrigatório."),
    significadoPessoal: z.string().min(1, "Este campo é obrigatório."),
    mereceLealdade: z.string().min(1, "Este campo é obrigatório."),
    necessidadeDesejo: z.string().min(1, "Este campo é obrigatório."),
    dedicarCarreira: z.string().min(1, "Este campo é obrigatório."),
  })
  .refine(
    (data) => {
      if ((data.escolaridade === "5" || data.escolaridade === "6") && !data.formacao) {
        return false;
      }
      return true;
    },
    {
      message: "Formação é obrigatória para escolaridade superior incompleto ou completo.",
      path: ["formacao"],
    },
  )
  .refine(
    (data) => {
      if (data.realizaTreinamentosBoasPraticas === "1" && !data.cargaHoraria) {
        return false;
      }
      return true;
    },
    {
      message: "Frequência de aplicação é obrigatória se realiza treinamentos.",
      path: ["cargaHoraria"],
    },
  )
  .refine(
    (data) => {
      if (data.realizaTreinamentosBoasPraticas === "1" && !data.temasTreinamentos) {
        return false;
      }
      return true;
    },
    {
      message: "Temas de treinamentos são obrigatórios se realiza treinamentos.",
      path: ["temasTreinamentos"],
    },
  );

export type FormSchemaType = z.infer<typeof schema>;
