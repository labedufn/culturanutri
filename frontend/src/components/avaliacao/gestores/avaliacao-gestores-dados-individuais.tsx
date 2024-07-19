"use client";

import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";

export function AvaliacaoGestoresDadosIndividuais() {
  return (
    <>
      <h3 className="mb-8 text-lg">Dados Pessoais</h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label>Gênero</Label>
          <RadioGroup className="flex gap-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="0" id="feminino" />
              <Label htmlFor="feminino">Feminino</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="masculino" />
              <Label htmlFor="masculino">Masculino</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Idade</Label>
          <Input type="number" />
        </div>

        <div>
          <Label>Escolaridade</Label>
          <Select>
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
        </div>

        <div>
          <Label>Formação</Label>
          <Input />
        </div>

        <div>
          <Label>Participou de treinamento para manipulação de alimentos?</Label>
          <RadioGroup className="flex gap-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="sim" />
              <Label htmlFor="sim">Sim</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="0" id="nao" />
              <Label htmlFor="nao">Não</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Há quanto tempo trabalha com alimentos? (meses)</Label>
          <Input type="number" />
        </div>

        <div>
          <Label>Você acredita que a comunicação entre funcionários é boa?</Label>
          <RadioGroup className="flex gap-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="sim" />
              <Label htmlFor="sim">Sim</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="0" id="nao" />
              <Label htmlFor="nao">Não</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Você realiza treinamentos com os funcionários a respeito de boas práticas de manipulação?</Label>
          <RadioGroup className="flex gap-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="sim" />
              <Label htmlFor="sim">Sim</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="0" id="nao" />
              <Label htmlFor="nao">Não</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Qual a frequência de aplicação?</Label>
          <Input />
        </div>

        <div>
          <Label>Qual a frequência de aplicação?</Label>
          <Select>
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
                <SelectItem value="9">A cada 3 ou mais anos</SelectItem>
                <SelectItem value="10">Só fez uma vez</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Quais os temas costuma abordar nos treinamentos?</Label>
          <Input />
        </div>
      </div>
    </>
  );
}
