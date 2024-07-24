"use client";

import { Separator } from "../ui/separator";
import { AvaliacaoGestoresComprometimentoAfetivo } from "./gestores/avaliacao-gestores-comprometimento-afetivo";
import { AvaliacaoGestoresComprometimentoInstrumental } from "./gestores/avaliacao-gestores-comprometimento-instrumental";
import { AvaliacaoGestoresComprometimentoNormativo } from "./gestores/avaliacao-gestores-comprometimento-normativo";
import { AvaliacaoGestoresConhecimento } from "./gestores/avaliacao-gestores-conhecimento";
import { AvaliacaoGestoresDadosIndividuais } from "./gestores/avaliacao-gestores-dados-individuais";
import { AvaliacaoGestoresPercepcaoRisco } from "./gestores/avaliacao-gestores-percepcao-risco";
import { AvaliacaoGestoresSistemaGestao } from "./gestores/avaliacao-gestores-sistema-gestao";
import { useRef } from "react";

import React from "react";

type AvaliacaoGestoresProps = {
  onFormValidation: (valid: boolean) => void;
};

export function AvaliacaoGestores({ onFormValidation }: AvaliacaoGestoresProps) {
  const validationsRef = useRef({
    dadosIndividuais: false,
    conhecimento: false,
    comprometimentoAfetivo: false,
    comprometimentoNormativo: false,
    comprometimentoInstrumental: false,
    percepcaoRisco: false,
    sistemaGestao: false,
  });

  const handleComponentValidation = (component: string, valid: boolean) => {
    validationsRef.current = { ...validationsRef.current, [component]: valid };
    const allValid = Object.values(validationsRef.current).every((v) => v === true);
    onFormValidation(allValid);
  };

  return (
    <>
      <AvaliacaoGestoresDadosIndividuais
        onFormValidation={(valid) => handleComponentValidation("dadosIndividuais", valid)}
      />
      <Separator className="my-8" />
      <AvaliacaoGestoresConhecimento onFormValidation={(valid) => handleComponentValidation("conhecimento", valid)} />
      <Separator className="my-8" />
      <AvaliacaoGestoresComprometimentoAfetivo
        onFormValidation={(valid) => handleComponentValidation("comprometimentoAfetivo", valid)}
      />
      <Separator className="my-8" />
      <AvaliacaoGestoresComprometimentoNormativo
        onFormValidation={(valid) => handleComponentValidation("comprometimentoNormativo", valid)}
      />
      <Separator className="my-8" />
      <AvaliacaoGestoresComprometimentoInstrumental
        onFormValidation={(valid) => handleComponentValidation("comprometimentoInstrumental", valid)}
      />
      <Separator className="my-8" />
      <AvaliacaoGestoresPercepcaoRisco
        onFormValidation={(valid) => handleComponentValidation("percepcaoRisco", valid)}
      />
      <Separator className="my-8" />
      <AvaliacaoGestoresSistemaGestao onFormValidation={(valid) => handleComponentValidation("sistemaGestao", valid)} />
    </>
  );
}
