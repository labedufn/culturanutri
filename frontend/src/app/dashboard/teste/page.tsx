import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { AgrupadorAnaliseQualitativa } from "@/components/dashboard/avaliacao/analise-qualitativa/agrupador-analise-qualitativa";
import { Separator } from "@/components/ui/separator";

export default function TestePage() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Painel de Controle</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Teste</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="rounded-lg border-none mt-6">
        <CardContent className="p-6">
          <div className="min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
            <AgrupadorAnaliseQualitativa
              elemento="Liderança"
              score={85}
              colunas={2}
              analises={[
                { pontos: "O layout permite o fluxo adequado da preparação dos" },
                { pontos: "Barreiras físicas antes de acessar cada área" },
                { pontos: "Caixa d'água exclusivo e conservado" },
                { pontos: "Piso, parede, teto, portas e janelas são projetados" },
                { pontos: "Quantidade adequada de utensílios" },
                { pontos: "Utensílios projetados para permitir sanitização" },
                { pontos: "Utensílios em boas condições" },
                { pontos: "Utensílios feito por material não tóxico" },
                { pontos: "Utensílios além das necessidades dos" },
                { pontos: "Equipamentos suficientes" },
                { pontos: "Equipamentos projetados para facilitar o acesso para" },
                { pontos: "Manutenção corretiva de equipamento" },
                { pontos: "Manutenção preventiva de equipamento" },
                { pontos: "O equipamento funciona corretamente (não mostra" },
                { pontos: "Superfícies de contato da mobília feitas de material" },
                { pontos: "Há mobília suficiente para manipulação de alimentos" },
                { pontos: "Existem produtos de higiene adequados (permitidos" },
                { pontos: "As ferramentas de limpeza não permitem" },
                { pontos: "Os materiais de lavagem das mãos são suficientes" },
              ]}
            />
            <Separator className="my-12" />
            <AgrupadorAnaliseQualitativa
              elemento="Liderança"
              score={85}
              colunas={2}
              analises={[
                { pontos: "O layout permite o fluxo adequado da preparação dos" },
                { pontos: "Barreiras físicas antes de acessar cada área" },
                { pontos: "Caixa d'água exclusivo e conservado" },
                { pontos: "Piso, parede, teto, portas e janelas são projetados" },
                { pontos: "Quantidade adequada de utensílios" },
                { pontos: "Utensílios projetados para permitir sanitização" },
                { pontos: "Utensílios em boas condições" },
                { pontos: "Utensílios feito por material não tóxico" },
                { pontos: "Utensílios além das necessidades dos" },
                { pontos: "Equipamentos suficientes" },
                { pontos: "Equipamentos projetados para facilitar o acesso para" },
                { pontos: "Manutenção corretiva de equipamento" },
                { pontos: "Manutenção preventiva de equipamento" },
                { pontos: "O equipamento funciona corretamente (não mostra" },
                { pontos: "Superfícies de contato da mobília feitas de material" },
                { pontos: "Há mobília suficiente para manipulação de alimentos" },
                { pontos: "Existem produtos de higiene adequados (permitidos" },
                { pontos: "As ferramentas de limpeza não permitem" },
                { pontos: "Os materiais de lavagem das mãos são suficientes" },
              ]}
            />
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </>
  );
}
