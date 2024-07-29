"use client";

import { useLocalStorageFormSync } from "@/hooks/use-local-storage-hook-form";
import { RadioGroupField } from "../form/radio-group-field";

const escalaOptions = [
  { label: "Discordo totalmente", value: "1" },
  { label: "Discordo parcialmente", value: "2" },
  { label: "Nem discordo nem concordo", value: "3" },
  { label: "Concordo parcialmente", value: "4" },
  { label: "Concordo totalmente", value: "5" },
];

export function AvaliacaoGestoresSistemasGestaoForm() {
  useLocalStorageFormSync([
    "modificarLideranca",
    "modificarComunicacao",
    "modificarSegurancaAlimentos",
    "modificarAmbienteTrabalho",
    "pressionarManipulador",
    "modificarComprometimento",
    "melhorarBoasPraticas",
  ]);

  return (
    <>
      <RadioGroupField
        name="modificarLideranca"
        label="A forma de liderança deve ser modificada somente quando o consumidor tem alta percepção de risco de doenças transmitidas por alimentos."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="modificarComunicacao"
        label="A forma de comunicação deve ser modificada somente quando o consumidor tem alta percepção de risco de doenças transmitidas por alimentos."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="modificarSegurancaAlimentos"
        label="A forma de gerenciar a segurança dos alimentos deve ser modificada somente quando o consumidor tem alta percepção de risco de doenças transmitidas por alimentos."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="modificarAmbienteTrabalho"
        label="O ambiente de trabalho deve ser modificado somente quando o consumidor tem alta percepção de risco de doenças transmitidas por alimentos."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="pressionarManipulador"
        label="O manipulador de alimentos deve ser mais pressionado somente quando o consumidor tem alta percepção de risco de doenças transmitidas por alimentos."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="modificarComprometimento"
        label="O comprometimento dos manipuladores deve ser modificado somente quando o consumidor tem alta percepção de risco de doenças transmitidas por alimentos."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="melhorarBoasPraticas"
        label="As boas práticas devem ser melhoradas somente quando o consumidor tem alta percepção de risco de doenças transmitidas por alimentos."
        options={escalaOptions}
        orientation="vertical"
      />
    </>
  );
}
