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
import { editarEstabelecimento } from "@/actions/editar-estabelecimento";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const schema = z.object({
  nome: z.string().min(1, "O campo nome é obrigatório."),
  cnae: z.string().optional(),
  endereco: z.string().min(1, "O campo endereço é obrigatório."),
  pessoal_ocupado: z.preprocess((value) => Number(value), z.number().min(0, "O campo pessoal ocupado é obrigatório.")),
  numero_refeicoes: z.preprocess(
    (value) => Number(value),
    z.number().min(0, "O campo número de refeições é obrigatório."),
  ),
  possui_alvara_sanitario: z.preprocess((value) => Number(value), z.number().min(0).max(1, "Valor inválido.")),
  possui_responsavel_boas_praticas: z.preprocess((value) => Number(value), z.number().min(0).max(1, "Valor inválido.")),
  ativo: z.preprocess((value) => Number(value), z.number().min(0).max(1, "Valor inválido.").optional()),
});

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
  usuario: {
    nome: string;
    sobrenome: string;
  };
  ativo: number;
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
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: estabelecimento,
  });

  const cnaeValue = form.watch("cnae");

  const formatCNAE = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{4})(\d)/, "$1-$2")
      .replace(/(\d{4}-\d)(\d)/, "$1/$2")
      .slice(0, 9);
  };

  useEffect(() => {
    form.reset(estabelecimento);
  }, [estabelecimento, form]);

  const onSubmit = async (data: any) => {
    try {
      const formattedData = {
        ...data,
        cnae: data.cnae?.replace(/\D/g, "") || "",
        id: estabelecimento.id,
        pessoal_ocupado: Number(data.pessoal_ocupado),
        numero_refeicoes: Number(data.numero_refeicoes),
        possui_alvara_sanitario: Number(data.possui_alvara_sanitario),
        possui_responsavel_boas_praticas: Number(data.possui_responsavel_boas_praticas),
        ativo: Number(data.ativo),
      };
      const response = await editarEstabelecimento(formattedData);
      console.log(formattedData);

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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-1 md:grid-cols-2"
          >
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nome do estabelecimento" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cnae"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CNAE</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="0000-0/00"
                      value={formatCNAE(cnaeValue)}
                      onChange={(e) => field.onChange(formatCNAE(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endereco"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Endereço completo" />
                  </FormControl>
                  <FormDescription>Formato: Rua, Número, Bairro, Cidade, Estado, CEP</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pessoal_ocupado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pessoal Ocupado</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Pessoas ocupadas no local" min="0" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numero_refeicoes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Refeições</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Número de refeições servidas" min="0" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="possui_alvara_sanitario"
              render={({}) => (
                <FormItem>
                  <FormLabel>Possui Alvará Sanitário</FormLabel>
                  <Controller
                    control={form.control}
                    name="possui_alvara_sanitario"
                    render={({ field }) => (
                      <RadioGroup
                        className="flex gap-4"
                        value={String(field.value)}
                        onValueChange={(value) => field.onChange(parseInt(value))}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1" id="possui_alvara_sim" />
                          <FormLabel htmlFor="possui_alvara_sim">Sim</FormLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="0" id="possui_alvara_nao" />
                          <FormLabel htmlFor="possui_alvara_nao">Não</FormLabel>
                        </div>
                      </RadioGroup>
                    )}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="possui_responsavel_boas_praticas"
              render={({}) => (
                <FormItem>
                  <FormLabel>Possui Responsável por Boas Práticas</FormLabel>
                  <Controller
                    control={form.control}
                    name="possui_responsavel_boas_praticas"
                    render={({ field }) => (
                      <RadioGroup
                        className="flex gap-4"
                        value={String(field.value)}
                        onValueChange={(value) => field.onChange(parseInt(value))}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1" id="possui_responsavel_sim" />
                          <FormLabel htmlFor="possui_responsavel_sim">Sim</FormLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="0" id="possui_responsavel_nao" />
                          <FormLabel htmlFor="possui_responsavel_nao">Não</FormLabel>
                        </div>
                      </RadioGroup>
                    )}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ativo"
              render={({}) => (
                <FormItem>
                  <FormLabel>Situação</FormLabel>
                  <Controller
                    control={form.control}
                    name="ativo"
                    render={({ field }) => (
                      <RadioGroup
                        className="flex gap-4"
                        value={String(field.value)}
                        onValueChange={(value) => field.onChange(parseInt(value))}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1" id="ativo_ativo" />
                          <FormLabel htmlFor="ativo_ativo">Ativo</FormLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="0" id="ativo_inativo" />
                          <FormLabel htmlFor="ativo_inativo">Inativo</FormLabel>
                        </div>
                      </RadioGroup>
                    )}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
          <DialogFooter className="flex-col-reverse gap-4 md:gap-0 md:flex-row">
            <Button className="bg-neutral-200 text-neutral-700 hover:bg-neutral-300" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={form.handleSubmit(onSubmit)}>Salvar</Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
