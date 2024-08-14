"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { listarEstabelecimentos } from "@/actions/listar-estabelecimentos";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { cadastrarAvaliacao } from "@/actions/cadastrar-avaliacao";

interface Estabelecimento {
  id: string;
  nome: string;
  ativo: number;
}

const SelectEstabelecimentoSchema = z.object({
  estabelecimento: z.string({ message: "Selecione um estabelecimento." }),
});

export function SelecionarEstabelecimento() {
  const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimento[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof SelectEstabelecimentoSchema>>({
    resolver: zodResolver(SelectEstabelecimentoSchema),
  });

  useEffect(() => {
    async function fetchEstabelecimentos() {
      const result = await listarEstabelecimentos();
      if (result.success) {
        const estabelecimentosAtivos = result.data.estabelecimentos.filter(
          (estabelecimento: Estabelecimento) => estabelecimento.ativo === 1,
        );
        setEstabelecimentos(estabelecimentosAtivos);
      } else {
        toast({
          className: cn(
            "bg-red-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
          ),
          title: "Erro ao carregar estabelecimentos",
          description: result.message,
        });
      }
    }
    fetchEstabelecimentos();
  }, []);

  const onSubmit = async (data: z.infer<typeof SelectEstabelecimentoSchema>) => {
    try {
      const estabelecimentoId = data.estabelecimento;
      localStorage.setItem("estabelecimentoId", estabelecimentoId);

      const responseAvaliacao = await cadastrarAvaliacao(estabelecimentoId);

      if (responseAvaliacao.success && responseAvaliacao.avaliacaoCriada) {
        toast({
          className: cn(
            "bg-green-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
          ),
          title: "Sucesso!",
          description: "Avaliação cadastrada com sucesso.",
        });
        router.push(`/dashboard/avaliacoes/${responseAvaliacao.avaliacaoCriada.id}`);
      } else {
        toast({
          className: cn(
            "bg-red-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
          ),
          title: "Erro!",
          description: responseAvaliacao.message || "Erro ao cadastrar avaliação.",
        });
      }
    } catch (error) {
      toast({
        className: cn(
          "bg-red-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        ),
        title: "Erro de comunicação!",
        description: "Falha na comunicação com o servidor.",
      });
    }
  };

  return (
    <Form {...form}>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-black mb-2">Selecionar estabelecimento</h2>
        <p className="text-muted-foreground text-sm">
          Para iniciar uma avaliação é necessário selecionar o estabelecimento que deseja avaliar.
        </p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="estabelecimento"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Selecione um Estabelecimento</FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outlineWhite"
                      role="combobox"
                      className={cn("justify-between", !field.value && "text-muted-foreground")}
                    >
                      {field.value
                        ? estabelecimentos.find((est) => est.id === field.value)?.nome
                        : "Selecione um estabelecimento"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]">
                  <Command>
                    <CommandInput placeholder="Buscar estabelecimento..." />
                    <CommandList>
                      <CommandEmpty>Nenhum estabelecimento encontrado.</CommandEmpty>
                      <CommandGroup>
                        {estabelecimentos.map((estabelecimento) => (
                          <CommandItem
                            key={estabelecimento.id}
                            onSelect={() => {
                              form.setValue("estabelecimento", estabelecimento.id);
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                estabelecimento.id === field.value ? "opacity-100" : "opacity-0",
                              )}
                            />
                            {estabelecimento.nome}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Continuar para avaliação
        </Button>
      </form>
    </Form>
  );
}
