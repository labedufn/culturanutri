"use client";

import { useState, useEffect, FocusEvent } from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { currentUserId } from "@/scripts/currentUserId";

interface AvaliacaoManipuladoresDadosIndividuaisProps {
  onFormValidation: (isValid: boolean) => void;
}

export function AvaliacaoManipuladoresDadosIndividuais({
  onFormValidation,
}: AvaliacaoManipuladoresDadosIndividuaisProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [nomeCompleto, setNomeCompleto] = useState<string>("");
  const [genero, setGenero] = useState<string>("");
  const [idade, setIdade] = useState<string>("");
  const [escolaridade, setEscolaridade] = useState<string>("");
  const [formacao, setFormacao] = useState<string>("");
  const [naoTenhaFormacaoTemTreinamento, setNaoTenhaFormacaoTemTreinamento] = useState<string>("");
  const [tempoTrabalhaComAlimentos, setTempoTrabalhaComAlimentos] = useState<string>("");
  const [acreditaComunicacaoBoa, setAcreditaComunicacaoBoa] = useState<string>("");
  const [boaComunicacaoChefe, setBoaComunicacaoChefe] = useState<string>("");
  const [cargaHoraria, setCargaHoraria] = useState<string>("");
  const [frequenciaAplicacao, setFrequenciaAplicacao] = useState<string>("");
  const [temasTreinamentos, setTemasTreinamentos] = useState<string>("");

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
      nomeCompleto !== "" &&
      genero !== "" &&
      idade !== "" &&
      escolaridade !== "" &&
      (escolaridade !== "5" || formacao !== "") &&
      (escolaridade !== "6" || formacao !== "") &&
      naoTenhaFormacaoTemTreinamento !== "" &&
      tempoTrabalhaComAlimentos !== "" &&
      acreditaComunicacaoBoa !== "" &&
      boaComunicacaoChefe !== "";

    onFormValidation(isValid);
  };

  useEffect(() => {
    const fetchUserId = async () => {
      const id = (await currentUserId()) || null;
      setUserId(id);

      if (id) {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId === id) {
          setNomeCompleto(localStorage.getItem("nome_completo_manipuladores") || "");
          setGenero(localStorage.getItem("genero_manipuladores") || "");
          setIdade(localStorage.getItem("idade_manipuladores") || "");
          setEscolaridade(localStorage.getItem("escolaridade_manipuladores") || "");
          setFormacao(localStorage.getItem("formacao_manipuladores") || "");
          setNaoTenhaFormacaoTemTreinamento(
            localStorage.getItem("nao_tenha_formacao_tem_treinamento_manipuladores") || "",
          );
          setTempoTrabalhaComAlimentos(localStorage.getItem("tempo_trabalha_com_alimentos_manipuladores") || "");
          setAcreditaComunicacaoBoa(localStorage.getItem("acredita_comunicacao_boa_manipuladores") || "");
          setBoaComunicacaoChefe(
            localStorage.getItem("realiza_treinamentos_boas_prticas_manipulação_manipuladores") || "",
          );
          setCargaHoraria(localStorage.getItem("carga_horaria_manipuladores") || "");
          setFrequenciaAplicacao(localStorage.getItem("frequencia_aplicação_manipuladores") || "");
          setTemasTreinamentos(localStorage.getItem("temas_treinamentos_manipuladores") || "");
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
      localStorage.setItem("nome_completo_manipuladores", nomeCompleto);
      localStorage.setItem("genero_manipuladores", genero);
      localStorage.setItem("idade_manipuladores", idade ? parseInt(idade).toString() : "");
      localStorage.setItem("escolaridade_manipuladores", escolaridade);
      localStorage.setItem("formacao_manipuladores", formacao);
      localStorage.setItem("nao_tenha_formacao_tem_treinamento_manipuladores", naoTenhaFormacaoTemTreinamento);
      localStorage.setItem(
        "tempo_trabalha_com_alimentos_manipuladores",
        tempoTrabalhaComAlimentos ? parseInt(tempoTrabalhaComAlimentos).toString() : "",
      );
      localStorage.setItem("acredita_comunicacao_boa_manipuladores", acreditaComunicacaoBoa);
      localStorage.setItem("realiza_treinamentos_boas_prticas_manipulação_manipuladores", boaComunicacaoChefe);
      localStorage.setItem("carga_horaria_manipuladores", cargaHoraria);
      localStorage.setItem("frequencia_aplicação_manipuladores", frequenciaAplicacao);
      localStorage.setItem("temas_treinamentos_manipuladores", temasTreinamentos);
      validateForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    userId,
    nomeCompleto,
    genero,
    idade,
    escolaridade,
    formacao,
    naoTenhaFormacaoTemTreinamento,
    tempoTrabalhaComAlimentos,
    acreditaComunicacaoBoa,
    boaComunicacaoChefe,
    cargaHoraria,
    frequenciaAplicacao,
    temasTreinamentos,
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
            value={nomeCompleto}
            name="nomeCompleto"
            onChange={(e) => setNomeCompleto(e.target.value)}
            onBlur={validateForm}
          />
        </div>
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
          <div className={`mb-2 ${errors.idade ? "text-red-500" : "text-muted-foreground"}`}>
            <Label>Idade</Label>
          </div>
          <Input
            type="number"
            max={100}
            min={18}
            placeholder="Digite a idade do gestor"
            value={idade}
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
          <Select value={escolaridade} onValueChange={setEscolaridade}>
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
              value={formacao}
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
              value={naoTenhaFormacaoTemTreinamento}
              onValueChange={setNaoTenhaFormacaoTemTreinamento}
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
            value={tempoTrabalhaComAlimentos}
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
          <RadioGroup value={acreditaComunicacaoBoa} onValueChange={setAcreditaComunicacaoBoa} className="flex gap-4">
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
          <RadioGroup value={boaComunicacaoChefe} onValueChange={setBoaComunicacaoChefe} className="flex gap-4">
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
