import { Gestor } from "@models/Gestor";
import { ManipuladorAlimento } from "@prisma/client";
import { mean, std, mode } from "mathjs";

export class CalcularAnaliseQuantitativaService {
  jStat = require("jstat");
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

    return totalIdade / (quantidade || 1);
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

  private extrairValores(obj: object): number[] {
    const valores: number[] = [];
    const extrair = (obj: object) => {
      for (const key in obj) {
        if (typeof obj[key] === "number") {
          valores.push(obj[key]);
        } else if (typeof obj[key] === "object") {
          extrair(obj[key]);
        }
      }
    };
    extrair(obj);
    return valores;
  }

  private calcularMedia(valores: number[]): number {
    if (valores.length === 0) return 0;
    return parseFloat(mean(valores).toFixed(2));
  }

  private calcularDesvioPadrao(valores: number[]): number {
    if (valores.length === 0) return 0;
    return parseFloat(std(valores, "uncorrected").toFixed(2));
  }

  private calcularModa(valores: number[]): number | undefined {
    if (valores.length === 0) return undefined;

    const moda = mode(valores);

    if (Array.isArray(moda) && moda.length > 0) {
      const modaValue = moda[0] as number;
      return parseFloat(modaValue.toFixed(2));
    } else if (typeof moda === "number") {
      return parseFloat(moda.toFixed(2));
    } else {
      return undefined;
    }
  }

  private calcularTesteT(sample1, sample2) {
    const result = this.jStat.ttest(sample1, sample2, { type: "two" });
    return result;
  }

  private buscaValores(objeto, propriedade, outraPropriedade) {
    Object.keys(objeto).forEach((key) => {
      const gestor = objeto[key];
      const sample1 = gestor.informacoes.percepcao_risco[propriedade];
      const sample2 = gestor.informacoes.percepcao_risco[outraPropriedade];

      console.log(this.calcularTesteT(sample1, sample2));
      return this.calcularTesteT(sample1, sample2);
    });
  }

  private calcularEstatisticas(entities: { informacoes: any }[], propriedade: string) {
    const valores = entities
      .flatMap((entity) => this.extrairValores(entity.informacoes[propriedade]))
      .filter((value) => typeof value === "number");

    return {
      media: this.calcularMedia(valores),
      desvioPadrao: this.calcularDesvioPadrao(valores),
      moda: this.calcularModa(valores),
    };
  }

  async execute(manipuladores: ManipuladorAlimento[], gestores: Gestor[]) {
    const caracteristicas_socio_demograficas: any = {};
    const resultados_avaliacao_quantitativas_csa: any = {};
    const vies_otimista: any = {};

    try {
      resultados_avaliacao_quantitativas_csa["liderenca"] = {
        manipuladores: this.calcularEstatisticas(manipuladores, "liderenca"),
      };

      resultados_avaliacao_quantitativas_csa["comunicacao"] = {
        manipuladores: this.calcularEstatisticas(manipuladores, "comunicacao"),
      };

      resultados_avaliacao_quantitativas_csa["conhecimento"] = {
        manipuladores: this.calcularEstatisticas(manipuladores, "conhecimento"),
        gestores: this.calcularEstatisticas(gestores, "conhecimento"),
      };

      resultados_avaliacao_quantitativas_csa["comprometimento"] = {
        afetivo: {
          manipuladores: this.calcularEstatisticas(manipuladores, "comprometimento_afetivo"),
          gestores: this.calcularEstatisticas(gestores, "comprometimento_afetivo"),
        },
        normativo: {
          manipuladores: this.calcularEstatisticas(manipuladores, "comprometimento_normativo"),
          gestores: this.calcularEstatisticas(gestores, "comprometimento_normativo"),
        },
        continuo: {
          manipuladores: this.calcularEstatisticas(manipuladores, "comprometimento_instrumental"),
          gestores: this.calcularEstatisticas(gestores, "comprometimento_instrumental"),
        },
        com_seguranca_alimentos: {
          manipuladores: this.calcularEstatisticas(manipuladores, "comprometimento_segurança_alimentos"),
          gestores: this.calcularEstatisticas(gestores, "comprometimento_segurança_alimentos"),
        },
      };

      resultados_avaliacao_quantitativas_csa["percepcao_risco"] = {
        proprio_trabalho: {
          manipuladores: this.calcularEstatisticas(
            manipuladores,
            "risco_apresentar_dor_barriga_estabelecimento_similar",
          ),
          gestores: this.calcularEstatisticas(gestores, "risco_apresentar_dor_barriga_estabelecimento_similar"),
        },
        outro_manipulador_outro_servico: {
          manipuladores: this.calcularEstatisticas(
            manipuladores,
            "risco_apresentar_dor_barriga_estabelecimento_manipulado",
          ),
          gestores: this.calcularEstatisticas(gestores, "risco_apresentar_dor_barriga_estabelecimento_gerenciado"),
        },
        outro_manipulador_mesmo_servico: {
          manipuladores: this.calcularEstatisticas(
            manipuladores,
            "risco_apresentar_dor_barriga_estabelecimento_colega_manipulado",
          ),
        },
        letalidade: {
          manipuladores: this.calcularEstatisticas(manipuladores, "risco_doença_transmitida_alimentos"),
          gestores: this.calcularEstatisticas(gestores, "risco_doença_transmitida_alimentos"),
        },
        pressao_trabalho_crencas_normativas: {
          manipuladores: this.calcularEstatisticas(manipuladores, "pressoes_trabalho_crenças_normativas"),
        },
        ambiente_trabalho: {
          manipuladores: this.calcularEstatisticas(manipuladores, "ambiente_trabalho"),
        },
        sistemas_estilos_processos_gestao: {
          manipuladores: this.calcularEstatisticas(manipuladores, "sistemas_gestão"),
          gestores: this.calcularEstatisticas(gestores, "sistemas_gestao"),
        },
      };

      // Exibindo os resultados para depuração
      console.log(JSON.stringify(resultados_avaliacao_quantitativas_csa, null, 2));

      //vies otimista
      vies_otimista["percepcao_risco"] = {
        gestores: {
          outros_servicos_alimentacao: {
            // media: resultados_avaliacao_quantitativas_csa.percepcao_risco.gestores.outro_manipulador_outro_servico[0],
            // moda: resultados_avaliacao_quantitativas_csa.percepcao_risco.gestores.outro_manipulador_outro_servico[1],
            teste_estatistico: this.buscaValores(
              gestores,
              "risco_apresentar_dor_barriga_estabelecimento_similar",
              "risco_apresentar_dor_barriga_estabelecimento_gerenciado",
            ),
          },
          //   proprio_servico_alimentacao: {
          //     media: resultados_avaliacao_quantitativas_csa.percepcao_risco.gestores.proprio_servico[0],
          //     moda: resultados_avaliacao_quantitativas_csa.percepcao_risco.gestores.proprio_servico[1],
          //   },
          // },
          // manipuladores: {
          //   outro_manipulador_outro_servico: {
          //     media:
          //       resultados_avaliacao_quantitativas_csa.percepcao_risco.manipuladores.outro_manipulador_outro_servico[0],
          //     moda: resultados_avaliacao_quantitativas_csa.percepcao_risco.manipuladores
          //       .outro_manipulador_outro_servico[1],
          //   },
          //   proprio_trabalho: {
          //     media: resultados_avaliacao_quantitativas_csa.percepcao_risco.manipuladores.proprio_servico[0],
          //     moda: resultados_avaliacao_quantitativas_csa.percepcao_risco.manipuladores.proprio_servico[1],
          //   },
          //   outro_manipulador_mesmo_servico: {
          //     media:
          //       resultados_avaliacao_quantitativas_csa.percepcao_risco.manipuladores.outro_manipulador_mesmo_servico[0],
          //     moda: resultados_avaliacao_quantitativas_csa.percepcao_risco.manipuladores
          //       .outro_manipulador_mesmo_servico[1],
          //   },
        },
      };

      console.log(vies_otimista);

      // parte do socio demograficas
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

      console.log(JSON.stringify(caracteristicas_socio_demograficas, null, 2));
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }

    return {
      caracteristicas_socio_demograficas,
      resultados_avaliacao_quantitativas_csa,
      vies_otimista,
    };
  }
}
