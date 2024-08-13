"use client";

import { useLocalStorageFormSync } from "@/hooks/use-local-storage-hook-form";
import { RadioGroupField } from "../form/radio-group-field";

const simNaoOptions = [
  { label: "Sim", value: "1" },
  { label: "Não", value: "0" },
];

export function AvaliacaoManipuladoresConhecimentoForm() {
  useLocalStorageFormSync(
    [
      "utilizacaoAdornosFavorecerContaminacao",
      "aguaVeiculoTransmissaoDoencas",
      "formaHigienizarMaosEvitaContaminacao",
      "contatoAlimentosContamina",
      "leiteVencimentoRisco",
      "alimentoImproprioApresentaCheiroSabor",
      "carneMalPassada",
      "lavarVegetaisSuficiente",
      "descongelamentoAlimentosBacia",
      "manipuladorAlimentoDoenteContamina",
    ],
    "Manipulador",
  );

  return (
    <>
      <RadioGroupField
        name="utilizacaoAdornosFavorecerContaminacao"
        label="A utilização de adornos como: brincos, anéis, aliança, relógio e outros, pode favorecer a contaminação dos alimentos?"
        options={simNaoOptions}
      />
      <RadioGroupField
        name="aguaVeiculoTransmissaoDoencas"
        label="A água pode ser veículo de transmissão de doenças, porém ao ser transformada em gelo o risco da transmissão de doenças é menor?"
        options={simNaoOptions}
      />
      <RadioGroupField
        name="formaHigienizarMaosEvitaContaminacao"
        label="A forma de higienizar as mãos, para evitar a contaminação de alimentos, consiste em molhar as mãos em água corrente, utilizar detergente neutro e secar com papel?"
        options={simNaoOptions}
      />
      <RadioGroupField
        name="contatoAlimentosContamina"
        label="O contato entre alimentos crus e cozidos, como utilizar alface na decoração de porções fritas, possibilita a contaminação desses alimentos?"
        options={simNaoOptions}
      />
      <RadioGroupField
        name="leiteVencimentoRisco"
        label="Utilizar leite um dia após a data de seu vencimento traz riscos à saúde?"
        options={simNaoOptions}
      />
      <RadioGroupField
        name="alimentoImproprioApresentaCheiroSabor"
        label="O alimento impróprio para consumo sempre apresenta cheiro ruim e sabor de estragado?"
        options={simNaoOptions}
      />
      <RadioGroupField
        name="carneMalPassada"
        label="O consumo de carne mal passada pode levar a doenças transmitidas por alimentos que podem causar vômitos e diarreia?"
        options={simNaoOptions}
      />
      <RadioGroupField
        name="lavarVegetaisSuficiente"
        label="Lavar os vegetais e deixá-los de molho na água com vinagre é suficiente para esse alimento ser seguro para o consumo?"
        options={simNaoOptions}
      />
      <RadioGroupField
        name="descongelamentoAlimentosBacia"
        label="O descongelamento de alimentos pode ser feito em uma bacia com ou sem água sobre a pia, mesa ou bancada?"
        options={simNaoOptions}
      />
      <RadioGroupField
        name="manipuladorAlimentoDoenteContamina"
        label="O manipulador de alimento com doenças como: diarreia, gripe e dor de garganta, representa risco para a contaminação de alimentos?"
        options={simNaoOptions}
      />
    </>
  );
}
