"use client";

import { Separator } from "../ui/separator";
import { AvaliacaoGestoresComprometimentoAfetivo } from "./gestores/avaliacao-gestores-comprometimento-afetivo";
import { AvaliacaoGestoresComprometimentoInstrumental } from "./gestores/avaliacao-gestores-comprometimento-instrumental";
import { AvaliacaoGestoresComprometimentoNormativo } from "./gestores/avaliacao-gestores-comprometimento-normativo";
import { AvaliacaoGestoresConhecimento } from "./gestores/avaliacao-gestores-conhecimento";
import { AvaliacaoGestoresDadosIndividuais } from "./gestores/avaliacao-gestores-dados-individuais";
import { AvaliacaoGestoresPercepcaoRisco } from "./gestores/avaliacao-gestores-percepcao-risco";
import { AvaliacaoGestoresSistemaGestao } from "./gestores/avaliacao-gestores-sistema-gestao";
import { useState } from "react";

import React from "react";

type AvaliacaoGestoresProps = {
  onFormValidation: (valid: boolean) => void;
};

export function AvaliacaoGestores({ onFormValidation }: AvaliacaoGestoresProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isValid, setIsValid] = useState(false);

  const handleFormValidation = (valid: boolean) => {
    setIsValid(valid);
    onFormValidation(valid);
  };

  return (
    <>
      <AvaliacaoGestoresDadosIndividuais onFormValidation={handleFormValidation} />
      <Separator className="my-8" />
      <AvaliacaoGestoresConhecimento onFormValidation={handleFormValidation} />
      <Separator className="my-8" />
      <AvaliacaoGestoresComprometimentoAfetivo onFormValidation={handleFormValidation} />
      <Separator className="my-8" />
      <AvaliacaoGestoresComprometimentoNormativo onFormValidation={handleFormValidation} />
      <Separator className="my-8" />
      <AvaliacaoGestoresComprometimentoInstrumental onFormValidation={handleFormValidation} />
      <Separator className="my-8" />
      <AvaliacaoGestoresPercepcaoRisco onFormValidation={handleFormValidation} />
      <Separator className="my-8" />
      <AvaliacaoGestoresSistemaGestao onFormValidation={handleFormValidation} />
    </>
  );
}
