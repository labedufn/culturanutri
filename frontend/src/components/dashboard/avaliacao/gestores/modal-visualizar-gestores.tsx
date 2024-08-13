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
  converteFrequenciaAplicacao,
  converteGenero,
  converteRisco,
  converteSimNao,
  Gestor,
} from "@/types/gestor";
import {
  labelsDadosIndividuais,
  labelsConhecimento,
  labelsComprometimentoAfetivo,
  labelsComprometimentoNormativo,
  labelsComprometimentoInstrumental,
  labelsPercepcaoRisco,
  labelsSistemasGestao,
} from "@/types/gestor";

type ModalVisualizarGestorProps = {
  isOpen: boolean;
  onClose: () => void;
  gestor: Gestor;
};

export function ModalVisualizarGestor({ isOpen, onClose, gestor }: ModalVisualizarGestorProps) {
  const {
    dados_individuais,
    conhecimento,
    comprometimento_afetivo,
    comprometimento_normativo,
    comprometimento_instrumental,
    percepcao_risco,
    sistemas_gestao,
  } = gestor.informacoes;

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
          <DialogTitle>Visualizar Gestor</DialogTitle>
          <DialogDescription>Informações do gestor selecionado.</DialogDescription>
        </DialogHeader>
        <h3 className="font-semibold text-black mt-4">Dados do individuais</h3>
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
                carga_horaria: "",
                temas_treinamentos: "",
                tempo_trabalha_com_alimentos: "",
                nao_tenha_formacao_tem_treinamento: converteSimNao,
                acredita_comunicacao_boa: converteSimNao,
                realiza_treinamentos_boas_praticas_manipulacao: converteSimNao,
                frequencia_aplicacao: converteFrequenciaAplicacao,
              }[key as keyof typeof labelsDadosIndividuais],
            ),
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
            <h3 className="font-semibold col-col-span-1 text-black mt-4">Percepção de risco</h3>
          </div>
          {Object.entries(percepcao_risco).map(([key, value]) =>
            renderInformacao(labelsPercepcaoRisco[key as keyof typeof labelsPercepcaoRisco], value, converteRisco),
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
