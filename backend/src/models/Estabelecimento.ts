export class Estabelecimento {
  nome: string;
  cnae: string;
  endereco: string;
  pessoal_ocupado: number;
  numero_refeicoes: number;
  possui_alvara_sanitario: number;
  possui_responsavel_boas_praticas: number;
  data_criacao: Date;
  data_alteracao: Date;
  alterado_por: string;
  ativo: number;

  constructor(
    nome: string,
    cnae: string,
    endereco: string,
    pessoal_ocupado: number,
    numero_refeicoes: number,
    possui_alvara_sanitario: number,
    possui_responsavel_boas_praticas: number,
    alterado_por: string,
    ativo: number,
  ) {
    this.nome = nome;
    this.cnae = cnae;
    this.endereco = endereco;
    this.pessoal_ocupado = pessoal_ocupado;
    this.numero_refeicoes = numero_refeicoes;
    this.possui_alvara_sanitario = possui_alvara_sanitario;
    this.possui_responsavel_boas_praticas = possui_responsavel_boas_praticas;
    this.alterado_por = alterado_por;
    this.ativo = ativo;
  }
}
