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

export function AvaliacaoManipuladoresComprometimentoInstrumentalForm() {
  useLocalStorageFormSync(
    ["deixarEmpregoVidaDesestruturada", "poucasAlternativasCasoDeixarEmprego", "muitoDificilDeixarEmprego"],
    "Manipulador",
  );

  return (
    <>
      <RadioGroupField
        name="deixarEmpregoVidaDesestruturada"
        label="Se eu decidisse deixar meu emprego agora, minha vida ficaria bastante desestruturada."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="poucasAlternativasCasoDeixarEmprego"
        label="Eu acho que teria poucas alternativas se deixasse este emprego."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="muitoDificilDeixarEmprego"
        label="Mesmo se eu quisesse, seria muito difícil para mim deixar meu emprego agora."
        options={escalaOptions}
        orientation="vertical"
      />
    </>
  );
}
