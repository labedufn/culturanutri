"use client";

import { cadastro } from "@/actions/cadastro";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatarCpf } from "@/lib/cpf";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { AlertBox } from "../informacao/alert-box";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { validarCpf } from "../utils/validarCpf";

const cadastroSchema = z
  .object({
    nome: z.string().min(1, "O campo nome é obrigatório."),
    sobrenome: z.string().min(1, "O campo sobrenome é obrigatório."),
    cpf: z
      .string()
      .transform((value) => value.replace(/\D/g, ""))
      .refine((value) => value.length === 11 && validarCpf(value), { message: "Insira um CPF válido." }),
    email: z.string().email("Insira um e-mail válido."),
    senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
    confirmarSenha: z.string().min(1, "Confirme a senha."),
    instituicao: z.string().min(1, "O campo instituição é obrigatório."),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem.",
    path: ["confirmarSenha"],
  });

type FormData = z.infer<typeof cadastroSchema>;

export function CadastroForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm<FormData>({
    resolver: zodResolver(cadastroSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const resultado = await cadastro(data, window.location.href);
      if (resultado?.success !== false) {
        setErrorMessage("");
        window.location.href = "/autenticacao/login";
      } else {
        setErrorMessage(resultado.message || "Erro ao fazer cadastro.");
      }
    } catch (error) {
      setErrorMessage("Falha na comunicação com o servidor.");
    }
  };

  const onClose = () => setErrorMessage("");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10">
        <h3 className="text-3xl text-center font-bold">Fazer cadastro</h3>
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="nome"
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
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
            name="instituicao"
            defaultValue=""
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
          <FormField
            control={form.control}
            name="email"
            defaultValue=""
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
                <FormDescription>O e-mail deve ser o mesmo que recebeu o link para cadastro.</FormDescription>
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
                  <Input
                    type="password"
                    placeholder="Sua senha"
                    {...field}
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
            name="confirmarSenha"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirme sua senha"
                    {...field}
                    className="focus-visible:ring-primary-700"
                    showPasswordToggle
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
              Carregando...
            </div>
          ) : (
            "Concluir Cadastro"
          )}
        </Button>
      </form>
    </Form>
  );
}
