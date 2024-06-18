import type { TipoUsuario } from "@prisma/client";

export class Usuario {
  nome: string;
  sobrenome: string;
  cpf: string;
  email: string;
  senha: string;
  instituicao: string;
  tipo: TipoUsuario;
  data_cadastro: Date;
  data_alteracao: Date;
  ativo: number;
  ultimo_login: Date;

  constructor(
    nome: string,
    sobrenome: string,
    cpf: string,
    email: string,
    senha: string,
    tipo: TipoUsuario,
    instituicao: string,
    data_cadastro: Date,
    data_alteracao: Date,
    ativo: number,
    ultimo_login: Date,
  ) {
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.instituicao = instituicao;
    this.cpf = cpf;
    this.email = email;
    this.senha = senha;
    this.tipo = tipo;
    this.data_cadastro = data_cadastro;
    this.data_alteracao = data_alteracao;
    this.ativo = ativo;
    this.ultimo_login = ultimo_login;
  }
}

export { TipoUsuario };
