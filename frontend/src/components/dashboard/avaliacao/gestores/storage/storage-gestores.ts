import { FormSchemaType } from "../../gestores/schemas/schema-gestores";

export function getStoredValuesGestor(): Partial<FormSchemaType> {
  if (typeof window === "undefined") {
    return {};
  }

  return {
    nomeCompleto: localStorage.getItem("nomeCompletoGestor") || "",
    genero: localStorage.getItem("generoGestor") || "",
    idade: localStorage.getItem("idadeGestor") ? Number(localStorage.getItem("idadeGestor")) : undefined,
    escolaridade: localStorage.getItem("escolaridadeGestor") || "",
    formacao: localStorage.getItem("formacaoGestor") || "",
    naoTenhaFormacaoTemTreinamento: localStorage.getItem("naoTenhaFormacaoTemTreinamentoGestor") || "",
    tempoTrabalhaComAlimentos: localStorage.getItem("tempoTrabalhaComAlimentosGestor")
      ? Number(localStorage.getItem("tempoTrabalhaComAlimentosGestor"))
      : undefined,
    acreditaComunicacaoBoa: localStorage.getItem("acreditaComunicacaoBoaGestor") || "",
    realizaTreinamentosBoasPraticas: localStorage.getItem("realizaTreinamentosBoasPraticasGestor") || "",
    cargaHoraria: localStorage.getItem("cargaHorariaGestor") || "",
    temasTreinamentos: localStorage.getItem("temasTreinamentosGestor") || "",
    adornosContaminacao: localStorage.getItem("adornosContaminacaoGestor") || "",
    aguaTransmissaoDoencas: localStorage.getItem("aguaTransmissaoDoencasGestor") || "",
    higienizacaoMaos: localStorage.getItem("higienizacaoMaosGestor") || "",
    contatoAlimentosCruCozido: localStorage.getItem("contatoAlimentosCruCozidoGestor") || "",
    leiteVencido: localStorage.getItem("leiteVencidoGestor") || "",
    alimentoImproprio: localStorage.getItem("alimentoImproprioGestor") || "",
    carneMalPassada: localStorage.getItem("carneMalPassadaGestor") || "",
    lavagemVegetais: localStorage.getItem("lavagemVegetaisGestor") || "",
    descongelamentoAlimentos: localStorage.getItem("descongelamentoAlimentosGestor") || "",
    manipuladorDoente: localStorage.getItem("manipuladorDoenteGestor") || "",
    obrigacaoMoral: localStorage.getItem("obrigacaoMoralGestor") || "",
    sentirCulpado: localStorage.getItem("sentirCulpadoGestor") || "",
    naoSeriaCerto: localStorage.getItem("naoSeriaCertoGestor") || "",
    devoMuito: localStorage.getItem("devoMuitoGestor") || "",
    vidaDesestruturada: localStorage.getItem("vidaDesestruturadaGestor") || "",
    poucasAlternativas: localStorage.getItem("poucasAlternativasGestor") || "",
    dificilDeixarEmprego: localStorage.getItem("dificilDeixarEmpregoGestor") || "",
    riscoIntoxicacaoSimilar: localStorage.getItem("riscoIntoxicacaoSimilarGestor") || "",
    riscoIntoxicacaoGerencia: localStorage.getItem("riscoIntoxicacaoGerenciaGestor") || "",
    riscoDoencaGrave: localStorage.getItem("riscoDoencaGraveGestor") || "",
    modificarLideranca: localStorage.getItem("modificarLiderancaGestor") || "",
    modificarComunicacao: localStorage.getItem("modificarComunicacaoGestor") || "",
    modificarSegurancaAlimentos: localStorage.getItem("modificarSegurancaAlimentosGestor") || "",
    modificarAmbienteTrabalho: localStorage.getItem("modificarAmbienteTrabalhoGestor") || "",
    pressionarManipulador: localStorage.getItem("pressionarManipuladorGestor") || "",
    modificarComprometimento: localStorage.getItem("modificarComprometimentoGestor") || "",
    melhorarBoasPraticas: localStorage.getItem("melhorarBoasPraticasGestor") || "",
    problemasRestaurante: localStorage.getItem("problemasRestauranteGestor") || "",
    significadoPessoal: localStorage.getItem("significadoPessoalGestor") || "",
    mereceLealdade: localStorage.getItem("mereceLealdadeGestor") || "",
    necessidadeDesejo: localStorage.getItem("necessidadeDesejoGestor") || "",
    dedicarCarreira: localStorage.getItem("dedicarCarreiraGestor") || "",
  };
}
