"use client";

import React, { useEffect, useState } from "react";
import { useLocalStorageFormSync } from "@/hooks/use-local-storage-hook-form";
import { RadioGroupField } from "../form/radio-group-field";
import { SelectField } from "../form/select-field";
import { InputField } from "../form/input-field";
import { useFormContext } from "./avaliacao-gestores-provider";

const escolaridadeOptions = [
  { label: "Fundamental incompleto", value: "1" },
  { label: "Fundamental completo", value: "2" },
  { label: "Ensino médio incompleto", value: "3" },
  { label: "Ensino médio completo", value: "4" },
  { label: "Ensino superior incompleto", value: "5" },
  { label: "Ensino superior completo", value: "6" },
];

const generoOptions = [
  { label: "Feminino", value: "0" },
  { label: "Masculino", value: "1" },
];

const simNaoOptions = [
  { label: "Sim", value: "1" },
  { label: "Não", value: "0" },
];

const cargaHorariaOptions = [
  { label: "Diário", value: "Diário" },
  { label: "Semanal", value: "Semanal" },
  { label: "Quinzenal", value: "Quinzenal" },
  { label: "Mensal", value: "Mensal" },
  { label: "Semestral", value: "Semestral" },
  { label: "Trimestral", value: "Trimestral" },
  { label: "Anual", value: "Anual" },
  { label: "A cada 2 anos", value: "A cada 2 anos" },
  { label: "A cada 3 anos ou mais", value: "A cada 3 anos ou mais" },
  { label: "Só fez uma vez", value: "Só fez uma vez" },
];

export function AvaliacaoGestoresDadosIndividuaisForm() {
  const form = useFormContext();
  const [escolaridade, setEscolaridade] = useState(form.getValues("escolaridade"));
  const [realizaTreinamentos, setRealizaTreinamentos] = useState(form.getValues("realizaTreinamentosBoasPraticas"));

  useLocalStorageFormSync(
    [
      "nomeCompleto",
      "genero",
      "idade",
      "escolaridade",
      "formacao",
      "naoTenhaFormacaoTemTreinamento",
      "tempoTrabalhaComAlimentos",
      "acreditaComunicacaoBoa",
      "realizaTreinamentosBoasPraticas",
      "cargaHoraria",
      "temasTreinamentos",
    ],
    "Gestor",
  );

  useEffect(() => {
    const subscription = form.watch((values) => {
      setEscolaridade(values.escolaridade || "");
      setRealizaTreinamentos(values.realizaTreinamentosBoasPraticas || "");
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <>
      <InputField name="nomeCompleto" label="Nome Completo" placeholder="Digite o nome completo" />
      <RadioGroupField name="genero" label="Gênero" options={generoOptions} />
      <InputField name="idade" label="Idade" type="number" placeholder="Digite a idade do gestor" min={18} />
      <SelectField name="escolaridade" label="Escolaridade" options={escolaridadeOptions} />

      {escolaridade === "5" || escolaridade === "6" ? (
        <InputField name="formacao" label="Formação (curso)" placeholder="Curso que é formado ou em andamento" />
      ) : (
        <RadioGroupField
          name="naoTenhaFormacaoTemTreinamento"
          label="Participou de treinamento para manipulação de alimentos?"
          options={simNaoOptions}
        />
      )}

      <InputField
        name="tempoTrabalhaComAlimentos"
        label="Há quanto tempo trabalha com alimentos? (meses)"
        type="number"
        placeholder="Número de meses trabalhados"
        min={1}
      />
      <RadioGroupField
        name="acreditaComunicacaoBoa"
        label="Você acredita que a comunicação entre funcionários é boa?"
        options={simNaoOptions}
      />
      <RadioGroupField
        name="realizaTreinamentosBoasPraticas"
        label="Você realiza treinamentos com seus funcionários?"
        options={simNaoOptions}
      />

      {realizaTreinamentos === "1" && (
        <>
          <SelectField
            name="cargaHoraria"
            label="Com que frequência realiza treinamentos?"
            options={cargaHorariaOptions}
          />
          <InputField
            name="temasTreinamentos"
            label="Quais são os temas abordados nos treinamentos?"
            placeholder="Digite os temas abordados"
          />
        </>
      )}
    </>
  );
}
