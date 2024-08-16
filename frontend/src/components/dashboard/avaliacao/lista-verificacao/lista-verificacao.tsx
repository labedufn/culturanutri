import React, { useState, useCallback, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { cadastrarListaVerificacao } from "@/actions/cadastrar-lista-verificacao";
import { calcularListaVerificacao } from "@/actions/calcular-lista-verificacao";
import { Checkbox } from "@/components/ui/checkbox";
import {
  labelsAbastecimentoAgua,
  labelsEstrutura,
  labelsHigienizacaoInstalacoesEquipamentosMoveisUtensilios,
  labelsControleIntegradoDeVetoresEPragasUrbanas,
  labelsManipuladores,
  labelsMateriaPrimaIngredientesEmbalagens,
  labelsPreparoDoAlimento,
  labelsArmazenamentoTransporteExposicaoDoAlimentoPreparado,
  labelsResponsabilidadeDocumentacaoRegistro,
  labelsAreasExternas,
  labelsAreasInternas,
  labelsEdificacaoEInstalacoes,
  labelsInstalacoesFisicasPisos,
  labelsInstalacoesFisicasParedes,
  labelsInstalacoesFisicasTetos,
  labelsPortas,
  labelsJanelasEOuOutrasAberturasSistemaDeExaustao,
  labelsRalosEGrelhas,
  labelsCaixaDeGorduraEEsgoto,
  labelsIluminacao,
  labelsInstalacoesEletricas,
  labelsVentilacao,
  labelsInstalacoesSanitariasEVestarios,
  labelsLavatorioAreaDeManipulacao,
  labelsEquipamentos,
  labelsUtensilios,
  labelsMoveis,
  AbastecimentoAgua,
  Estrutura,
  HigienizacaoInstalacoesEquipamentosMoveisUtensilios,
  ControleIntegradoDeVetoresEPragasUrbanas,
  Manipuladores,
  MateriaPrimaIngredientesEmbalagens,
  PreparoDoAlimento,
  ArmazenamentoTransporteExposicaoDoAlimentoPreparado,
  ResponsabilidadeDocumentacaoRegistro,
  AreasExternas,
  EdificacaoEInstalacoes,
  InstalacoesFisicasPisos,
  AreasInternas,
  InstalacoesFisicasParedes,
  InstalacoesFisicasTetos,
  Portas,
  JanelasEOuOutrasAberturasSistemaDeExaustao,
  RalosEGrelhas,
  CaixaDeGorduraEEsgoto,
  Iluminacao,
  InstalacoesEletricas,
  Ventilacao,
  InstalacoesSanitariasEVestarios,
  LavatorioAreaDeManipulacao,
  Equipamentos,
  Utensilios,
  Moveis,
} from "@/types/lista-verificacao";
import { valoresIniciaisListaVerificacao } from "./json/valores-iniciais-lista-verificacao";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface JsonInformacoes {
  abastecimento_agua: AbastecimentoAgua;
  estrutura: Estrutura;
  higienizacao_instalacoes_equipamentos_moveis_utensilios: HigienizacaoInstalacoesEquipamentosMoveisUtensilios;
  controle_integrado_de_vetores_e_pragas_urbanas: ControleIntegradoDeVetoresEPragasUrbanas;
  manipuladores: Manipuladores;
  materia_prima_ingredientes_embalagens: MateriaPrimaIngredientesEmbalagens;
  preparo_do_alimento: PreparoDoAlimento;
  armazenamento_transporte_exposicao_do_alimento_preparado: ArmazenamentoTransporteExposicaoDoAlimentoPreparado;
  responsabilidade_documentacao_registro: ResponsabilidadeDocumentacaoRegistro;
  areas_externas: AreasExternas;
  areas_internas: AreasInternas;
  edificacao_e_instalacoes: EdificacaoEInstalacoes;
  instalacoes_fisicas_pisos: InstalacoesFisicasPisos;
  instalacoes_fisicas_paredes: InstalacoesFisicasParedes;
  instalacoes_fisicas_tetos: InstalacoesFisicasTetos;
  portas: Portas;
  janelas_e_outras_aberturas_sistema_de_exaustao: JanelasEOuOutrasAberturasSistemaDeExaustao;
  ralos_e_grelhas: RalosEGrelhas;
  caixa_de_gordura_e_esgoto: CaixaDeGorduraEEsgoto;
  iluminacao: Iluminacao;
  instalacoes_eletricas: InstalacoesEletricas;
  ventilacao: Ventilacao;
  instalacoes_sanitarias_e_vestarios: InstalacoesSanitariasEVestarios;
  lavatorio_area_de_manipulacao: LavatorioAreaDeManipulacao;
  equipamentos: Equipamentos;
  utensilios: Utensilios;
  moveis: Moveis;
}

interface ListaVerificacaoProps {
  id: string;
}

const sections = [
  { key: "abastecimento_agua", label: "Abastecimento de Água", labels: labelsAbastecimentoAgua },
  { key: "estrutura", label: "Estrutura", labels: labelsEstrutura },
  {
    key: "higienizacao_instalacoes_equipamentos_moveis_utensilios",
    label: "Higienização de Instalações, Equipamentos, Móveis e Utensílios",
    labels: labelsHigienizacaoInstalacoesEquipamentosMoveisUtensilios,
  },
  {
    key: "controle_integrado_de_vetores_e_pragas_urbanas",
    label: "Controle Integrado de Vetores e Pragas Urbanas",
    labels: labelsControleIntegradoDeVetoresEPragasUrbanas,
  },
  { key: "manipuladores", label: "Manipuladores", labels: labelsManipuladores },
  {
    key: "materia_prima_ingredientes_embalagens",
    label: "Matéria Prima, Ingredientes e Embalagens",
    labels: labelsMateriaPrimaIngredientesEmbalagens,
  },
  { key: "preparo_do_alimento", label: "Preparo do Alimento", labels: labelsPreparoDoAlimento },
  {
    key: "armazenamento_transporte_exposicao_do_alimento_preparado",
    label: "Armazenamento, Transporte e Exposição do Alimento Preparado",
    labels: labelsArmazenamentoTransporteExposicaoDoAlimentoPreparado,
  },
  {
    key: "responsabilidade_documentacao_registro",
    label: "Responsabilidade, Documentação e Registro",
    labels: labelsResponsabilidadeDocumentacaoRegistro,
  },
  { key: "areas_externas", label: "Áreas Externas", labels: labelsAreasExternas },
  { key: "areas_internas", label: "Áreas Internas", labels: labelsAreasInternas },
  {
    key: "edificacao_e_instalacoes",
    label: "Edificação e Instalações",
    labels: labelsEdificacaoEInstalacoes,
  },
  { key: "instalacoes_fisicas_pisos", label: "Instalações Físicas - Pisos", labels: labelsInstalacoesFisicasPisos },
  {
    key: "instalacoes_fisicas_paredes",
    label: "Instalações Físicas - Paredes",
    labels: labelsInstalacoesFisicasParedes,
  },
  { key: "instalacoes_fisicas_tetos", label: "Instalações Físicas - Tetos", labels: labelsInstalacoesFisicasTetos },
  { key: "portas", label: "Portas", labels: labelsPortas },
  {
    key: "janelas_e_outras_aberturas_sistema_de_exaustao",
    label: "Janelas e Outras Aberturas/Sistema de Exaustão",
    labels: labelsJanelasEOuOutrasAberturasSistemaDeExaustao,
  },
  { key: "ralos_e_grelhas", label: "Ralos e Grelhas", labels: labelsRalosEGrelhas },
  { key: "caixa_de_gordura_e_esgoto", label: "Caixa de Gordura e Esgoto", labels: labelsCaixaDeGorduraEEsgoto },
  { key: "iluminacao", label: "Iluminação", labels: labelsIluminacao },
  { key: "instalacoes_eletricas", label: "Instalações Elétricas", labels: labelsInstalacoesEletricas },
  { key: "ventilacao", label: "Ventilação", labels: labelsVentilacao },
  {
    key: "instalacoes_sanitarias_e_vestarios",
    label: "Instalações Sanitárias e Vestiários",
    labels: labelsInstalacoesSanitariasEVestarios,
  },
  {
    key: "lavatorio_area_de_manipulacao",
    label: "Lavatório na Área de Manipulação",
    labels: labelsLavatorioAreaDeManipulacao,
  },
  { key: "equipamentos", label: "Equipamentos", labels: labelsEquipamentos },
  { key: "utensilios", label: "Utensílios", labels: labelsUtensilios },
  { key: "moveis", label: "Móveis", labels: labelsMoveis },
];

export function ListaVerificacao({ id }: ListaVerificacaoProps) {
  const [formData, setFormData] = useState<JsonInformacoes>(valoresIniciaisListaVerificacao);
  const [loading, setLoading] = useState(false);
  const [initialSubmit, setInitialSubmit] = useState(false);
  const [resultado, setResultado] = useState(0);
  const [classificacao, setClassificacao] = useState("");
  const [totalAdequacoes, setTotalAdequacoes] = useState(0);
  const [totalAplicavel, setTotalAplicavel] = useState(0);
  const [porcentagem, setPorcentagem] = useState(0);

  useEffect(() => {
    calcularListaVerificacao({ id_avaliacao: id }).then((response) => {
      if (response.success && response.informacoesDecodificadas) {
        setFormData(response.informacoesDecodificadas);
        setResultado(response.informacoesDecodificadas.resultado);
        setClassificacao(response.informacoesDecodificadas.classificacao);
        setTotalAdequacoes(response.informacoesDecodificadas.total_adequacoes);
        setTotalAplicavel(response.informacoesDecodificadas.total_aplicavel);
        setPorcentagem(response.informacoesDecodificadas.porcentagem);
      }
    });
  }, [id]);

  const handleCheckboxChange = useCallback(
    (
      category: keyof JsonInformacoes,
      key:
        | keyof AbastecimentoAgua
        | keyof Estrutura
        | keyof HigienizacaoInstalacoesEquipamentosMoveisUtensilios
        | keyof ControleIntegradoDeVetoresEPragasUrbanas
        | keyof Manipuladores
        | keyof MateriaPrimaIngredientesEmbalagens
        | keyof PreparoDoAlimento
        | keyof ArmazenamentoTransporteExposicaoDoAlimentoPreparado
        | keyof ResponsabilidadeDocumentacaoRegistro
        | keyof AreasExternas
        | keyof AreasInternas
        | keyof EdificacaoEInstalacoes
        | keyof InstalacoesFisicasPisos
        | keyof InstalacoesFisicasParedes
        | keyof InstalacoesFisicasTetos
        | keyof Portas
        | keyof JanelasEOuOutrasAberturasSistemaDeExaustao
        | keyof RalosEGrelhas
        | keyof CaixaDeGorduraEEsgoto
        | keyof Iluminacao
        | keyof InstalacoesEletricas
        | keyof Ventilacao
        | keyof InstalacoesSanitariasEVestarios
        | keyof LavatorioAreaDeManipulacao
        | keyof Equipamentos
        | keyof Utensilios
        | keyof Moveis,
    ) => {
      const updatedFormData = {
        ...formData,
        [category]: {
          ...formData[category],
          [key]: formData[category][key] === 1 ? 0 : 1,
        },
      };

      setFormData(updatedFormData);
      setLoading(true);

      const handleResponse = (response: any) => {
        if (response.success) {
          toast({
            className: cn(
              "bg-green-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
            ),
            title: "Sucesso!",
            description: "Lista de verificação atualizada com sucesso.",
          });
        } else {
          throw new Error("Falha ao atualizar a lista de verificação.");
        }
      };

      const handleError = (error: unknown) => {
        console.error("Erro ao atualizar a lista de verificação:", error);
        toast({
          className: cn(
            "bg-red-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
          ),
          title: "Erro!",
          description: `Erro ao atualizar a lista de verificação.`,
        });
      };

      const handleFinally = () => {
        calcularListaVerificacao({ id_avaliacao: id }).then((response) => {
          if (response.success && response.informacoesDecodificadas) {
            setFormData(response.informacoesDecodificadas);
          }
        });
        setLoading(false);
        setInitialSubmit(true);
      };

      if (!initialSubmit) {
        cadastrarListaVerificacao({
          json_informacoes: updatedFormData,
          id_avaliacao: id,
        })
          .then(handleResponse)
          .catch(handleError)
          .finally(handleFinally);
      } else {
        cadastrarListaVerificacao({
          json_informacoes: updatedFormData,
          id_avaliacao: id,
        })
          .then(handleResponse)
          .catch(handleError)
          .finally(() => {
            calcularListaVerificacao({ id_avaliacao: id }).then((response) => {
              if (response.success && response.informacoesDecodificadas) {
                setFormData(response.informacoesDecodificadas);
                setResultado(response.informacoesDecodificadas.resultado);
                setClassificacao(response.informacoesDecodificadas.classificacao);
                setTotalAdequacoes(response.informacoesDecodificadas.total_adequacoes);
                setTotalAplicavel(response.informacoesDecodificadas.total_aplicavel);
                setPorcentagem(response.informacoesDecodificadas.porcentagem);
              }
            });
            setLoading(false);
          });
      }
    },
    [formData, id, initialSubmit],
  );

  const renderSection = useCallback(
    (category: keyof JsonInformacoes, sectionLabel: string, labels: Record<string, string>) => (
      <>
        <h3
          className={cn("text-center font-medium bg-zinc-200 p-2", {
            "rounded-t-md": sectionLabel === "Abastecimento de Água" || sectionLabel === "Áreas Externas",
          })}
        >
          {sectionLabel}
        </h3>
        <div
          className={cn("border border-y-md p-4", {
            "rounded-b-md":
              (category === "responsabilidade_documentacao_registro" &&
                Object.keys(labels)[Object.keys(labels).length - 1] ===
                  "empresa_segue_o_manual_de_boas_praticas_e_os_procedimentos_operacionais_padronizados") ||
              (category === "moveis" &&
                Object.keys(labels)[Object.keys(labels).length - 1] ===
                  "moveis_utilizados_na_preparacao_embalagem_armazenamento_transporte_distribuicao_e_exposicao_a_venda_dos_alimentos_possuem_as_superficies_lisas_impermeaveis_lavaveis_e_isentas_de_rugosidades_frestas_e_outras_imperfeicoes"),
          })}
        >
          <ul>
            {Object.keys(labels).map((key, index) => {
              return (
                <React.Fragment key={key}>
                  <li className="flex justify-between text-sm items-center">
                    {labels[key]}
                    <Checkbox
                      checked={(formData[category] as any)[key] === 1}
                      onCheckedChange={() => handleCheckboxChange(category, key as any)}
                    />
                  </li>
                  {index !== Object.keys(labels).length - 1 && <Separator className="my-4" />}
                </React.Fragment>
              );
            })}
          </ul>
        </div>
      </>
    ),
    [formData, handleCheckboxChange],
  );

  return (
    <>
      <h2 className="text-2xl font-semibold mb-8 text-black">Lista de verificação</h2>
      <h2 className="text-xl font-semibold mb-4">Risco</h2>
      {sections.map(({ key, label, labels }) => (
        <div key={key} className={cn({ "mt-16": key === "areas_externas" })}>
          {key === "areas_externas" && <h2 className="mt-16 text-xl font-semibold mb-4">Estrutura física</h2>}
          {renderSection(key as keyof JsonInformacoes, label, labels)}
        </div>
      ))}

      <h2 className="mt-16 text-xl font-semibold">Avaliação</h2>
      <h2 className="text-center font-medium mt-4 text-secondary-800 bg-secondary-300 rounded-t-md p-2">Risco</h2>
      <div className="border border-t-0 mb-8 rounded-b-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Descrição</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Resultado</TableCell>
              <TableCell className="text-right">
                {resultado.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Classificação</TableCell>
              <TableCell className="text-right">{classificacao}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <h2 className="text-center font-medium text-secondary-800 bg-secondary-300 rounded-t-md p-2">Estrutura física</h2>
      <div className="border border-t-0 mb-8 rounded-b-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Descrição</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Total de Adequações</TableCell>
              <TableCell className="text-right">{totalAdequacoes}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Total Aplicável</TableCell>
              <TableCell className="text-right">{totalAplicavel}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Porcentagem</TableCell>
              <TableCell className="text-right">{porcentagem + "%"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}
