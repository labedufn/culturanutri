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
  const [respostas, setRespostas] = useState<{ [key: string]: string | null }>({
    cooperacaoEntreAreasFormaSegura: null,
    novosFuncionariosAntigosFuncionariosBoaPraticaManipulacaoAlimentos: null,
    muitoTrabalhoRapidamenteFuncionariosTrabalhamJuntos: null,
    funcionariosLembramSeguirBoasPraticasManipulacaoAlimentos: null,
    acreditoLegislacaoEscritaRespaldo: null,
    economizarProdutosHigienizacaoDiminuirCusto: null,
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const id = (await currentUserId()) || null;
      setUserId(id);

      if (id) {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId === id) {
          const storedData = localStorage.getItem("sistemaGestaoManipulador");
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            setRespostas({
              cooperacaoEntreAreasFormaSegura:
                parsedData.sistemas_gestao.cooperacao_entre_areas_forma_segura?.toString() || null,
              novosFuncionariosAntigosFuncionariosBoaPraticaManipulacaoAlimentos:
                parsedData.sistemas_gestao.novos_funcionarios_antigos_funcionarios_boa_pratica_manipulacao_alimentos?.toString() ||
                null,
              muitoTrabalhoRapidamenteFuncionariosTrabalhamJuntos:
                parsedData.sistemas_gestao.muito_trabalho_rapidamente_funcionarios_trabalham_juntos?.toString() || null,
              funcionariosLembramSeguirBoasPraticasManipulacaoAlimentos:
                parsedData.sistemas_gestao.funcionarios_lembram_seguir_boas_praticas_manipulacao_alimentos?.toString() ||
                null,
              acreditoLegislacaoEscritaRespaldo:
                parsedData.sistemas_gestao.acredito_legislacao_escrita_respaldo?.toString() || null,
              economizarProdutosHigienizacaoDiminuirCusto:
                parsedData.sistemas_gestao.economizar_produtos_higienizacao_diminuir_custo?.toString() || null,
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
          cooperacao_entre_areas_forma_segura: respostas.cooperacaoEntreAreasFormaSegura
            ? parseInt(respostas.cooperacaoEntreAreasFormaSegura)
            : null,
          novos_funcionarios_antigos_funcionarios_boa_pratica_manipulacao_alimentos:
            respostas.novosFuncionariosAntigosFuncionariosBoaPraticaManipulacaoAlimentos
              ? parseInt(respostas.novosFuncionariosAntigosFuncionariosBoaPraticaManipulacaoAlimentos)
              : null,
          muito_trabalho_rapidamente_funcionarios_trabalham_juntos:
            respostas.muitoTrabalhoRapidamenteFuncionariosTrabalhamJuntos
              ? parseInt(respostas.muitoTrabalhoRapidamenteFuncionariosTrabalhamJuntos)
              : null,
          funcionarios_lembram_seguir_boas_praticas_manipulacao_alimentos:
            respostas.funcionariosLembramSeguirBoasPraticasManipulacaoAlimentos
              ? parseInt(respostas.funcionariosLembramSeguirBoasPraticasManipulacaoAlimentos)
              : null,
          acredito_legislacao_escrita_respaldo: respostas.acreditoLegislacaoEscritaRespaldo
            ? parseInt(respostas.acreditoLegislacaoEscritaRespaldo)
            : null,
          economizar_produtos_higienizacao_diminuir_custo: respostas.economizarProdutosHigienizacaoDiminuirCusto
            ? parseInt(respostas.economizarProdutosHigienizacaoDiminuirCusto)
            : null,
        },
      };

      localStorage.setItem("sistemaGestaoManipulador", JSON.stringify(data));
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
            key: "cooperacaoEntreAreasFormaSegura",
            question:
              "Existe uma boa cooperação entre as áreas para garantir que os consumidores recebam alimentos preparados de forma segura.",
          },
          {
            key: "novosFuncionariosAntigosFuncionariosBoaPraticaManipulacaoAlimentos",
            question:
              "Os novos funcionários e empregados experientes trabalham em conjunto para garantir as boas práticas de manipulação de alimentos.",
          },
          {
            key: "muitoTrabalhoRapidamenteFuncionariosTrabalhamJuntos",
            question:
              "Quando há muito trabalho a ser feito rapidamente, os funcionários trabalham juntos como uma equipe para obter as tarefas concluídas com segurança.",
          },
          {
            key: "funcionariosLembramSeguirBoasPraticasManipulacaoAlimentos",
            question: "Os funcionários lembram um ao outro sobre seguir as boas práticas de manipulação de alimentos.",
          },
          {
            key: "acreditoLegislacaoEscritaRespaldo",
            question:
              "Eu acredito que a legislação escrita seja nada mais do que um respaldo para processos judiciais.",
          },
          {
            key: "economizarProdutosHigienizacaoDiminuirCusto",
            question: "Às vezes temos que economizar em produtos para higienização para diminuir o custo da produção.",
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
