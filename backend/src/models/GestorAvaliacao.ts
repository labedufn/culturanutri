export class GestorAvaliacao {
  id_estabelecimento: string;
  informacoes: string;
  ativo: number;

  constructor(informacoes: string, ativo: number, id_estabelecimento: string) {
    this.id_estabelecimento = id_estabelecimento;
    this.informacoes = informacoes;
    this.ativo = ativo;
  }
}
