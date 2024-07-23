"use client";

import { useState, useEffect } from "react";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { currentUserId } from "@/scripts/currentUserId";

type AvaliacaoGestoresComprometimentoAfetivoProps = {
  onFormValidation: (isValid: boolean) => void;
};

export function AvaliacaoGestoresComprometimentoAfetivo({
  onFormValidation,
}: AvaliacaoGestoresComprometimentoAfetivoProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [respostas, setRespostas] = useState<{ [key: string]: string }>({
    problemasRestaurante: "",
    significadoPessoal: "",
    lealdade: "",
    necessidadeDesejo: "",
    carreiraFutura: "",
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const id = (await currentUserId()) || null;
      setUserId(id);

      if (id) {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId === id) {
          setRespostas({
            problemasRestaurante: localStorage.getItem("problemasRestaurante") || "",
            significadoPessoal: localStorage.getItem("significadoPessoal") || "",
            lealdade: localStorage.getItem("lealdade") || "",
            necessidadeDesejo: localStorage.getItem("necessidadeDesejo") || "",
            carreiraFutura: localStorage.getItem("carreiraFutura") || "",
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
        localStorage.setItem(key, respostas[key]);
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
      <h3 className="mb-8 text-lg">Comprometimento Afetivo</h3>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-1 md:grid-cols-2">
        {[
          {
            key: "problemasRestaurante",
            question: "Eu realmente sinto os problemas do restaurante como se fossem meus.",
          },
          {
            key: "significadoPessoal",
            question: "Este restaurante tem um imenso significado pessoal para mim.",
          },
          {
            key: "lealdade",
            question: "Este restaurante merece minha lealdade.",
          },
          {
            key: "necessidadeDesejo",
            question: "Na situação atual, trabalhar nesse restaurante é tanto uma necessidade quanto um desejo.",
          },
          {
            key: "carreiraFutura",
            question: "Eu seria muito feliz em dedicar o resto da minha carreira nesse restaurante.",
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
                <Label htmlFor={`${key}-1`}>Discordo totalmente</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id={`${key}-2`} />
                <Label htmlFor={`${key}-2`}>Discordo parcialmente</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id={`${key}-3`} />
                <Label htmlFor={`${key}-3`}>Nem discordo nem concordo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="4" id={`${key}-4`} />
                <Label htmlFor={`${key}-4`}>Concordo parcialmente</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5" id={`${key}-5`} />
                <Label htmlFor={`${key}-5`}>Concordo totalmente</Label>
              </div>
            </RadioGroup>
          </div>
        ))}
      </div>
    </>
  );
}
