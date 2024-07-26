"use client";

import { Separator } from "../ui/separator";
import { useRef } from "react";

import React from "react";
import { AvaliacaoManipuladoresDadosIndividuais } from "./manipuladores/avaliacao-manipuladores-dados-individuais";
import { AvaliacaoManipuladoresLideranca } from "./manipuladores/avaliacao-manipuladores-lideranca";
import { AvaliacaoManipuladoresComunicacao } from "./manipuladores/avaliacao-manipuladores-comunicacao";
import { AvaliacaoManipuladoresConhecimento } from "./manipuladores/avaliacao-manipuladores-conhecimento";
import { AvaliacaoManipuladoresComprometimentoAfetivo } from "./manipuladores/avaliacao-manipuladores-comprometimento-afetivo";
import { AvaliacaoGestoresComprometimentoNormativo } from "./gestores/avaliacao-gestores-comprometimento-normativo";
import { AvaliacaoManipuladoresComprometimentoInstrumental } from "./manipuladores/avaliacao-manipuladores-instrumental";
import { AvaliacaoManipuladoresComprometimentoSegurancaAlimentos } from "./manipuladores/avaliacao-manipuladores-seguranca-alimentos";
import { AvaliacaoManipuladoresPercepcaoRisco } from "./manipuladores/avaliacao-manipuladores-percepcao-risco";
import { AvaliacaoManipuladoresSistemaGestao } from "./manipuladores/avaliacao-manipuladores-sistema-gestao";
import { AvaliacaoManipuladoresAmbienteTrabalho } from "./manipuladores/avaliacao-manipuladores-ambiente-trabalho";

type AvaliacaoManipuladoresProps = {
  onFormValidation: (valid: boolean) => void;
};

export function AvaliacaoManipuladores({ onFormValidation }: AvaliacaoManipuladoresProps) {
  const validationsRef = useRef({
    dadosIndividuaisManipulador: false,
    liderancaManipulador: false,
    comunicacaoManipulador: false,
    conhecimentoManipulador: false,
    comprometimentoAfetivoManipulador: false,
    comprometimentoNormativoGestor: false,
    comprometimentoInstrumentalManipulador: false,
    comprometimentoSegurancaAlimentosManipulador: false,
    percepcaoRiscoManipulador: false,
    pressoesTrabalhoCrencasNormativasManipulador: false,
    ambienteTrabalhoManipulador: false,
    sistemaGestaoManipulador: false,
  });

  const handleComponentValidation = (component: string, valid: boolean) => {
    validationsRef.current = { ...validationsRef.current, [component]: valid };
    const allValid = Object.values(validationsRef.current).every((v) => v === true);
    onFormValidation(allValid);
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-8 text-black">Avaliação do manipulador de alimentos</h2>
      <AvaliacaoManipuladoresDadosIndividuais
        onFormValidation={(valid) => handleComponentValidation("dadosIndividuaisManipulador", valid)}
      />
      <Separator className="my-8" />
      <AvaliacaoManipuladoresLideranca
        onFormValidation={(valid) => handleComponentValidation("liderancaManipulador", valid)}
      />
      <Separator className="my-8" />
      <AvaliacaoManipuladoresComunicacao
        onFormValidation={(valid) => handleComponentValidation("comunicacaoManipulador", valid)}
      />
      <Separator className="my-8" />
      <AvaliacaoManipuladoresConhecimento
        onFormValidation={(valid) => handleComponentValidation("conhecimentoManipulador", valid)}
      />
      <Separator className="my-8" />
      <AvaliacaoManipuladoresComprometimentoAfetivo
        onFormValidation={(valid) => handleComponentValidation("comprometimentoAfetivoManipulador", valid)}
      />
      <Separator className="my-8" />
      <AvaliacaoGestoresComprometimentoNormativo
        onFormValidation={(valid) => handleComponentValidation("comprometimentoInstrumentalManipulador", valid)}
      />
      <Separator className="my-8" />
      <AvaliacaoManipuladoresComprometimentoInstrumental
        onFormValidation={(valid) => handleComponentValidation("comprometimentoInstrumentalManipulador", valid)}
      />
      <Separator className="my-8" />
      <AvaliacaoManipuladoresComprometimentoSegurancaAlimentos
        onFormValidation={(valid) => handleComponentValidation("comprometimentoSegurancaAlimentosManipulador", valid)}
      />
      <Separator className="my-8" />
      <AvaliacaoManipuladoresPercepcaoRisco
        onFormValidation={(valid) => handleComponentValidation("percepcaoRiscoManipulador", valid)}
      />
      <Separator className="my-8" />
      <AvaliacaoManipuladoresComprometimentoSegurancaAlimentos
        onFormValidation={(valid) => handleComponentValidation("pressoesTrabalhoCrencasNormativasManipulador", valid)}
      />
      <Separator className="my-8" />
      <AvaliacaoManipuladoresAmbienteTrabalho
        onFormValidation={(valid) => handleComponentValidation("ambienteTrabalhoManipulador", valid)}
      />
      <Separator className="my-8" />
      <div className="mb-12">
        <AvaliacaoManipuladoresSistemaGestao
          onFormValidation={(valid) => handleComponentValidation("sistemaGestaoManipulador", valid)}
        />
      </div>
    </>
  );
}
