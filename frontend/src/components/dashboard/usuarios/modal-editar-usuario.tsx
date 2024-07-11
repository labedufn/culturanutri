import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { editarUsuarioAdmin } from "@/actions/editar-usuario-admin";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { TipoUsuario, tipoUsuarioOptions } from "@/enums/tipoUsuario";

type Usuario = {
  id: string;
  tipoUsuario: string;
  situacao: string;
};

type ModalEditarUsuarioProps = {
  isOpen: boolean;
  onClose: () => void;
  usuario: Usuario;
  onUpdate: () => void;
};

export function ModalEditarUsuario({ isOpen, onClose, usuario, onUpdate }: ModalEditarUsuarioProps) {
  const [tipoUsuario, setTipoUsuario] = useState(usuario.tipoUsuario.toUpperCase());
  const [situacao, setSituacao] = useState(usuario.situacao);

  const handleSave = async () => {
    if (tipoUsuario === usuario.tipoUsuario.toUpperCase() && situacao === usuario.situacao) {
      toast({
        className: cn(
          "bg-yellow-600 text-white border-none top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        ),
        title: "Nenhuma alteração!",
        description: "Nenhuma alteração foi feita para salvar.",
      });
      return;
    }
    const tipoUsuarioBackend = tipoUsuario === TipoUsuario.ADMINISTRADOR ? "ADMINISTRADOR" : "AVALIADOR";
    const situacaoBackend = situacao === "Ativo" ? 1 : 0;

    try {
      const response = await editarUsuarioAdmin({
        ...usuario,
        id_usuario: usuario.id,
        tipo_usuario: tipoUsuarioBackend,
        ativo: situacaoBackend,
      });

      if (response.success) {
        toast({
          className: cn(
            "bg-green-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
          ),
          title: "Sucesso!",
          description: "Usuário atualizado com sucesso.",
        });
        onUpdate();
        onClose();
      } else {
        toast({
          className: cn(
            "bg-red-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
          ),
          title: "Erro!",
          description: response.message || "Erro ao editar usuário.",
        });
      }
    } catch (error) {
      toast({
        className: cn(
          "bg-red-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        ),
        title: "Erro de comunicação!",
        description: "Falha na comunicação com o servidor.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Editar Usuário</DialogTitle>
          <DialogDescription>Altere as informações do usuário selecionado.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <Label>Tipo de Usuário</Label>
            <Select onValueChange={setTipoUsuario} defaultValue={tipoUsuario}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de usuário" />
              </SelectTrigger>
              <SelectContent>
                {tipoUsuarioOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-3">
            <Label>Situação</Label>
            <Select onValueChange={setSituacao} defaultValue={situacao}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a situação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="flex flex-col gap-4 md:gap-0 md:flex-row">
          <Button className="bg-neutral-200 text-neutral-700 hover:bg-neutral-300" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
