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
import { Input } from "@/components/ui/input";
import { cadastrarEstabelecimento } from "@/actions/cadastrar-estabelecimento";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

type ModalCadastrarEstabelecimentoProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: () => void;
};

export function ModalCadastrarEstabelecimento({ isOpen, onClose, onCreate }: ModalCadastrarEstabelecimentoProps) {
  const [formData, setFormData] = useState({
    nome: "",
    cnae: "",
    endereco: "",
    pessoal_ocupado: 0,
    numero_refeicoes: 0,
    possui_alvara_sanitario: 0,
    possui_responsavel_boas_praticas: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await cadastrarEstabelecimento(formData);

      if (response.success) {
        toast({
          className: cn(
            "bg-green-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
          ),
          title: "Sucesso!",
          description: "Estabelecimento cadastrado com sucesso.",
        });
        onCreate();
        onClose();
      } else {
        toast({
          className: cn(
            "bg-red-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
          ),
          title: "Erro!",
          description: response.message || "Erro ao cadastrar estabelecimento.",
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
          <DialogTitle>Cadastrar Estabelecimento</DialogTitle>
          <DialogDescription>Preencha as informações do novo estabelecimento.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <Label>Nome</Label>
            <Input name="nome" value={formData.nome} onChange={handleInputChange} />
          </div>
          <div className="flex flex-col gap-3">
            <Label>CNAE</Label>
            <Input name="cnae" value={formData.cnae} onChange={handleInputChange} />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Endereço</Label>
            <Input name="endereco" value={formData.endereco} onChange={handleInputChange} />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Pessoal Ocupado</Label>
            <Input name="pessoal_ocupado" type="number" value={formData.pessoal_ocupado} onChange={handleInputChange} />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Número de Refeições</Label>
            <Input
              name="numero_refeicoes"
              type="number"
              value={formData.numero_refeicoes}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Possui Alvará Sanitário</Label>
            <Input
              name="possui_alvara_sanitario"
              type="number"
              value={formData.possui_alvara_sanitario}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Possui Responsável por Boas Práticas</Label>
            <Input
              name="possui_responsavel_boas_praticas"
              type="number"
              value={formData.possui_responsavel_boas_praticas}
              onChange={handleInputChange}
            />
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
