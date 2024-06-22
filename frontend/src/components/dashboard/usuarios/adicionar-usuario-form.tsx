"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { adicionarUsuario } from "@/actions/adicionar-usuario";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
  email: z.string({ required_error: "E-mail é obrigatório" }).email({ message: "E-mail inválido" }),
  tipo: z.enum(["ADMINISTRADOR", "AVALIADOR"], { required_error: "Tipo de usuário é obrigatório." }),
});

export function AdicionarUsuarioForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "", tipo: undefined },
  });

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (data) => {
    try {
      const resultado = await adicionarUsuario(data);
      if (resultado?.success !== false) {
        toast({
          className: cn("bg-primary-600 text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"),
          title: "Sucesso!",
          description: "Convite enviado com sucesso.",
        });
      } else {
        toast({
          className: cn("bg-red-700 text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"),
          title: "Erro!",
          description: resultado.message || "Erro ao enviar convite.",
        });
      }
    } catch (error) {
      toast({
        className: cn("bg-red-700 text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"),
        title: "Erro de comunicação!",
        description: "Falha na comunicação com o servidor.",
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Digite o e-mail que deseja convidar"
                      className="focus-visible:ring-primary-700"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tipo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Usuário</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de usuário" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ADMINISTRADOR">Administrador</SelectItem>
                        <SelectItem value="AVALIADOR">Avaliador</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full bg-primary-700 text-white font-medium flex justify-center items-center"
          >
            {form.formState.isSubmitting ? (
              <div className="flex items-center">
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                Enviando...
              </div>
            ) : (
              "Enviar convite"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
