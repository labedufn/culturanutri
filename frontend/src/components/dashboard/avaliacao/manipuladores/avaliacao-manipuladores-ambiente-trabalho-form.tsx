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

export function AvaliacaoManipuladoresAmbienteTrabalhoForm() {
  useLocalStorageFormSync(
    [
      "equipamentosNecessariosFormaSegura",
      "estruturaAdequadaNormasHigiene",
      "produtosHigienizacaoAdequadosManipulacaoAlimentos",
    ],
    "Manipulador",
  );

  return (
    <>
      <RadioGroupField
        name="equipamentosNecessariosFormaSegura"
        label="Tenho equipamentos e utensílios necessários para preparar os alimentos de forma segura."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="estruturaAdequadaNormasHigiene"
        label="A estrutura da cozinha é adequada para seguir as normas de higiene."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="produtosHigienizacaoAdequadosManipulacaoAlimentos"
        label="Tenho os produtos para higienização adequados para realizar as boas práticas de manipulação de alimentos."
        options={escalaOptions}
        orientation="vertical"
      />
    </>
  );
}
