export class ListaVerificacao {
  informacoes: any;
  id_avaliacao: string;
  ativo: number;

  constructor(informacoes: unknown, id_avaliacao: string, ativo: number) {
    this.informacoes = informacoes;
    this.id_avaliacao = id_avaliacao;
    this.ativo = ativo;
  }
}
