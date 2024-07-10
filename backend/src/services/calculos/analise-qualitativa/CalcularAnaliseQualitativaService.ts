export class CalcularAnaliseQualitativaService {
  private calcularEscore(valorA: number, valorB: number): number {
    return valorA + valorB / 2;
  }

  private buscarValorSubpropriedade(objetos: any[], propriedade: string, subpropriedade: string) {
    const valorA = 0;
    const valorB = 0;
    objetos.forEach((objeto) => {
      objeto[propriedade].forEach((subpropriedadeObjeto) => {
        valorA = 
        }
      }
    });
  }

  async execute(informacoes: JSON) {
    const informacoesCalculadas: object = {};

    try {
      informacoesCalculadas["lideranca"] = {
        gerentes_fornecem_assistencia_orientacao_seguranca_alimentos: {
          escore: 4,
        },
      };
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }

    return {
      json_informacoes: JSON.parse(JSON.stringify(informacoesCalculadas)),
    };
  }
}
