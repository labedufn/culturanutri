export class Triangulacao {
  id_estabelecimento: string;
  informacoes: string;
  ativo: number;

  constructor(id_estabelecimento: string, informacoes: string, ativo: number = 1) {
    this.id_estabelecimento = id_estabelecimento;
    this.informacoes = informacoes;
    this.ativo = ativo;
  }
}
