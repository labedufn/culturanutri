import { TipoUsuario } from "@prisma/client";

export class Usuario {
  nome: string;
  sobrenome: string;
  cpf: string;
  email: string;
  senha: string;
  instituicao: string;
  tipo: TipoUsuario;

  constructor(
    nome: string,
    sobrenome: string,
    cpf: string,
    email: string,
    senha: string,
    tipo: TipoUsuario,
    instituicao: string,
  ) {
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.instituicao = instituicao;
    this.cpf = cpf;
    this.email = email;
    this.senha = senha;
    this.tipo = tipo;
  }
}

export { TipoUsuario };
