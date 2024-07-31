"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { cadastrarEstabelecimento } from "@/actions/cadastrar-estabelecimento";
import { cadastrarAvaliacao } from "@/actions/cadastrar-avaliacao";
import { CadastrarEstabelecimentoProvider, useFormContext } from "./cadastrar-estabelecimento-provider";
import { cn } from "@/lib/utils";
import { CadastrarEstabelecimentoForm } from "./cadastrar-estabelecimento-form";
import { currentUserId } from "@/scripts/currentUserId";

export function CadastrarEstabelecimentoContent() {
  const form = useFormContext();
  const router = useRouter();

  useEffect(() => {
    const checkUserId = async () => {
      const currentId = await currentUserId();
      const storedId = localStorage.getItem("userId");

      if (currentId && currentId !== storedId) {
        const sidebarOpen = localStorage.getItem("sidebarOpen");
        const estabelecimentoId = localStorage.getItem("estabelecimentoId");
        localStorage.clear();
        if (sidebarOpen) {
          localStorage.setItem("sidebarOpen", sidebarOpen);
        } else if (estabelecimentoId) {
          localStorage.setItem("estabelecimentoId", estabelecimentoId);
        }
        localStorage.setItem("userId", currentId);
      } else if (!storedId) {
        localStorage.setItem("userId", currentId || "");
      }
    };

    checkUserId();
  }, []);

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

      const responseEstabelecimento = await cadastrarEstabelecimento(formattedData);

      if (responseEstabelecimento.success && responseEstabelecimento.estabelecimentoCriado) {
        const estabelecimentoId = responseEstabelecimento.estabelecimentoCriado.id;
        localStorage.setItem("estabelecimentoId", estabelecimentoId);

        const responseAvaliacao = await cadastrarAvaliacao(estabelecimentoId);

        console.log(responseAvaliacao.avaliacaoCriada.id);

        if (responseAvaliacao.success && responseAvaliacao.avaliacaoCriada) {
          toast({
            className: cn(
              "bg-green-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
            ),
            title: "Sucesso!",
            description: "Estabelecimento e avaliação cadastrados com sucesso.",
          });
          router.push(`/dashboard/avaliacoes/${responseAvaliacao.avaliacaoCriada.id}`);
        } else {
          toast({
            className: cn(
              "bg-red-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
            ),
            title: "Erro!",
            description: responseAvaliacao.message || "Erro ao cadastrar avaliação.",
          });
        }
      } else {
        toast({
          className: cn(
            "bg-red-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
          ),
          title: "Erro!",
          description: responseEstabelecimento.message || "Erro ao cadastrar estabelecimento.",
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

export function CadastrarEstabelecimento() {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-black mb-2">Cadastrar estabelecimento</h2>
        <p className="text-muted-foreground text-sm">
          Para iniciar uma avaliação é necessário cadastrar o estabelecimento que deseja avaliar.
        </p>
      </div>
      <CadastrarEstabelecimentoProvider>
        <CadastrarEstabelecimentoContent />
      </CadastrarEstabelecimentoProvider>
    </>
  );
}
