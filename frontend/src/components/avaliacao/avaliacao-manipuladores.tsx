"use client";

import { Separator } from "../ui/separator";
import { useRef } from "react";

import React from "react";
import { AvaliacaoManipuladoresDadosIndividuais } from "./manipuladores/avaliacao-manipuladores-dados-individuais";

type AvaliacaoManipuladoresProps = {
  onFormValidation: (valid: boolean) => void;
};

export function AvaliacaoManipuladores({ onFormValidation }: AvaliacaoManipuladoresProps) {
  const validationsRef = useRef({
    dadosIndividuais: false,
    conhecimento: false,
    comprometimentoAfetivo: false,
    comprometimentoNormativo: false,
    comprometimentoInstrumental: false,
    percepcaoRisco: false,
  });

  const handleComponentValidation = (component: string, valid: boolean) => {
    validationsRef.current = { ...validationsRef.current, [component]: valid };
    const allValid = Object.values(validationsRef.current).every((v) => v === true);
    onFormValidation(allValid);
  };

  return (
    <>
      <AvaliacaoManipuladoresDadosIndividuais
        onFormValidation={(valid) => handleComponentValidation("dadosIndividuais", valid)}
      />
      <Separator className="my-8" />
    </>
  );
}
