import { TipoUsuario } from "@prisma/client";

export class Usuario {
  nome: string;
  sobrenome: string;
  cpf: string;
  email: string;
  senha: string;
  instituicao: string;
  tipo_usuario: TipoUsuario;
  ativo?: number;

  constructor(
    nome: string,
    sobrenome: string,
    cpf: string,
    email: string,
    senha: string,
    tipo_usuario: TipoUsuario,
    instituicao: string,
    ativo: number = 1,
  ) {
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.instituicao = instituicao;
    this.cpf = cpf;
    this.email = email;
    this.senha = senha;
    this.tipo_usuario = tipo_usuario;
    this.ativo = ativo;
  }
}

export { TipoUsuario };
