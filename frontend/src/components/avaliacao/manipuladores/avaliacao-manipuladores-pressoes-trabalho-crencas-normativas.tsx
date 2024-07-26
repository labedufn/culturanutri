"use client";

import { useState, useEffect } from "react";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { currentUserId } from "@/scripts/currentUserId";

interface AvaliacaoManipuladoresPressoesTrabalhoCrencasNormativasProps {
  onFormValidation: (isValid: boolean) => void;
}

export function AvaliacaoManipuladoresPressoesTrabalhoCrencasNormativas({
  onFormValidation,
}: AvaliacaoManipuladoresPressoesTrabalhoCrencasNormativasProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [respostas, setRespostas] = useState<{ [key: string]: string | null }>({
    chefeSeguirBoasPraticas: null,
    colegasTrabalhoNormasHigiene: null,
    autoridadesVigilanciaSanitariaNormasHigiene: null,
    clientesNormasHigiene: null,
    tempoSuficienteNormasHigiene: null,
    numeroFuncionariosAdequadoManipularFormaSegura: null,
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const id = (await currentUserId()) || null;
      setUserId(id);

      if (id) {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId === id) {
          const storedData = localStorage.getItem("pressoesTrabalhoCrencasNormativasManipulador");
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            setRespostas({
              chefeSeguirBoasPraticas:
                parsedData.pressoes_trabalho_crenças_normativas.chefe_seguir_boas_praticas?.toString() || null,
              colegasTrabalhoNormasHigiene:
                parsedData.pressoes_trabalho_crenças_normativas.colegas_trabalho_normas_higiene?.toString() || null,
              autoridadesVigilanciaSanitariaNormasHigiene:
                parsedData.pressoes_trabalho_crenças_normativas.autoridades_vigilancia_sanitaria_normas_higiene?.toString() ||
                null,
              clientesNormasHigiene:
                parsedData.pressoes_trabalho_crenças_normativas.clientes_normas_higiene?.toString() || null,
              tempoSuficienteNormasHigiene:
                parsedData.pressoes_trabalho_crenças_normativas.tempo_suficiente_normas_higiene?.toString() || null,
              numeroFuncionariosAdequadoManipularFormaSegura:
                parsedData.pressoes_trabalho_crenças_normativas.numero_funcionarios_adequado_manipular_forma_segura?.toString() ||
                null,
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
        pressoes_trabalho_crenças_normativas: {
          chefe_seguir_boas_praticas: respostas.chefeSeguirBoasPraticas
            ? parseInt(respostas.chefeSeguirBoasPraticas)
            : null,
          colegas_trabalho_normas_higiene: respostas.colegasTrabalhoNormasHigiene
            ? parseInt(respostas.colegasTrabalhoNormasHigiene)
            : null,
          autoridades_vigilancia_sanitaria_normas_higiene: respostas.autoridadesVigilanciaSanitariaNormasHigiene
            ? parseInt(respostas.autoridadesVigilanciaSanitariaNormasHigiene)
            : null,
          clientes_normas_higiene: respostas.clientesNormasHigiene ? parseInt(respostas.clientesNormasHigiene) : null,
          tempo_suficiente_normas_higiene: respostas.tempoSuficienteNormasHigiene
            ? parseInt(respostas.tempoSuficienteNormasHigiene)
            : null,
          numero_funcionarios_adequado_manipular_forma_segura: respostas.numeroFuncionariosAdequadoManipularFormaSegura
            ? parseInt(respostas.numeroFuncionariosAdequadoManipularFormaSegura)
            : null,
        },
      };

      localStorage.setItem("pressoesTrabalhoCrencasNormativasManipulador", JSON.stringify(data));
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
      <h3 className="mb-8 text-lg">Pressões de Trabalho e Crenças Normativas</h3>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-1 md:grid-cols-2">
        {[
          {
            key: "chefeSeguirBoasPraticas",
            question: "Meu chefe acha que eu devo seguir as boas práticas de manipulação em todas as minhas tarefas.",
          },
          {
            key: "colegasTrabalhoNormasHigiene",
            question:
              "Meus colegas de trabalho acham que eu devo seguir as normas de higiene em todas as minhas tarefas.",
          },
          {
            key: "autoridadesVigilanciaSanitariaNormasHigiene",
            question:
              "As autoridades da vigilância sanitária acham que eu devo seguir as normas de higiene em todas as minhas tarefas.",
          },
          {
            key: "clientesNormasHigiene",
            question:
              "Os clientes desse estabelecimento acham que eu devo seguir as normas de higiene em todas as minhas tarefas.",
          },
          {
            key: "tempoSuficienteNormasHigiene",
            question:
              "Eu sempre tenho tempo suficiente para seguir as normas de higiene, mesmo durante as horas de fluxo intenso.",
          },
          {
            key: "numeroFuncionariosAdequadoManipularFormaSegura",
            question:
              "O número de funcionários programado é adequado para eu fazer o meu trabalho e manipular os alimentos de forma segura.",
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
