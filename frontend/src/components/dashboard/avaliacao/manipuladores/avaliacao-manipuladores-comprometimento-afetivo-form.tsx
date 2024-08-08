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

export function AvaliacaoManipuladoresComprometimentoAfetivoForm() {
  useLocalStorageFormSync(
    [
      "problemasRestauranteMeus",
      "restauranteTemSignificado",
      "restauranteMereceMinhaLealdade",
      "trabalharPorNecessidadeEDesejo",
      "dedicarMinhaCarreiraAoRestaurante",
    ],
    "Manipulador",
  );

  return (
    <>
      <RadioGroupField
        name="problemasRestauranteMeus"
        label="Eu realmente sinto os problemas do restaurante como se fossem meus."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="restauranteTemSignificado"
        label="Este restaurante tem um imenso significado pessoal para mim."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="restauranteMereceMinhaLealdade"
        label="Este restaurante merece minha lealdade."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="trabalharPorNecessidadeEDesejo"
        label="Na situação atual, trabalhar nesse restaurante é tanto uma necessidade quanto um desejo."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="dedicarMinhaCarreiraAoRestaurante"
        label="Eu seria muito feliz em dedicar o resto da minha carreira nesse restaurante."
        options={escalaOptions}
        orientation="vertical"
      />
    </>
  );
}
