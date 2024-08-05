import { FormSchemaType } from "../../gestores/schemas/schema-manipuladores";

export function getStoredValuesManipulador(): Partial<FormSchemaType> {
  if (typeof window === "undefined") {
    return {};
  }

  return {
    nomeCompleto: localStorage.getItem("nomeCompletoManipulador") || "",
    genero: localStorage.getItem("generoManipulador") || "",
    idade: localStorage.getItem("idadeManipulador") ? Number(localStorage.getItem("idadeManipulador")) : undefined,
    escolaridade: localStorage.getItem("escolaridadeManipulador") || "",
    formacao: localStorage.getItem("formacaoManipulador") || "",
    participouTreinamento: localStorage.getItem("participouTreinamentoManipulador") || "",
    tempoTrabalhoAnos: localStorage.getItem("tempoTrabalhoAnosManipulador")
      ? Number(localStorage.getItem("tempoTrabalhoAnosManipulador"))
      : undefined,
    tempoTrabalhoMeses: localStorage.getItem("tempoTrabalhoMesesManipulador")
      ? Number(localStorage.getItem("tempoTrabalhoMesesManipulador"))
      : undefined,
    aberturaComChefe: localStorage.getItem("aberturaComChefeManipulador") || "",
    boaComunicacaoEntreFuncionarios: localStorage.getItem("boaComunicacaoEntreFuncionariosManipulador") || "",
    normasHigiene: localStorage.getItem("normasHigieneManipulador") || "",
    liderAtento: localStorage.getItem("liderAtentoManipulador") || "",
    funcionariosRepreendidos: localStorage.getItem("funcionariosRepreendidosManipulador") || "",
    tenhoLiberdadeComLider: localStorage.getItem("tenhoLiberdadeComLiderManipulador") || "",
    informacoesNecessariasDisponiveis: localStorage.getItem("informacoesNecessariasDisponiveisManipulador") || "",
    informacoesAdequadasNormasHigiene: localStorage.getItem("informacoesAdequadasNormasHigieneManipulador") || "",
    fornecerSugestoesMelhoria: localStorage.getItem("fornecerSugestoesMelhoriaManipulador") || "",
    utilizacaoAdornosFavorecerContaminacao:
      localStorage.getItem("utilizacaoAdornosFavorecerContaminacaoManipulador") || "",
    aguaVeiculoTransmissaoDoencas: localStorage.getItem("aguaVeiculoTransmissaoDoencasManipulador") || "",
    formaHigienizarMaosEvitaContaminacao: localStorage.getItem("formaHigienizarMaosEvitaContaminacaoManipulador") || "",
    contatoAlimentosContamina: localStorage.getItem("contatoAlimentosContaminaManipulador") || "",
    leiteVencimentoRisco: localStorage.getItem("leiteVencimentoRiscoManipulador") || "",
    alimentoImproprioApresentaCheiroSabor:
      localStorage.getItem("alimentoImproprioApresentaCheiroSaborManipulador") || "",
    carneMalPassada: localStorage.getItem("carneMalPassadaManipulador") || "",
    lavarVegetaisSuficiente: localStorage.getItem("lavarVegetaisSuficienteManipulador") || "",
    descongelamentoAlimentosBacia: localStorage.getItem("descongelamentoAlimentosBaciaManipulador") || "",
    manipuladorAlimentoDoenteContamina: localStorage.getItem("manipuladorAlimentoDoenteContaminaManipulador") || "",
    problemasRestauranteMeus: localStorage.getItem("problemasRestauranteMeusManipulador") || "",
    restauranteTemSignificado: localStorage.getItem("restauranteTemSignificadoManipulador") || "",
    restauranteMereceMinhaLealdade: localStorage.getItem("restauranteMereceMinhaLealdadeManipulador") || "",
    trabalharPorNecessidadeEDesejo: localStorage.getItem("trabalharPorNecessidadeEDesejoManipulador") || "",
    dedicarMinhaCarreiraAoRestaurante: localStorage.getItem("dedicarMinhaCarreiraAoRestauranteManipulador") || "",
    naoDeixaEmpregoPoisObrigacaoMoral: localStorage.getItem("naoDeixaEmpregoPoisObrigacaoMoralManipulador") || "",
    culpadoDeixasseEmprego: localStorage.getItem("culpadoDeixasseEmpregoManipulador") || "",
    naoSeriaCertoDeixarEmprego: localStorage.getItem("naoSeriaCertoDeixarEmpregoManipulador") || "",
    devoEsseEmprego: localStorage.getItem("devoEsseEmpregoManipulador") || "",
    deixarEmpregoVidaDesestruturada: localStorage.getItem("deixarEmpregoVidaDesestruturadaManipulador") || "",
    poucasAlternativasCasoDeixarEmprego: localStorage.getItem("poucasAlternativasCasoDeixarEmpregoManipulador") || "",
    muitoDificilDeixarEmprego: localStorage.getItem("muitoDificilDeixarEmpregoManipulador") || "",
    sigoNormasHigieneResponsabilidade: localStorage.getItem("sigoNormasHigieneResponsabilidadeManipulador") || "",
    segurancaAltaPrioridade: localStorage.getItem("segurancaAltaPrioridadeManipulador") || "",
    sigoNormasHigieneImportante: localStorage.getItem("sigoNormasHigieneImportanteManipulador") || "",
    empenhadoSeguirNormasHigiene: localStorage.getItem("empenhadoSeguirNormasHigieneManipulador") || "",
    riscoApresentarDorBarrigaEstabelecimentoSimilar:
      localStorage.getItem("riscoApresentarDorBarrigaEstabelecimentoSimilarManipulador") || "",
    riscoApresentarDorBarrigaEstabelecimentoManipulado:
      localStorage.getItem("riscoApresentarDorBarrigaEstabelecimentoManipuladoManipulador") || "",
    riscoApresentarDorBarrigaEstabelecimentoColegaManipulado:
      localStorage.getItem("riscoApresentarDorBarrigaEstabelecimentoColegaManipuladoManipulador") || "",
    riscoDoencaTransmitidaAlimentos: localStorage.getItem("riscoDoencaTransmitidaAlimentosManipulador") || "",
    chefeSeguirBoasPraticas: localStorage.getItem("chefeSeguirBoasPraticasManipulador") || "",
    colegasTrabalhoNormasHigiene: localStorage.getItem("colegasTrabalhoNormasHigieneManipulador") || "",
    autoridadesVigilanciaSanitariaNormasHigiene:
      localStorage.getItem("autoridadesVigilanciaSanitariaNormasHigieneManipulador") || "",
    clientesNormasHigiene: localStorage.getItem("clientesNormasHigieneManipulador") || "",
    tempoSuficienteNormasHigiene: localStorage.getItem("tempoSuficienteNormasHigieneManipulador") || "",
    numeroFuncionariosAdequadoManipularFormaSegura:
      localStorage.getItem("numeroFuncionariosAdequadoManipularFormaSeguraManipulador") || "",
    equipamentosNecessariosFormaSegura: localStorage.getItem("equipamentosNecessariosFormaSeguraManipulador") || "",
    estruturaAdequadaNormasHigiene: localStorage.getItem("estruturaAdequadaNormasHigieneManipulador") || "",
    produtosHigienizacaoAdequadosManipulacaoAlimentos:
      localStorage.getItem("produtosHigienizacaoAdequadosManipulacaoAlimentosManipulador") || "",
    cooperacaoEntreAreasFormaSegura: localStorage.getItem("cooperacaoEntreAreasFormaSeguraManipulador") || "",
    novosFuncionariosAntigosFuncionariosBoaPraticaManipulacaoAlimentos:
      localStorage.getItem("novosFuncionariosAntigosFuncionariosBoaPraticaManipulacaoAlimentosManipulador") || "",
    muitoTrabalhoRapidamenteFuncionariosTrabalhamJuntos:
      localStorage.getItem("muitoTrabalhoRapidamenteFuncionariosTrabalhamJuntosManipulador") || "",
    funcionariosLembramSeguirBoasPraticasManipulacaoAlimentos:
      localStorage.getItem("funcionariosLembramSeguirBoasPraticasManipulacaoAlimentosManipulador") || "",
    acreditoLegislacaoEscritaRespaldo: localStorage.getItem("acreditoLegislacaoEscritaRespaldoManipulador") || "",
    economizarProdutosHigienizacaoDiminuirCusto:
      localStorage.getItem("economizarProdutosHigienizacaoDiminuirCustoManipulador") || "",
  };
}
