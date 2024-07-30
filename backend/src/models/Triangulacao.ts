export class Triangulacao {
  id_avaliacao: string;
  informacoes: string;
  ativo: number;

  constructor(id_avaliacao: string, informacoes: string, ativo: number = 1) {
    this.id_avaliacao = id_avaliacao;
    this.informacoes = informacoes;
    this.ativo = ativo;
  }
}
