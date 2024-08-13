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

export function AvaliacaoManipuladoresComprometimentoSegurancaForm() {
  useLocalStorageFormSync(
    [
      "sigoNormasHigieneResponsabilidade",
      "segurancaAltaPrioridade",
      "sigoNormasHigieneImportante",
      "empenhadoSeguirNormasHigiene",
    ],
    "Manipulador",
  );

  return (
    <>
      <RadioGroupField
        name="sigoNormasHigieneResponsabilidade"
        label="Eu sigo as normas de higiene porque é minha responsabilidade."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="segurancaAltaPrioridade"
        label="A segurança dos alimentos é uma alta prioridade para mim."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="sigoNormasHigieneImportante"
        label="Eu sigo as normas de higiene, porque eu acho que elas são importantes."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="empenhadoSeguirNormasHigiene"
        label="Estou empenhado em seguir todas as normas de higiene."
        options={escalaOptions}
        orientation="vertical"
      />
    </>
  );
}
