export class Gestor {
  informacoes: string;
  id_estabelecimento: number;
  data_cadastro: Date;
  data_alteracao: Date;
  ativo: number;

  constructor(
    informacoes: string,
    id_estabelecimento: number,
    data_cadastro: Date,
    data_alteracao: Date,
    ativo: number,
  ) {
    this.id_estabelecimento = id_estabelecimento;
    this.informacoes = informacoes;
    this.data_cadastro = data_cadastro;
    this.data_alteracao = data_alteracao;
    this.ativo = ativo;
  }
}
