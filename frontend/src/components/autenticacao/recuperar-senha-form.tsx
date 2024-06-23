"use client";

import { recuperarSenha } from "@/actions/recuperar-senha";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { AlertBox } from "../informacao/alert-box";
import { Button } from "../ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const recupearSchema = z.object({
  email: z.string().email("Por favor, insira um e-mail válido."),
});

type FormData = z.infer<typeof recupearSchema>;

export function RecuperarSenhaForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const form = useForm<FormData>({
    resolver: zodResolver(recupearSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const resultado = await recuperarSenha(data);
      if (!(resultado?.success === false)) {
        setErrorMessage("");
        setMessage(resultado.message);
      } else {
        setErrorMessage(resultado.message || "Erro ao enviar e-mail de recuperação.");
      }
    } catch (error) {
      setErrorMessage("Falha ao enviar e-mail de recuperação.");
    }
  };

  const onClose = () => setErrorMessage("");

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10">
          <h3 className="text-3xl text-center font-bold">Recuperar senha</h3>
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="email"
              defaultValue=""
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input {...field} className="focus-visible:ring-primary-700" />
                  </FormControl>
                  <FormDescription>
                    Insira o e-mail cadastrado na sua conta e enviaremos um e-mail com o link para recuperação da senha.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {errorMessage && <AlertBox type="error" message={errorMessage} onClose={onClose} />}
            {message && <AlertBox type="success" message={message} onClose={() => setMessage("")} />}
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full hover:bg-primary-800 text-white font-medium flex justify-center items-center"
          >
            {form.formState.isSubmitting ? (
              <div className="flex items-center">
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                Carregando...
              </div>
            ) : (
              "Enviar e-mail de recuperação"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
