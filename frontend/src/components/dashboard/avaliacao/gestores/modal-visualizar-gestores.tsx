import { Badge } from "@/components/ui/badge";
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

type DadosIndividuais = {
  nome_completo: string;
  genero: number;
  idade: number;
  escolaridade: number;
  formacao: string;
};

type Gestor = {
  id: string;
  informacoes: {
    dados_individuais: DadosIndividuais;
  };
  ativo: number;
};

type ModalVisualizarGestorProps = {
  isOpen: boolean;
  onClose: () => void;
  gestor: Gestor;
};

export function ModalVisualizarGestor({ isOpen, onClose, gestor }: ModalVisualizarGestorProps) {
  const { dados_individuais } = gestor.informacoes;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] lg:max-w-screen-lg overflow-y-scroll lg:overflow-hidden max-h-screen">
        <DialogHeader>
          <DialogTitle>Visualizar Gestor</DialogTitle>
          <DialogDescription>Informações do gestor selecionado.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 md:gap-5 gap-6">
          <div>
            <Label className="text-muted-foreground">Nome Completo:</Label>
            <p className="font-medium text-sm">{dados_individuais.nome_completo}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Gênero:</Label>
            <p className="font-medium text-sm">{dados_individuais.genero === 0 ? "Masculino" : "Feminino"}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Idade:</Label>
            <p className="font-medium text-sm">{dados_individuais.idade}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Escolaridade:</Label>
            <p className="font-medium text-sm">
              {dados_individuais.escolaridade === 1
                ? "Ensino Fundamental"
                : dados_individuais.escolaridade === 2
                  ? "Ensino Médio"
                  : "Ensino Superior"}
            </p>
          </div>
          <div className="col-span-2">
            <Separator />
          </div>
          <div className="col-span-2">
            <Label className="text-muted-foreground">Formação:</Label>
            <p className="font-medium text-sm">{dados_individuais.formacao}</p>
          </div>
          <div className="col-span-2">
            <Separator />
          </div>
          <div>
            <Label className="text-muted-foreground">Situação:</Label>
            <div>
              <Badge className={gestor.ativo === 1 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}>
                {gestor.ativo === 1 ? "Ativo" : "Inativo"}
              </Badge>
            </div>
          </div>
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
