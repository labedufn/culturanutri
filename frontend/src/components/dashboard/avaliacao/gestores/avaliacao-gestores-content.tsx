"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { AvaliacaoGestoresDadosIndividuaisForm } from "./avaliacao-gestores-dados-individuais-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { AvaliacaoGestoresConhecimentoForm } from "./avaliacao-gestores-conhecimento-form";
import { AvaliacaoGestoresComprometimentoNormativoForm } from "./avaliacao-gestores-comprometimento-normativo-form";
import { AvaliacaoGestoresComprometimentoInstrumentalForm } from "./avaliacao-gestores-comprometimento-instrumental-form";
import { AvaliacaoGestoresPercepcaoRiscoForm } from "./avaliacao-gestores-percepcao-risco-form";
import { AvaliacaoGestoresSistemasGestaoForm } from "./avaliacao-gestores-sistemas-gestao-form";
import { useFormContext } from "./avaliacao-gestores-provider";
import { AvaliacaoGestoresComprometimentoAfetivoForm } from "./avaliacao-gestores-comprometimento-afetivo-form";
import { cadastrarGestor } from "@/actions/cadastrar-gestor";
import GestoresTable from "./gestores-table";
import { formatarDadosGestor } from "../json/formatar-dados-gestor";

interface AvaliacaoGestoresContentProps {
  onReload: () => void;
  id: string;
}

export function AvaliacaoGestoresContent({ onReload, id }: AvaliacaoGestoresContentProps) {
  const form = useFormContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      const formattedData = formatarDadosGestor(data, id);

      const response = await cadastrarGestor(formattedData);

      if (response.success) {
        toast({
          className: cn(
            "bg-green-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
          ),
          title: "Sucesso!",
          description: "Gestor cadastrado com sucesso.",
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
          description: `Erro ao cadastrar o gestor.`,
        });
      }
    } catch (error) {
      toast({
        className: cn(
          "bg-red-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        ),
        title: "Erro!",
        description: `Erro ao cadastrar o gestor.`,
      });
    }
  };

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row gap-4 lg:justify-between items-end mb-4">
        <h3 className="text-black">Tabela de avaliação de gestores</h3>
        <Button className="w-full lg:w-auto" onClick={openDialog}>
          Avaliar novo gestor
        </Button>
      </div>
      <GestoresTable />
      <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-[800px] lg:max-w-screen-lg overflow-y-scroll max-h-screen lg:max-h-[800px]">
          <DialogHeader>
            <DialogTitle>Avaliação do Gestor</DialogTitle>
          </DialogHeader>
          <div>
            <h3 className="font-semibold text-black mt-4 mb-2">Dados do individuais</h3>
            <div className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-1 md:grid-cols-2 mb-8">
              <AvaliacaoGestoresDadosIndividuaisForm />
            </div>
            <Separator className="my-8" />
            <h3 className="font-semibold text-black mt-4 mb-2">Conhecimento</h3>
            <div className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-1 md:grid-cols-2 mb-8">
              <AvaliacaoGestoresConhecimentoForm />
            </div>
            <Separator className="my-8" />
            <h3 className="font-semibold text-black mt-4 mb-2">Comprometimento afetivo</h3>
            <div className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-1 md:grid-cols-2 mb-8">
              <AvaliacaoGestoresComprometimentoAfetivoForm />
            </div>
            <Separator className="my-8" />
            <h3 className="font-semibold text-black mt-4 mb-2">Comprometimento normativo</h3>
            <div className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-1 md:grid-cols-2 mb-8">
              <AvaliacaoGestoresComprometimentoNormativoForm />
            </div>
            <Separator className="my-8" />
            <h3 className="font-semibold text-black mt-4 mb-2">Comprometimento instrumental</h3>
            <div className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-1 md:grid-cols-2 mb-8">
              <AvaliacaoGestoresComprometimentoInstrumentalForm />
            </div>
            <Separator className="my-8" />
            <h3 className="font-semibold text-black mt-4 mb-2">Percepção de risco</h3>
            <div className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-1 md:grid-cols-2 mb-8">
              <AvaliacaoGestoresPercepcaoRiscoForm />
            </div>
            <Separator className="my-8" />
            <h3 className="font-semibold text-black mt-4 mb-2">Sistemas de gestão</h3>
            <div className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-1 md:grid-cols-2 mb-8">
              <AvaliacaoGestoresSistemasGestaoForm />
            </div>
          </div>
          <DialogFooter className="flex-col-reverse gap-4 md:gap-0 md:flex-row">
            <Button className="bg-neutral-200 text-neutral-700 hover:bg-neutral-300" onClick={closeDialog}>
              Fechar
            </Button>
            <Button onClick={form.handleSubmit(onSubmit)}>Cadastrar gestor</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
