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
import { EnviarConviteUsuarioForm } from "@/components/dashboard/usuarios/enviar-convite-usuario-form";
import { Separator } from "@/components/ui/separator";
import ConvitesTable from "@/components/dashboard/usuarios/enviar-convite/convites-table";

export default function UsuariosAddPage() {
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
              <Link href="/dashboard/usuarios">Usuários</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Enviar Convite</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="rounded-lg border-none mt-6">
        <CardContent className="p-6">
          <div className="min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
            <div className="flex flex-col gap-12">
              <EnviarConviteUsuarioForm />
              <Separator />
              <ConvitesTable />
            </div>
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </>
  );
}
