"use client";

import { useState, useEffect } from "react";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { currentUserId } from "@/scripts/currentUserId";

interface AvaliacaoGestoresSistemaGestaoProps {
  onFormValidation: (isValid: boolean) => void;
}

export function AvaliacaoGestoresSistemaGestao({ onFormValidation }: AvaliacaoGestoresSistemaGestaoProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [respostas, setRespostas] = useState<{ [key: string]: string }>({
    liderancaModificadaConsumidorAltaPercepcaoRisco: "",
    comunicacaoModificadaConsumidorAltaPercepcaoRisco: "",
    gerenciarSegurancaModificadaConsumidorAltaPercepcaoRisco: "",
    ambienteTrabalhoModificadaConsumidorAltaPercepcaoRisco: "",
    manipuladorAlimentosModificadaConsumidorAltaPercepcaoRisco: "",
    comprometimentoModificadaConsumidorAltaPercepcaoRisco: "",
    boasPraticasConsumidorAltaPercepcaoRisco: "",
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const id = (await currentUserId()) || null;
      setUserId(id);

      if (id) {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId === id) {
          setRespostas({
            liderancaModificadaConsumidorAltaPercepcaoRisco:
              localStorage.getItem("lideranca_modificada_consumidor_alta_percepcao_risco") || "",
            comunicacaoModificadaConsumidorAltaPercepcaoRisco:
              localStorage.getItem("comunicacao_modificada_consumidor_alta_percepcao_risco") || "",
            gerenciarSegurancaModificadaConsumidorAltaPercepcaoRisco:
              localStorage.getItem("gerenciar_seguranca_modificada_consumidor_alta_percepcao_risco") || "",
            ambienteTrabalhoModificadaConsumidorAltaPercepcaoRisco:
              localStorage.getItem("ambiente_trabalho_modificada_consumidor_alta_percepcao_risco") || "",
            manipuladorAlimentosModificadaConsumidorAltaPercepcaoRisco:
              localStorage.getItem("manipulador_alimentos_modificada_consumidor_alta_percepcao_risco") || "",
            comprometimentoModificadaConsumidorAltaPercepcaoRisco:
              localStorage.getItem("comprometimento_modificada_consumidor_alta_percepcao_risco") || "",
            boasPraticasConsumidorAltaPercepcaoRisco:
              localStorage.getItem("boas_praticas_consumidor_alta_percepcao_risco") || "",
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
      <h3 className="mb-8 text-lg">Sistema de Gestão</h3>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-1 md:grid-cols-2">
        {[
          {
            key: "liderancaModificadaConsumidorAltaPercepcaoRisco",
            question:
              "A forma de liderança deve ser modificada somente quando o consumidor tem alta percepção de risco de doenças transmitidas por alimentos.",
          },
          {
            key: "comunicacaoModificadaConsumidorAltaPercepcaoRisco",
            question:
              "A forma de comunicação deve ser modificada somente quando o consumidor tem alta percepção de risco de doenças transmitidas por alimentos.",
          },
          {
            key: "gerenciarSegurancaModificadaConsumidorAltaPercepcaoRisco",
            question:
              "A forma de gerenciar a segurança dos alimentos deve ser modificada somente quando o consumidor tem alta percepção de risco de doenças transmitidas por alimentos.",
          },
          {
            key: "ambienteTrabalhoModificadaConsumidorAltaPercepcaoRisco",
            question:
              "O ambiente de trabalho deve ser modificado somente quando o consumidor tem alta percepção de risco de doenças transmitidas por alimentos.",
          },
          {
            key: "manipuladorAlimentosModificadaConsumidorAltaPercepcaoRisco",
            question:
              "O manipulador de alimentos deve ser mais pressionado somente quando o consumidor tem alta percepção de risco de doenças transmitidas por alimentos.",
          },
          {
            key: "comprometimentoModificadaConsumidorAltaPercepcaoRisco",
            question:
              "O comprometimento dos manipuladores deve ser modificado somente quando o consumidor tem alta percepção de risco de doenças transmitidas por alimentos.",
          },
          {
            key: "boasPraticasConsumidorAltaPercepcaoRisco",
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
