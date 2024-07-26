"use client";

import { Separator } from "../ui/separator";
import { AvaliacaoGestoresComprometimentoAfetivo } from "./gestores/avaliacao-gestores-comprometimento-afetivo";
import { AvaliacaoGestoresComprometimentoInstrumental } from "./gestores/avaliacao-gestores-comprometimento-instrumental";
import { AvaliacaoGestoresComprometimentoNormativo } from "./gestores/avaliacao-gestores-comprometimento-normativo";
import { AvaliacaoGestoresConhecimento } from "./gestores/avaliacao-gestores-conhecimento";
import { AvaliacaoGestoresDadosIndividuais } from "./gestores/avaliacao-gestores-dados-individuais";
import { useRef, useState } from "react";
import { RefreshCw } from "lucide-react";
import React from "react";
import { AvaliacaoGestoresPercepcaoRisco } from "./gestores/avaliacao-gestores-percepcao-risco";
import { AvaliacaoGestoresSistemaGestao } from "./gestores/avaliacao-gestores-sistema-gestao";
import { Button } from "../ui/button";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

export function AvaliacaoGestores() {
  const [formValid, setFormValid] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const validationsRef = useRef({
    dadosIndividuaisGestor: false,
    conhecimentoGestor: false,
    comprometimentoAfetivoGestor: false,
    comprometimentoNormativoGestor: false,
    comprometimentoInstrumentalGestor: false,
    percepcaoRiscoGestor: false,
    sistemaGestaoGestor: false,
  });

  const handleComponentValidation = (component: string, valid: boolean) => {
    validationsRef.current = { ...validationsRef.current, [component]: valid };
    const allValid = Object.values(validationsRef.current).every((v) => v === true);
    setFormValid(allValid);
  };

  const validateForm = () => {
    const allValid = Object.values(validationsRef.current).every((v) => v === true);
    if (!allValid) {
      toast({
        className: cn(
          "bg-red-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        ),
        title: "Erro!",
        description: "Por favor, preencha todos os campos antes de continuar.",
      });
    }
    setFormValid(allValid);
  };

  const clearForm = () => {
    localStorage.removeItem("dadosIndividuaisGestor");
    localStorage.removeItem("conhecimentoGestor");
    localStorage.removeItem("comprometimentoAfetivoGestor");
    localStorage.removeItem("comprometimentoNormativoGestor");
    localStorage.removeItem("comprometimentoInstrumentalGestor");
    localStorage.removeItem("percepcaoRiscoGestor");
    localStorage.removeItem("sistemasGestaoGestor");
    toast({
      className: cn(
        "bg-green-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
      ),
      title: "Sucesso!",
      description: "Todos os campos foram limpos.",
    });
    validationsRef.current = {
      dadosIndividuaisGestor: false,
      conhecimentoGestor: false,
      comprometimentoAfetivoGestor: false,
      comprometimentoNormativoGestor: false,
      comprometimentoInstrumentalGestor: false,
      percepcaoRiscoGestor: false,
      sistemaGestaoGestor: false,
    };
    setFormValid(false);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-8 text-black">Avaliação do gestor</h2>
        <Button
          className="bg-secondary-500 p-3 hover:bg-secondary-600 rounded-full w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center"
          onClick={clearForm}
        >
          <RefreshCw className="text-white" />
        </Button>
      </div>
      <AvaliacaoGestoresDadosIndividuais
        key={refreshKey}
        onFormValidation={(valid) => handleComponentValidation("dadosIndividuaisGestor", valid)}
      />
      <Separator className="my-8" />
      <AvaliacaoGestoresConhecimento
        key={refreshKey + 1}
        onFormValidation={(valid) => handleComponentValidation("conhecimentoGestor", valid)}
      />
      <Separator className="my-8" />
      <AvaliacaoGestoresComprometimentoAfetivo
        key={refreshKey + 2}
        onFormValidation={(valid) => handleComponentValidation("comprometimentoAfetivoGestor", valid)}
      />
      <Separator className="my-8" />
      <AvaliacaoGestoresComprometimentoNormativo
        key={refreshKey + 3}
        onFormValidation={(valid) => handleComponentValidation("comprometimentoNormativoGestor", valid)}
      />
      <Separator className="my-8" />
      <AvaliacaoGestoresComprometimentoInstrumental
        key={refreshKey + 4}
        onFormValidation={(valid) => handleComponentValidation("comprometimentoInstrumentalGestor", valid)}
      />
      <Separator className="my-8" />
      <AvaliacaoGestoresPercepcaoRisco
        key={refreshKey + 5}
        onFormValidation={(valid) => handleComponentValidation("percepcaoRiscoGestor", valid)}
      />
      <Separator className="my-8" />
      <div className="mb-8">
        <AvaliacaoGestoresSistemaGestao
          key={refreshKey + 6}
          onFormValidation={(valid) => handleComponentValidation("sistemaGestaoGestor", valid)}
        />
      </div>
      <div>
        <Button className="bg-green-500 p-4 hover:bg-green-600" onClick={validateForm}>
          Validar Formulário
        </Button>
      </div>
      <div>
        {formValid ? (
          <p className="text-green-500">Formulário válido!</p>
        ) : (
          <p className="text-red-500">Formulário inválido. Por favor, preencha todos os campos.</p>
        )}
      </div>
    </>
  );
}
