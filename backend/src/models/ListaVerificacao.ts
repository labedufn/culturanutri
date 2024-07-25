export class ListaVerificacao {
  informacoes: any;
  id_estabelecimento: string;
  ativo: number;

  constructor(informacoes: unknown, id_estabelecimento: string, ativo: number) {
    this.informacoes = informacoes;
    this.id_estabelecimento = id_estabelecimento;
    this.ativo = ativo;
  }
}
