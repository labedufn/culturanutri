import { useState, useEffect } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { editarEstabelecimento } from "@/actions/editar-estabelecimento";

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

type ModalEditarEstabelecimentoProps = {
  isOpen: boolean;
  onClose: () => void;
  estabelecimento: Estabelecimento;
  onUpdate: () => void;
};

export function ModalEditarEstabelecimento({
  isOpen,
  onClose,
  estabelecimento,
  onUpdate,
}: ModalEditarEstabelecimentoProps) {
  const [formData, setFormData] = useState(estabelecimento);

  useEffect(() => {
    setFormData(estabelecimento);
  }, [estabelecimento]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value === "Sim" ? 1 : 0 });
  };

  const handleSave = async () => {
    try {
      const response = await editarEstabelecimento(formData);

      if (response.success) {
        toast({
          className: cn(
            "bg-green-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
          ),
          title: "Sucesso!",
          description: "Estabelecimento atualizado com sucesso.",
        });
        onUpdate();
        onClose();
      } else {
        toast({
          className: cn(
            "bg-red-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
          ),
          title: "Erro!",
          description: response.message || "Erro ao editar estabelecimento.",
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
      <DialogContent className="sm:max-w-[800px] lg:max-w-screen-lg overflow-y-scroll lg:overflow-hidden max-h-screen">
        <DialogHeader>
          <DialogTitle>Editar Estabelecimento</DialogTitle>
          <DialogDescription>Altere as informações do estabelecimento selecionado.</DialogDescription>
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
          <div className="flex flex-col gap-3 md:col-span-2">
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
            <RadioGroup
              value={formData.possui_alvara_sanitario === 1 ? "Sim" : "Não"}
              onValueChange={(value) => handleRadioChange("possui_alvara_sanitario", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Sim" id="possui_alvara_sim" />
                <Label htmlFor="possui_alvara_sim">Sim</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Não" id="possui_alvara_nao" />
                <Label htmlFor="possui_alvara_nao">Não</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-3">
            <Label>Possui Responsável por Boas Práticas</Label>
            <RadioGroup
              value={formData.possui_responsavel_boas_praticas === 1 ? "Sim" : "Não"}
              onValueChange={(value) => handleRadioChange("possui_responsavel_boas_praticas", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Sim" id="possui_responsavel_sim" />
                <Label htmlFor="possui_responsavel_sim">Sim</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Não" id="possui_responsavel_nao" />
                <Label htmlFor="possui_responsavel_nao">Não</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <DialogFooter className="flex-col-reverse gap-4 md:gap-0 md:flex-row">
          <Button className="bg-neutral-200 text-neutral-700 hover:bg-neutral-300" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
