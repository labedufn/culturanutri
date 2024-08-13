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
import { excluirManipulador } from "@/actions/excluir-manipulador";

type Manipulador = {
  id: string;
  informacoes: {
    dados_individuais: {
      nome_completo: string;
    };
  };
};

type ModalExcluirManipuladorProps = {
  isOpen: boolean;
  onClose: () => void;
  manipulador: Manipulador;
  onDelete: () => void;
};

export function ModalExcluirManipulador({ isOpen, onClose, manipulador, onDelete }: ModalExcluirManipuladorProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      const response = await excluirManipulador({ id_manipulador: manipulador.id });

      if (response.success) {
        toast({
          className: cn(
            "bg-green-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
          ),
          title: "Sucesso!",
          description: "Manipulador excluído com sucesso.",
        });
        onDelete();
        onClose();
      } else {
        toast({
          className: cn(
            "bg-red-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
          ),
          title: "Erro!",
          description: response.message || "Erro ao excluir manipulador.",
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
          <DialogTitle>Excluir Manipulador</DialogTitle>
          <DialogDescription>
            <p className="font-bold text-base mb-4">
              Tem certeza que deseja excluir o manipulador {manipulador.informacoes.dados_individuais.nome_completo}? O
              processo é irreversível.
            </p>
            <p className="text-sm">
              Caso o manipulador tenha vínculos com outros registros, não será possível excluí-lo.
            </p>
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
