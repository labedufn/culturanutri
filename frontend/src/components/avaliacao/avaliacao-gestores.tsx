"use client";

import { Separator } from "../ui/separator";
import { AvaliacaoGestoresComprometimentoAfetivo } from "./gestores/avaliacao-gestores-comprometimento-afetivo";
import { AvaliacaoGestoresComprometimentoInstrumental } from "./gestores/avaliacao-gestores-comprometimento-instrumental";
import { AvaliacaoGestoresComprometimentoNormativo } from "./gestores/avaliacao-gestores-comprometimento-normativo";
import { AvaliacaoGestoresConhecimento } from "./gestores/avaliacao-gestores-conhecimento";
import { AvaliacaoGestoresDadosIndividuais } from "./gestores/avaliacao-gestores-dados-individuais";
import { useRef } from "react";

import React from "react";
import { AvaliacaoGestoresPercepcaoRisco } from "./gestores/avaliacao-gestores-percepcao-risco";
import { AvaliacaoGestoresSistemaGestao } from "./gestores/avaliacao-gestores-sistema-gestao";

type AvaliacaoGestoresProps = {
  onFormValidation: (valid: boolean) => void;
};

export function AvaliacaoGestores({ onFormValidation }: AvaliacaoGestoresProps) {
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
    onFormValidation(allValid);
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-8 text-black">Avaliação do gestor</h2>
      <AvaliacaoGestoresDadosIndividuais
        onFormValidation={(valid) => handleComponentValidation("dadosIndividuaisGestor", valid)}
      />
      <Separator className="my-8" />
      <AvaliacaoGestoresConhecimento
        onFormValidation={(valid) => handleComponentValidation("conhecimentoGestor", valid)}
      />
      <Separator className="my-8" />
      <AvaliacaoGestoresComprometimentoAfetivo
        onFormValidation={(valid) => handleComponentValidation("comprometimentoAfetivoGestor", valid)}
      />
      <Separator className="my-8" />
      <AvaliacaoGestoresComprometimentoNormativo
        onFormValidation={(valid) => handleComponentValidation("comprometimentoNormativoGestor", valid)}
      />
      <Separator className="my-8" />
      <AvaliacaoGestoresComprometimentoInstrumental
        onFormValidation={(valid) => handleComponentValidation("comprometimentoInstrumentalGestor", valid)}
      />
      <Separator className="my-8" />
      <AvaliacaoGestoresPercepcaoRisco
        onFormValidation={(valid) => handleComponentValidation("percepcaoRiscoGestor", valid)}
      />
      <Separator className="my-8" />
      <div className="mb-12">
        <AvaliacaoGestoresSistemaGestao
          onFormValidation={(valid) => handleComponentValidation("sistemaGestaoGestor", valid)}
        />
      </div>
    </>
  );
}
