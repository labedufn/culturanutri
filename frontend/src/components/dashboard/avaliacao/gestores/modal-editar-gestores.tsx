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
import { editarGestor } from "@/actions/editar-gestor";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import { Form } from "@/components/ui/form";
import { AvaliacaoGestoresDadosIndividuaisForm } from "./avaliacao-gestores-dados-individuais-form";
import { AvaliacaoGestoresConhecimentoForm } from "./avaliacao-gestores-conhecimento-form";
import { AvaliacaoGestoresComprometimentoAfetivoForm } from "./avaliacao-gestores-comprometimento-afetivo-form";
import { AvaliacaoGestoresComprometimentoNormativoForm } from "./avaliacao-gestores-comprometimento-normativo-form";
import { AvaliacaoGestoresComprometimentoInstrumentalForm } from "./avaliacao-gestores-comprometimento-instrumental-form";
import { AvaliacaoGestoresPercepcaoRiscoForm } from "./avaliacao-gestores-percepcao-risco-form";
import { AvaliacaoGestoresSistemasGestaoForm } from "./avaliacao-gestores-sistemas-gestao-form";

const schema = z.object({
  nome_completo: z.string().min(1, "O campo nome completo é obrigatório."),
  genero: z.preprocess((value) => Number(value), z.number().min(0).max(1, "Valor inválido.")),
  idade: z.preprocess((value) => Number(value), z.number().min(0, "O campo idade é obrigatório.")),
  escolaridade: z.preprocess((value) => Number(value), z.number().min(1).max(3, "Valor inválido.")),
  formacao: z.string().optional(),
  ativo: z.preprocess((value) => Number(value), z.number().min(0).max(1, "Valor inválido.").optional()),
});

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
};

type ModalEditarGestorProps = {
  isOpen: boolean;
  onClose: () => void;
  gestor: Gestor;
  onUpdate: () => void;
};

export function ModalEditarGestor({ isOpen, onClose, gestor, onUpdate }: ModalEditarGestorProps) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: gestor.informacoes.dados_individuais,
  });

  useEffect(() => {
    form.reset(gestor.informacoes.dados_individuais);
  }, [gestor, form]);

  const onSubmit = async (data: any) => {
    try {
      const formattedData = {
        ...data,
        id: gestor.id,
        genero: Number(data.genero),
        idade: Number(data.idade),
        escolaridade: Number(data.escolaridade),
        ativo: Number(data.ativo),
      };
      const response = await editarGestor(formattedData);

      if (response.success) {
        toast({
          className: cn(
            "bg-green-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
          ),
          title: "Sucesso!",
          description: "Gestor atualizado com sucesso.",
        });
        onUpdate();
        onClose();
      } else {
        toast({
          className: cn(
            "bg-red-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
          ),
          title: "Erro!",
          description: response.message || "Erro ao editar gestor.",
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
          <DialogTitle>Editar Gestor</DialogTitle>
          <DialogDescription>Altere as informações do gestor selecionado.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-1 md:grid-cols-2"
          >
            <AvaliacaoGestoresDadosIndividuaisForm />
            <AvaliacaoGestoresConhecimentoForm />
            <AvaliacaoGestoresComprometimentoAfetivoForm />
            <AvaliacaoGestoresComprometimentoNormativoForm />
            <AvaliacaoGestoresComprometimentoInstrumentalForm />
            <AvaliacaoGestoresPercepcaoRiscoForm />
            <AvaliacaoGestoresSistemasGestaoForm />
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
