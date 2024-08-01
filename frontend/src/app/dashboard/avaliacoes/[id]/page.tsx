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
import { StepperAvaliacao } from "@/components/dashboard/stepper-avaliacao";
import { buscarAvaliacao } from "@/actions/buscar-avaliacao";
import { formatarData } from "@/scripts/formatarData";

interface AvaliacaoPageProps {
  params: {
    id: string;
  };
}

export default async function AvaliacaoPage({ params }: AvaliacaoPageProps) {
  const avaliacaoResponse = await buscarAvaliacao(params.id);

  const { data_cadastro, Estabelecimento } = avaliacaoResponse.data!;

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
            <BreadcrumbPage>
              Avaliação de {Estabelecimento.nome} em {formatarData(data_cadastro)}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="rounded-lg border-none mt-6">
        <CardContent className="p-6">
          <div className="min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
            <StepperAvaliacao id={params.id} />
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </>
  );
}
