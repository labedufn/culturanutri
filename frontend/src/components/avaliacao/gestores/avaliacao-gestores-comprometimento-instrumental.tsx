"use client";

import { useState, useEffect } from "react";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { currentUserId } from "@/scripts/currentUserId";

export function AvaliacaoGestoresComprometimentoInstrumental() {
  const [userId, setUserId] = useState<string | null>(null);
  const [respostas, setRespostas] = useState<{ [key: string]: string }>({
    vidaDesestruturada: "",
    poucasAlternativas: "",
    dificuldadeDeixar: "",
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const id = (await currentUserId()) || null;
      setUserId(id);

      if (id) {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId === id) {
          setRespostas({
            vidaDesestruturada: localStorage.getItem("vidaDesestruturada") || "",
            poucasAlternativas: localStorage.getItem("poucasAlternativas") || "",
            dificuldadeDeixar: localStorage.getItem("dificuldadeDeixar") || "",
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
      <h3 className="mb-8 text-lg">Comprometimento Instrumental</h3>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-1 md:grid-cols-2">
        {[
          {
            key: "vidaDesestruturada",
            question: "Se eu decidisse deixar meu emprego agora, minha vida ficaria bastante desestruturada.",
          },
          {
            key: "poucasAlternativas",
            question: "Eu acho que teria poucas alternativas se deixasse este emprego.",
          },
          {
            key: "dificuldadeDeixar",
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
