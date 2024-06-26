import { Gestor } from "@models/Gestor";
import { ManipuladorAlimento } from "@prisma/client";

export class CalcularAnaliseQuantitativaService {
  private contarPorGenero(entities: { informacoes: { dados_individuais: { genero: number } } }[]) {
    let masculino = 0;
    let feminino = 0;

    entities.forEach((entity) => {
      if (entity.informacoes.dados_individuais.genero === 0) {
        feminino += 1;
      } else if (entity.informacoes.dados_individuais.genero === 1) {
        masculino += 1;
      }
    });

    return { masculino, feminino };
  }

  private calcularMediaIdade(entities: { informacoes: { dados_individuais: { idade?: number } } }[]) {
    let totalIdade = 0;
    let quantidade = 0;

    entities.forEach((entity) => {
      if (entity.informacoes.dados_individuais.idade !== undefined) {
        totalIdade += entity.informacoes.dados_individuais.idade;
        quantidade += 1;
      }
    });

    return totalIdade / (quantidade || 1); // Para evitar divisão por zero
  }

  private contarPorEscolaridade(entities: { informacoes: { dados_individuais: { escolaridade: number } } }[]) {
    const escolaridade = {
      fundamentalIncompleto: 0,
      fundamentalCompleto: 0,
      medioIncompleto: 0,
      medioCompleto: 0,
      superiorIncompleto: 0,
      superiorCompleto: 0,
    };

    entities.forEach((entity) => {
      switch (entity.informacoes.dados_individuais.escolaridade) {
        case 1:
          escolaridade.fundamentalIncompleto += 1;
          break;
        case 2:
          escolaridade.fundamentalCompleto += 1;
          break;
        case 3:
          escolaridade.medioIncompleto += 1;
          break;
        case 4:
          escolaridade.medioCompleto += 1;
          break;
        case 5:
          escolaridade.superiorIncompleto += 1;
          break;
        case 6:
          escolaridade.superiorCompleto += 1;
          break;
      }
    });

    return escolaridade;
  }

  private contarTreinamento(
    entities: { informacoes: { dados_individuais: { participou_treinamento_manipulacao_alimentos: number } } }[],
    key: string,
  ) {
    let participaTreinamento = 0;
    let naoParticipaTreinamento = 0;

    entities.forEach((entity) => {
      if (entity.informacoes.dados_individuais[key] === 1) {
        participaTreinamento += 1;
      } else if (entity.informacoes.dados_individuais[key] === 0) {
        naoParticipaTreinamento += 1;
      }
    });

    return { participaTreinamento, naoParticipaTreinamento };
  }

  async execute(manipuladores: ManipuladorAlimento[], gestores: Gestor[]) {
    const caracteristicas_socio_demograficas: any = {};

    try {
      const manipuladoresGenero = this.contarPorGenero(manipuladores);
      const gestoresGenero = this.contarPorGenero(gestores);

      const manipuladoresIdadeMedia = this.calcularMediaIdade(manipuladores);
      const gestoresIdadeMedia = this.calcularMediaIdade(gestores);

      const manipuladoresEscolaridade = this.contarPorEscolaridade(manipuladores);
      const gestoresEscolaridade = this.contarPorEscolaridade(gestores);

      const manipuladoresTreinamento = this.contarTreinamento(
        manipuladores,
        "participou_treinamento_manipulacao_alimentos",
      );
      const gestoresTreinamento = this.contarTreinamento(gestores, "nao_tenha_formacao_tem_treinamento");

      caracteristicas_socio_demograficas["genero"] = {
        manipuladores: {
          ...manipuladoresGenero,
          idade: manipuladoresIdadeMedia,
          total: manipuladores.length,
        },
        gestores: {
          ...gestoresGenero,
          idade: gestoresIdadeMedia,
          total: gestores.length,
        },
      };

      caracteristicas_socio_demograficas["escolaridade"] = {
        manipuladores: {
          ...manipuladoresEscolaridade,
          total: manipuladores.length,
        },
        gestores: {
          ...gestoresEscolaridade,
          total: gestores.length,
        },
      };

      caracteristicas_socio_demograficas["participacao_treinamento_formacao"] = {
        manipuladores: {
          sim: manipuladoresTreinamento.participaTreinamento,
          nao: manipuladoresTreinamento.naoParticipaTreinamento,
          total: manipuladores.length,
        },
        gestores: {
          sim: gestoresTreinamento.participaTreinamento,
          nao: gestoresTreinamento.naoParticipaTreinamento,
          total: gestores.length,
        },
      };

      console.log(caracteristicas_socio_demograficas);
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }

    return {
      caracteristicas_socio_demograficas,
      resultados_avaliacao_quantitativas_csa: "2",
      vies_otimista: "3",
    };
  }
}
