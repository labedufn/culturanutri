"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { adicionarUsuario } from "@/actions/adicionar-usuario";

const FormSchema = z.object({
  email: z.string({ required_error: "Email é obrigatório" }).email({ message: "Email inválido" }),
  tipo: z.enum(["ADMINISTRADOR", "AVALIADOR"]),
});

export function AdicionarUsuarioForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (data) => {
    try {
      const resultado = await adicionarUsuario({
        email: data.email,
        tipo: data.tipo,
      });
      if (resultado?.success !== false) {
        console.log("Usuário adicionado com sucesso");
      } else {
        console.log(resultado.message);
      }
    } catch (error) {
      console.error("Falha na comunicação com o servidor.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Digite seu e-mail" />
              </FormControl>
              <FormMessage />
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
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Adicionar Usuário</Button>
      </form>
    </Form>
  );
}
