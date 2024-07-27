"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { AvaliacaoGestoresProvider, useFormContext } from "./avaliacao-gestores-provider";
import { cn } from "@/lib/utils";
import { AvaliacaoGestoresDadosIndividuaisForm } from "./avaliacao-gestores-dados-individuais-form";

export function AvaliacaoGestoresContent() {
  const form = useFormContext();

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

  return (
    <>
      <div className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-1 md:grid-cols-2 mb-8">
        <AvaliacaoGestoresDadosIndividuaisForm />
      </div>
      <Button className="w-full" onClick={form.handleSubmit(onSubmit)}>
        Cadastrar gestor
      </Button>
    </>
  );
}

export function AvaliacaoGestores() {
  return (
    <AvaliacaoGestoresProvider>
      <AvaliacaoGestoresContent />
    </AvaliacaoGestoresProvider>
  );
}
