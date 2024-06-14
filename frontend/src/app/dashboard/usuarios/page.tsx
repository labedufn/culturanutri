import Link from "next/link";

import { FilterbarTable } from "@/components/dashboard/filterbar-table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Usuario, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Usuario[]> {
  return [
    {
      nome: "Teste Usuário",
      email: "teste@teste.com",
      cpf: "000.000.000-00",
      tipo: "Administrador",
      situacao: "Ativo",
    },
    {
      nome: "Teste Usuário",
      email: "teste@teste.com",
      cpf: "000.000.000-00",
      tipo: "Administrador",
      situacao: "Ativo",
    },
    {
      nome: "Teste Usuário",
      email: "teste@teste.com",
      cpf: "000.000.000-00",
      tipo: "Administrador",
      situacao: "Desativado",
    },
    {
      nome: "Teste Usuário",
      email: "teste@teste.com",
      cpf: "000.000.000-00",
      tipo: "Administrador",
      situacao: "Ativo",
    },
    {
      nome: "Teste Usuário",
      email: "teste@teste.com",
      cpf: "000.000.000-00",
      tipo: "Administrador",
      situacao: "Ativo",
    },
    {
      nome: "Teste Usuário",
      email: "teste@teste.com",
      cpf: "000.000.000-00",
      tipo: "Administrador",
      situacao: "Ativo",
    },
  ];
}

export default async function UsuariosPage() {
  const data = await getData();

  return (
    <>
      <div className="mb-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Painel de Controle</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Usuários</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-col gap-4">
        <FilterbarTable />
        <div className="bg-white p-4 rounded-md shadow-sm">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </>
  );
}
