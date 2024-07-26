"use client";

import { useState, useEffect } from "react";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { currentUserId } from "@/scripts/currentUserId";

type AvaliacaoManipuladoresComprometimentoNormativoProps = {
  onFormValidation: (isValid: boolean) => void;
};

export function AvaliacaoManipuladoresComprometimentoNormativo({
  onFormValidation,
}: AvaliacaoManipuladoresComprometimentoNormativoProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [respostas, setRespostas] = useState<{ [key: string]: string | null }>({
    naoDeixaEmpregoPoisObrigacaoMoral: null,
    culpadoDeixasseEmprego: null,
    naoSeriaCertoDeixarEmprego: null,
    devoEsseEmprego: null,
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const id = (await currentUserId()) || null;
      setUserId(id);

      if (id) {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId === id) {
          const storedData = localStorage.getItem("comprometimentoNormativoManipulador");
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            setRespostas({
              naoDeixaEmpregoPoisObrigacaoMoral:
                parsedData.comprometimento_normativo.nao_deixa_emprego_pois_obrigacao_moral?.toString() || null,
              culpadoDeixasseEmprego: parsedData.comprometimento_normativo.culpado_deixasse_emprego?.toString() || null,
              naoSeriaCertoDeixarEmprego:
                parsedData.comprometimento_normativo.nao_seria_certo_deixar_emprego?.toString() || null,
              devoEsseEmprego: parsedData.comprometimento_normativo.devo_esse_emprego?.toString() || null,
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
        comprometimento_normativo: {
          nao_deixa_emprego_pois_obrigacao_moral: respostas.naoDeixaEmpregoPoisObrigacaoMoral
            ? parseInt(respostas.naoDeixaEmpregoPoisObrigacaoMoral)
            : null,
          culpado_deixasse_emprego: respostas.culpadoDeixasseEmprego
            ? parseInt(respostas.culpadoDeixasseEmprego)
            : null,
          nao_seria_certo_deixar_emprego: respostas.naoSeriaCertoDeixarEmprego
            ? parseInt(respostas.naoSeriaCertoDeixarEmprego)
            : null,
          devo_esse_emprego: respostas.devoEsseEmprego ? parseInt(respostas.devoEsseEmprego) : null,
        },
      };

      localStorage.setItem("comprometimentoNormativoManipulador", JSON.stringify(data));
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
