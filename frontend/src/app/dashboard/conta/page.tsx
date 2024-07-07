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
import { Separator } from "@/components/ui/separator";
import { EditarUsuarioForm } from "@/components/dashboard/usuarios/editar-conta-usuario-form";
import { AlterarSenhaUsuarioForm } from "@/components/dashboard/usuarios/alterar-senha-usuario";
import { Toaster } from "@/components/ui/toaster";

export default function EstabelecimentosPage() {
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
            <BreadcrumbPage>Conta</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="rounded-lg border-none mt-6">
        <CardContent className="p-6">
          <div className="min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
            <EditarUsuarioForm />
            <Separator className="my-12" />
            <AlterarSenhaUsuarioForm />
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </>
  );
}
