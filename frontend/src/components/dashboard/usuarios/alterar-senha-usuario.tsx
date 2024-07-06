"use client";

import { alterarSenhaUsuario } from "@/actions/alterar-senha-usuario";
import { AlertBox } from "@/components/informacao/alert-box";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const senhaSchema = z.object({
  senhaAtual: z.string().min(1, "Digite sua senha atual."),
  novaSenha: z.string().min(6, "A nova senha deve ter pelo menos 6 caracteres."),
});

type FormData = z.infer<typeof senhaSchema>;

export function AlterarSenhaUsuarioForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm<FormData>({
    resolver: zodResolver(senhaSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const dadosSenha = {
      senha: data.senhaAtual,
      novaSenha: data.novaSenha,
    };

    try {
      const resultado = await alterarSenhaUsuario(dadosSenha);
      if (resultado?.success !== false) {
        setErrorMessage("");
        alert("Senha alterada com sucesso!");
        window.location.href = "/dashboard";
      } else {
        setErrorMessage(resultado.message || "Erro ao alterar senha.");
      }
    } catch (error) {
      setErrorMessage("Falha na comunicação com o servidor.");
    }
  };

  const onClose = () => setErrorMessage("");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <h3>Alterar Senha</h3>
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="senhaAtual"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha Atual</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    placeholder="Digite sua senha atual"
                    className="focus-visible:ring-primary-700"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="novaSenha"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nova Senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    placeholder="Digite sua nova senha"
                    className="focus-visible:ring-primary-700"
                  />
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
          className="w-full bg-primary-700 hover:bg-primary-800 text-white font-medium flex justify-center items-center"
        >
          {form.formState.isSubmitting ? (
            <div className="flex items-center">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              Atualizando...
            </div>
          ) : (
            "Alterar Senha"
          )}
        </Button>
      </form>
    </Form>
  );
}
