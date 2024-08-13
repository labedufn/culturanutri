export class Avaliacao {
  id_estabelecimento: string;
  data_cadastro: Date;
  data_alteracao: Date;
  ativo: number;

  constructor(ativo: number, id_estabelecimento?: string) {
    this.id_estabelecimento = id_estabelecimento;
    this.ativo = ativo;
  }
}
