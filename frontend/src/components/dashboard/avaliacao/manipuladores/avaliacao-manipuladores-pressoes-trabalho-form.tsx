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

export function AvaliacaoManipuladoresPressoesTrabalhoForm() {
  useLocalStorageFormSync(
    [
      "chefeSeguirBoasPraticas",
      "colegasTrabalhoNormasHigiene",
      "autoridadesVigilanciaSanitariaNormasHigiene",
      "clientesNormasHigiene",
      "tempoSuficienteNormasHigiene",
      "numeroFuncionariosAdequadoManipularFormaSegura",
    ],
    "Manipulador",
  );

  return (
    <>
      <RadioGroupField
        name="chefeSeguirBoasPraticas"
        label="Meu chefe acha que eu devo seguir as boas práticas de manipulação em todas as minhas tarefas."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="colegasTrabalhoNormasHigiene"
        label="Meus colegas de trabalho acham que eu devo seguir as normas de higiene em todas as minhas tarefas."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="autoridadesVigilanciaSanitariaNormasHigiene"
        label="As autoridades da vigilância sanitária acham que eu devo seguir as normas de higiene em todas as minhas tarefas."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="clientesNormasHigiene"
        label="Os clientes desse estabelecimento acham que eu devo seguir as normas de higiene em todas as minhas tarefas."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="tempoSuficienteNormasHigiene"
        label="Eu sempre tenho tempo suficiente para seguir as normas de higiene, mesmo durante as horas de fluxo intenso de trabalho."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="numeroFuncionariosAdequadoManipularFormaSegura"
        label="O número de funcionários programado é adequado para eu fazer o meu trabalho e manipular os alimentos de forma segura."
        options={escalaOptions}
        orientation="vertical"
      />
    </>
  );
}
