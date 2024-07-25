"use client";

import { useState, useEffect } from "react";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { currentUserId } from "@/scripts/currentUserId";

type AvaliacaoManipuladoresPercepcaoRiscoProps = {
  onFormValidation: (isValid: boolean) => void;
};

export function AvaliacaoManipuladoresPercepcaoRisco({ onFormValidation }: AvaliacaoManipuladoresPercepcaoRiscoProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [respostas, setRespostas] = useState<{ [key: string]: string }>({
    riscoApresentarDorBarrigaEstabelecimentoSimilar: "",
    riscoApresentarDorBarrigaEstabelecimentoManipulado: "",
    riscoApresentarDorBarrigaEstabelecimentoColegaManipulado: "",
    riscoDoencaTransmitidaAlimentos: "",
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const id = (await currentUserId()) || null;
      setUserId(id);

      if (id) {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId === id) {
          setRespostas({
            riscoApresentarDorBarrigaEstabelecimentoSimilar:
              localStorage.getItem("risco_apresentar_dor_barriga_estabelecimento_similar") || "",
            riscoApresentarDorBarrigaEstabelecimentoManipulado:
              localStorage.getItem("risco_apresentar_dor_barriga_estabelecimento_manipulado") || "",
            riscoApresentarDorBarrigaEstabelecimentoColegaManipulado:
              localStorage.getItem("risco_apresentar_dor_barriga_estabelecimento_colega_manipulado") || "",
            riscoDoencaTransmitidaAlimentos: localStorage.getItem("risco_doenca_transmitida_alimentos") || "",
          });
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
      Object.keys(respostas).forEach((key) => {
        const value = respostas[key];
        if (value !== "") {
          localStorage.setItem(key.replace(/([A-Z])/g, "_$1").toLowerCase(), parseInt(value, 10).toString());
        }
      });
    }
  }, [userId, respostas]);

  const handleRespostaChange = (key: string, value: string) => {
    const newRespostas = { ...respostas, [key]: value };
    setRespostas(newRespostas);
    validateForm(newRespostas);
  };

  const validateForm = (respostas: { [s: string]: unknown } | ArrayLike<unknown>) => {
    const isValid = Object.values(respostas).every((resposta) => resposta !== "");
    onFormValidation(isValid);
  };

  useEffect(() => {
    validateForm(respostas);
  }, [respostas]);

  return (
    <>
      <h3 className="mb-8 text-lg">Percepção de Risco</h3>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-1 md:grid-cols-2">
        {[
          {
            key: "riscoApresentarDorBarrigaEstabelecimentoSimilar",
            question:
              "Qual o risco do cliente apresentar dor de barriga e/ou vômitos (intoxicação alimentar) após comer uma refeição preparada em um estabelecimento similar ao que você trabalha (que tenha estrutura, cardápio, tamanho e funcionamento similar ao seu)?",
          },
          {
            key: "riscoApresentarDorBarrigaEstabelecimentoManipulado",
            question:
              "Qual o risco do cliente apresentar dor de barriga e/ou vômitos (intoxicação alimentar) após comer uma refeição preparada no estabelecimento onde você trabalha?",
          },
          {
            key: "riscoApresentarDorBarrigaEstabelecimentoColegaManipulado",
            question:
              "Qual o risco do cliente apresentar dor de barriga e/ou vômitos (intoxicação alimentar) após comer uma refeição preparada por um colega no estabelecimento onde você trabalha?",
          },
          {
            key: "riscoDoencaTransmitidaAlimentos",
            question:
              "Se o cliente consumir um alimento contaminado, qual o risco que uma doença transmitida por alimentos pode ser grave ou letal a ele?",
          },
        ].map(({ key, question }) => (
          <div key={key}>
            <div className="mb-2 text-muted-foreground">
              <Label>{question}</Label>
            </div>
            <RadioGroup
              value={respostas[key]}
              onValueChange={(value) => handleRespostaChange(key, value)}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id={`${key}-1`} />
                <Label htmlFor={`${key}-1`}>Extremamente baixo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id={`${key}-2`} />
                <Label htmlFor={`${key}-2`}>Razoavelmente baixo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id={`${key}-3`} />
                <Label htmlFor={`${key}-3`}>Pouco baixo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="4" id={`${key}-4`} />
                <Label htmlFor={`${key}-4`}>Regular</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5" id={`${key}-5`} />
                <Label htmlFor={`${key}-5`}>Pouco alto</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="6" id={`${key}-6`} />
                <Label htmlFor={`${key}-6`}>Razoavelmente alto</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="7" id={`${key}-7`} />
                <Label htmlFor={`${key}-7`}>Extremamente alto</Label>
              </div>
            </RadioGroup>
          </div>
        ))}
      </div>
    </>
  );
}
