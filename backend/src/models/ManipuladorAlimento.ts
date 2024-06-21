export class ManipuladorAlimento {
  informacoes: string;
  ativo: number;

  constructor(informacoes: string, data_cadastro: Date, data_alteracao: Date, ativo: number) {
    this.informacoes = informacoes;
    this.ativo = ativo;
  }
}
