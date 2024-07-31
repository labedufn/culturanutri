"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useForm, FormProvider, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, FormSchemaType } from "./schemas/schema-gestores";
import { getStoredValuesGestor } from "./storage/storage-gestores";

const FormContext = createContext<UseFormReturn<FormSchemaType> | null>(null);

interface AvaliacaoProviderProps {
  children: ReactNode;
}

export function AvaliacaoProvider({ children }: AvaliacaoProviderProps) {
  const defaultValues = getStoredValuesGestor();

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
    throw new Error("useFormContext must be used within a AvaliacaoProvider");
  }
  return context;
}
