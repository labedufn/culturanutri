"use client";

import { useState, useEffect } from "react";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { currentUserId } from "@/scripts/currentUserId";

export function AvaliacaoGestoresSistemaGestao() {
  const [userId, setUserId] = useState<string | null>(null);
  const [respostas, setRespostas] = useState<{ [key: string]: string }>({
    lideranca: "",
    comunicacao: "",
    segurancaAlimentos: "",
    ambienteTrabalho: "",
    pressaoManipulador: "",
    comprometimentoManipuladores: "",
    boasPraticas: "",
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const id = (await currentUserId()) || null;
      setUserId(id);

      if (id) {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId === id) {
          setRespostas({
            lideranca: localStorage.getItem("lideranca") || "",
            comunicacao: localStorage.getItem("comunicacao") || "",
            segurancaAlimentos: localStorage.getItem("segurancaAlimentos") || "",
            ambienteTrabalho: localStorage.getItem("ambienteTrabalho") || "",
            pressaoManipulador: localStorage.getItem("pressaoManipulador") || "",
            comprometimentoManipuladores: localStorage.getItem("comprometimentoManipuladores") || "",
            boasPraticas: localStorage.getItem("boasPraticas") || "",
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
    setRespostas((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <>
      <h3 className="mb-8 text-lg">Sistema de Gestão</h3>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-1 md:grid-cols-2">
        {[
          {
            key: "lideranca",
            question:
              "A forma de liderança deve ser modificada somente quando o consumidor tem alta percepção de risco de doenças transmitidas por alimentos.",
          },
          {
            key: "comunicacao",
            question:
              "A forma de comunicação deve ser modificada somente quando o consumidor tem alta percepção de risco de doenças transmitidas por alimentos.",
          },
          {
            key: "segurancaAlimentos",
            question:
              "A forma de gerenciar a segurança dos alimentos deve ser modificada somente quando o consumidor tem alta percepção de risco de doenças transmitidas por alimentos.",
          },
          {
            key: "ambienteTrabalho",
            question:
              "O ambiente de trabalho deve ser modificado somente quando o consumidor tem alta percepção de risco de doenças transmitidas por alimentos.",
          },
          {
            key: "pressaoManipulador",
            question:
              "O manipulador de alimentos deve ser mais pressionado somente quando o consumidor tem alta percepção de risco de doenças transmitidas por alimentos.",
          },
          {
            key: "comprometimentoManipuladores",
            question:
              "O comprometimento dos manipuladores deve ser modificado somente quando o consumidor tem alta percepção de risco de doenças transmitidas por alimentos.",
          },
          {
            key: "boasPraticas",
            question:
              "As boas práticas devem ser melhoradas somente quando o consumidor tem alta percepção de risco de doenças transmitidas por alimentos.",
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
