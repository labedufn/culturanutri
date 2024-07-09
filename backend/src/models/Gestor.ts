export class Gestor {
  informacoes: string;
  id_estabelecimento: string;
  data_cadastro: Date;
  data_alteracao: Date;
  ativo: number;

  constructor(informacoes: string, id_estabelecimento: string, ativo: number = 1) {
    this.id_estabelecimento = id_estabelecimento;
    this.informacoes = informacoes;
    this.ativo = ativo;
  }
}
