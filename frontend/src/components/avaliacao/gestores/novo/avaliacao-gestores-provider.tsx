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

export function AvaliacaoGestoresProvider({ children }: AvaliacaoGestoresProviderProps) {
  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      nomeCompleto: "",
      genero: "",
      idade: undefined,
      escolaridade: "",
      formacao: "",
      naoTenhaFormacaoTemTreinamento: "",
      tempoTrabalhaComAlimentos: undefined,
      acreditaComunicacaoBoa: "",
      realizaTreinamentosBoasPraticas: "",
      cargaHoraria: "",
      temasTreinamentos: "",
    },
  });

  return (
    <FormContext.Provider value={methods}>
      <FormProvider {...methods}>{children}</FormProvider>
    </FormContext.Provider>
  );
}

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a AvaliacaoGestoresProvider");
  }
  return context;
};
