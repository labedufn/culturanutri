export class AnaliseQualitativa {
  id_avaliacao: string;
  informacoes: string;
  ativo: number;

  constructor(id_avaliacao: string, informacoes: string, ativo: number) {
    this.id_avaliacao = id_avaliacao;
    this.informacoes = informacoes;
    this.ativo = ativo;
  }
}
