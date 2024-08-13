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

export function AvaliacaoManipuladoresComunicacaoForm() {
  useLocalStorageFormSync(
    [
      "tenhoLiberdadeComLider",
      "informacoesNecessariasDisponiveis",
      "informacoesAdequadasNormasHigiene",
      "fornecerSugestoesMelhoria",
    ],
    "Manipulador",
  );

  return (
    <>
      <RadioGroupField
        name="tenhoLiberdadeComLider"
        label="Eu tenho liberdade de falar com o meu líder se eu ver algo que pode afetar a segurança dos alimentos."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="informacoesNecessariasDisponiveis"
        label="Todas as informações necessárias para a manipulação de alimentos de forma segura são prontamente disponíveis para mim."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="informacoesAdequadasNormasHigiene"
        label="O líder fornece informações adequadas e atualizadas sobre as normas de higiene."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="fornecerSugestoesMelhoria"
        label="Sinto-me encorajado a fornecer sugestões para a melhoria das práticas de segurança dos alimentos."
        options={escalaOptions}
        orientation="vertical"
      />
    </>
  );
}
