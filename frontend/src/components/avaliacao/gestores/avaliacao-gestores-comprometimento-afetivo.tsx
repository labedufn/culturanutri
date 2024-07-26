"use client";

import { useState, useEffect } from "react";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { currentUserId } from "@/scripts/currentUserId";

type AvaliacaoGestoresComprometimentoAfetivoProps = {
  onFormValidation: (isValid: boolean) => void;
};

export function AvaliacaoGestoresComprometimentoAfetivo({
  onFormValidation,
}: AvaliacaoGestoresComprometimentoAfetivoProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [respostas, setRespostas] = useState<{ [key: string]: string | null }>({
    problemasRestauranteMeus: null,
    restauranteTemSignificado: null,
    restauranteMereceMinhaLealdade: null,
    trabalharPorNecessidadeDesejo: null,
    dedicarMinhaCarreiraAoRestaurante: null,
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const id = (await currentUserId()) || null;
      setUserId(id);

      if (id) {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId === id) {
          const storedData = localStorage.getItem("comprometimentoAfetivoGestor");
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            setRespostas({
              problemasRestauranteMeus:
                parsedData.comprometimento_afetivo.problemas_restaurante_meus?.toString() || null,
              restauranteTemSignificado:
                parsedData.comprometimento_afetivo.restaurante_tem_significado?.toString() || null,
              restauranteMereceMinhaLealdade:
                parsedData.comprometimento_afetivo.restaurante_merece_minha_lealdade?.toString() || null,
              trabalharPorNecessidadeDesejo:
                parsedData.comprometimento_afetivo.trabalhar_por_necessidade_e_desejo?.toString() || null,
              dedicarMinhaCarreiraAoRestaurante:
                parsedData.comprometimento_afetivo.dedicar_minha_carreira_ao_restaurante?.toString() || null,
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
        comprometimento_afetivo: {
          problemas_restaurante_meus: respostas.problemasRestauranteMeus
            ? parseInt(respostas.problemasRestauranteMeus)
            : null,
          restaurante_tem_significado: respostas.restauranteTemSignificado
            ? parseInt(respostas.restauranteTemSignificado)
            : null,
          restaurante_merece_minha_lealdade: respostas.restauranteMereceMinhaLealdade
            ? parseInt(respostas.restauranteMereceMinhaLealdade)
            : null,
          trabalhar_por_necessidade_e_desejo: respostas.trabalharPorNecessidadeDesejo
            ? parseInt(respostas.trabalharPorNecessidadeDesejo)
            : null,
          dedicar_minha_carreira_ao_restaurante: respostas.dedicarMinhaCarreiraAoRestaurante
            ? parseInt(respostas.dedicarMinhaCarreiraAoRestaurante)
            : null,
        },
      };

      localStorage.setItem("comprometimentoAfetivoGestor", JSON.stringify(data));
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
      <h3 className="mb-8 text-lg">Comprometimento Afetivo</h3>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-1 md:grid-cols-2">
        {[
          {
            key: "problemasRestauranteMeus",
            question: "Eu realmente sinto os problemas do restaurante como se fossem meus.",
          },
          {
            key: "restauranteTemSignificado",
            question: "Este restaurante tem um imenso significado pessoal para mim.",
          },
          {
            key: "restauranteMereceMinhaLealdade",
            question: "Este restaurante merece minha lealdade.",
          },
          {
            key: "trabalharPorNecessidadeDesejo",
            question: "Na situação atual, trabalhar nesse restaurante é tanto uma necessidade quanto um desejo.",
          },
          {
            key: "dedicarMinhaCarreiraAoRestaurante",
            question: "Eu seria muito feliz em dedicar o resto da minha carreira nesse restaurante.",
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
