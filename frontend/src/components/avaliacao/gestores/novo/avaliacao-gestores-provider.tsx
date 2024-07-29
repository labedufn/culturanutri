import React, { createContext, useContext, ReactNode } from "react";
import { useForm, FormProvider, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, FormSchemaType } from "../schemas/validation-schema";
import { getStoredValues } from "./storage/storage";

const FormContext = createContext<UseFormReturn<FormSchemaType> | null>(null);

interface AvaliacaoGestoresProviderProps {
  children: ReactNode;
}

export function AvaliacaoGestoresProvider({ children }: AvaliacaoGestoresProviderProps) {
  const defaultValues = getStoredValues();

  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues,
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
