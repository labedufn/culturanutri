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
import { excluirEstabelecimento } from "@/actions/excluir-estabelecimento";

type Estabelecimento = {
  id: string;
  nome: string;
};

type ModalExcluirEstabelecimentoProps = {
  isOpen: boolean;
  onClose: () => void;
  estabelecimento: Estabelecimento;
  onDelete: () => void;
};

export function ModalExcluirEstabelecimento({
  isOpen,
  onClose,
  estabelecimento,
  onDelete,
}: ModalExcluirEstabelecimentoProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      const response = await excluirEstabelecimento({ id_estabelecimento: estabelecimento.id });

      if (response.success) {
        toast({
          className: cn(
            "bg-green-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
          ),
          title: "Sucesso!",
          description: "Estabelecimento excluído com sucesso.",
        });
        onDelete();
        onClose();
      } else {
        toast({
          className: cn(
            "bg-red-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
          ),
          title: "Erro!",
          description: response.message || "Erro ao excluir estabelecimento.",
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
          <DialogTitle>Excluir Estabelecimento</DialogTitle>
          <DialogDescription>
            <p className="font-bold text-base mb-4">
              Tem certeza que deseja excluir o estabelecimento {estabelecimento.nome}? O processo é irreversível.
            </p>
            <p className="text-sm">
              Caso o estabelecimento tenha vínculos com outros registros, não será possível excluí-lo.
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
          <Button onClick={handleDelete} className="bg-red-600 text-white hover:bg-red-700">
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
