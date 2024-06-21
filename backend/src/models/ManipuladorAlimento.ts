export class ManipuladorAlimento {
  id_estabelecimento: string;
  informacoes: string;
  data_cadastro: Date;
  data_alteracao: Date;
  ativo: number;

  constructor(
    informacoes: string,
    data_cadastro: Date,
    data_alteracao: Date,
    ativo: number,
    id_estabelecimento: string,
  ) {
    this.id_estabelecimento = id_estabelecimento;
    this.informacoes = informacoes;
    this.data_cadastro = data_cadastro;
    this.data_alteracao = data_alteracao;
    this.ativo = ativo;
  }
}
