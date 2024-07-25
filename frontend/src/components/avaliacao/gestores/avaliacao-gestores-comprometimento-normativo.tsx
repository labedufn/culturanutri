"use client";

import { useState, useEffect } from "react";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { currentUserId } from "@/scripts/currentUserId";

type AvaliacaoGestoresComprometimentoNormativoProps = {
  onFormValidation: (isValid: boolean) => void;
};

export function AvaliacaoGestoresComprometimentoNormativo({
  onFormValidation,
}: AvaliacaoGestoresComprometimentoNormativoProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [respostas, setRespostas] = useState<{ [key: string]: string }>({
    naoDeixaEmpregoPoisObrigacaoMoral: "",
    culpadoDeixasseEmprego: "",
    naoSeriaCertoDeixarEmprego: "",
    devoEsseEmprego: "",
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const id = (await currentUserId()) || null;
      setUserId(id);

      if (id) {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId === id) {
          setRespostas({
            naoDeixaEmpregoPoisObrigacaoMoral: localStorage.getItem("nao_deixa_emprego_pois_obrigacao_moral") || "",
            culpadoDeixasseEmprego: localStorage.getItem("culpado_deixasse_emprego") || "",
            naoSeriaCertoDeixarEmprego: localStorage.getItem("nao_seria_certo_deixar_emprego") || "",
            devoEsseEmprego: localStorage.getItem("devo_esse_emprego") || "",
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
          localStorage.setItem(key.replace(/([A-Z])/g, "_$1").toLowerCase(), value);
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
      <h3 className="mb-8 text-lg">Comprometimento Normativo</h3>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-1 md:grid-cols-2">
        {[
          {
            key: "naoDeixaEmpregoPoisObrigacaoMoral",
            question: "Eu não deixaria meu emprego agora porque eu tenho uma obrigação moral com as pessoas daqui.",
          },
          {
            key: "culpadoDeixasseEmprego",
            question: "Eu me sentiria culpado se deixasse meu emprego agora.",
          },
          {
            key: "naoSeriaCertoDeixarEmprego",
            question: "Mesmo se fosse vantagem para mim, eu sinto que não seria certo deixar meu emprego agora.",
          },
          {
            key: "devoEsseEmprego",
            question: "Eu devo muito a esse emprego.",
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
