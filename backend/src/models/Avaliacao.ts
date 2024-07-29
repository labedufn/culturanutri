export class Avaliacao {
  id_estabelecimento: string;
  slug: string;
  data_cadastro: Date;
  data_alteracao: Date;
  ativo: number;

  constructor(id_estabelecimento?: string, slug: string, ativo: number = 1) {
    this.id_estabelecimento = id_estabelecimento;
    this.slug = slug;
    this.ativo = ativo;
  }
}
