"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

export type Convites = {
  email: string;
  tipoUsuario: string;
  status: string;
  situacao: string;
  criadoEm: string;
};

export const columns: Array<ColumnDef<Convites> & { sortable?: boolean }> = [
  {
    accessorKey: "email",
    header: "E-mail",
    sortable: true,
  },
  {
    accessorKey: "tipoUsuario",
    header: "Tipo de Usuário",
    cell: ({ row }) => (
      <Badge
        className={
          row.original.tipoUsuario === "Administrador"
            ? "bg-secondary-100 text-secondary-600"
            : "bg-zinc-100 text-zinc-500"
        }
      >
        {row.original.tipoUsuario}
      </Badge>
    ),
    sortable: true,
  },
  {
    accessorKey: "situacao",
    header: "Situação",
    cell: ({ row }) => (
      <Badge className={row.original.situacao === "Usado" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}>
        {row.original.situacao}
      </Badge>
    ),
    sortable: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        className={row.original.status === "Disponível" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}
      >
        {row.original.status}
      </Badge>
    ),
    sortable: true,
  },
  {
    accessorKey: "criadoEm",
    header: "Data de Criação",
    sortable: true,
  },
];

export const defaultSort = [
  {
    id: "criadoEm",
    desc: true,
  },
];
