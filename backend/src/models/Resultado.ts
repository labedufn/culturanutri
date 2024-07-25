export class Resultado {
  id_estabelecimento: string;
  id_triangulacao: string;
  informacoes: string;

  constructor(informacoes: any, id_estabelecimento: string, id_triangulacao: string) {
    this.id_estabelecimento = id_estabelecimento;
    this.id_triangulacao = id_triangulacao;
    this.informacoes = informacoes;
  }
}
