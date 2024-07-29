"use client";

import { useState, useEffect } from "react";
import { Label } from "../../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../../ui/radio-group";
import { currentUserId } from "@/scripts/currentUserId";

interface AvaliacaoManipuladoresAmbienteTrabalhoProps {
  onFormValidation: (isValid: boolean) => void;
}

export function AvaliacaoManipuladoresAmbienteTrabalho({
  onFormValidation,
}: AvaliacaoManipuladoresAmbienteTrabalhoProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [respostas, setRespostas] = useState<{ [key: string]: string | null }>({
    equipamentosNecessariosFormaSegura: null,
    estruturaAdequadaNormasHigiene: null,
    produtosHigienizacaoAdequadosManipulacaoAlimentos: null,
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const id = (await currentUserId()) || null;
      setUserId(id);

      if (id) {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId === id) {
          const storedData = localStorage.getItem("ambienteTrabalhoManipulador");
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            setRespostas({
              equipamentosNecessariosFormaSegura:
                parsedData.ambiente_trabalho.equipamentos_necessarios_forma_segura?.toString() || null,
              estruturaAdequadaNormasHigiene:
                parsedData.ambiente_trabalho.estrutura_adequada_normas_higiene?.toString() || null,
              produtosHigienizacaoAdequadosManipulacaoAlimentos:
                parsedData.ambiente_trabalho.produtos_higienizacao_adequados_manipulacao_alimentos?.toString() || null,
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
        ambiente_trabalho: {
          equipamentos_necessarios_forma_segura: respostas.equipamentosNecessariosFormaSegura
            ? parseInt(respostas.equipamentosNecessariosFormaSegura)
            : null,
          estrutura_adequada_normas_higiene: respostas.estruturaAdequadaNormasHigiene
            ? parseInt(respostas.estruturaAdequadaNormasHigiene)
            : null,
          produtos_higienizacao_adequados_manipulacao_alimentos:
            respostas.produtosHigienizacaoAdequadosManipulacaoAlimentos
              ? parseInt(respostas.produtosHigienizacaoAdequadosManipulacaoAlimentos)
              : null,
        },
      };

      localStorage.setItem("ambienteTrabalhoManipulador", JSON.stringify(data));
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
      <h3 className="mb-8 text-lg">Ambiente de Trabalho</h3>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-1 md:grid-cols-2">
        {[
          {
            key: "equipamentosNecessariosFormaSegura",
            question: "Tenho equipamentos e utensílios necessários para preparar os alimentos de forma segura.",
          },
          {
            key: "estruturaAdequadaNormasHigiene",
            question: "A estrutura da cozinha é adequada para seguir as normas de higiene.",
          },
          {
            key: "produtosHigienizacaoAdequadosManipulacaoAlimentos",
            question:
              "Tenho os produtos para higienização adequados para realizar as boas práticas de manipulação de alimentos.",
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
