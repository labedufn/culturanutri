export class ManipuladorAlimento {
  informacoes: string;
  id_estabelecimento: string;
  ativo: number;

  constructor(informacoes: string, id_estabelecimento: string, ativo: number = 1) {
    this.informacoes = informacoes;
    this.id_estabelecimento = id_estabelecimento;
    this.ativo = ativo;
  }
}
