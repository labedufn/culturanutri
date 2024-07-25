"use client";

import { alterarSenhaUsuario } from "@/actions/alterar-senha-usuario";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

const senhaSchema = z.object({
  senhaAtual: z.string().min(1, "Digite sua senha atual."),
  novaSenha: z.string().min(6, "A nova senha deve ter pelo menos 6 caracteres."),
});

type FormData = z.infer<typeof senhaSchema>;

export function AlterarSenhaUsuarioForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(senhaSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (data.senhaAtual === data.novaSenha) {
      toast({
        className: cn("bg-red-600 text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"),
        title: "Erro!",
        description: "A nova senha não pode ser igual à senha atual.",
      });
      return;
    }

    const dadosSenha = {
      senhaAtual: data.senhaAtual,
      novaSenha: data.novaSenha,
    };

    try {
      const resultado = await alterarSenhaUsuario(dadosSenha);
      if (resultado?.success !== false) {
        toast({
          className: cn("bg-primary-600 text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"),
          title: "Sucesso!",
          description: "Senha alterada com sucesso.",
        });
        form.reset();
      } else {
        toast({
          className: cn("bg-red-600 text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"),
          title: "Erro!",
          description: resultado.message || "Erro ao alterar senha.",
        });
      }
    } catch (error) {
      toast({
        className: cn("bg-red-600 text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"),
        title: "Erro de comunicação!",
        description: "Falha na comunicação com o servidor.",
      });
    }
  };

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
                    showPasswordToggle
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
                    showPasswordToggle
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            "Alterar senha"
          )}
        </Button>
      </form>
    </Form>
  );
}
