"use client";

import { useLocalStorageFormSync } from "@/hooks/use-local-storage-hook-form";
import { RadioGroupField } from "../form/radio-group-field";

const simNaoOptions = [
  { label: "Sim", value: "1" },
  { label: "Não", value: "0" },
];

export function AvaliacaoGestoresConhecimentoForm() {
  useLocalStorageFormSync(
    [
      "adornosContaminacao",
      "aguaTransmissaoDoencas",
      "higienizacaoMaos",
      "contatoAlimentosCruCozido",
      "leiteVencido",
      "alimentoImproprio",
      "carneMalPassada",
      "lavagemVegetais",
      "descongelamentoAlimentos",
      "manipuladorDoente",
    ],
    "Gestor",
  );

  return (
    <>
      <RadioGroupField
        name="adornosContaminacao"
        label="A utilização de adornos como: brincos, anéis, aliança, relógio e outros, pode favorecer a contaminação dos alimentos?"
        options={simNaoOptions}
      />
      <RadioGroupField
        name="aguaTransmissaoDoencas"
        label="A água pode ser veículo de transmissão de doenças, porém ao ser transformada em gelo o risco da transmissão de doenças é menor?"
        options={simNaoOptions}
      />
      <RadioGroupField
        name="higienizacaoMaos"
        label="A forma de higienizar as mãos, para evitar a contaminação de alimentos, consiste em molhar as mãos em água corrente, utilizar detergente neutro e secar com papel?"
        options={simNaoOptions}
      />
      <RadioGroupField
        name="contatoAlimentosCruCozido"
        label="O contato entre alimentos crus e cozidos, como utilizar alface na decoração de porções fritas, possibilita a contaminação desses alimentos?"
        options={simNaoOptions}
      />
      <RadioGroupField
        name="leiteVencido"
        label="Utilizar leite um dia após a data de seu vencimento traz riscos à saúde?"
        options={simNaoOptions}
      />
      <RadioGroupField
        name="alimentoImproprio"
        label="O alimento impróprio para consumo sempre apresenta cheiro ruim e sabor de estragado?"
        options={simNaoOptions}
      />
      <RadioGroupField
        name="carneMalPassada"
        label="O consumo de carne mal passada pode levar a doenças transmitidas por alimentos que podem causar vômitos e diarreia?"
        options={simNaoOptions}
      />
      <RadioGroupField
        name="lavagemVegetais"
        label="Lavar os vegetais e deixá-los de molho na água com vinagre é suficiente para esse alimento ser seguro para o consumo?"
        options={simNaoOptions}
      />
      <RadioGroupField
        name="descongelamentoAlimentos"
        label="O descongelamento de alimentos pode ser feito em uma bacia com ou sem água sobre a pia, mesa ou bancada?"
        options={simNaoOptions}
      />
      <RadioGroupField
        name="manipuladorDoente"
        label="O manipulador de alimento com doenças como: diarreia, gripe e dor de garganta, representa risco para a contaminação de alimentos?"
        options={simNaoOptions}
      />
    </>
  );
}
