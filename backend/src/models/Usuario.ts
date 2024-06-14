import { TipoUsuario } from "@prisma/client";

export { TipoUsuario };

export class Usuario {
  nome: string;
  sobrenome: string;
  cpf: string;
  email: string;
  senha: string;
  tipo: TipoUsuario;

  constructor(nome: string, sobrenome: string, cpf: string, email: string, senha: string, tipo: TipoUsuario) {
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.cpf = cpf;
    this.email = email;
    this.senha = senha;
    this.tipo = tipo;
  }
}
