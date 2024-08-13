import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  converteAvaliacao,
  converteEscolaridade,
  converteGenero,
  converteSimNao,
  labelsComunicacao,
  labelsLideranca,
  Manipulador,
} from "@/types/manipulador";
import {
  labelsDadosIndividuais,
  labelsConhecimento,
  labelsComprometimentoAfetivo,
  labelsComprometimentoNormativo,
  labelsComprometimentoInstrumental,
  labelsComprometimentoSegurancaAlimentos,
  labelsPercepcaoRisco,
  labelsPressoesTrabalho,
  labelsAmbienteTrabalho,
  labelsSistemasGestao,
} from "@/types/manipulador";

type ModalVisualizarManipuladorProps = {
  isOpen: boolean;
  onClose: () => void;
  manipulador: Manipulador;
};

export function ModalVisualizarManipulador({ isOpen, onClose, manipulador }: ModalVisualizarManipuladorProps) {
  const {
    dados_individuais,
    lideranca,
    comunicacao,
    conhecimento,
    comprometimento_afetivo,
    comprometimento_normativo,
    comprometimento_instrumental,
    comprometimento_seguranca_alimentos,
    percepcao_risco,
    pressoes_trabalho_crencas_normativas,
    ambiente_trabalho,
    sistemas_gestao,
  } = manipulador.informacoes;

  const renderInformacao = (
    label: string,
    value: string | number | boolean | null,
    converter?: ((value: any) => string) | string,
  ) => {
    const displayValue = typeof converter === "function" ? converter(value) : value?.toString() || "Não informado";
    if (displayValue === "Não informado") return null;
    return (
      <div key={label}>
        <Label className="text-muted-foreground">{label}:</Label>
        <p className="font-medium text-sm">{displayValue}</p>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-screen-lg lg:max-h-[800px] overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle>Visualizar Manipulador</DialogTitle>
          <DialogDescription>Informações do manipulador selecionado.</DialogDescription>
        </DialogHeader>
        <h3 className="font-semibold text-black mt-4">Dados individuais</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(dados_individuais).map(([key, value]) =>
            renderInformacao(
              labelsDadosIndividuais[key as keyof typeof labelsDadosIndividuais],
              value,
              {
                nome_completo: "",
                genero: converteGenero,
                idade: "",
                escolaridade: converteEscolaridade,
                formacao: "",
                participou_treinamento_manipulacao_alimentos: converteSimNao,
                tempo_trabalha_com_alimentos: "",
                boa_comunicacao_chefe: converteSimNao,
                boa_comunicacao_entre_funcionarios: converteSimNao,
              }[key as keyof typeof labelsDadosIndividuais],
            ),
          )}
          <div className="col-span-1 lg:col-span-2">
            <Separator className="my-8" />
            <h3 className="font-semibold col-col-span-1 text-black mt-4">Liderança</h3>
          </div>
          {Object.entries(lideranca).map(([key, value]) =>
            renderInformacao(labelsLideranca[key as keyof typeof labelsLideranca], value, converteAvaliacao),
          )}
          <div className="col-span-1 lg:col-span-2">
            <Separator className="my-8" />
            <h3 className="font-semibold col-col-span-1 text-black mt-4">Comunicação</h3>
          </div>
          {Object.entries(comunicacao).map(([key, value]) =>
            renderInformacao(labelsComunicacao[key as keyof typeof labelsComunicacao], value, converteAvaliacao),
          )}
          <div className="col-span-1 lg:col-span-2">
            <Separator className="my-8" />
            <h3 className="font-semibold col-col-span-1 text-black mt-4">Conhecimento</h3>
          </div>
          {Object.entries(conhecimento).map(([key, value]) =>
            renderInformacao(labelsConhecimento[key as keyof typeof labelsConhecimento], value, converteSimNao),
          )}
          <div className="col-span-1 lg:col-span-2">
            <Separator className="my-8" />
            <h3 className="font-semibold col-col-span-1 text-black mt-4">Comprometimento afetivo</h3>
          </div>
          {Object.entries(comprometimento_afetivo).map(([key, value]) =>
            renderInformacao(
              labelsComprometimentoAfetivo[key as keyof typeof labelsComprometimentoAfetivo],
              value,
              converteAvaliacao,
            ),
          )}
          <div className="col-span-1 lg:col-span-2">
            <Separator className="my-8" />
            <h3 className="font-semibold col-col-span-1 text-black mt-4">Comprometimento normativo</h3>
          </div>
          {Object.entries(comprometimento_normativo).map(([key, value]) =>
            renderInformacao(
              labelsComprometimentoNormativo[key as keyof typeof labelsComprometimentoNormativo],
              value,
              converteAvaliacao,
            ),
          )}
          <div className="col-span-1 lg:col-span-2">
            <Separator className="my-8" />
            <h3 className="font-semibold col-col-span-1 text-black mt-4">Comprometimento instrumental</h3>
          </div>
          {Object.entries(comprometimento_instrumental).map(([key, value]) =>
            renderInformacao(
              labelsComprometimentoInstrumental[key as keyof typeof labelsComprometimentoInstrumental],
              value,
              converteAvaliacao,
            ),
          )}
          <div className="col-span-1 lg:col-span-2">
            <Separator className="my-8" />
            <h3 className="font-semibold col-col-span-1 text-black mt-4">
              Comprometimento com a segurança dos alimentos
            </h3>
          </div>
          {Object.entries(comprometimento_seguranca_alimentos).map(([key, value]) =>
            renderInformacao(
              labelsComprometimentoSegurancaAlimentos[key as keyof typeof labelsComprometimentoSegurancaAlimentos],
              value,
              converteAvaliacao,
            ),
          )}
          <div className="col-span-1 lg:col-span-2">
            <Separator className="my-8" />
            <h3 className="font-semibold col-col-span-1 text-black mt-4">Percepção de risco</h3>
          </div>
          {Object.entries(percepcao_risco).map(([key, value]) =>
            renderInformacao(labelsPercepcaoRisco[key as keyof typeof labelsPercepcaoRisco], value, converteAvaliacao),
          )}
          <div className="col-span-1 lg:col-span-2">
            <Separator className="my-8" />
            <h3 className="font-semibold col-col-span-1 text-black mt-4">Pressões de trabalho e crenças normativas</h3>
          </div>
          {Object.entries(pressoes_trabalho_crencas_normativas).map(([key, value]) =>
            renderInformacao(
              labelsPressoesTrabalho[key as keyof typeof labelsPressoesTrabalho],
              value,
              converteAvaliacao,
            ),
          )}
          <div className="col-span-1 lg:col-span-2">
            <Separator className="my-8" />
            <h3 className="font-semibold col-col-span-1 text-black mt-4">Ambiente de trabalho</h3>
          </div>
          {Object.entries(ambiente_trabalho).map(([key, value]) =>
            renderInformacao(
              labelsAmbienteTrabalho[key as keyof typeof labelsAmbienteTrabalho],
              value,
              converteAvaliacao,
            ),
          )}
          <div className="col-span-1 lg:col-span-2">
            <Separator className="my-8" />
            <h3 className="font-semibold col-col-span-1 text-black mt-4">Sistemas de gestão</h3>
          </div>
          {Object.entries(sistemas_gestao).map(([key, value]) =>
            renderInformacao(labelsSistemasGestao[key as keyof typeof labelsSistemasGestao], value, converteAvaliacao),
          )}
        </div>
        <DialogFooter>
          <Button className="bg-primary-700 hover:bg-primary-800" onClick={onClose}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
