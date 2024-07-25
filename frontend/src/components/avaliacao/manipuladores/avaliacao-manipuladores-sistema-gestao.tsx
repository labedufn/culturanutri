"use client";

import { useState, useEffect } from "react";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { currentUserId } from "@/scripts/currentUserId";

interface AvaliacaoManipuladoresSistemaGestaoProps {
  onFormValidation: (isValid: boolean) => void;
}

export function AvaliacaoManipuladoresSistemaGestao({ onFormValidation }: AvaliacaoManipuladoresSistemaGestaoProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [respostas, setRespostas] = useState<{ [key: string]: string }>({
    cooperacaoEntreAreasFormaSegura: "",
    novosFuncionariosAntigosFuncionariosBoaPraticaManipulacaoAlimentos: "",
    muitoTrabalhoRapidamenteFuncionariosTrabalhamJuntos: "",
    funcionariosLembramSeguirBoasPraticasManipulacaoAlimentos: "",
    acreditoLegislacaoEscritaRespaldo: "",
    economizarProdutosHigienizacaoDiminuirCusto: "",
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const id = (await currentUserId()) || null;
      setUserId(id);

      if (id) {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId === id) {
          setRespostas({
            cooperacaoEntreAreasFormaSegura:
              localStorage.getItem("cooperacao_entre_areas_forma_segura_manipuladores") || "",
            novosFuncionariosAntigosFuncionariosBoaPraticaManipulacaoAlimentos:
              localStorage.getItem(
                "novos_funcionarios_antigos_funcionarios_boa_pratica_manipulacao_alimentos_manipuladores",
              ) || "",
            muitoTrabalhoRapidamenteFuncionariosTrabalhamJuntos:
              localStorage.getItem("muito_trabalho_rapidamente_funcionarios_trabalham_juntos_manipuladores") || "",
            funcionariosLembramSeguirBoasPraticasManipulacaoAlimentos:
              localStorage.getItem("funcionarios_lembram_seguir_boas_praticas_manipulacao_alimentos_manipuladores") ||
              "",
            acreditoLegislacaoEscritaRespaldo:
              localStorage.getItem("acredito_legislacao_escrita_respaldo_manipuladores") || "",
            economizarProdutosHigienizacaoDiminuirCusto:
              localStorage.getItem("economizar_produtos_higienizacao_diminuir_custo_manipuladores") || "",
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
          localStorage.setItem(
            `${key.replace(/([A-Z])/g, "_$1").toLowerCase()}_manipuladores`,
            parseInt(value, 10).toString(),
          );
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
            key: "cooperacaoEntreAreasFormaSegura",
            question: "A cooperação entre áreas é realizada de forma segura?",
          },
          {
            key: "novosFuncionariosAntigosFuncionariosBoaPraticaManipulacaoAlimentos",
            question:
              "Os novos funcionários e os antigos funcionários seguem boas práticas de manipulação de alimentos?",
          },
          {
            key: "muitoTrabalhoRapidamenteFuncionariosTrabalhamJuntos",
            question: "Os funcionários trabalham rapidamente juntos mesmo quando há muito trabalho?",
          },
          {
            key: "funcionariosLembramSeguirBoasPraticasManipulacaoAlimentos",
            question: "Os funcionários se lembram de seguir boas práticas de manipulação de alimentos?",
          },
          {
            key: "acreditoLegislacaoEscritaRespaldo",
            question:
              "Acredito que a legislação escrita serve como respaldo adequado para práticas de manipulação de alimentos.",
          },
          {
            key: "economizarProdutosHigienizacaoDiminuirCusto",
            question:
              "Economizar produtos e práticas de higienização para diminuir custos não compromete a segurança alimentar?",
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
