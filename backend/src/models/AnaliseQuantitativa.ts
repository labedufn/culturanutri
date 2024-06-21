export class AnaliseQuantitativa {
  id_gestor: number;
  id_manipulador_alimentos: number;
  caracteristicas_socio_demograficas: string;
  resultados_avaliacao_quantitativas_csa: string;
  vies_otimista: string;
  ativo: number;

  constructor(
    id_gestor: number,
    id_manipulador_alimentos: number,
    caracteristicas_socio_demograficas: string,
    resultados_avaliacao_quantitativas_csa: string,
    vies_otimista: string,
    ativo: number,
  ) {
    this.id_gestor = id_gestor;
    this.id_manipulador_alimentos = id_manipulador_alimentos;
    this.caracteristicas_socio_demograficas = caracteristicas_socio_demograficas;
    this.resultados_avaliacao_quantitativas_csa = resultados_avaliacao_quantitativas_csa;
    this.vies_otimista = vies_otimista;
    this.ativo = ativo;
  }
}
