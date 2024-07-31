"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { AvaliacaoGestoresDadosIndividuaisForm } from "./avaliacao-gestores-dados-individuais-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { AvaliacaoGestoresConhecimentoForm } from "./avaliacao-gestores-conhecimento-form";
import { AvaliacaoGestoresComprometimentoNormativoForm } from "./avaliacao-gestores-comprometimento-normativo-form";
import { AvaliacaoGestoresComprometimentoInstrumentalForm } from "./avaliacao-gestores-comprometimento-instrumental-form";
import { AvaliacaoGestoresPercepcaoRiscoForm } from "./avaliacao-gestores-percepcao-risco-form";
import { AvaliacaoGestoresSistemasGestaoForm } from "./avaliacao-gestores-sistemas-gestao-form";
import { useFormContext } from "./avaliacao-gestores-provider";
import { AvaliacaoGestoresComprometimentoAfetivoForm } from "./avaliacao-gestores-comprometimento-afetivo-form";
import { cadastrarGestor } from "@/actions/cadastrar-gestor";
import GestoresTable from "./gestores-table";

export function AvaliacaoGestoresContent({ onReload }: { onReload: () => void }) {
  const form = useFormContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      const formattedData = {
        json_informacoes: {
          dados_individuais: {
            nome_completo: data.nomeCompleto,
            genero: Number(data.genero),
            idade: Number(data.idade),
            escolaridade: Number(data.escolaridade),
            formacao: data.formacao,
            nao_tenha_formacao_tem_treinamento: Number(data.naoTenhaFormacaoTemTreinamento),
            tempo_trabalha_com_alimentos: Number(data.tempoTrabalhaComAlimentos),
            acredita_comunicacao_boa: Number(data.acreditaComunicacaoBoa),
            realiza_treinamentos_boas_prticas_manipulação: Number(data.realizaTreinamentosBoasPraticas),
            carga_horaria: data.cargaHoraria,
            frequencia_aplicação: 0,
            temas_treinamentos: data.temasTreinamentos,
          },
          conhecimento: {
            utilização_adornos_favorecer_contaminacao: Number(data.adornosContaminacao),
            agua_veiculo_transmissao_doencas: Number(data.aguaTransmissaoDoencas),
            forma_higienizar_mãos_evita_contaminacao: Number(data.higienizacaoMaos),
            contato_alimentos_contamina: Number(data.contatoAlimentosCruCozido),
            leite_vencimento_risco: Number(data.leiteVencido),
            alimento_improprio_apresenta_cheiro_sabor: Number(data.alimentoImproprio),
            carne_mal_passada: Number(data.carneMalPassada),
            descongelamento_alimentos_bacia: Number(data.descongelamentoAlimentos),
            manipulador_alimento_doente_contamina: Number(data.manipuladorDoente),
          },
          comprometimento_afetivo: {
            problemas_restaurante_meus: Number(data.problemasRestaurante),
            restaurante_tem_significado: Number(data.significadoPessoal),
            restaurante_merece_minha_lealdade: Number(data.mereceLealdade),
            trabalhar_por_necessidade_e_desejo: Number(data.necessidadeDesejo),
            dedicar_minha_carreira_ao_restaurante: Number(data.dedicarCarreira),
          },
          comprometimento_normativo: {
            nao_deixa_emprego_pois_obrigação_moral: Number(data.obrigacaoMoral),
            culpado_deixasse_emprego: Number(data.sentirCulpado),
            nao_seria_certo_deixar_emprego: Number(data.naoSeriaCerto),
            devo_esse_emprego: Number(data.devoMuito),
          },
          comprometimento_instrumental: {
            deixar_emprego_vida_desestruturada: Number(data.vidaDesestruturada),
            poucas_alternativas_caso_deixar_emprego: Number(data.poucasAlternativas),
            muito_dificil_deixar_emprego: Number(data.dificilDeixarEmprego),
          },
          percepcao_risco: {
            risco_apresentar_dor_barriga_estabelecimento_similar: Number(data.riscoIntoxicacaoSimilar),
            risco_apresentar_dor_barriga_estabelecimento_gerenciado: Number(data.riscoIntoxicacaoGerencia),
            risco_doença_transmitida_alimentos: Number(data.riscoDoencaGrave),
          },
          sistemas_gestao: {
            lideranca_modificada_consumidor_alta_percepcao_risco: Number(data.modificarLideranca),
            comunicacao_modificada_consumidor_alta_percepcao_risco: Number(data.modificarComunicacao),
            gerenciar_seguranca_modificada_consumidor_alta_percepcao_risco: Number(data.modificarSegurancaAlimentos),
            ambiente_trabalho_modificada_consumidor_alta_percepcao_risco: Number(data.modificarAmbienteTrabalho),
            manipulador_alimentos_modificada_consumidor_alta_percepcao_risco: Number(data.pressionarManipulador),
            comprometimento_modificada_consumidor_alta_percepcao_risco: Number(data.modificarComprometimento),
            boas_praticas_consumidor_alta_percepcao_risco: Number(data.melhorarBoasPraticas),
          },
        },
        id_estabelecimento: localStorage.getItem("estabelecimentoId"),
      };

      const response = await cadastrarGestor(formattedData);

      if (response.success) {
        toast({
          className: cn(
            "bg-green-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
          ),
          title: "Sucesso!",
          description: "Gestor cadastrado com sucesso.",
        });

        const sidebarOpen = localStorage.getItem("sidebarOpen");
        const estabelecimentoId = localStorage.getItem("estabelecimentoId");
        localStorage.clear();
        if (sidebarOpen !== null) {
          localStorage.setItem("sidebarOpen", sidebarOpen);
        }
        if (estabelecimentoId !== null) {
          localStorage.setItem("estabelecimentoId", estabelecimentoId);
        }

        onReload();
      } else {
        toast({
          className: cn(
            "bg-red-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
          ),
          title: "Erro!",
          description: `Erro ao cadastrar o gestor.`,
        });
      }
    } catch (error) {
      toast({
        className: cn(
          "bg-red-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        ),
        title: "Erro!",
        description: `Erro ao cadastrar o gestor.`,
      });
    }
  };

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row gap-4 lg:justify-between items-end mb-4">
        <h3 className="text-black">Tabela de avaliação de gestores</h3>
        <Button className="w-full lg:w-auto" onClick={openDialog}>
          Avaliar novo gestor
        </Button>
      </div>
      <GestoresTable />
      <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-[800px] lg:max-w-screen-lg overflow-y-scroll max-h-screen lg:max-h-[800px]">
          <DialogHeader>
            <DialogTitle>Avaliação do Gestor</DialogTitle>
          </DialogHeader>
          <div>
            <h3 className="font-semibold text-black mt-4 mb-2">Dados do individuais</h3>
            <div className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-1 md:grid-cols-2 mb-8">
              <AvaliacaoGestoresDadosIndividuaisForm />
            </div>
            <Separator className="my-8" />
            <h3 className="font-semibold text-black mt-4 mb-2">Conhecimento</h3>
            <div className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-1 md:grid-cols-2 mb-8">
              <AvaliacaoGestoresConhecimentoForm />
            </div>
            <Separator className="my-8" />
            <h3 className="font-semibold text-black mt-4 mb-2">Comprometimento afetivo</h3>
            <div className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-1 md:grid-cols-2 mb-8">
              <AvaliacaoGestoresComprometimentoAfetivoForm />
            </div>
            <Separator className="my-8" />
            <h3 className="font-semibold text-black mt-4 mb-2">Comprometimento normativo</h3>
            <div className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-1 md:grid-cols-2 mb-8">
              <AvaliacaoGestoresComprometimentoNormativoForm />
            </div>
            <Separator className="my-8" />
            <h3 className="font-semibold text-black mt-4 mb-2">Comprometimento instrumental</h3>
            <div className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-1 md:grid-cols-2 mb-8">
              <AvaliacaoGestoresComprometimentoInstrumentalForm />
            </div>
            <Separator className="my-8" />
            <h3 className="font-semibold text-black mt-4 mb-2">Percepção de risco</h3>
            <div className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-1 md:grid-cols-2 mb-8">
              <AvaliacaoGestoresPercepcaoRiscoForm />
            </div>
            <Separator className="my-8" />
            <h3 className="font-semibold text-black mt-4 mb-2">Sistemas de gestão</h3>
            <div className="grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-1 md:grid-cols-2 mb-8">
              <AvaliacaoGestoresSistemasGestaoForm />
            </div>
          </div>
          <DialogFooter className="flex-col-reverse gap-4 md:gap-0 md:flex-row">
            <Button className="bg-neutral-200 text-neutral-700 hover:bg-neutral-300" onClick={closeDialog}>
              Fechar
            </Button>
            <Button onClick={form.handleSubmit(onSubmit)}>Cadastrar gestor</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
