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

export function AvaliacaoGestoresComprometimentoNormativoForm() {
  useLocalStorageFormSync(["obrigacaoMoral", "sentirCulpado", "naoSeriaCerto", "devoMuito"]);

  return (
    <>
      <RadioGroupField
        name="obrigacaoMoral"
        label="Eu não deixaria meu emprego agora porque eu tenho uma obrigação moral com as pessoas daqui."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="sentirCulpado"
        label="Eu me sentiria culpado se deixasse meu emprego agora."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="naoSeriaCerto"
        label="Mesmo se fosse vantagem para mim, eu sinto que não seria certo deixar meu emprego agora."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="devoMuito"
        label="Eu devo muito a esse meu emprego."
        options={escalaOptions}
        orientation="vertical"
      />
    </>
  );
}
