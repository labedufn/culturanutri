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
import { CorAnaliseQualitativa } from "@/components/dashboard/avaliacao/analise-qualitativa/cor-analise-qualitativa";

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
            <div className="flex gap-8">
              <CorAnaliseQualitativa
                content="Os gerentes fornecem assistência e orientação relacionada à segurança dos alimentos."
                score={3}
              />
              <CorAnaliseQualitativa content="Os gerentes estão presentes na área de produção durante o manuseio de alimentos." />
              <CorAnaliseQualitativa content="Os gerentes estão presentes na área de produção durante o manuseio de alimentos." />
            </div>
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </>
  );
}
