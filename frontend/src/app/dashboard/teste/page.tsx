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
import { AvaliacaoGestoresDadosIndividuais } from "@/components/avaliacao/gestores/avaliacao-gestores-dados-individuais";
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
            <AvaliacaoGestoresDadosIndividuais />
            <Separator className="mt-12" />
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </>
  );
}
