export class CalcularListaVerificacaoService {
  async execute(informacoes: JSON) {
    return { informacoesCalculadas: informacoes };
  }
}
