"use client";

import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Controller } from "react-hook-form";
import { useFormContext } from "./cadastrar-estabelecimento-provider";
import { formatarCnae } from "@/scripts/formatarCnae";

export function CadastrarEstabelecimentoForm() {
  const form = useFormContext();

  return (
    <>
      <FormField
        control={form.control}
        name="nome"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Nome do estabelecimento" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="cnae"
        render={({ field }) => (
          <FormItem>
            <FormLabel>CNAE</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="0000-0/00 (opcional)"
                onChange={(e) => {
                  const formattedValue = formatarCnae(e.target.value);
                  field.onChange(formattedValue);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="endereco"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Endereço</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Endereço completo" />
            </FormControl>
            <FormMessage />
            <FormDescription>Formato: Rua, Número, Bairro, Cidade, Estado, CEP</FormDescription>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="pessoal_ocupado"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pessoal Ocupado</FormLabel>
            <FormControl>
              <Input {...field} type="number" placeholder="Pessoas ocupadas no local" min="0" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="numero_refeicoes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Número de Refeições</FormLabel>
            <FormControl>
              <Input {...field} type="number" placeholder="Número de refeições servidas" min="0" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="possui_alvara_sanitario"
        render={({}) => (
          <FormItem>
            <FormLabel>Possui Alvará Sanitário</FormLabel>
            <Controller
              control={form.control}
              name="possui_alvara_sanitario"
              render={({ field }) => (
                <RadioGroup
                  className="flex gap-4"
                  value={String(field.value)}
                  onValueChange={(value) => field.onChange(parseInt(value))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="possui_alvara_sim" />
                    <FormLabel htmlFor="possui_alvara_sim">Sim</FormLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="possui_alvara_nao" />
                    <FormLabel htmlFor="possui_alvara_nao">Não</FormLabel>
                  </div>
                </RadioGroup>
              )}
            />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="possui_responsavel_boas_praticas"
        render={({}) => (
          <FormItem>
            <FormLabel>Possui Responsável por Boas Práticas</FormLabel>
            <Controller
              control={form.control}
              name="possui_responsavel_boas_praticas"
              render={({ field }) => (
                <RadioGroup
                  className="flex gap-4"
                  value={String(field.value)}
                  onValueChange={(value) => field.onChange(parseInt(value))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="possui_responsavel_sim" />
                    <FormLabel htmlFor="possui_responsavel_sim">Sim</FormLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="possui_responsavel_nao" />
                    <FormLabel htmlFor="possui_responsavel_nao">Não</FormLabel>
                  </div>
                </RadioGroup>
              )}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
