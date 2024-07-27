"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useForm, FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  // Adicione mais campos conforme necessário
});

type FormSchemaType = z.infer<typeof schema>;

const FormContext = createContext<UseFormReturn<FormSchemaType> | null>(null);

interface FormProviderComponentProps {
  children: ReactNode;
}

const FormProviderComponent: React.FC<FormProviderComponentProps> = ({ children }) => {
  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      // Adicione mais campos conforme necessário
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    console.log(data);
  };

  return (
    <FormContext.Provider value={methods}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
      </FormProvider>
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext deve ser usado dentro de um FormProviderComponent");
  }
  return context;
};

export default FormProviderComponent;
