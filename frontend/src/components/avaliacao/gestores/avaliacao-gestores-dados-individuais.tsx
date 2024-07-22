"use client";

import { useState, useEffect } from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { currentUserId } from "@/scripts/currentUserId";

export function AvaliacaoGestoresDadosIndividuais() {
  const [userId, setUserId] = useState<string | null>(null);
  const [genero, setGenero] = useState<string>("");
  const [idade, setIdade] = useState<string>("");
  const [escolaridade, setEscolaridade] = useState<string>("");
  const [formacao, setFormacao] = useState<string>("");
  const [participouTreinamento, setParticipouTreinamento] = useState<string>("");
  const [tempoAlimentos, setTempoAlimentos] = useState<string>("");
  const [comunicacaoBoa, setComunicacaoBoa] = useState<string>("");
  const [realizaTreinamentos, setRealizaTreinamentos] = useState<string>("");
  const [frequenciaTreinamento, setFrequenciaTreinamento] = useState<string>("");
  const [temasTreinamento, setTemasTreinamento] = useState<string>("");

  useEffect(() => {
    const fetchUserId = async () => {
      const id = (await currentUserId()) || null;
      setUserId(id);

      if (id) {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId === id) {
          setGenero(localStorage.getItem("genero") || "");
          setIdade(localStorage.getItem("idade") || "");
          setEscolaridade(localStorage.getItem("escolaridade") || "");
          setFormacao(localStorage.getItem("formacao") || "");
          setParticipouTreinamento(localStorage.getItem("participouTreinamento") || "");
          setTempoAlimentos(localStorage.getItem("tempoAlimentos") || "");
          setComunicacaoBoa(localStorage.getItem("comunicacaoBoa") || "");
          setRealizaTreinamentos(localStorage.getItem("realizaTreinamentos") || "");
          setFrequenciaTreinamento(localStorage.getItem("frequenciaTreinamento") || "");
          setTemasTreinamento(localStorage.getItem("temasTreinamento") || "");
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
      localStorage.setItem("genero", genero);
      localStorage.setItem("idade", idade);
      localStorage.setItem("escolaridade", escolaridade);
      localStorage.setItem("formacao", formacao);
      localStorage.setItem("participouTreinamento", participouTreinamento);
      localStorage.setItem("tempoAlimentos", tempoAlimentos);
      localStorage.setItem("comunicacaoBoa", comunicacaoBoa);
      localStorage.setItem("realizaTreinamentos", realizaTreinamentos);
      localStorage.setItem("frequenciaTreinamento", frequenciaTreinamento);
      localStorage.setItem("temasTreinamento", temasTreinamento);
    }
  }, [
    userId,
    genero,
    idade,
    escolaridade,
    formacao,
    participouTreinamento,
    tempoAlimentos,
    comunicacaoBoa,
    realizaTreinamentos,
    frequenciaTreinamento,
    temasTreinamento,
  ]);

  return (
    <>
      <h3 className="mb-8 text-lg">Dados Pessoais</h3>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-1 md:grid-cols-2">
        <div>
          <div className="mb-2 text-muted-foreground">
            <Label>Gênero</Label>
          </div>
          <RadioGroup value={genero} onValueChange={setGenero} className="flex gap-4">
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
          <div className="mb-2 text-muted-foreground">
            <Label>Idade</Label>
          </div>
          <Input
            type="number"
            placeholder="Digite a idade do gestor"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
          />
        </div>

        <div>
          <div className="mb-2 text-muted-foreground">
            <Label>Escolaridade</Label>
          </div>
          <Select value={escolaridade} onValueChange={setEscolaridade}>
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

        {(escolaridade === "5" || escolaridade === "6") && (
          <div>
            <Label>Formação</Label>
            <Input
              placeholder="Curso que é formado ou em andamento"
              value={formacao}
              onChange={(e) => setFormacao(e.target.value)}
            />
          </div>
        )}

        <div>
          <div className="mb-2 text-muted-foreground">
            <Label>Participou de treinamento para manipulação de alimentos?</Label>
          </div>
          <RadioGroup value={participouTreinamento} onValueChange={setParticipouTreinamento} className="flex gap-4">
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
            <Label>Há quanto tempo trabalha com alimentos?</Label>
          </div>
          <Input
            type="number"
            placeholder="Número de meses trabalhados"
            value={tempoAlimentos}
            onChange={(e) => setTempoAlimentos(e.target.value)}
          />
        </div>

        <div>
          <div className="mb-2 text-muted-foreground">
            <Label>Você acredita que a comunicação entre funcionários é boa?</Label>
          </div>
          <RadioGroup value={comunicacaoBoa} onValueChange={setComunicacaoBoa} className="flex gap-4">
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
            <Label>Você realiza treinamentos com os funcionários a respeito de boas práticas de manipulação?</Label>
          </div>
          <RadioGroup value={realizaTreinamentos} onValueChange={setRealizaTreinamentos} className="flex gap-4">
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

        {realizaTreinamentos === "1" && (
          <>
            <div>
              <div className="mb-2 text-muted-foreground">
                <Label>Qual a frequência de aplicação?</Label>
              </div>
              <Select value={frequenciaTreinamento} onValueChange={setFrequenciaTreinamento}>
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
              <div className="mb-2 text-muted-foreground">
                <Label>Quais os temas costuma abordar nos treinamentos?</Label>
              </div>
              <Input
                placeholder="Tema 1, Tema 2, Tema 3..."
                value={temasTreinamento}
                onChange={(e) => setTemasTreinamento(e.target.value)}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
