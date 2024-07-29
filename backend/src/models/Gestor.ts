export class Gestor {
  informacoes: any;
  id_avaliacao: string;
  data_cadastro: Date;
  data_alteracao: Date;
  ativo: number;

  constructor(informacoes: string, id_avaliacao: string, ativo: number = 1) {
    this.id_avaliacao = id_avaliacao;
    this.informacoes = informacoes;
    this.ativo = ativo;
  }
}
