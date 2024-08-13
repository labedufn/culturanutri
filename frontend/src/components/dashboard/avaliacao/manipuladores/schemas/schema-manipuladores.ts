import { z } from "zod";

export const schema = z
  .object({
    // Dados pessoais
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
    participouTreinamento: z.string().min(1, "Este campo é obrigatório."),
    tempoTrabalhaComAlimentos: z.preprocess(
      (value) => (value === "" ? NaN : Number(value)),
      z
        .number({ invalid_type_error: "O campo tempo de trabalho com alimentos é obrigatório." })
        .min(1, "Há quanto tempo trabalha com alimentos deve ser maior que 0.")
        .refine((value) => !isNaN(value), "O campo tempo de trabalho com alimentos é obrigatório."),
    ),
    aberturaComChefe: z.string().min(1, "Este campo é obrigatório."),
    boaComunicacaoEntreFuncionarios: z.string().min(1, "Este campo é obrigatório."),
    // Liderança
    normasHigiene: z.string().min(1, "Este campo é obrigatório."),
    liderAtento: z.string().min(1, "Este campo é obrigatório."),
    funcionariosRepreendidos: z.string().min(1, "Este campo é obrigatório."),
    // Comunicação
    tenhoLiberdadeComLider: z.string().min(1, "Este campo é obrigatório."),
    informacoesNecessariasDisponiveis: z.string().min(1, "Este campo é obrigatório."),
    informacoesAdequadasNormasHigiene: z.string().min(1, "Este campo é obrigatório."),
    fornecerSugestoesMelhoria: z.string().min(1, "Este campo é obrigatório."),
    // Conhecimento
    utilizacaoAdornosFavorecerContaminacao: z.string().min(1, "Este campo é obrigatório."),
    aguaVeiculoTransmissaoDoencas: z.string().min(1, "Este campo é obrigatório."),
    formaHigienizarMaosEvitaContaminacao: z.string().min(1, "Este campo é obrigatório."),
    contatoAlimentosContamina: z.string().min(1, "Este campo é obrigatório."),
    leiteVencimentoRisco: z.string().min(1, "Este campo é obrigatório."),
    alimentoImproprioApresentaCheiroSabor: z.string().min(1, "Este campo é obrigatório."),
    carneMalPassada: z.string().min(1, "Este campo é obrigatório."),
    lavarVegetaisSuficiente: z.string().min(1, "Este campo é obrigatório."),
    descongelamentoAlimentosBacia: z.string().min(1, "Este campo é obrigatório."),
    manipuladorAlimentoDoenteContamina: z.string().min(1, "Este campo é obrigatório."),
    // Comprometimento afetivo
    problemasRestauranteMeus: z.string().min(1, "Este campo é obrigatório."),
    restauranteTemSignificado: z.string().min(1, "Este campo é obrigatório."),
    restauranteMereceMinhaLealdade: z.string().min(1, "Este campo é obrigatório."),
    trabalharPorNecessidadeEDesejo: z.string().min(1, "Este campo é obrigatório."),
    dedicarMinhaCarreiraAoRestaurante: z.string().min(1, "Este campo é obrigatório."),
    // Comprometimento normativo
    naoDeixaEmpregoPoisObrigacaoMoral: z.string().min(1, "Este campo é obrigatório."),
    culpadoDeixasseEmprego: z.string().min(1, "Este campo é obrigatório."),
    naoSeriaCertoDeixarEmprego: z.string().min(1, "Este campo é obrigatório."),
    devoEsseEmprego: z.string().min(1, "Este campo é obrigatório."),
    // Comprometimento instrumental
    deixarEmpregoVidaDesestruturada: z.string().min(1, "Este campo é obrigatório."),
    poucasAlternativasCasoDeixarEmprego: z.string().min(1, "Este campo é obrigatório."),
    muitoDificilDeixarEmprego: z.string().min(1, "Este campo é obrigatório."),
    // Comprometimento com segurança dos alimentos
    sigoNormasHigieneResponsabilidade: z.string().min(1, "Este campo é obrigatório."),
    segurancaAltaPrioridade: z.string().min(1, "Este campo é obrigatório."),
    sigoNormasHigieneImportante: z.string().min(1, "Este campo é obrigatório."),
    empenhadoSeguirNormasHigiene: z.string().min(1, "Este campo é obrigatório."),
    // Percepção de risco
    riscoApresentarDorBarrigaEstabelecimentoSimilar: z.string().min(1, "Este campo é obrigatório."),
    riscoApresentarDorBarrigaEstabelecimentoManipulado: z.string().min(1, "Este campo é obrigatório."),
    riscoApresentarDorBarrigaEstabelecimentoColegaManipulado: z.string().min(1, "Este campo é obrigatório."),
    riscoDoencaTransmitidaAlimentos: z.string().min(1, "Este campo é obrigatório."),
    // Pressões de trabalho e crenças normativas
    chefeSeguirBoasPraticas: z.string().min(1, "Este campo é obrigatório."),
    colegasTrabalhoNormasHigiene: z.string().min(1, "Este campo é obrigatório."),
    autoridadesVigilanciaSanitariaNormasHigiene: z.string().min(1, "Este campo é obrigatório."),
    clientesNormasHigiene: z.string().min(1, "Este campo é obrigatório."),
    tempoSuficienteNormasHigiene: z.string().min(1, "Este campo é obrigatório."),
    numeroFuncionariosAdequadoManipularFormaSegura: z.string().min(1, "Este campo é obrigatório."),
    // Ambiente de trabalho
    equipamentosNecessariosFormaSegura: z.string().min(1, "Este campo é obrigatório."),
    estruturaAdequadaNormasHigiene: z.string().min(1, "Este campo é obrigatório."),
    produtosHigienizacaoAdequadosManipulacaoAlimentos: z.string().min(1, "Este campo é obrigatório."),
    // Sistemas de gestão
    cooperacaoEntreAreasFormaSegura: z.string().min(1, "Este campo é obrigatório."),
    novosFuncionariosAntigosFuncionariosBoaPraticaManipulacaoAlimentos: z.string().min(1, "Este campo é obrigatório."),
    muitoTrabalhoRapidamenteFuncionariosTrabalhamJuntos: z.string().min(1, "Este campo é obrigatório."),
    funcionariosLembramSeguirBoasPraticasManipulacaoAlimentos: z.string().min(1, "Este campo é obrigatório."),
    acreditoLegislacaoEscritaRespaldo: z.string().min(1, "Este campo é obrigatório."),
    economizarProdutosHigienizacaoDiminuirCusto: z.string().min(1, "Este campo é obrigatório."),
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
  );

export type FormSchemaType = z.infer<typeof schema>;
