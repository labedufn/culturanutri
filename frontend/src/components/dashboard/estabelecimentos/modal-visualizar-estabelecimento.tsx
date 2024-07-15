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

type Estabelecimento = {
  id: string;
  nome: string;
  cnae: string;
  endereco: string;
  pessoal_ocupado: number;
  numero_refeicoes: number;
  possui_alvara_sanitario: number;
  possui_responsavel_boas_praticas: number;
  data_alteracao: string;
  ativo: number;
  usuario: {
    nome: string;
    sobrenome: string;
  };
};

type ModalVisualizarEstabelecimentoProps = {
  isOpen: boolean;
  onClose: () => void;
  estabelecimento: Estabelecimento;
};

export function ModalVisualizarEstabelecimento({
  isOpen,
  onClose,
  estabelecimento,
}: ModalVisualizarEstabelecimentoProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] lg:max-w-screen-lg overflow-y-scroll lg:overflow-hidden max-h-screen">
        <DialogHeader>
          <DialogTitle>Visualizar Estabelecimento</DialogTitle>
          <DialogDescription>Informações do estabelecimento selecionado.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 md:gap-5 gap-6">
          <div>
            <Label className="text-muted-foreground">Nome:</Label>
            <p className="font-medium text-sm">{estabelecimento.nome}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">CNAE:</Label>
            <p className="font-medium text-sm">{estabelecimento.cnae}</p>
          </div>
          <div className="col-span-2">
            <Separator />
          </div>
          <div className="col-span-2">
            <Label className="text-muted-foreground">Endereço:</Label>
            <p className="font-medium text-sm">{estabelecimento.endereco}</p>
          </div>
          <div className="col-span-2">
            <Separator />
          </div>
          <div>
            <Label className="text-muted-foreground">Pessoal Ocupado:</Label>
            <div>
              <Badge className="bg-zinc-100 text-zinc-500">{estabelecimento.pessoal_ocupado}</Badge>
            </div>
          </div>
          <div>
            <Label className="text-muted-foreground">Número de Refeições:</Label>
            <div>
              <Badge className="bg-zinc-100 text-zinc-500">{estabelecimento.numero_refeicoes}</Badge>
            </div>
          </div>
          <div className="col-span-2">
            <Separator />
          </div>
          <div>
            <Label className="text-muted-foreground">Possui Alvará Sanitário:</Label>
            <div>
              <Badge
                className={
                  estabelecimento.possui_alvara_sanitario ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"
                }
              >
                {estabelecimento.possui_alvara_sanitario ? "Sim" : "Não"}
              </Badge>
            </div>
          </div>
          <div>
            <Label className="text-muted-foreground">Possui Responsável por Boas Práticas:</Label>
            <div>
              <Badge
                className={
                  estabelecimento.possui_responsavel_boas_praticas
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-500"
                }
              >
                {estabelecimento.possui_responsavel_boas_praticas ? "Sim" : "Não"}
              </Badge>
            </div>
          </div>
          <div className="col-span-2">
            <Separator />
          </div>
          <div>
            <Label className="text-muted-foreground">Data de Alteração:</Label>
            <p className="font-medium text-sm">{estabelecimento.data_alteracao}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Alterado por:</Label>
            <p className="font-medium text-sm">
              {estabelecimento.usuario.nome} {estabelecimento.usuario.sobrenome}
            </p>
          </div>
          <div>
            <Label className="text-muted-foreground">Situação:</Label>
            <div>
              <Badge className={estabelecimento.ativo == 1 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}>
                {estabelecimento.ativo == 1 ? "Ativo" : "Inativo"}
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
