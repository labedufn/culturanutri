"use client";

import { useState, useEffect } from "react";
import { Label } from "../../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../../ui/radio-group";
import { currentUserId } from "@/scripts/currentUserId";

interface AvaliacaoManipuladoresComprometimentoSegurancaAlimentosProps {
  onFormValidation: (isValid: boolean) => void;
}

export function AvaliacaoManipuladoresComprometimentoSegurancaAlimentos({
  onFormValidation,
}: AvaliacaoManipuladoresComprometimentoSegurancaAlimentosProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [respostas, setRespostas] = useState<{ [key: string]: string | null }>({
    sigoNormasHigieneResponsabilidade: null,
    segurancaAltaPrioridade: null,
    sigoNormasHigieneImportante: null,
    empenhadoSeguirNormasHigiene: null,
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const id = (await currentUserId()) || null;
      setUserId(id);

      if (id) {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId === id) {
          const storedData = localStorage.getItem("comprometimentoSegurancaAlimentosManipulador");
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            setRespostas({
              sigoNormasHigieneResponsabilidade:
                parsedData.comprometimento_segurança_alimentos.sigo_normas_higiene_responsabilidade?.toString() || null,
              segurancaAltaPrioridade:
                parsedData.comprometimento_segurança_alimentos.segurança_alta_prioridade?.toString() || null,
              sigoNormasHigieneImportante:
                parsedData.comprometimento_segurança_alimentos.sigo_normas_higiene_importante?.toString() || null,
              empenhadoSeguirNormasHigiene:
                parsedData.comprometimento_segurança_alimentos.empenhado_seguir_normas_higiene?.toString() || null,
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
        comprometimento_segurança_alimentos: {
          sigo_normas_higiene_responsabilidade: respostas.sigoNormasHigieneResponsabilidade
            ? parseInt(respostas.sigoNormasHigieneResponsabilidade)
            : null,
          seguranca_alta_prioridade: respostas.segurancaAltaPrioridade
            ? parseInt(respostas.segurancaAltaPrioridade)
            : null,
          sigo_normas_higiene_importante: respostas.sigoNormasHigieneImportante
            ? parseInt(respostas.sigoNormasHigieneImportante)
            : null,
          empenhado_seguir_normas_higiene: respostas.empenhadoSeguirNormasHigiene
            ? parseInt(respostas.empenhadoSeguirNormasHigiene)
            : null,
        },
      };

      localStorage.setItem("comprometimentoSegurancaAlimentosManipulador", JSON.stringify(data));
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
      <h3 className="mb-8 text-lg">Comprometimento com a Segurança dos Alimentos</h3>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-1 md:grid-cols-2">
        {[
          {
            key: "sigoNormasHigieneResponsabilidade",
            question: "Eu sigo as normas de higiene porque é minha responsabilidade.",
          },
          {
            key: "segurancaAltaPrioridade",
            question: "A segurança dos alimentos é uma alta prioridade para mim.",
          },
          {
            key: "sigoNormasHigieneImportante",
            question: "Eu sigo as normas de higiene, porque eu acho que elas são importantes.",
          },
          {
            key: "empenhadoSeguirNormasHigiene",
            question: "Estou empenhado em seguir todas as normas de higiene.",
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
