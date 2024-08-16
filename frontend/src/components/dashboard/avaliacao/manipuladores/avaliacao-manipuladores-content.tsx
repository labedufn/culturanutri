"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatarDadosManipulador } from "./json/formatar-dados-manipulador";
import { AvaliacaoManipuladoresDadosIndividuaisForm } from "./avaliacao-manipuladores-dados-individuais-form";
import ManipuladoresTable from "./manipuladores-table";
import { useFormContext } from "./avaliacao-manipuladores-provider";
import { cadastrarManipulador } from "@/actions/cadastrar-manipulador";
import { AvaliacaoManipuladoresConhecimentoForm } from "./avaliacao-manipuladores-conhecimento-form";
import { AvaliacaoManipuladoresLiderancaForm } from "./avaliacao-manipuladores-lideranca-form";
import { AvaliacaoManipuladoresComunicacaoForm } from "./avaliacao-manipuladores-comunicacao-form";
import { AvaliacaoManipuladoresComprometimentoAfetivoForm } from "./avaliacao-manipuladores-comprometimento-afetivo-form";
import { AvaliacaoManipuladoresComprometimentoNormativoForm } from "./avaliacao-manipuladores-comprometimento-normativo-form";
import { AvaliacaoManipuladoresComprometimentoInstrumentalForm } from "./avaliacao-manipuladores-comprometimento-instrumental-form";
import { AvaliacaoManipuladoresComprometimentoSegurancaForm } from "./avaliacao-manipuladores-comprometimento-seguranca-form";
import { AvaliacaoManipuladoresPercepcaoRiscoForm } from "./avaliacao-manipuladores-percepcao-risco-form";
import { AvaliacaoManipuladoresPressoesTrabalhoForm } from "./avaliacao-manipuladores-pressoes-trabalho-form";
import { AvaliacaoManipuladoresAmbienteTrabalhoForm } from "./avaliacao-manipuladores-ambiente-trabalho-form";
import { AvaliacaoManipuladoresSistemasGestaoForm } from "./avaliacao-manipuladores-sistemas-gestao-form";

interface AvaliacaoManipuladoresContentProps {
  onReload: () => void;
  id: string;
}

export function AvaliacaoManipuladoresContent({ onReload, id }: AvaliacaoManipuladoresContentProps) {
  const form = useFormContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      const formattedData = formatarDadosManipulador(data, id);

      const response = await cadastrarManipulador(formattedData);

      if (response.success) {
        toast({
          className: cn(
            "bg-green-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
          ),
          title: "Sucesso!",
          description: "Manipulador cadastrado com sucesso.",
        });

        const sidebarOpen = localStorage.getItem("sidebarOpen");
        localStorage.clear();
        if (sidebarOpen !== null) {
          localStorage.setItem("sidebarOpen", sidebarOpen);
        }

        onReload();
      } else {
        toast({
          className: cn(
            "bg-red-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
          ),
          title: "Erro!",
          description: `Erro ao cadastrar o manipulador.`,
        });
      }
    } catch (error) {
      toast({
        className: cn(
          "bg-red-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        ),
        title: "Erro!",
        description: `Erro ao cadastrar o manipulador.`,
      });
    }
  };

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row gap-4 lg:justify-between items-end mb-4">
        <h3 className="text-black">Tabela de avaliação de manipuladores</h3>
        <Button className="w-full lg:w-auto" onClick={openDialog}>
          Avaliar novo manipulador
        </Button>
      </div>
      <ManipuladoresTable />
      <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-[800px] lg:max-w-screen-lg overflow-y-scroll max-h-screen lg:max-h-[800px]">
          <DialogHeader>
            <DialogTitle>Avaliação do Manipulador</DialogTitle>
          </DialogHeader>
          <div>
            <h3 className="font-semibold text-black mt-4 mb-2">Dados individuais</h3>
            <div className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-1 md:grid-cols-2 mb-8">
              <AvaliacaoManipuladoresDadosIndividuaisForm />
            </div>
            <Separator className="my-8" />
            <h3 className="font-semibold text-black mt-4 mb-2">Liderança</h3>
            <div className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-1 md:grid-cols-2 mb-8">
              <AvaliacaoManipuladoresLiderancaForm />
            </div>
            <Separator className="my-8" />
            <h3 className="font-semibold text-black mt-4 mb-2">Comunicação</h3>
            <div className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-1 md:grid-cols-2 mb-8">
              <AvaliacaoManipuladoresComunicacaoForm />
            </div>
            <Separator className="my-8" />
            <h3 className="font-semibold text-black mt-4 mb-2">Conhecimento</h3>
            <div className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-1 md:grid-cols-2 mb-8">
              <AvaliacaoManipuladoresConhecimentoForm />
            </div>
            <Separator className="my-8" />
            <h3 className="font-semibold text-black mt-4 mb-2">Comprometimento afetivo</h3>
            <div className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-1 md:grid-cols-2 mb-8">
              <AvaliacaoManipuladoresComprometimentoAfetivoForm />
            </div>
            <Separator className="my-8" />
            <h3 className="font-semibold text-black mt-4 mb-2">Comprometimento normativo</h3>
            <div className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-1 md:grid-cols-2 mb-8">
              <AvaliacaoManipuladoresComprometimentoNormativoForm />
            </div>
            <Separator className="my-8" />
            <h3 className="font-semibold text-black mt-4 mb-2">Comprometimento instrumental</h3>
            <div className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-1 md:grid-cols-2 mb-8">
              <AvaliacaoManipuladoresComprometimentoInstrumentalForm />
            </div>
            <Separator className="my-8" />
            <h3 className="font-semibold text-black mt-4 mb-2">Comprometimento com segurança dos alimentos</h3>
            <div className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-1 md:grid-cols-2 mb-8">
              <AvaliacaoManipuladoresComprometimentoSegurancaForm />
            </div>
            <Separator className="my-8" />
            <h3 className="font-semibold text-black mt-4 mb-2">Percepção de risco</h3>
            <div className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-1 md:grid-cols-2 mb-8">
              <AvaliacaoManipuladoresPercepcaoRiscoForm />
            </div>
            <Separator className="my-8" />
            <h3 className="font-semibold text-black mt-4 mb-2">Pressões de trabalho e crenças normativas</h3>
            <div className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-1 md:grid-cols-2 mb-8">
              <AvaliacaoManipuladoresPressoesTrabalhoForm />
            </div>
            <Separator className="my-8" />
            <h3 className="font-semibold text-black mt-4 mb-2">Ambiente de trabalho</h3>
            <div className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-1 md:grid-cols-2 mb-8">
              <AvaliacaoManipuladoresAmbienteTrabalhoForm />
            </div>
            <Separator className="my-8" />
            <h3 className="font-semibold text-black mt-4 mb-2">Sistemas de gestão</h3>
            <div className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-1 md:grid-cols-2 mb-8">
              <AvaliacaoManipuladoresSistemasGestaoForm />
            </div>
          </div>
          <DialogFooter className="flex-col-reverse gap-4 md:gap-0 md:flex-row">
            <Button className="bg-neutral-200 text-neutral-700 hover:bg-neutral-300" onClick={closeDialog}>
              Fechar
            </Button>
            <Button onClick={form.handleSubmit(onSubmit)}>Cadastrar manipulador</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
