import { FormSchemaType } from "../../schemas/validation-schema";

export function getStoredValues(): Partial<FormSchemaType> {
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
  };
}
