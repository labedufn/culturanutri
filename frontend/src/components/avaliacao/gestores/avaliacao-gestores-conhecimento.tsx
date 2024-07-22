"use client";

import { useState, useEffect } from "react";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { currentUserId } from "@/scripts/currentUserId";

export function AvaliacaoGestoresConhecimento() {
  const [userId, setUserId] = useState<string | null>(null);
  const [respostas, setRespostas] = useState<{ [key: string]: string }>({
    adornos: "",
    agua: "",
    higienizacaoMaos: "",
    contatoAlimentos: "",
    leiteVencido: "",
    alimentoImproprio: "",
    carneMalPassada: "",
    lavagemVegetais: "",
    descongelamento: "",
    manipuladorDoente: "",
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const id = (await currentUserId()) || null;
      setUserId(id);

      if (id) {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId === id) {
          setRespostas({
            adornos: localStorage.getItem("adornos") || "",
            agua: localStorage.getItem("agua") || "",
            higienizacaoMaos: localStorage.getItem("higienizacaoMaos") || "",
            contatoAlimentos: localStorage.getItem("contatoAlimentos") || "",
            leiteVencido: localStorage.getItem("leiteVencido") || "",
            alimentoImproprio: localStorage.getItem("alimentoImproprio") || "",
            carneMalPassada: localStorage.getItem("carneMalPassada") || "",
            lavagemVegetais: localStorage.getItem("lavagemVegetais") || "",
            descongelamento: localStorage.getItem("descongelamento") || "",
            manipuladorDoente: localStorage.getItem("manipuladorDoente") || "",
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
      <h3 className="mb-8 text-lg">Conhecimento</h3>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-1 md:grid-cols-2">
        {[
          {
            key: "adornos",
            question:
              "A utilização de adornos como: brincos, anéis, aliança, relógio e outros, pode favorecer a contaminação dos alimentos?",
          },
          {
            key: "agua",
            question:
              "A água pode ser veículo de transmissão de doenças, porém ao ser transformada em gelo o risco da transmissão de doenças é menor?",
          },
          {
            key: "higienizacaoMaos",
            question:
              "A forma de higienizar as mãos, para evitar a contaminação de alimentos, consiste em molhar as mãos em água corrente, utilizar detergente neutro e secar com papel?",
          },
          {
            key: "contatoAlimentos",
            question:
              "O contato entre alimentos crus e cozidos, como utilizar alface na decoração de porções fritas, possibilita a contaminação desses alimentos?",
          },
          {
            key: "leiteVencido",
            question: "Utilizar leite um dia após a data de seu vencimento traz riscos a saúde?",
          },
          {
            key: "alimentoImproprio",
            question: "O alimento impróprio para consumo sempre apresenta cheiro ruim e sabor estragado?",
          },
          {
            key: "carneMalPassada",
            question:
              "O consumo de carne mal passada pode levar a doenças transmitidas por alimentos que podem causar vômitos e diarreia?",
          },
          {
            key: "lavagemVegetais",
            question:
              "Lavar os vegetais e deixá-los de molho na água com vinagre é suficiente para esse alimento ser seguro para o consumo?",
          },
          {
            key: "descongelamento",
            question:
              "O descongelamento de alimentos pode ser feito em uma bacia com ou sem água sobre a pia, mesa ou bancada?",
          },
          {
            key: "manipuladorDoente",
            question:
              "O manipulador de alimento com doenças como: diarreia, gripe e dor de garganta, representa risco para a contaminação de alimentos?",
          },
        ].map(({ key, question }) => (
          <div key={key}>
            <div className="mb-2 text-muted-foreground">
              <Label>{question}</Label>
            </div>
            <RadioGroup
              value={respostas[key]}
              onValueChange={(value) => handleRespostaChange(key, value)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id={`${key}-sim`} />
                <Label htmlFor={`${key}-sim`}>Sim</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id={`${key}-nao`} />
                <Label htmlFor={`${key}-nao`}>Não</Label>
              </div>
            </RadioGroup>
          </div>
        ))}
      </div>
    </>
  );
}
