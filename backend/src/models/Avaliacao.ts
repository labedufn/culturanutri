export class Avaliacao {
  id_estabelecimento: string;
  slug: string;
  data_cadastro: Date;
  data_alteracao: Date;
  ativo: number;

  constructor(slug: string, ativo: number, id_estabelecimento?: string) {
    this.id_estabelecimento = id_estabelecimento;
    this.slug = slug;
    this.ativo = ativo;
  }
}
