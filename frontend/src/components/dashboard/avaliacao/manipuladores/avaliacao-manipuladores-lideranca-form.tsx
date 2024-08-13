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

export function AvaliacaoManipuladoresLiderancaForm() {
  useLocalStorageFormSync(["normasHigiene", "liderAtento", "funcionariosRepreendidos"], "Manipulador");

  return (
    <>
      <RadioGroupField
        name="normasHigiene"
        label="A gestão impõe normas de higiene para todos os funcionários."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="liderAtento"
        label="O meu líder está sempre atento para ver se os funcionários estão praticando as boas práticas de manipulação de alimentos."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="funcionariosRepreendidos"
        label="Os funcionários são repreendidos quando não seguem as boas práticas de manipulação de alimentos."
        options={escalaOptions}
        orientation="vertical"
      />
    </>
  );
}
