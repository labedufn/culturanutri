export class Triangulacao {
  id_analise_quantitativa: string;
  id_analise_qualitativa: string;
  informacoes: string;
  ativo: number;

  constructor(id_analise_quantitativa: string, id_analise_qualitativa: string, informacoes: string, ativo: number = 1) {
    this.informacoes = informacoes;
    this.id_analise_quantitativa = id_analise_quantitativa;
    this.id_analise_qualitativa = id_analise_qualitativa;
    this.ativo = ativo;
  }
}
