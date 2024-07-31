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
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { excluirGestor } from "@/actions/excluir-gestor";

type Gestor = {
  id: string;
  informacoes: {
    dados_individuais: {
      nome_completo: string;
    };
  };
};

type ModalExcluirGestorProps = {
  isOpen: boolean;
  onClose: () => void;
  gestor: Gestor;
  onDelete: () => void;
};

export function ModalExcluirGestor({ isOpen, onClose, gestor, onDelete }: ModalExcluirGestorProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      const response = await excluirGestor({ id_gestor: gestor.id });

      if (response.success) {
        toast({
          className: cn(
            "bg-green-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
          ),
          title: "Sucesso!",
          description: "Gestor excluído com sucesso.",
        });
        onDelete();
        onClose();
      } else {
        toast({
          className: cn(
            "bg-red-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
          ),
          title: "Erro!",
          description: response.message || "Erro ao excluir gestor.",
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Excluir Gestor</DialogTitle>
          <DialogDescription>
            <p className="font-bold text-base mb-4">
              Tem certeza que deseja excluir o gestor {gestor.informacoes.dados_individuais.nome_completo}? O processo é
              irreversível.
            </p>
            <p className="text-sm">Caso o gestor tenha vínculos com outros registros, não será possível excluí-lo.</p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col gap-4 md:gap-0 md:flex-row">
          <Button
            className="bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button onClick={handleDelete} className="bg-red-600 text-white hover:bg-red-700" disabled={isLoading}>
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
