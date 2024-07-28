"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { AvaliacaoGestoresProvider, useFormContext } from "./avaliacao-gestores-provider";
import { cn } from "@/lib/utils";
import { AvaliacaoGestoresDadosIndividuaisForm } from "./avaliacao-gestores-dados-individuais-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export function AvaliacaoGestoresContent({ onReload }: { onReload: () => void }) {
  const form = useFormContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      const formattedData = {
        nome_completo: data.nomeCompleto,
        genero: Number(data.genero),
        idade: Number(data.idade),
        escolaridade: Number(data.escolaridade),
        formacao: data.formacao,
        nao_tenha_formacao_tem_treinamento: Number(data.naoTenhaFormacaoTemTreinamento),
        tempo_trabalha_com_alimentos: Number(data.tempoTrabalhaComAlimentos),
        acredita_comunicacao_boa: Number(data.acreditaComunicacaoBoa),
        realiza_treinamentos_boas_prticas_manipulação: Number(data.realizaTreinamentosBoasPraticas),
        carga_horaria: data.cargaHoraria,
        temas_treinamentos: data.temasTreinamentos,
      };

      console.log(formattedData);

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
    } catch (error) {
      toast({
        className: cn(
          "bg-red-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        ),
        title: "Erro!",
        description: "Erro ao cadastrar o gestor.",
      });
    }
  };

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <>
      <Button onClick={openDialog}>Avaliar novo gestor</Button>
      <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-[800px] lg:max-w-screen-lg overflow-y-scroll lg:overflow-hidden max-h-screen">
          <DialogHeader>
            <DialogTitle>Avaliação de Gestor</DialogTitle>
          </DialogHeader>
          <div>
            <h3 className="font-semibold text-black mt-4 mb-2">Dados do individuais</h3>
            <div className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-1 md:grid-cols-2 mb-8">
              <AvaliacaoGestoresDadosIndividuaisForm />
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

export function AvaliacaoGestores() {
  const [reloadKey, setReloadKey] = useState(0);

  const handleReload = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-8 text-black">Avaliação de gestores</h2>
      <AvaliacaoGestoresProvider key={reloadKey}>
        <AvaliacaoGestoresContent onReload={handleReload} />
      </AvaliacaoGestoresProvider>
    </>
  );
}
