"use client";

import { editarUsuario } from "@/actions/editar-usuario";
import { listarInformacoesUsuario } from "@/actions/listar-informacoes-usuario";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatarCpf, validarCpf } from "@/lib/cpf";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

const usuarioSchema = z.object({
  nome: z.string().min(1, "O campo nome é obrigatório."),
  sobrenome: z.string().min(1, "O campo sobrenome é obrigatório."),
  cpf: z
    .string()
    .transform((value) => value.replace(/\D/g, ""))
    .refine((value) => value.length === 11 && validarCpf(value), { message: "Insira um CPF válido." }),
  email: z.string().email("Insira um e-mail válido."),
  instituicao: z.string().min(1, "O campo instituição é obrigatório."),
});

type FormData = z.infer<typeof usuarioSchema>;

export function EditarUsuarioForm() {
  const [userInfo, setUserInfo] = useState({ nome: "", sobrenome: "", cpf: "", email: "", instituicao: "" });

  const form = useForm<FormData>({
    resolver: zodResolver(usuarioSchema),
    mode: "onBlur",
    defaultValues: userInfo,
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await listarInformacoesUsuario();
      if (response.success) {
        const data = response.data.usuario;
        const formattedData = {
          nome: data.nome,
          sobrenome: data.sobrenome,
          cpf: formatarCpf(data.cpf),
          email: data.email,
          instituicao: data.instituicao,
        };
        setUserInfo(formattedData);
        form.reset(formattedData);
      } else {
        console.error(response.message);
      }
    };

    fetchUserInfo();
  }, [form]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const resultado = await editarUsuario(data);
      if (resultado?.success !== false) {
        toast({
          className: cn("bg-primary-600 text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"),
          title: "Sucesso!",
          description: "Dados atualizados com sucesso.",
        });
        const updatedData = { ...data, cpf: formatarCpf(data.cpf) };
        setUserInfo(updatedData);
        form.reset(updatedData);
      } else {
        toast({
          className: cn("bg-red-600 text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"),
          title: "Erro!",
          description: resultado.message || "Erro ao editar usuário.",
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
        <h3>Editar Dados Pessoais</h3>
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Seu nome" className="focus-visible:ring-primary-700" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sobrenome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sobrenome</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Seu sobrenome" className="focus-visible:ring-primary-700" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="000.000.000-00"
                    className="focus-visible:ring-primary-700"
                    value={formatarCpf(field.value)}
                    onChange={(e) => field.onChange(formatarCpf(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="exemplo@email.com"
                    {...field}
                    className="focus-visible:ring-primary-700"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instituicao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instituição</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nome da instituição" className="focus-visible:ring-primary-700" />
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
            "Atualizar dados"
          )}
        </Button>
      </form>
    </Form>
  );
}
