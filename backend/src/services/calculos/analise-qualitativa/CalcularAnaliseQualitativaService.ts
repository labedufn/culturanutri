import { mean } from "mathjs";

export class CalcularAnaliseQualitativaService {
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

  private calcularEstatisticasSubpropriedades(entities: any[], propriedade: string) {
    const valores = entities
      .flatMap((entity) => this.extrairValoresSubpropriedade(entity.percepcao_risco, propriedade))
      .filter((value) => typeof value === "number");

    return {
      media: this.calcularMedia(valores),
    };
  }

  async execute(informacoes: JSON) {
    let informacoesCalculadas: any = {};

    try {
      informacoesCalculadas = informacoes;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }

    return {
      json_informacoes: JSON.parse(JSON.stringify(informacoesCalculadas)),
    };
  }
}
