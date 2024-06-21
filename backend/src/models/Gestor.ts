export class Gestor {
  informacoes: string;
  data_cadastro: Date;
  data_alteracao: Date;
  ativo: number;

  constructor(informacoes: string, data_cadastro: Date, data_alteracao: Date, ativo: number) {
    this.informacoes = informacoes;
    this.data_cadastro = data_cadastro;
    this.data_alteracao = data_alteracao;
    this.ativo = ativo;
  }
}
