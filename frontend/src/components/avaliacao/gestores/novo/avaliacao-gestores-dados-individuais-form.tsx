"use client";

import React, { useEffect, useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormContext } from "./avaliacao-gestores-provider";
import { currentUserId } from "@/scripts/currentUserId";

interface FormValues {
  nomeCompleto?: string;
  genero?: string;
  idade?: string;
  escolaridade?: string;
  formacao?: string;
  naoTenhaFormacaoTemTreinamento?: string;
  tempoTrabalhaComAlimentos?: string;
  acreditaComunicacaoBoa?: string;
  realizaTreinamentosBoasPraticas?: string;
  cargaHoraria?: string;
  temasTreinamentos?: string;
}

export function AvaliacaoGestoresDadosIndividuaisForm() {
  const form = useFormContext();
  const [userId, setUserId] = useState<string | null>(null);
  const [escolaridade, setEscolaridade] = useState(form.getValues("escolaridade"));
  const [realizaTreinamentos, setRealizaTreinamentos] = useState(form.getValues("realizaTreinamentosBoasPraticas"));

  useEffect(() => {
    async function fetchUserId() {
      const id = await currentUserId();
      setUserId(id || "");

      for (const key in localStorage) {
        if (key.endsWith(`Gestor_${id}`)) continue;
        localStorage.removeItem(key);
      }

      const storedValues: Partial<FormValues> = {};
      for (const key in localStorage) {
        if (key.endsWith(`Gestor_${id}`)) {
          const fieldKey = key.replace(`Gestor_${id}`, "") as keyof FormValues;
          storedValues[fieldKey] = localStorage.getItem(key) ?? undefined;
        }
      }
      form.reset({
        ...storedValues,
        idade: Number(storedValues.idade),
        tempoTrabalhaComAlimentos: Number(storedValues.tempoTrabalhaComAlimentos),
      });
    }
    fetchUserId();
  }, [form]);

  useEffect(() => {
    if (!userId) return;

    const subscription = form.watch((values) => {
      setEscolaridade(values.escolaridade || "");
      setRealizaTreinamentos(values.realizaTreinamentosBoasPraticas || "");

      for (const [key, value] of Object.entries(values)) {
        localStorage.setItem(`${key}Gestor_${userId}`, String(value) ?? "");
      }
    });
    return () => subscription.unsubscribe();
  }, [form, userId]);

  if (!userId) return null;
  return (
    <>
      <FormField
        control={form.control}
        name="nomeCompleto"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome Completo</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Digite o nome completo" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="genero"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Gênero</FormLabel>
            <FormControl>
              <RadioGroup
                className="flex gap-4"
                value={field.value?.toString()}
                onValueChange={(value) => field.onChange(value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="feminino" />
                  <FormLabel htmlFor="feminino">Feminino</FormLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="masculino" />
                  <FormLabel htmlFor="masculino">Masculino</FormLabel>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="idade"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Idade</FormLabel>
            <FormControl>
              <Input {...field} type="number" placeholder="Digite a idade do gestor" min="18" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="escolaridade"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Escolaridade</FormLabel>
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="1">Fundamental incompleto</SelectItem>
                    <SelectItem value="2">Fundamental completo</SelectItem>
                    <SelectItem value="3">Ensino médio incompleto</SelectItem>
                    <SelectItem value="4">Ensino médio completo</SelectItem>
                    <SelectItem value="5">Ensino superior incompleto</SelectItem>
                    <SelectItem value="6">Ensino superior completo</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {escolaridade === "5" || escolaridade === "6" ? (
        <FormField
          control={form.control}
          name="formacao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Formação (curso)</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} placeholder="Curso que é formado ou em andamento" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ) : (
        <FormField
          control={form.control}
          name="naoTenhaFormacaoTemTreinamento"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Participou de treinamento para manipulação de alimentos?</FormLabel>
              <FormControl>
                <RadioGroup
                  className="flex gap-4"
                  value={field.value || ""}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="sim" />
                    <FormLabel htmlFor="sim">Sim</FormLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="nao" />
                    <FormLabel htmlFor="nao">Não</FormLabel>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <FormField
        control={form.control}
        name="tempoTrabalhaComAlimentos"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Há quanto tempo trabalha com alimentos? (meses)</FormLabel>
            <FormControl>
              <Input {...field} type="number" placeholder="Número de meses trabalhados" min="1" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="acreditaComunicacaoBoa"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Você acredita que a comunicação entre funcionários é boa?</FormLabel>
            <FormControl>
              <RadioGroup
                className="flex gap-4"
                value={field.value || ""}
                onValueChange={(value) => field.onChange(value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="sim" />
                  <FormLabel htmlFor="sim">Sim</FormLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="nao" />
                  <FormLabel htmlFor="nao">Não</FormLabel>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="realizaTreinamentosBoasPraticas"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Você realiza treinamentos com seus funcionários?</FormLabel>
            <FormControl>
              <RadioGroup
                className="flex gap-4"
                value={field.value || ""}
                onValueChange={(value) => field.onChange(value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="sim" />
                  <FormLabel htmlFor="sim">Sim</FormLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="nao" />
                  <FormLabel htmlFor="nao">Não</FormLabel>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {realizaTreinamentos === "1" && (
        <>
          <FormField
            control={form.control}
            name="cargaHoraria"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Com que frequência realiza treinamentos?</FormLabel>
                <FormControl>
                  <Select value={field.value || ""} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="1">Diário</SelectItem>
                        <SelectItem value="2">Semanal</SelectItem>
                        <SelectItem value="3">Quinzenal</SelectItem>
                        <SelectItem value="4">Mensal</SelectItem>
                        <SelectItem value="5">Trimestral</SelectItem>
                        <SelectItem value="6">Semestral</SelectItem>
                        <SelectItem value="7">Anual</SelectItem>
                        <SelectItem value="8">A cada 2 anos</SelectItem>
                        <SelectItem value="9">A cada 3 anos ou mais</SelectItem>
                        <SelectItem value="10">Só fez uma vez</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="temasTreinamentos"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quais são os temas abordados nos treinamentos?</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="Digite os temas abordados" value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </>
  );
}
