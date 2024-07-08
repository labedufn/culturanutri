export class AnaliseQuanlitativa {
  id_estabelecimento: string;
  informacoes: string;
  ativo: number;

  constructor(id_estabelecimento: string, informacoes: string, ativo: number) {
    this.id_estabelecimento = id_estabelecimento;
    this.informacoes = informacoes;
    this.ativo = ativo;
  }
}
