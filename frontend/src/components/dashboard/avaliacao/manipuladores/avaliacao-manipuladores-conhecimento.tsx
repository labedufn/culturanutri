"use client";

import { useState, useEffect } from "react";
import { Label } from "../../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../../ui/radio-group";
import { currentUserId } from "@/scripts/currentUserId";

type AvaliacaoManipuladoresConhecimentoProps = {
  onFormValidation: (isValid: boolean) => void;
};

export function AvaliacaoManipuladoresConhecimento({ onFormValidation }: AvaliacaoManipuladoresConhecimentoProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [respostas, setRespostas] = useState<{ [key: string]: string | null }>({
    utilizacaoAdornosFavorecerContaminacao: null,
    aguaVeiculoTransmissaoDoencas: null,
    formaHigienizarMaosEvitaContaminacao: null,
    contatoAlimentosContamina: null,
    leiteVencimentoRisco: null,
    alimentoImproprioApresentaCheiroSabor: null,
    carneMalPassada: null,
    lavarVegetaisSuficiente: null,
    descongelamentoAlimentosBacia: null,
    manipuladorAlimentoDoenteContamina: null,
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const id = (await currentUserId()) || null;
      setUserId(id);

      if (id) {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId === id) {
          const storedData = localStorage.getItem("conhecimentoManipulador");
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            setRespostas({
              utilizacaoAdornosFavorecerContaminacao:
                parsedData.conhecimento.utilizacao_adornos_favorecer_contaminacao?.toString() || null,
              aguaVeiculoTransmissaoDoencas:
                parsedData.conhecimento.agua_veiculo_transmissao_doencas?.toString() || null,
              formaHigienizarMaosEvitaContaminacao:
                parsedData.conhecimento.forma_higienizar_maos_evita_contaminacao?.toString() || null,
              contatoAlimentosContamina: parsedData.conhecimento.contato_alimentos_contamina?.toString() || null,
              leiteVencimentoRisco: parsedData.conhecimento.leite_vencimento_risco?.toString() || null,
              alimentoImproprioApresentaCheiroSabor:
                parsedData.conhecimento.alimento_improprio_apresenta_cheiro_sabor?.toString() || null,
              carneMalPassada: parsedData.conhecimento.carne_mal_passada?.toString() || null,
              lavarVegetaisSuficiente: parsedData.conhecimento.lavar_vegetais_suficiente?.toString() || null,
              descongelamentoAlimentosBacia:
                parsedData.conhecimento.descongelamento_alimentos_bacia?.toString() || null,
              manipuladorAlimentoDoenteContamina:
                parsedData.conhecimento.manipulador_alimento_doente_contamina?.toString() || null,
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
        conhecimento: {
          utilizacao_adornos_favorecer_contaminacao: respostas.utilizacaoAdornosFavorecerContaminacao
            ? parseInt(respostas.utilizacaoAdornosFavorecerContaminacao)
            : null,
          agua_veiculo_transmissao_doencas: respostas.aguaVeiculoTransmissaoDoencas
            ? parseInt(respostas.aguaVeiculoTransmissaoDoencas)
            : null,
          forma_higienizar_maos_evita_contaminacao: respostas.formaHigienizarMaosEvitaContaminacao
            ? parseInt(respostas.formaHigienizarMaosEvitaContaminacao)
            : null,
          contato_alimentos_contamina: respostas.contatoAlimentosContamina
            ? parseInt(respostas.contatoAlimentosContamina)
            : null,
          leite_vencimento_risco: respostas.leiteVencimentoRisco ? parseInt(respostas.leiteVencimentoRisco) : null,
          alimento_improprio_apresenta_cheiro_sabor: respostas.alimentoImproprioApresentaCheiroSabor
            ? parseInt(respostas.alimentoImproprioApresentaCheiroSabor)
            : null,
          carne_mal_passada: respostas.carneMalPassada ? parseInt(respostas.carneMalPassada) : null,
          lavar_vegetais_suficiente: respostas.lavarVegetaisSuficiente
            ? parseInt(respostas.lavarVegetaisSuficiente)
            : null,
          descongelamento_alimentos_bacia: respostas.descongelamentoAlimentosBacia
            ? parseInt(respostas.descongelamentoAlimentosBacia)
            : null,
          manipulador_alimento_doente_contamina: respostas.manipuladorAlimentoDoenteContamina
            ? parseInt(respostas.manipuladorAlimentoDoenteContamina)
            : null,
        },
      };

      localStorage.setItem("conhecimentoManipulador", JSON.stringify(data));
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
      <h3 className="mb-8 text-lg">Conhecimento dos Manipuladores</h3>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-1 md:grid-cols-2">
        {[
          {
            key: "utilizacaoAdornosFavorecerContaminacao",
            question:
              "A utilização de adornos como: brincos, anéis, aliança, relógio e outros, pode favorecer a contaminação dos alimentos?",
          },
          {
            key: "aguaVeiculoTransmissaoDoencas",
            question:
              "A água pode ser veículo de transmissão de doenças, porém ao ser transformada em gelo o risco da transmissão de doenças é menor?",
          },
          {
            key: "formaHigienizarMaosEvitaContaminacao",
            question:
              "A forma de higienizar as mãos, para evitar a contaminação de alimentos, consiste em molhar as mãos em água corrente, utilizar detergente neutro e secar com papel?",
          },
          {
            key: "contatoAlimentosContamina",
            question:
              "O contato entre alimentos crus e cozidos, como utilizar alface na decoração de porções fritas, possibilita a contaminação desses alimentos?",
          },
          {
            key: "leiteVencimentoRisco",
            question: "Utilizar leite um dia após a data de seu vencimento traz riscos a saúde?",
          },
          {
            key: "alimentoImproprioApresentaCheiroSabor",
            question: "O alimento impróprio para consumo sempre apresenta cheiro ruim e sabor estragado?",
          },
          {
            key: "carneMalPassada",
            question:
              "O consumo de carne mal passada pode levar a doenças transmitidas por alimentos que podem causar vômitos e diarreia?",
          },
          {
            key: "lavarVegetaisSuficiente",
            question: "Lavar vegetais apenas com água é suficiente para garantir sua segurança para consumo?",
          },
          {
            key: "descongelamentoAlimentosBacia",
            question:
              "O descongelamento de alimentos pode ser feito em uma bacia com ou sem água sobre a pia, mesa ou bancada?",
          },
          {
            key: "manipuladorAlimentoDoenteContamina",
            question:
              "O manipulador de alimento com doenças como: diarreia, gripe e dor de garganta, representa risco para a contaminação de alimentos?",
          },
        ].map(({ key, question }) => (
          <div key={key}>
            <div className="mb-2 text-muted-foreground">
              <Label>{question}</Label>
            </div>
            <RadioGroup
              value={respostas[key] || ""}
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