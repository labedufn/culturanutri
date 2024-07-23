"use client";

import { useState, useEffect } from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { currentUserId } from "@/scripts/currentUserId";

interface AvaliacaoGestoresDadosIndividuaisProps {
  onFormValidation: (isValid: boolean) => void;
}

export function AvaliacaoGestoresDadosIndividuais({ onFormValidation }: AvaliacaoGestoresDadosIndividuaisProps) {
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

  const validateForm = () => {
    const isValid =
      genero !== "" &&
      idade !== "" &&
      escolaridade !== "" &&
      (escolaridade !== "5" || formacao !== "") &&
      (escolaridade !== "6" || formacao !== "") &&
      participouTreinamento !== "" &&
      tempoAlimentos !== "" &&
      comunicacaoBoa !== "" &&
      realizaTreinamentos !== "" &&
      (realizaTreinamentos !== "1" || frequenciaTreinamento !== "") &&
      (realizaTreinamentos !== "1" || temasTreinamento !== "");
    onFormValidation(isValid);
  };

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
      validateForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            max={100}
            min={18}
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
            min={1}
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
            <Label>Você realiza treinamentos com seus funcionários?</Label>
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
          <div>
            <div className="mb-2 text-muted-foreground">
              <Label>Com que frequência realiza treinamentos?</Label>
            </div>
            <Input
              type="text"
              placeholder="Digite a frequência dos treinamentos"
              value={frequenciaTreinamento}
              onChange={(e) => setFrequenciaTreinamento(e.target.value)}
            />
          </div>
        )}

        {realizaTreinamentos === "1" && (
          <div>
            <div className="mb-2 text-muted-foreground">
              <Label>Quais são os temas abordados nos treinamentos?</Label>
            </div>
            <Input
              type="text"
              placeholder="Digite os temas abordados"
              value={temasTreinamento}
              onChange={(e) => setTemasTreinamento(e.target.value)}
            />
          </div>
        )}
      </div>
    </>
  );
}
