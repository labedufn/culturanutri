"use client";

import { useLocalStorageFormSync } from "@/hooks/use-local-storage-hook-form";
import { RadioGroupField } from "../form/radio-group-field";

const escalaOptions = [
  { label: "Discordo totalmente", value: "1" },
  { label: "Discordo parcialmente", value: "2" },
  { label: "Nem discordo nem concordo", value: "3" },
  { label: "Concordo parcialmente", value: "4" },
  { label: "Concordo totalmente", value: "5" },
];

export function AvaliacaoManipuladoresSistemasGestaoForm() {
  useLocalStorageFormSync(
    [
      "cooperacaoEntreAreasFormaSegura",
      "novosFuncionariosAntigosFuncionariosBoaPraticaManipulacaoAlimentos",
      "muitoTrabalhoRapidamenteFuncionariosTrabalhamJuntos",
      "funcionariosLembramSeguirBoasPraticasManipulacaoAlimentos",
      "funcionariosLembramSeguirBoasPraticasManipulacaoAlimentos",
      "acreditoLegislacaoEscritaRespaldo",
      "economizarProdutosHigienizacaoDiminuirCusto",
    ],
    "Manipulador",
  );

  return (
    <>
      <RadioGroupField
        name="cooperacaoEntreAreasFormaSegura"
        label="Existe uma boa cooperação entre as áreas para garantir que os consumidores recebam alimentos preparados de forma segura."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="novosFuncionariosAntigosFuncionariosBoaPraticaManipulacaoAlimentos"
        label="Os novos funcionários e empregados experientes trabalham em conjunto para garantir as boas práticas de manipulação de alimentos."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="muitoTrabalhoRapidamenteFuncionariosTrabalhamJuntos"
        label="Quando há muito trabalho a ser feito rapidamente, os funcionários trabalham juntos como uma equipe para obter as tarefas concluídas com segurança."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="funcionariosLembramSeguirBoasPraticasManipulacaoAlimentos"
        label="Os funcionários lembram um ao outro sobre seguir as boas práticas de manipulação de alimentos."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="acreditoLegislacaoEscritaRespaldo"
        label="Eu acredito que a legislação escrita seja nada mais do que um respaldo para processos judiciais."
        options={escalaOptions}
        orientation="vertical"
      />
      <RadioGroupField
        name="economizarProdutosHigienizacaoDiminuirCusto"
        label="Às vezes temos que economizar em produtos para higienização para diminuir o custo da produção."
        options={escalaOptions}
        orientation="vertical"
      />
    </>
  );
}
