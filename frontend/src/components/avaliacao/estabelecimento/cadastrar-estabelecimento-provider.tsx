import React, { createContext, useContext, ReactNode } from "react";
import { useForm, FormProvider, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  nome: z.string().min(1, "O campo nome é obrigatório."),
  cnae: z.string().optional(),
  endereco: z.string().min(1, "O campo endereço é obrigatório."),
  pessoal_ocupado: z.preprocess(
    (value) => (value === "" ? NaN : Number(value)),
    z
      .number({ invalid_type_error: "O campo pessoal ocupado é obrigatório." })
      .min(0, "O campo pessoal ocupado é obrigatório.")
      .refine((value) => !isNaN(value), "O campo pessoal ocupado é obrigatório."),
  ),
  numero_refeicoes: z.preprocess(
    (value) => (value === "" ? NaN : Number(value)),
    z
      .number({ invalid_type_error: "O campo número de refeições é obrigatório." })
      .min(0, "O campo número de refeições é obrigatório.")
      .refine((value) => !isNaN(value), "O campo número de refeições é obrigatório."),
  ),
  possui_alvara_sanitario: z.preprocess(
    (value) => (value === "" ? NaN : Number(value)),
    z
      .number({ invalid_type_error: "O campo possui alvará sanitário é obrigatório." })
      .min(0, "Valor inválido.")
      .max(1, "Valor inválido.")
      .refine((value) => !isNaN(value), "O campo possui alvará sanitário é obrigatório."),
  ),
  possui_responsavel_boas_praticas: z.preprocess(
    (value) => (value === "" ? NaN : Number(value)),
    z
      .number({ invalid_type_error: "O campo possui responsável por boas práticas é obrigatório." })
      .min(0, "Valor inválido.")
      .max(1, "Valor inválido.")
      .refine((value) => !isNaN(value), "O campo possui responsável por boas práticas é obrigatório."),
  ),
});

type FormSchemaType = z.infer<typeof schema>;

const FormContext = createContext<UseFormReturn<FormSchemaType> | null>(null);

interface CadastrarEstabelecimentoProviderProps {
  children: ReactNode;
}

export function CadastrarEstabelecimentoProvider({ children }: CadastrarEstabelecimentoProviderProps) {
  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      cnae: "",
      endereco: "",
      pessoal_ocupado: undefined,
      numero_refeicoes: undefined,
      possui_alvara_sanitario: undefined,
      possui_responsavel_boas_praticas: undefined,
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
    throw new Error("useFormContext must be used within a CadastrarEstabelecimentoProvider");
  }
  return context;
};
