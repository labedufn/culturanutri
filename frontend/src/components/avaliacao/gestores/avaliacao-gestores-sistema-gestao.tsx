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
  const [respostas, setRespostas] = useState<{ [key: string]: string | null }>({
    liderancaModificadaConsumidorAltaPercepcaoRisco: null,
    comunicacaoModificadaConsumidorAltaPercepcaoRisco: null,
    gerenciarSegurancaModificadaConsumidorAltaPercepcaoRisco: null,
    ambienteTrabalhoModificadaConsumidorAltaPercepcaoRisco: null,
    manipuladorAlimentosModificadaConsumidorAltaPercepcaoRisco: null,
    comprometimentoModificadaConsumidorAltaPercepcaoRisco: null,
    boasPraticasConsumidorAltaPercepcaoRisco: null,
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const id = (await currentUserId()) || null;
      setUserId(id);

      if (id) {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId === id) {
          const storedData = localStorage.getItem("sistemasGestaoGestor");
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            setRespostas({
              liderancaModificadaConsumidorAltaPercepcaoRisco:
                parsedData.sistemas_gestao.lideranca_modificada_consumidor_alta_percepcao_risco?.toString() || null,
              comunicacaoModificadaConsumidorAltaPercepcaoRisco:
                parsedData.sistemas_gestao.comunicacao_modificada_consumidor_alta_percepcao_risco?.toString() || null,
              gerenciarSegurancaModificadaConsumidorAltaPercepcaoRisco:
                parsedData.sistemas_gestao.gerenciar_seguranca_modificada_consumidor_alta_percepcao_risco?.toString() ||
                null,
              ambienteTrabalhoModificadaConsumidorAltaPercepcaoRisco:
                parsedData.sistemas_gestao.ambiente_trabalho_modificada_consumidor_alta_percepcao_risco?.toString() ||
                null,
              manipuladorAlimentosModificadaConsumidorAltaPercepcaoRisco:
                parsedData.sistemas_gestao.manipulador_alimentos_modificada_consumidor_alta_percepcao_risco?.toString() ||
                null,
              comprometimentoModificadaConsumidorAltaPercepcaoRisco:
                parsedData.sistemas_gestao.comprometimento_modificada_consumidor_alta_percepcao_risco?.toString() ||
                null,
              boasPraticasConsumidorAltaPercepcaoRisco:
                parsedData.sistemas_gestao.boas_praticas_consumidor_alta_percepcao_risco?.toString() || null,
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
        sistemas_gestao: {
          lideranca_modificada_consumidor_alta_percepcao_risco:
            respostas.liderancaModificadaConsumidorAltaPercepcaoRisco
              ? parseInt(respostas.liderancaModificadaConsumidorAltaPercepcaoRisco)
              : null,
          comunicacao_modificada_consumidor_alta_percepcao_risco:
            respostas.comunicacaoModificadaConsumidorAltaPercepcaoRisco
              ? parseInt(respostas.comunicacaoModificadaConsumidorAltaPercepcaoRisco)
              : null,
          gerenciar_seguranca_modificada_consumidor_alta_percepcao_risco:
            respostas.gerenciarSegurancaModificadaConsumidorAltaPercepcaoRisco
              ? parseInt(respostas.gerenciarSegurancaModificadaConsumidorAltaPercepcaoRisco)
              : null,
          ambiente_trabalho_modificada_consumidor_alta_percepcao_risco:
            respostas.ambienteTrabalhoModificadaConsumidorAltaPercepcaoRisco
              ? parseInt(respostas.ambienteTrabalhoModificadaConsumidorAltaPercepcaoRisco)
              : null,
          manipulador_alimentos_modificada_consumidor_alta_percepcao_risco:
            respostas.manipuladorAlimentosModificadaConsumidorAltaPercepcaoRisco
              ? parseInt(respostas.manipuladorAlimentosModificadaConsumidorAltaPercepcaoRisco)
              : null,
          comprometimento_modificada_consumidor_alta_percepcao_risco:
            respostas.comprometimentoModificadaConsumidorAltaPercepcaoRisco
              ? parseInt(respostas.comprometimentoModificadaConsumidorAltaPercepcaoRisco)
              : null,
          boas_praticas_consumidor_alta_percepcao_risco: respostas.boasPraticasConsumidorAltaPercepcaoRisco
            ? parseInt(respostas.boasPraticasConsumidorAltaPercepcaoRisco)
            : null,
        },
      };

      localStorage.setItem("sistemasGestaoGestor", JSON.stringify(data));
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
