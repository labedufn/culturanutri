"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircleOutlineRounded } from "@mui/icons-material";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { AlertBox } from "../informacao/alert-box";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { FeedbackMessage } from "../utils/feedback-message";
import { redefinirSenha } from "@/actions/redefinir-senha";

const redefinirSenhaSchema = z
  .object({
    novaSenha: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
    confirmarSenha: z.string(),
  })
  .refine((data) => data.novaSenha === data.confirmarSenha, {
    message: "As senhas não coincidem.",
    path: ["confirmarSenha"],
  });

type FormData = z.infer<typeof redefinirSenhaSchema>;

export function RedefinirSenhaForm() {
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const {} = useForm<FormData>({
    resolver: zodResolver(redefinirSenhaSchema),
    mode: "onBlur",
  });
  const form = useForm<FormData>({
    resolver: zodResolver(redefinirSenhaSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const resultado = await redefinirSenha(data, window.location.href);
      if (!(resultado?.success === false)) {
        setErrorMessage("");
        setIsFormVisible(false);
      } else {
        setErrorMessage(resultado.message || "Erro ao enviar e-mail de recuperação.");
      }
    } catch (error) {
      setErrorMessage("Falha na comunicação com o servidor.");
    }
  };

  const onClose = () => setErrorMessage("");

  if (!isFormVisible) {
    return (
      <FeedbackMessage
        type="success"
        icon={<CheckCircleOutlineRounded className="w-32 h-32" />}
        titulo="Senha redefinida!"
        descricao={"Continue para o login para entrar em sua conta."}
        buttonText={"Continuar para login"}
        redirectTo={"/autenticacao/login"}
      />
    );
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10">
          <h3 className="text-3xl text-center font-bold">Redefinir Senha</h3>
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="novaSenha"
              defaultValue=""
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nova senha</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} className="focus-visible:ring-primary-700" showPasswordToggle />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmarSenha"
              defaultValue=""
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar senha</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} className="focus-visible:ring-primary-700" showPasswordToggle />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {errorMessage && <AlertBox type="error" message={errorMessage} onClose={onClose} />}
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full bg-primary-700 text-white font-medium flex justify-center items-center"
          >
            {form.formState.isSubmitting ? (
              <div className="flex items-center">
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                Carregando...
              </div>
            ) : (
              "Confirmar"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
