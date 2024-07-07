"use client";

import { login } from "@/actions/login";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { AlertBox } from "../informacao/alert-box";
import { Checkbox } from "../ui/checkbox";
import { validarCpf } from "../utils/validarCpf";

function isEmail(value: string) {
  const re = /\S+@\S+\.\S+/;
  return re.test(value);
}

const loginSchema = z.object({
  emailOuCpf: z
    .string()
    .min(1, "O campo de e-mail e CPF não pode ser vazio.")
    .transform((value) => (value.includes("@") ? value : value.replace(/\D/g, "")))
    .refine((value) => validarCpf(value) || isEmail(value), {
      message: "Insira um e-mail e CPF válido.",
    }),
  senha: z.string().min(1, "O campo de senha não pode ser vazio."),
});

type FormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const resultado = await login({
        emailOuCpf: data.emailOuCpf,
        senha: data.senha,
        rememberMe: rememberMe,
      });
      if (resultado?.success !== false) {
        setErrorMessage("");
        window.location.href = "/dashboard";
      } else {
        console.log(resultado.message);
        setErrorMessage(resultado.message || "Erro ao fazer login.");
      }
    } catch (error) {
      setErrorMessage("Falha na comunicação com o servidor.");
    }
  };

  const onChange = (value: boolean) => setRememberMe(value);

  const onClose = () => setErrorMessage("");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10">
        <h3 className="text-3xl text-center font-bold">Fazer login</h3>
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="emailOuCpf"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail ou CPF</FormLabel>
                <FormControl>
                  <Input {...field} className="focus-visible:ring-primary-700" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="senha"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" {...field} className="focus-visible:ring-primary-700" showPasswordToggle />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-2">
            <Checkbox
              id="rememberMe"
              checked={rememberMe}
              onCheckedChange={onChange}
              className="text-sm leading-none"
            />
            <label htmlFor="rememberMe" className="cursor-pointer">
              Lembrar de mim
            </label>
          </div>
          {errorMessage && <AlertBox type="error" message={errorMessage} onClose={onClose} />}
        </div>
        <Button
          type="submit"
          size="lg"
          className="w-full bg-primary-700 hover:bg-primary-800 text-white font-medium flex justify-center items-center"
        >
          {form.formState.isSubmitting ? (
            <div className="flex items-center">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              Carregando...
            </div>
          ) : (
            "Entrar"
          )}
        </Button>
      </form>
    </Form>
  );
}
