import { Gestor } from "@models/Gestor";
import { ManipuladorAlimento } from "@prisma/client";
import converterBase64JSON from "@utils/converterBase64JSON";
import e from "express";
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

  private extrairValoresSubpropriedade(obj: any, propriedade: string): number[] {
    const valores: number[] = [];

    const extrair = (obj: any) => {
      for (const key in obj) {
        if (key === propriedade && typeof obj[key] === "number") {
          valores.push(obj[key]);
        } else if (typeof obj[key] === "object" && obj[key] !== null) {
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

  private calcularEstatisticasSubpropriedades(entities: any[], propriedade: string) {
    const valores = entities
      .flatMap((entity) => this.extrairValoresSubpropriedade(entity.percepcao_risco, propriedade))
      .filter((value) => typeof value === "number");

    return {
      media: this.calcularMedia(valores),
      desvioPadrao: this.calcularDesvioPadrao(valores),
      moda: this.calcularModa(valores),
    };
  }

  private calculaViesOtimista(testeEstatistico: number): string {
    if (testeEstatistico === 0 || testeEstatistico <= 0.05) {
      return "Otimista";
    } else if (testeEstatistico === 0.06 || testeEstatistico <= 0.99) {
      return "Pessimista";
    } else {
      return "Neutro";
    }
  }

  private calculaNotaViesOtimista(viesOtimista: string) {
    if (viesOtimista == "Otimista") {
      return 1;
    } else if (viesOtimista == "Pessimista") {
      return 2;
    } else {
      return 3;
    }
  }

  async execute(manipuladores: ManipuladorAlimento[], gestores: Gestor[]) {
    const caracteristicas_socio_demograficas: any = {};
    const resultados_avaliacao_quantitativas_csa: any = {};
    const vies_otimista: any = {};

    try {
      //avaliacao_quantitativa_csa
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

      const manipuladoresPercepcaoRisco = manipuladores.map((manipulador) => manipulador.informacoes);
      const gestoresPercepcaoRisco = gestores.map((gestor) => gestor.informacoes);

      resultados_avaliacao_quantitativas_csa["percepcao_risco"] = {
        proprio_trabalho: {
          manipuladores: this.calcularEstatisticasSubpropriedades(
            manipuladoresPercepcaoRisco,
            "risco_apresentar_dor_barriga_estabelecimento_similar",
          ),
          gestores: this.calcularEstatisticasSubpropriedades(
            gestoresPercepcaoRisco,
            "risco_apresentar_dor_barriga_estabelecimento_similar",
          ),
        },
        outro_manipulador_outro_servico: {
          manipuladores: this.calcularEstatisticasSubpropriedades(
            manipuladoresPercepcaoRisco,
            "risco_apresentar_dor_barriga_estabelecimento_manipulado",
          ),
          gestores: this.calcularEstatisticasSubpropriedades(
            gestoresPercepcaoRisco,
            "risco_apresentar_dor_barriga_estabelecimento_gerenciado",
          ),
        },
        outro_manipulador_mesmo_servico: {
          manipuladores: this.calcularEstatisticasSubpropriedades(
            manipuladoresPercepcaoRisco,
            "risco_apresentar_dor_barriga_estabelecimento_colega_manipulado",
          ),
        },
        letalidade: {
          manipuladores: this.calcularEstatisticasSubpropriedades(
            manipuladoresPercepcaoRisco,
            "risco_doença_transmitida_alimentos",
          ),
          gestores: this.calcularEstatisticasSubpropriedades(
            gestoresPercepcaoRisco,
            "risco_doença_transmitida_alimentos",
          ),
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

      //vies_otimista
      vies_otimista["gestores"] = {
        outros_servicos_alimentacao: {
          media: resultados_avaliacao_quantitativas_csa.percepcao_risco.outro_manipulador_outro_servico.gestores.media,
          moda: resultados_avaliacao_quantitativas_csa.percepcao_risco.outro_manipulador_outro_servico.gestores.moda,
          teste_estatistico: this.buscaValores(
            gestores,
            "risco_apresentar_dor_barriga_estabelecimento_similar",
            "risco_apresentar_dor_barriga_estabelecimento_gerenciado",
          ),
        },
        proprio_servico_alimentacao: {
          media: resultados_avaliacao_quantitativas_csa.percepcao_risco.proprio_trabalho.gestores.media,
          moda: resultados_avaliacao_quantitativas_csa.percepcao_risco.proprio_trabalho.gestores.moda,
        },
      };

      // calculo separado do vies e da nota
      vies_otimista.gestores.outros_servicos_alimentacao.vies = this.calculaViesOtimista(
        vies_otimista["gestores"].outros_servicos_alimentacao.teste_estatistico,
      );
      vies_otimista.gestores.outros_servicos_alimentacao.nota = this.calculaNotaViesOtimista(
        vies_otimista["gestores"].outros_servicos_alimentacao.vies,
      );

      vies_otimista.gestores.proprio_servico_alimentacao.vies =
        vies_otimista["gestores"].outros_servicos_alimentacao.vies;
      vies_otimista.gestores.proprio_servico_alimentacao.nota =
        vies_otimista["gestores"].outros_servicos_alimentacao.nota;

      vies_otimista["manipuladores"] = {
        outro_manipulador_outro_servico: {
          media:
            resultados_avaliacao_quantitativas_csa.percepcao_risco.outro_manipulador_outro_servico.manipuladores.media,
          moda: resultados_avaliacao_quantitativas_csa.percepcao_risco.outro_manipulador_outro_servico.manipuladores
            .moda,
          teste_estatistico: this.buscaValores(
            manipuladores,
            "risco_apresentar_dor_barriga_estabelecimento_similar",
            "risco_apresentar_dor_barriga_estabelecimento_manipulado",
          ),
        },
        proprio_trabalho: {
          media: resultados_avaliacao_quantitativas_csa.percepcao_risco.proprio_trabalho.manipuladores.media,
          moda: resultados_avaliacao_quantitativas_csa.percepcao_risco.proprio_trabalho.manipuladores.moda,
        },
        outro_manipulador_mesmo_servico: {
          media:
            resultados_avaliacao_quantitativas_csa.percepcao_risco.outro_manipulador_mesmo_servico.manipuladores.media,
          moda: resultados_avaliacao_quantitativas_csa.percepcao_risco.outro_manipulador_mesmo_servico.manipuladores
            .moda,
          teste_estatistico: this.buscaValores(
            manipuladores,
            "risco_apresentar_dor_barriga_estabelecimento_similar",
            "risco_apresentar_dor_barriga_estabelecimento_colega_manipulado",
          ),
        },
      };

      // calculo separado do vies e da nota
      vies_otimista["manipuladores"].proprio_trabalho.teste_estatistico =
        vies_otimista["manipuladores"].outro_manipulador_outro_servico.teste_estatistico;
      vies_otimista.manipuladores.outro_manipulador_outro_servico.vies = this.calculaViesOtimista(
        vies_otimista["manipuladores"].outro_manipulador_outro_servico.teste_estatistico,
      );
      vies_otimista.manipuladores.outro_manipulador_outro_servico.nota = this.calculaNotaViesOtimista(
        vies_otimista["manipuladores"].outro_manipulador_outro_servico.vies,
      );

      vies_otimista.manipuladores.proprio_trabalho.vies =
        vies_otimista["manipuladores"].outro_manipulador_outro_servico.vies;
      vies_otimista.manipuladores.proprio_trabalho.nota =
        vies_otimista["manipuladores"].outro_manipulador_outro_servico.nota;

      vies_otimista.manipuladores.outro_manipulador_mesmo_servico.vies = this.calculaViesOtimista(
        vies_otimista["manipuladores"].outro_manipulador_mesmo_servico.teste_estatistico,
      );
      vies_otimista.manipuladores.outro_manipulador_mesmo_servico.nota = this.calculaNotaViesOtimista(
        vies_otimista["manipuladores"].outro_manipulador_mesmo_servico.teste_estatistico,
      );
      //caracteristicas_socio_demograficas
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
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }

    return {
      json_caracteristicas_socio_demograficas: JSON.parse(JSON.stringify(caracteristicas_socio_demograficas)),
      json_resultados_avaliacao_quantitativas_csa: JSON.parse(JSON.stringify(resultados_avaliacao_quantitativas_csa)),
      json_vies_otimista: JSON.parse(JSON.stringify(vies_otimista)),
    };
  }
}
