"use client";

import { useState, useEffect, FocusEvent } from "react";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../../ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select";
import { currentUserId } from "@/scripts/currentUserId";

interface AvaliacaoManipuladoresDadosIndividuaisProps {
  onFormValidation: (isValid: boolean) => void;
}

export function AvaliacaoManipuladoresDadosIndividuais({
  onFormValidation,
}: AvaliacaoManipuladoresDadosIndividuaisProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [nomeCompleto, setNomeCompleto] = useState<string | null>(null);
  const [genero, setGenero] = useState<string | null>(null);
  const [idade, setIdade] = useState<string | null>(null);
  const [escolaridade, setEscolaridade] = useState<string | null>(null);
  const [formacao, setFormacao] = useState<string | null>(null);
  const [participouTreinamentoManipulacaoAlimentos, setParticipouTreinamentoManipulacaoAlimentos] = useState<
    string | null
  >(null);
  const [tempoTrabalhaComAlimentos, setTempoTrabalhaComAlimentos] = useState<string | null>(null);
  const [boaComunicacaoChefe, setBoaComunicacaoChefe] = useState<string | null>(null);
  const [boaComunicacaoEntreFuncionarios, setBoaComunicacaoEntreFuncionarios] = useState<string | null>(null);

  const [errors, setErrors] = useState<{ idade?: string; tempoTrabalhaComAlimentos?: string }>({});

  const validateField = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newErrors: { idade?: string; tempoTrabalhaComAlimentos?: string } = { ...errors };

    if (name === "idade") {
      if (!value || parseInt(value) <= 17) {
        newErrors.idade = "Idade deve ser maior que 18 anos.";
      } else {
        delete newErrors.idade;
      }
    }

    if (name === "tempoTrabalhaComAlimentos") {
      if (!value || parseInt(value) <= 0) {
        newErrors.tempoTrabalhaComAlimentos = "Há quanto tempo trabalha com alimentos deve ser maior que 0.";
      } else {
        delete newErrors.tempoTrabalhaComAlimentos;
      }
    }

    setErrors(newErrors);
    validateForm(newErrors);
  };

  const validateForm = (currentErrors = errors) => {
    const isValid =
      nomeCompleto !== null &&
      genero !== null &&
      idade !== null &&
      escolaridade !== null &&
      (escolaridade !== "5" || formacao !== null) &&
      (escolaridade !== "6" || formacao !== null) &&
      participouTreinamentoManipulacaoAlimentos !== null &&
      tempoTrabalhaComAlimentos !== null &&
      boaComunicacaoChefe !== null &&
      boaComunicacaoEntreFuncionarios !== null &&
      Object.keys(currentErrors).length === 0;

    onFormValidation(isValid);
  };

  useEffect(() => {
    const fetchUserId = async () => {
      const id = (await currentUserId()) || null;
      setUserId(id);

      if (id) {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId === id) {
          const storedData = localStorage.getItem("dadosIndividuaisManipulador");
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            setNomeCompleto(parsedData.dados_individuais.nome_completo || null);
            setGenero(
              parsedData.dados_individuais.genero !== undefined ? String(parsedData.dados_individuais.genero) : null,
            );
            setIdade(
              parsedData.dados_individuais.idade !== undefined ? String(parsedData.dados_individuais.idade) : null,
            );
            setEscolaridade(
              parsedData.dados_individuais.escolaridade !== undefined
                ? String(parsedData.dados_individuais.escolaridade)
                : null,
            );
            setFormacao(parsedData.dados_individuais.formacao || null);
            setParticipouTreinamentoManipulacaoAlimentos(
              parsedData.dados_individuais.participou_treinamento_manipulacao_alimentos !== undefined
                ? String(parsedData.dados_individuais.participou_treinamento_manipulacao_alimentos)
                : null,
            );
            setTempoTrabalhaComAlimentos(
              parsedData.dados_individuais.tempo_trabalha_com_alimentos !== undefined
                ? String(parsedData.dados_individuais.tempo_trabalha_com_alimentos)
                : null,
            );
            setBoaComunicacaoChefe(
              parsedData.dados_individuais.boa_comunicacao_chefe !== undefined
                ? String(parsedData.dados_individuais.boa_comunicacao_chefe)
                : null,
            );
            setBoaComunicacaoEntreFuncionarios(
              parsedData.dados_individuais.boa_comunicacao_entre_funcionarios !== undefined
                ? String(parsedData.dados_individuais.boa_comunicacao_entre_funcionarios)
                : null,
            );
          }
        } else {
          localStorage.clear();
          localStorage.setItem("userId", id);
        }
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      const data = {
        dados_individuais: {
          nome_completo: nomeCompleto || null,
          genero: genero ? parseInt(genero) : null,
          idade: idade ? parseInt(idade) : null,
          escolaridade: escolaridade ? parseInt(escolaridade) : null,
          formacao: formacao || null,
          participou_treinamento_manipulacao_alimentos: participouTreinamentoManipulacaoAlimentos
            ? parseInt(participouTreinamentoManipulacaoAlimentos)
            : null,
          tempo_trabalha_com_alimentos: tempoTrabalhaComAlimentos ? parseInt(tempoTrabalhaComAlimentos) : null,
          boa_comunicacao_chefe: boaComunicacaoChefe ? parseInt(boaComunicacaoChefe) : null,
          boa_comunicacao_entre_funcionarios: boaComunicacaoEntreFuncionarios
            ? parseInt(boaComunicacaoEntreFuncionarios)
            : null,
        },
      };

      localStorage.setItem("dadosIndividuaisManipulador", JSON.stringify(data));
      validateForm(errors);
    }
  }, [
    userId,
    nomeCompleto,
    genero,
    idade,
    escolaridade,
    formacao,
    participouTreinamentoManipulacaoAlimentos,
    tempoTrabalhaComAlimentos,
    boaComunicacaoChefe,
    boaComunicacaoEntreFuncionarios,
    errors,
  ]);

  return (
    <>
      <h3 className="mb-8 text-lg">Dados Pessoais</h3>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-1 md:grid-cols-2">
        <div>
          <div className="mb-2 text-muted-foreground">
            <Label>Nome Completo</Label>
          </div>
          <Input
            type="text"
            placeholder="Digite o nome completo"
            value={nomeCompleto || ""}
            name="nomeCompleto"
            onChange={(e) => setNomeCompleto(e.target.value)}
            onBlur={validateForm}
          />
        </div>
        <div>
          <div className="mb-2 text-muted-foreground">
            <Label>Gênero</Label>
          </div>
          <RadioGroup value={genero || ""} onValueChange={setGenero} className="flex gap-4">
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
          <div className={`mb-2 ${errors.idade ? "text-red-500" : "text-muted-foreground"}`}>
            <Label>Idade</Label>
          </div>
          <Input
            type="number"
            max={100}
            min={18}
            placeholder="Digite a idade do gestor"
            value={idade || ""}
            name="idade"
            onChange={(e) => setIdade(e.target.value)}
            onBlur={validateField}
          />
          {errors.idade && <p className="text-red-500 text-sm mt-2 font-medium">{errors.idade}</p>}
        </div>

        <div>
          <div className="mb-2 text-muted-foreground">
            <Label>Escolaridade</Label>
          </div>
          <Select value={escolaridade || ""} onValueChange={setEscolaridade}>
            <SelectTrigger onBlur={validateForm}>
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

        {(escolaridade === "5" || escolaridade === "6") && (
          <div>
            <div className="mb-2 text-muted-foreground">
              <Label>Formação (curso)</Label>
            </div>
            <Input
              placeholder="Curso que é formado ou em andamento"
              value={formacao || ""}
              onChange={(e) => setFormacao(e.target.value)}
              onBlur={validateForm}
            />
          </div>
        )}

        {escolaridade !== "5" && escolaridade !== "6" && (
          <div>
            <div className="mb-2 text-muted-foreground">
              <Label>Participou de treinamento para manipulação de alimentos?</Label>
            </div>
            <RadioGroup
              value={participouTreinamentoManipulacaoAlimentos || ""}
              onValueChange={setParticipouTreinamentoManipulacaoAlimentos}
              className="flex gap-4"
            >
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
        )}

        <div>
          <div className={`mb-2 ${errors.tempoTrabalhaComAlimentos ? "text-red-500" : "text-muted-foreground"}`}>
            <Label>Há quanto tempo trabalha com alimentos? (meses)</Label>
          </div>
          <Input
            type="number"
            placeholder="Número de meses trabalhados"
            min={1}
            value={tempoTrabalhaComAlimentos || ""}
            name="tempoTrabalhaComAlimentos"
            onChange={(e) => setTempoTrabalhaComAlimentos(e.target.value)}
            onBlur={validateField}
          />
          {errors.tempoTrabalhaComAlimentos && (
            <p className="text-red-500 text-sm mt-2 font-medium">{errors.tempoTrabalhaComAlimentos}</p>
          )}
        </div>

        <div>
          <div className="mb-2 text-muted-foreground">
            <Label>Você acredita que a comunicação entre funcionários é boa?</Label>
          </div>
          <RadioGroup
            value={boaComunicacaoEntreFuncionarios || ""}
            onValueChange={setBoaComunicacaoEntreFuncionarios}
            className="flex gap-4"
          >
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
          <div className="mb-2 text-muted-foreground">
            <Label>Você tem abertura de conversar com seu chefe sobre os problemas do restaurante?</Label>
          </div>
          <RadioGroup value={boaComunicacaoChefe || ""} onValueChange={setBoaComunicacaoChefe} className="flex gap-4">
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
      </div>
    </>
  );
}
