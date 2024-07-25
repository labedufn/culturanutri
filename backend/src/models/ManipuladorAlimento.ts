export class ManipuladorAlimento {
<<<<<<< HEAD
  informacoes: any;
  id_estabelecimento: string;
  ativo: number;

  constructor(informacoes: unknown, id_estabelecimento: string, ativo: number = 1) {
    this.informacoes = informacoes;
    this.id_estabelecimento = id_estabelecimento;
=======
  id_estabelecimento: string;
  informacoes: string;
  ativo: number;

  constructor(informacoes: string, ativo: number, id_estabelecimento: string) {
    this.id_estabelecimento = id_estabelecimento;
    this.informacoes = informacoes;
>>>>>>> main
    this.ativo = ativo;
  }
}
