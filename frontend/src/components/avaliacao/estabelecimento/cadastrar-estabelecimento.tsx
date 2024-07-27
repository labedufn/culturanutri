"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { cadastrarEstabelecimento } from "@/actions/cadastrar-estabelecimento";
import { CadastrarEstabelecimentoProvider, useFormContext } from "./cadastrar-estabelecimento-provider";
import { cn } from "@/lib/utils";
import { CadastrarEstabelecimentoForm } from "./cadastrar-estabelecimento-form";

interface CadastrarEstabelecimentoContentProps {
  onSuccess: () => void;
}

export function CadastrarEstabelecimentoContent({ onSuccess }: CadastrarEstabelecimentoContentProps) {
  const form = useFormContext();

  const onSubmit = async (data: any) => {
    try {
      const formattedData = {
        ...data,
        cnae: data.cnae?.replace(/\D/g, "") || "",
        pessoal_ocupado: Number(data.pessoal_ocupado),
        numero_refeicoes: Number(data.numero_refeicoes),
        possui_alvara_sanitario: Number(data.possui_alvara_sanitario),
        possui_responsavel_boas_praticas: Number(data.possui_responsavel_boas_praticas),
      };
      const response = await cadastrarEstabelecimento(formattedData);

      if (response.success && response.estabelecimentoCriado) {
        localStorage.setItem("estabelecimentoId", response.estabelecimentoCriado.id);

        toast({
          className: cn(
            "bg-green-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
          ),
          title: "Sucesso!",
          description: "Estabelecimento cadastrado com sucesso.",
        });
        onSuccess();
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
    <>
      <div className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-1 md:grid-cols-2 mb-8">
        <CadastrarEstabelecimentoForm />
      </div>
      <Button className="w-full" onClick={form.handleSubmit(onSubmit)}>
        Cadastrar estabelecimento
      </Button>
    </>
  );
}

export function CadastrarEstabelecimento({ onSuccess }: { onSuccess: () => void }) {
  return (
    <CadastrarEstabelecimentoProvider>
      <CadastrarEstabelecimentoContent onSuccess={onSuccess} />
    </CadastrarEstabelecimentoProvider>
  );
}
