export class ManipuladorAlimento {
  informacoes: any;
  id_avaliacao: string;
  ativo: number;

  constructor(informacoes: unknown, id_avaliacao: string, ativo: number = 1) {
    this.informacoes = informacoes;
    this.id_avaliacao = id_avaliacao;
    this.ativo = ativo;
  }
}
