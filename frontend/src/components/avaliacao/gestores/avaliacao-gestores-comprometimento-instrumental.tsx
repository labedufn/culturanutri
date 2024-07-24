"use client";

import { useState, useEffect } from "react";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { currentUserId } from "@/scripts/currentUserId";

interface AvaliacaoGestoresComprometimentoInstrumentalProps {
  onFormValidation: (isValid: boolean) => void;
}

export function AvaliacaoGestoresComprometimentoInstrumental({
  onFormValidation,
}: AvaliacaoGestoresComprometimentoInstrumentalProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [respostas, setRespostas] = useState<{ [key: string]: string }>({
    deixarEmpregoVidaDesestruturada: "",
    poucasAlternativasCasoDeixarEmprego: "",
    muitoDificilDeixarEmprego: "",
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const id = (await currentUserId()) || null;
      setUserId(id);

      if (id) {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId === id) {
          setRespostas({
            deixarEmpregoVidaDesestruturada: localStorage.getItem("deixar_emprego_vida_desestruturada") || "",
            poucasAlternativasCasoDeixarEmprego: localStorage.getItem("poucas_alternativas_caso_deixar_emprego") || "",
            muitoDificilDeixarEmprego: localStorage.getItem("muito_dificil_deixar_emprego") || "",
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
      <h3 className="mb-8 text-lg">Comprometimento Instrumental</h3>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-1 md:grid-cols-2">
        {[
          {
            key: "deixarEmpregoVidaDesestruturada",
            question: "Se eu decidisse deixar meu emprego agora, minha vida ficaria bastante desestruturada.",
          },
          {
            key: "poucasAlternativasCasoDeixarEmprego",
            question: "Eu acho que teria poucas alternativas se deixasse este emprego.",
          },
          {
            key: "muitoDificilDeixarEmprego",
            question: "Mesmo se eu quisesse, seria muito difícil para mim deixar este emprego agora.",
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
