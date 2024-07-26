export class Resultado {
  id_estabelecimento: string;
  id_triangulacao: string;
  informacoes: any;

  constructor(informacoes: any, id_estabelecimento: string, id_triangulacao: string) {
    this.informacoes = informacoes;
    this.id_estabelecimento = id_estabelecimento;
    this.id_triangulacao = id_triangulacao;
  }
}
