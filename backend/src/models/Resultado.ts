export class Resultado {
  id_avaliacao: string;
  id_estabelecimento: string;
  id_triangulacao: string;
  informacoes: any;

  constructor(informacoes: any, id_avaliacao: string, id_estabelecimento: string, id_triangulacao: string) {
    this.informacoes = informacoes;
    this.id_avaliacao = id_avaliacao;
    this.id_estabelecimento = id_estabelecimento;
    this.id_triangulacao = id_triangulacao;
  }
}
