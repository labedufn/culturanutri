export class AnaliseQuantitativa {
  id_estabelecimento: string;
  caracteristicas_socio_demograficas: string;
  resultados_avaliacao_quantitativas_csa: string;
  vies_otimista: string;
  ativo: number;

  constructor(
    id_estabelecimento: string,
    caracteristicas_socio_demograficas: string,
    resultados_avaliacao_quantitativas_csa: string,
    vies_otimista: string,
    ativo: number = 1,
  ) {
    this.id_estabelecimento = id_estabelecimento;
    this.caracteristicas_socio_demograficas = caracteristicas_socio_demograficas;
    this.resultados_avaliacao_quantitativas_csa = resultados_avaliacao_quantitativas_csa;
    this.vies_otimista = vies_otimista;
    this.ativo = ativo;
  }
}
