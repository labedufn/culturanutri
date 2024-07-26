"use client";

import { useState, useEffect } from "react";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { currentUserId } from "@/scripts/currentUserId";

interface AvaliacaoManipuladoresLiderancaProps {
  onFormValidation: (isValid: boolean) => void;
}

export function AvaliacaoManipuladoresLideranca({ onFormValidation }: AvaliacaoManipuladoresLiderancaProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [respostas, setRespostas] = useState<{ [key: string]: string | null }>({
    normasHigiene: null,
    liderAtento: null,
    funcionariosRepreendidos: null,
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const id = (await currentUserId()) || null;
      setUserId(id);

      if (id) {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId === id) {
          const storedData = localStorage.getItem("liderancaManipulador");
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            setRespostas({
              normasHigiene: parsedData.liderenca.normas_higiene?.toString() || null,
              liderAtento: parsedData.liderenca.lider_atento?.toString() || null,
              funcionariosRepreendidos: parsedData.liderenca.funcionarios_repreendidos?.toString() || null,
            });
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
        liderenca: {
          normas_higiene: respostas.normasHigiene ? parseInt(respostas.normasHigiene) : null,
          lider_atento: respostas.liderAtento ? parseInt(respostas.liderAtento) : null,
          funcionarios_repreendidos: respostas.funcionariosRepreendidos
            ? parseInt(respostas.funcionariosRepreendidos)
            : null,
        },
      };

      localStorage.setItem("liderancaManipulador", JSON.stringify(data));
      validateForm(respostas);
    }
  }, [userId, respostas]);

  const handleRespostaChange = (key: string, value: string) => {
    const newRespostas = { ...respostas, [key]: value };
    setRespostas(newRespostas);
    validateForm(newRespostas);
  };

  const validateForm = (respostas: { [key: string]: string | null }) => {
    const isValid = Object.values(respostas).every((resposta) => resposta !== null);
    onFormValidation(isValid);
  };

  useEffect(() => {
    validateForm(respostas);
  }, [respostas]);

  return (
    <>
      <h3 className="mb-8 text-lg">Liderança</h3>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-1 md:grid-cols-2">
        {[
          {
            key: "normasHigiene",
            question: "As normas de higiene são sempre seguidas.",
          },
          {
            key: "liderAtento",
            question: "O líder está sempre atento às necessidades dos funcionários.",
          },
          {
            key: "funcionariosRepreendidos",
            question: "Os funcionários são repreendidos quando não seguem as normas.",
          },
        ].map(({ key, question }) => (
          <div key={key}>
            <div className="mb-2 text-muted-foreground">
              <Label>{question}</Label>
            </div>
            <RadioGroup
              value={respostas[key] || ""}
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
