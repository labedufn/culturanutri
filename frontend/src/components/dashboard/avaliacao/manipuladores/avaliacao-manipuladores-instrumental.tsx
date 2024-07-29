"use client";

import { useState, useEffect } from "react";
import { Label } from "../../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../../ui/radio-group";
import { currentUserId } from "@/scripts/currentUserId";

interface AvaliacaoManipuladoresComprometimentoInstrumentalProps {
  onFormValidation: (isValid: boolean) => void;
}

export function AvaliacaoManipuladoresComprometimentoInstrumental({
  onFormValidation,
}: AvaliacaoManipuladoresComprometimentoInstrumentalProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [respostas, setRespostas] = useState<{ [key: string]: string | null }>({
    deixarEmpregoVidaDesestruturada: null,
    poucasAlternativasCasoDeixarEmprego: null,
    muitoDificilDeixarEmprego: null,
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const id = (await currentUserId()) || null;
      setUserId(id);

      if (id) {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId === id) {
          const storedData = localStorage.getItem("comprometimentoInstrumentalManipulador");
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            setRespostas({
              deixarEmpregoVidaDesestruturada:
                parsedData.comprometimento_instrumental.deixar_emprego_vida_desestruturada?.toString() || null,
              poucasAlternativasCasoDeixarEmprego:
                parsedData.comprometimento_instrumental.poucas_alternativas_caso_deixar_emprego?.toString() || null,
              muitoDificilDeixarEmprego:
                parsedData.comprometimento_instrumental.muito_dificil_deixar_emprego?.toString() || null,
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
        comprometimento_instrumental: {
          deixar_emprego_vida_desestruturada: respostas.deixarEmpregoVidaDesestruturada
            ? parseInt(respostas.deixarEmpregoVidaDesestruturada)
            : null,
          poucas_alternativas_caso_deixar_emprego: respostas.poucasAlternativasCasoDeixarEmprego
            ? parseInt(respostas.poucasAlternativasCasoDeixarEmprego)
            : null,
          muito_dificil_deixar_emprego: respostas.muitoDificilDeixarEmprego
            ? parseInt(respostas.muitoDificilDeixarEmprego)
            : null,
        },
      };

      localStorage.setItem("comprometimentoInstrumentalManipulador", JSON.stringify(data));
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
