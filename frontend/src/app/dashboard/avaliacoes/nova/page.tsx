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
import StepperAvaliacao from "@/components/dashboard/stepper-avaliacao";

export default function AvaliacoesNovaPage() {
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
            <BreadcrumbLink asChild>
              <Link href="/dashboard/avaliacoes">Avaliações</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Nova Avaliação</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="rounded-lg border-none mt-6">
        <CardContent className="p-6">
          <div className="min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
            <div className="mb-8">
              <h3 className="mb-2">Avaliação de Cultura de Segurança dos Alimentos</h3>
              <p className="text-sm text-muted-foreground">
                Este sistema foi elaborado para facilitar a análise de dados da avaliação da cultura de segurança dos
                alimentos.
              </p>
            </div>
            <StepperAvaliacao />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
