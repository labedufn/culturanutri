import React, { createContext, useContext, ReactNode } from "react";
import { useForm, FormProvider, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z
  .object({
    nomeCompleto: z.string().min(1, "O campo nome completo é obrigatório."),
    genero: z.string().min(1, "O campo gênero é obrigatório."),
    idade: z.preprocess(
      (value) => (value === "" ? NaN : Number(value)),
      z
        .number({ invalid_type_error: "O campo idade é obrigatório." })
        .min(18, "A idade deve ser maior que 18 anos.")
        .refine((value) => !isNaN(value), "O campo idade é obrigatório."),
    ),
    escolaridade: z.string().min(1, "O campo escolaridade é obrigatório."),
    formacao: z.string().optional().nullable(),
    naoTenhaFormacaoTemTreinamento: z.string().min(1, "Este campo é obrigatório."),
    tempoTrabalhaComAlimentos: z.preprocess(
      (value) => (value === "" ? NaN : Number(value)),
      z
        .number({ invalid_type_error: "O campo tempo de trabalho com alimentos é obrigatório." })
        .min(1, "Há quanto tempo trabalha com alimentos deve ser maior que 0.")
        .refine((value) => !isNaN(value), "O campo tempo de trabalho com alimentos é obrigatório."),
    ),
    acreditaComunicacaoBoa: z.string().min(1, "Este campo é obrigatório."),
    realizaTreinamentosBoasPraticas: z.string().min(1, "Este campo é obrigatório."),
    cargaHoraria: z.string().optional().nullable(),
    temasTreinamentos: z.string().optional().nullable(),
  })
  .refine(
    (data) => {
      if ((data.escolaridade === "5" || data.escolaridade === "6") && !data.formacao) {
        return false;
      }
      return true;
    },
    {
      message: "Formação é obrigatória para escolaridade superior incompleto ou completo.",
      path: ["formacao"],
    },
  )
  .refine(
    (data) => {
      if (data.realizaTreinamentosBoasPraticas === "1" && !data.cargaHoraria) {
        return false;
      }
      return true;
    },
    {
      message: "Frequência de aplicação é obrigatória se realiza treinamentos.",
      path: ["cargaHoraria"],
    },
  )
  .refine(
    (data) => {
      if (data.realizaTreinamentosBoasPraticas === "1" && !data.temasTreinamentos) {
        return false;
      }
      return true;
    },
    {
      message: "Temas de treinamentos são obrigatórios se realiza treinamentos.",
      path: ["temasTreinamentos"],
    },
  );

type FormSchemaType = z.infer<typeof schema>;

const FormContext = createContext<UseFormReturn<FormSchemaType> | null>(null);

interface AvaliacaoGestoresProviderProps {
  children: ReactNode;
}

function getStoredValues(): Partial<FormSchemaType> {
  return {
    nomeCompleto: localStorage.getItem("nomeCompletoGestor") || "",
    genero: localStorage.getItem("generoGestor") || "",
    idade: localStorage.getItem("idadeGestor") ? Number(localStorage.getItem("idadeGestor")) : undefined,
    escolaridade: localStorage.getItem("escolaridadeGestor") || "",
    formacao: localStorage.getItem("formacaoGestor") || "",
    naoTenhaFormacaoTemTreinamento: localStorage.getItem("naoTenhaFormacaoTemTreinamentoGestor") || "",
    tempoTrabalhaComAlimentos: localStorage.getItem("tempoTrabalhaComAlimentosGestor")
      ? Number(localStorage.getItem("tempoTrabalhaComAlimentosGestor"))
      : undefined,
    acreditaComunicacaoBoa: localStorage.getItem("acreditaComunicacaoBoaGestor") || "",
    realizaTreinamentosBoasPraticas: localStorage.getItem("realizaTreinamentosBoasPraticasGestor") || "",
    cargaHoraria: localStorage.getItem("cargaHorariaGestor") || "",
    temasTreinamentos: localStorage.getItem("temasTreinamentosGestor") || "",
  };
}

export function AvaliacaoGestoresProvider({ children }: AvaliacaoGestoresProviderProps) {
  const defaultValues = getStoredValues();

  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      nomeCompleto: defaultValues.nomeCompleto || "",
      genero: defaultValues.genero || "",
      idade: defaultValues.idade || undefined,
      escolaridade: defaultValues.escolaridade || "",
      formacao: defaultValues.formacao || "",
      naoTenhaFormacaoTemTreinamento: defaultValues.naoTenhaFormacaoTemTreinamento || "",
      tempoTrabalhaComAlimentos: defaultValues.tempoTrabalhaComAlimentos || undefined,
      acreditaComunicacaoBoa: defaultValues.acreditaComunicacaoBoa || "",
      realizaTreinamentosBoasPraticas: defaultValues.realizaTreinamentosBoasPraticas || "",
      cargaHoraria: defaultValues.cargaHoraria || "",
      temasTreinamentos: defaultValues.temasTreinamentos || "",
    },
  });

  return (
    <FormContext.Provider value={methods}>
      <FormProvider {...methods}>{children}</FormProvider>
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a AvaliacaoGestoresProvider");
  }
  return context;
}
