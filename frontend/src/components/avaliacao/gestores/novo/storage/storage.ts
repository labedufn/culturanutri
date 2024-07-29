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
  };
}
