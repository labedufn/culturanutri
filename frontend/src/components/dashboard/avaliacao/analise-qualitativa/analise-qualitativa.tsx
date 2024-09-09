"use client";

import { Separator } from "@/components/ui/separator";
import { AgrupadorAnaliseQualitativa } from "./agrupador-analise-qualitativa";

export function AnaliseQualitativa() {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Liderança</h2>
      <div className="mb-8">
        <AgrupadorAnaliseQualitativa
          score={3}
          colunas={2}
          analises={[
            { ponto: "Os gerentes fornecem assistência e orientação relacionada à segurança dos alimentos" },
            { ponto: "Os gerentes estão presentes na área de produção durante o manuseio de alimentos" },
          ]}
        />
      </div>
      <div className="mb-8">
        <AgrupadorAnaliseQualitativa
          score={1}
          colunas={2}
          analises={[
            { ponto: "Os gerentes elogiam os manipuladores de alimentos por práticas seguras" },
            { ponto: "Gerentes promovem reconhecimento" },
          ]}
        />
      </div>
      <div className="mb-8">
        <AgrupadorAnaliseQualitativa
          score={1}
          colunas={2}
          analises={[
            { ponto: "Os gerentes estão comprometidos com a organização e com a segurança dos alimentos" },
            {
              ponto:
                "O comportamento dos gerentes é consistente com práticas seguras (lavar as mãos, usar roupas adequadas, cobrir os cabelos)",
            },
          ]}
        />
      </div>
      <div>
        <AgrupadorAnaliseQualitativa
          colunas={1}
          analises={[
            {
              ponto:
                "Os gerentes trabalham em busca de políticas, sistemas e processos de sua empresa alinhados com a segurança dos alimentos",
            },
          ]}
        />
      </div>

      <Separator className="my-12" />

      <h2 className="text-xl font-semibold mb-4">Comunicação</h2>
      <div className="mb-8">
        <AgrupadorAnaliseQualitativa
          score={2}
          colunas={2}
          analises={[
            {
              ponto:
                "Instruções corretas são comunicadas de cima para baixo (gerentes para manipuladores de alimentos) e horizontalmente entre manipuladores de alimentos",
            },
            { ponto: "As instruções consideram o nível educacional dos manipuladores de alimentos" },
          ]}
        />
      </div>
      <div className="mb-8">
        <AgrupadorAnaliseQualitativa
          score={2}
          colunas={2}
          analises={[
            {
              ponto:
                "Os manipuladores de alimentos ficam à vontade para comunicar ações erradas e perguntar quando estão em dúvida",
            },
            {
              ponto:
                "Os manipuladores de alimentos ficam à vontade para opinar sobre como melhorar a segurança dos alimentos",
            },
            {
              ponto:
                "Os manipuladores de alimentos ficam à vontade para avisar sobre a falta de produtos de higiene ou quebra de equipamentos e falta de utensílios",
            },
          ]}
        />
      </div>
      <div className="mb-8">
        <AgrupadorAnaliseQualitativa
          colunas={1}
          analises={[
            {
              ponto:
                "As melhorias na segurança dos alimentos são comunicadas. Há informações visíveis que a segurança dos alimentos é importante.",
            },
          ]}
        />
      </div>
      <div>
        <AgrupadorAnaliseQualitativa
          score={2}
          colunas={2}
          analises={[
            {
              ponto:
                "Existem instruções visuais na área de produção (por exemplo, como lavar as mãos, como higienizar frutas e legumes, temperatura correta etc.)",
            },
            {
              ponto:
                "Os manipuladores de alimentos recebem comunicação informal sobre segurança dos alimentos durante o trabalho",
            },
          ]}
        />
      </div>

      <Separator className="my-12" />

      {/* Seção Conhecimento */}
      <h2 className="text-xl font-semibold mb-4">Conhecimento</h2>
      <div className="mb-8">
        <AgrupadorAnaliseQualitativa
          score={1.9}
          colunas={2}
          analises={[
            {
              ponto:
                "Tem conhecimento sobre aspectos de tempo e temperatura (recepção, armazenamento, cocção, distribuição)",
            },
            { ponto: "Tem conhecimento sobre Medida da temperatura" },
            {
              ponto:
                "Tem conhecimento sobre Método para usar produtos de higiene e aplicar o processo de higienização (diluição do cloro, tempo para aplicação e pedido dos produtos)",
            },
            { ponto: "Tem conhecimento sobre Contaminação cruzada" },
            { ponto: "Tem conhecimento sobre Método para descongelar alimentos" },
            { ponto: "Tem conhecimento sobre Risco e perigo (biológico, físico e químico)" },
            { ponto: "Tem conhecimento sobre Método para lavar as mãos" },
            { ponto: "Tem conhecimento sobre Organização de alimentos no depósito" },
            { ponto: "Tem conhecimento sobre Doenças transmitidas por alimentos" },
          ]}
        />
      </div>
      <div>
        <AgrupadorAnaliseQualitativa
          score={1.6}
          colunas={2}
          analises={[
            { ponto: "Sabem explicar as razões para requisitos de tempo e temperatura" },
            { ponto: "Sabem explicar as razões para requisitos de contaminação cruzada" },
            {
              ponto:
                "Sabem explicar as razões para requisitos de descongelamento de alimentos em temperatura refrigerada",
            },
            { ponto: "Sabem explicar as razões para requisitos de lavagem de mãos" },
            { ponto: "Sabem explicar as razões para requisitos de organização do estoque" },
          ]}
        />
      </div>

      <Separator className="my-12" />

      {/* Seção Comprometimento */}
      <h2 className="text-xl font-semibold mb-4">Comprometimento</h2>
      <div className="mb-8">
        <AgrupadorAnaliseQualitativa
          score={2.8}
          colunas={2}
          analises={[
            {
              ponto:
                "Os manipuladores de alimentos são responsáveis pela segurança dos alimentos e demonstram comportamento seguro",
            },
            { ponto: "Eles mantêm um alto grau de limpeza pessoal" },
            { ponto: "Eles têm iniciativa para os processos de higienização do ambiente de trabalho" },
            {
              ponto:
                "Eles estão atentos às questões de tempo e temperatura, registram temperaturas e implementam ações corretivas quando necessário",
            },
            { ponto: "Eles armazenam alimentos em estoques adequados, evitando a contaminação cruzada" },
            {
              ponto:
                "Atendem às instruções de recepção, armazenamento, pré-preparo (higienização, degelo), cocção e distribuição",
            },
          ]}
        />
      </div>
      <div>
        <AgrupadorAnaliseQualitativa
          score={2}
          colunas={2}
          analises={[
            { ponto: "Os gerentes priorizam a alocação de recursos financeiros à segurança dos alimentos" },
            {
              ponto:
                "Os gerentes trabalham em busca de políticas, sistemas e processos de sua empresa alinhados com a segurança dos alimentos",
            },
          ]}
        />
      </div>

      <Separator className="my-12" />

      {/* Seção Percepção de risco */}
      <h2 className="text-xl font-semibold mb-4">Percepção de risco</h2>
      <div className="mb-8">
        <AgrupadorAnaliseQualitativa
          score={2}
          colunas={2}
          analises={[
            { ponto: "Os manipuladores de alimentos percebem o risco em situações de alto risco" },
            {
              ponto:
                "Os trabalhadores compreendem e percebem que, se a situação apresentar alto risco, todos podem ser expostos",
            },
          ]}
        />
      </div>
      <div className="mb-8">
        <AgrupadorAnaliseQualitativa
          score={2}
          colunas={2}
          analises={[
            { ponto: "Os trabalhadores podem entender, julgar situações de risco e tomar decisões" },
            {
              ponto: "A decisão dos gerentes é baseada no julgamento de risco",
            },
          ]}
        />
      </div>
      <div className="mb-8">
        <AgrupadorAnaliseQualitativa
          score={2}
          colunas={1}
          analises={[{ ponto: "Trabalhadores percebem a letalidade" }]}
        />
      </div>
      <div>
        <AgrupadorAnaliseQualitativa
          score={2}
          colunas={1}
          analises={[
            {
              ponto:
                "Os trabalhadores não pensam que são melhores ou piores em seus pares (não apresentam viés otimista ou pessimista)",
            },
          ]}
        />
      </div>

      <Separator className="my-12" />

      {/* Seção Pressão de trabalho e crenças normativas */}
      <h2 className="text-xl font-semibold mb-4">Pressão de trabalho e crenças normativas</h2>
      <div className="mb-8">
        <AgrupadorAnaliseQualitativa
          score={2}
          colunas={2}
          analises={[
            { ponto: "Os manipuladores de alimentos têm uma carga de trabalho pesada" },
            {
              ponto: "O tempo de trabalho é suficiente",
            },
            {
              ponto: "A quantidade de manipuladores de alimentos é suficiente",
            },
          ]}
        />
      </div>
      <div>
        <AgrupadorAnaliseQualitativa
          score={2}
          colunas={2}
          analises={[
            { ponto: "Os manipuladores de alimentos são pressionados a trabalhar rapidamente" },
            {
              ponto: "Manipuladores e gerentes de alimentos têm uma relação de respeito",
            },
          ]}
        />
      </div>

      <Separator className="my-12" />

      {/* Seção Ambiente de trabalho */}
      <h2 className="text-xl font-semibold mb-4">Ambiente de trabalho</h2>
      <div className="mb-8">
        <AgrupadorAnaliseQualitativa
          score={2}
          colunas={2}
          analises={[
            { ponto: "O layout permite o fluxo adequado da preparação dos alimentos" },
            { ponto: "Barreiras físicas antes de acessar cada área" },
            { ponto: "Caixa d’água exclusivo e conservado" },
            { ponto: "Piso, parede, teto, portas e janelas são projetados para permitir a higienização" },
            { ponto: "Quantidade adequada de utensílios" },
            { ponto: "Utensílios projetado para permitir sanitização" },
            { ponto: "Utensílios em boas condições" },
            { ponto: "Utensílios feito por material não tóxico" },
            { ponto: "Utensílios atendem as necessidades dos manipuladores de alimentos" },
            { ponto: "Equipamentos suficientes" },
            { ponto: "Equipamentos projetado para facilitar o acesso para limpeza, manutenção e inspeção e acidentes" },
            { ponto: "Manutenção corretiva de equipamento" },
            { ponto: "Manutenção preventiva de equipamento" },
            { ponto: "O equipamento funciona corretamente (não mostra sinais de vazamentos, desgaste, ruído etc.)" },
            {
              ponto:
                "Superfícies de contato da mobília feitas de material compatível / aço inoxidável e permitem a higienização",
            },
            { ponto: "Há mobilia suficiente para manipulação de alimentos" },
            {
              ponto:
                "Existem produtos de higiene adequados (permitidos pelas autoridades de saúde) e suficientes para procedimentos de saneamento",
            },
            { ponto: "As ferramentas de limpeza não permitem contaminação cruzada e estão separadas por áreas" },
            {
              ponto:
                "Os materiais de lavagem das mãos são suficientes (sabão anti-séptico, papel não reciclável, torneira automática e compartimento para pedais), sempre são reabastecidos.",
            },
          ]}
        />
      </div>
      <div className="mb-8">
        <AgrupadorAnaliseQualitativa
          score={2}
          colunas={1}
          analises={[
            {
              ponto:
                "A adequação do ambiente ocorre com frequência, de acordo com a necessidade do local e não de acordo com inspeções",
            },
          ]}
        />
      </div>
      <div>
        <AgrupadorAnaliseQualitativa
          score={2}
          colunas={2}
          analises={[
            { ponto: "Atmosfera do ambiente de trabalho" },
            {
              ponto: "Atmosfera do ambiente de trabalho",
            },
          ]}
        />
      </div>

      <Separator className="my-12" />

      {/* Seção Sistemas, estilos e processos de gestão */}
      <h2 className="text-xl font-semibold mb-4">Sistemas, estilos e processos de gestão</h2>
      <div className="mb-8">
        <AgrupadorAnaliseQualitativa
          score={2}
          colunas={2}
          analises={[
            { ponto: "A equipe está motivada para implementar práticas seguras e ferramentas de qualidade" },
            {
              ponto: "Os manipuladores de alimentos são integrados aos sistemas e processos de segurança de alimentos",
            },
          ]}
        />
      </div>
      <div className="mb-8">
        <AgrupadorAnaliseQualitativa
          score={2}
          colunas={2}
          analises={[
            { ponto: "A equipe sabe como preencher formulários de controle" },
            {
              ponto: "Procedimentos documentados e formulários de registro estão atualizados",
            },
            {
              ponto:
                "Os registros dos equipamentos são atualizado e refletem o status real do desempenho do equipamento",
            },
          ]}
        />
      </div>
      <div className="mb-8">
        <AgrupadorAnaliseQualitativa
          score={2}
          colunas={1}
          analises={[
            {
              ponto:
                "Programas de pré-requisito, HACCP ou algum sistema baseado em boas práticas de higiene são implementados",
            },
          ]}
        />
      </div>
      <div>
        <AgrupadorAnaliseQualitativa
          score={2}
          colunas={1}
          analises={[
            {
              ponto: "O processo de produção está alinhado com práticas seguras e é projetado para minimizar riscos",
            },
          ]}
        />
      </div>
    </>
  );
}
