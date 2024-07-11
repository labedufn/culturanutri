export class ManipuladorAlimento {
  informacoes: any;
  id_estabelecimento: string;
  ativo: number;

  constructor(informacoes: unknown, id_estabelecimento: string, ativo: number = 1) {
    this.informacoes = informacoes;
    this.id_estabelecimento = id_estabelecimento;
    this.ativo = ativo;
  }
}
