"use client";

import { useLocalStorageFormSync } from "@/hooks/use-local-storage-hook-form";
import { RadioGroupField } from "../form/radio-group-field";

const riscoOptions = [
  { label: "Extremamente baixo", value: "1" },
  { label: "Razoavelmente baixo", value: "2" },
  { label: "Pouco baixo", value: "3" },
  { label: "Regular", value: "4" },
  { label: "Pouco alto", value: "5" },
  { label: "Razoavelmente alto", value: "6" },
  { label: "Extremamente alto", value: "7" },
];

export function AvaliacaoGestoresPercepcaoRiscoForm() {
  useLocalStorageFormSync(["riscoIntoxicacaoSimilar", "riscoIntoxicacaoGerencia", "riscoDoencaGrave"]);

  return (
    <>
      <RadioGroupField
        name="riscoIntoxicacaoSimilar"
        label="Qual o risco do cliente apresentar dor de barriga e/ou vômitos (intoxicação alimentar) após comer uma refeição preparada por um manipulador de alimentos no estabelecimento similar ao que você gerencia (que tenha estrutura, cardápio, tamanho e funcionamento similar ao seu)?"
        options={riscoOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="riscoIntoxicacaoGerencia"
        label="Qual o risco do cliente apresentar dor de barriga e/ou vômitos (intoxicação alimentar) após comer uma refeição preparada no estabelecimento que você gerencia?"
        options={riscoOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="riscoDoencaGrave"
        label="Se o cliente consumir um alimento contaminado qual o risco que uma doença transmitida por alimentos pode ser grave ou letal a ele?"
        options={riscoOptions}
        orientation="vertical"
      />
    </>
  );
}
