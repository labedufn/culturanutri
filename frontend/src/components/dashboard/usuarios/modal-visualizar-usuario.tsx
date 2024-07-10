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

type ModalVisualizarUsuarioProps = {
  isOpen: boolean;
  onClose: () => void;
  usuario: any;
};

export function ModalVisualizarUsuario({ isOpen, onClose, usuario }: ModalVisualizarUsuarioProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Visualizar Usuário</DialogTitle>
          <DialogDescription>Informações do usuário selecionado.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 md:gap-4 gap-6">
          <div>
            <Label className="text-muted-foreground">Nome:</Label>
            <p className="font-medium text-sm">{usuario.nome}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">CPF:</Label>
            <p className="font-medium text-sm">{usuario.cpf}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">E-mail:</Label>
            <p className="font-medium text-sm">{usuario.email}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Instituição:</Label>
            <p className="font-medium text-sm">{usuario.instituicao}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Tipo de Usuário:</Label>
            <div>
              <Badge
                className={
                  usuario.tipoUsuario === "Administrador"
                    ? "bg-secondary-100 text-secondary-600"
                    : "bg-zinc-100 text-zinc-500"
                }
              >
                {usuario.tipoUsuario}
              </Badge>
            </div>
          </div>
          <div>
            <Label className="text-muted-foreground">Situação:</Label>
            <div>
              <Badge
                className={usuario.situacao === "Ativo" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}
              >
                {usuario.situacao}
              </Badge>
            </div>
          </div>
          <div>
            <Label className="text-muted-foreground">Data de Cadastro:</Label>
            <p className="font-medium text-sm">{usuario.dataCadastro}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Último Login:</Label>
            <p className="font-medium text-sm">{usuario.ultimoLogin}</p>
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
