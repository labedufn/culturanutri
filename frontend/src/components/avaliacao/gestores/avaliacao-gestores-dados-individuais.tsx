"use client";

import { useState, useEffect, FocusEvent } from "react";
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
  const [nomeCompleto, setNomeCompleto] = useState<string>("");
  const [genero, setGenero] = useState<string>("");
  const [idade, setIdade] = useState<string>("");
  const [escolaridade, setEscolaridade] = useState<string>("");
  const [formacao, setFormacao] = useState<string>("");
  const [naoTenhaFormacaoTemTreinamento, setNaoTenhaFormacaoTemTreinamento] = useState<string>("");
  const [tempoTrabalhaComAlimentos, setTempoTrabalhaComAlimentos] = useState<string>("");
  const [acreditaComunicacaoBoa, setAcreditaComunicacaoBoa] = useState<string>("");
  const [realizaTreinamentosBoasPraticas, setRealizaTreinamentosBoasPraticas] = useState<string>("");
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
      realizaTreinamentosBoasPraticas !== "" &&
      (realizaTreinamentosBoasPraticas !== "1" || frequenciaAplicacao !== "") &&
      (realizaTreinamentosBoasPraticas !== "1" || temasTreinamentos !== "") &&
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
          setNomeCompleto(localStorage.getItem("nome_completo") || "");
          setGenero(localStorage.getItem("genero") || "");
          setIdade(localStorage.getItem("idade") || "");
          setEscolaridade(localStorage.getItem("escolaridade") || "");
          setFormacao(localStorage.getItem("formacao") || "");
          setNaoTenhaFormacaoTemTreinamento(localStorage.getItem("nao_tenha_formacao_tem_treinamento") || "");
          setTempoTrabalhaComAlimentos(localStorage.getItem("tempo_trabalha_com_alimentos") || "");
          setAcreditaComunicacaoBoa(localStorage.getItem("acredita_comunicacao_boa") || "");
          setRealizaTreinamentosBoasPraticas(
            localStorage.getItem("realiza_treinamentos_boas_prticas_manipulação") || "",
          );
          setCargaHoraria(localStorage.getItem("carga_horaria") || "");
          setFrequenciaAplicacao(localStorage.getItem("frequencia_aplicação") || "");
          setTemasTreinamentos(localStorage.getItem("temas_treinamentos") || "");
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
      localStorage.setItem("nome_completo", nomeCompleto);
      localStorage.setItem("genero", genero);
      localStorage.setItem("idade", idade ? parseInt(idade).toString() : "");
      localStorage.setItem("escolaridade", escolaridade);
      localStorage.setItem("formacao", formacao);
      localStorage.setItem("nao_tenha_formacao_tem_treinamento", naoTenhaFormacaoTemTreinamento);
      localStorage.setItem(
        "tempo_trabalha_com_alimentos",
        tempoTrabalhaComAlimentos ? parseInt(tempoTrabalhaComAlimentos).toString() : "",
      );
      localStorage.setItem("acredita_comunicacao_boa", acreditaComunicacaoBoa);
      localStorage.setItem("realiza_treinamentos_boas_prticas_manipulação", realizaTreinamentosBoasPraticas);
      localStorage.setItem("carga_horaria", cargaHoraria);
      localStorage.setItem("frequencia_aplicação", frequenciaAplicacao);
      localStorage.setItem("temas_treinamentos", temasTreinamentos);
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
    realizaTreinamentosBoasPraticas,
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
            <Label>Você realiza treinamentos com seus funcionários?</Label>
          </div>
          <RadioGroup
            value={realizaTreinamentosBoasPraticas}
            onValueChange={setRealizaTreinamentosBoasPraticas}
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

        {realizaTreinamentosBoasPraticas === "1" && (
          <div>
            <div className="mb-2 text-muted-foreground">
              <Label>Com que frequência realiza treinamentos?</Label>
            </div>
            <Select value={frequenciaAplicacao} onValueChange={setFrequenciaAplicacao}>
              <SelectTrigger onBlur={validateForm}>
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
          </div>
        )}

        {realizaTreinamentosBoasPraticas === "1" && (
          <div>
            <div className="mb-2 text-muted-foreground">
              <Label>Quais são os temas abordados nos treinamentos?</Label>
            </div>
            <Input
              type="text"
              placeholder="Digite os temas abordados"
              value={temasTreinamentos}
              onChange={(e) => setTemasTreinamentos(e.target.value)}
              onBlur={validateForm}
            />
          </div>
        )}
      </div>
    </>
  );
}
