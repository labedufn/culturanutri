"use client";

import React, { useEffect, useState } from "react";
import { useLocalStorageFormSync } from "@/hooks/use-local-storage-hook-form";
import { RadioGroupField } from "../form/radio-group-field";
import { InputField } from "../form/input-field";
import { SelectField } from "../form/select-field";
import { useFormContext } from "./avaliacao-manipuladores-provider";

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

export function AvaliacaoManipuladoresDadosIndividuaisForm() {
  const form = useFormContext();
  const [escolaridade, setEscolaridade] = useState(form.getValues("escolaridade"));

  useLocalStorageFormSync([
    "genero",
    "idade",
    "escolaridade",
    "formacao",
    "participouTreinamento",
    "tempoTrabalhoAnos",
    "tempoTrabalhoMeses",
    "aberturaComChefe",
    "boaComunicacaoEntreFuncionarios",
  ]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      setEscolaridade(values.escolaridade || "");
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <>
      <RadioGroupField name="genero" label="Gênero" options={generoOptions} />
      <InputField name="idade" label="Idade" type="number" placeholder="Digite a idade" min={18} />
      <SelectField name="escolaridade" label="Escolaridade" options={escolaridadeOptions} />

      {escolaridade === "5" || escolaridade === "6" ? (
        <InputField name="formacao" label="Formação (faculdade)" placeholder="Curso que é formado ou em andamento" />
      ) : (
        <RadioGroupField
          name="participouTreinamento"
          label="Participou de treinamento para manipulação de alimentos?"
          options={simNaoOptions}
        />
      )}

      <div className="grid grid-cols-2 gap-4">
        <InputField
          name="tempoTrabalhoAnos"
          label="Tempo de trabalho com alimentos (anos)"
          type="number"
          placeholder="Anos"
          min={0}
        />
        <InputField
          name="tempoTrabalhoMeses"
          label="Tempo de trabalho com alimentos (meses)"
          type="number"
          placeholder="Meses"
          min={0}
        />
      </div>

      <RadioGroupField
        name="aberturaComChefe"
        label="Você tem abertura de conversar com seu chefe sobre os problemas do restaurante?"
        options={simNaoOptions}
      />
      <RadioGroupField
        name="boaComunicacaoEntreFuncionarios"
        label="Você acredita que a comunicação entre os funcionários é boa?"
        options={simNaoOptions}
      />
    </>
  );
}
