"use client";

import { useState, useEffect } from "react";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { currentUserId } from "@/scripts/currentUserId";

interface AvaliacaoManipuladoresComunicacaoProps {
  onFormValidation: (isValid: boolean) => void;
}

export function AvaliacaoManipuladoresComunicacao({ onFormValidation }: AvaliacaoManipuladoresComunicacaoProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [respostas, setRespostas] = useState<{ [key: string]: string | null }>({
    tenhoLiberdadeComLider: null,
    informacoesNecessariasDisponiveis: null,
    informacoesAdequadasNormasHigiene: null,
    fornecerSugestoesMelhoria: null,
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const id = (await currentUserId()) || null;
      setUserId(id);

      if (id) {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId === id) {
          const storedData = localStorage.getItem("comunicacaoManipulador");
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            setRespostas({
              tenhoLiberdadeComLider: parsedData.comunicacao.tenho_liberdade_com_lider?.toString() || null,
              informacoesNecessariasDisponiveis:
                parsedData.comunicacao.informacoes_necessarias_disponiveis?.toString() || null,
              informacoesAdequadasNormasHigiene:
                parsedData.comunicacao.informacoes_adequadas_normas_higiene?.toString() || null,
              fornecerSugestoesMelhoria: parsedData.comunicacao.fornecer_sugestoes_melhoria?.toString() || null,
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
        comunicacao: {
          tenho_liberdade_com_lider: respostas.tenhoLiberdadeComLider
            ? parseInt(respostas.tenhoLiberdadeComLider)
            : null,
          informacoes_necessarias_disponiveis: respostas.informacoesNecessariasDisponiveis
            ? parseInt(respostas.informacoesNecessariasDisponiveis)
            : null,
          informacoes_adequadas_normas_higiene: respostas.informacoesAdequadasNormasHigiene
            ? parseInt(respostas.informacoesAdequadasNormasHigiene)
            : null,
          fornecer_sugestoes_melhoria: respostas.fornecerSugestoesMelhoria
            ? parseInt(respostas.fornecerSugestoesMelhoria)
            : null,
        },
      };

      localStorage.setItem("comunicacaoManipulador", JSON.stringify(data));
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
      <h3 className="mb-8 text-lg">Comunicação</h3>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-1 md:grid-cols-2">
        {[
          {
            key: "tenhoLiberdadeComLider",
            question:
              "Eu tenho liberdade de falar com meu líder se eu ver algo que pode afetar a segurança dos alimentos.",
          },
          {
            key: "informacoesNecessariasDisponiveis",
            question:
              "Todas as informações necessárias para a manipulação de alimentos de forma segura são prontamente disponíveis para mim.",
          },
          {
            key: "informacoesAdequadasNormasHigiene",
            question: "O líder fornece informações adequadas e atualizadas sobre as normas de higiene.",
          },
          {
            key: "fornecerSugestoesMelhoria",
            question:
              "Sinto-me encorajado a fornecer sugestões para a melhoria das práticas de segurança dos alimentos.",
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
