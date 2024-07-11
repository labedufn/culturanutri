export class CalcularAnaliseQualitativaService {
  private calcularEscore(valorA: number, valorB: number): number {
    return (valorA + valorB) / 2;
  }

  async execute(informacoes: any) {
    console.log(informacoes);
    const informacoesCalculadas: object = {};

    try {
      informacoesCalculadas["liderenca"] = {
        gerentes_fornecem_assistencia_orientacao_seguranca_alimentos: {
          escore: this.calcularEscore(
            informacoes["liderenca"].gerentes_fornecem_assistencia_orientacao_seguranca_alimentos.valor,
            informacoes["liderenca"].gerentes_presentes_area_producao_manuseio_alimentos.valor,
          ),
        },
      };

      console.log(informacoesCalculadas);
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }

    return {
      json_informacoes: JSON.parse(JSON.stringify(informacoesCalculadas)),
    };
  }
}
