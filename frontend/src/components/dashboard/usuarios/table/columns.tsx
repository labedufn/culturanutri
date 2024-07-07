"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Edit, Trash } from "lucide-react";

export type Usuarios = {
  nome: string;
  cpf: string;
  email: string;
  instituicao: string;
  tipoUsuario: string;
  situacao: string;
  dataCadastro: string;
  ultimoLogin: string;
};

export const columns: ColumnDef<Usuarios>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "cpf",
    header: "CPF",
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
  {
    accessorKey: "instituicao",
    header: "Instituição",
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
  },
  {
    accessorKey: "situacao",
    header: "Situação",
    cell: ({ row }) => (
      <Badge className={row.original.situacao === "Ativo" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}>
        {row.original.situacao}
      </Badge>
    ),
  },
  {
    accessorKey: "dataCadastro",
    header: "Data de Cadastro",
  },
  {
    accessorKey: "ultimoLogin",
    header: "Último Login",
  },
  {
    id: "acoes",
    header: "Ações",
    cell: ({ row }) => (
      <div className="flex items-center space-x-4">
        <button onClick={() => handleVisualizar(row.original)}>
          <Eye className="text-zinc-400 w-5 hover:text-zinc-500" />
        </button>
        <button onClick={() => handleEditar(row.original)}>
          <Edit className="text-zinc-400 w-5 hover:text-zinc-500" />
        </button>
        <button onClick={() => handleExcluir(row.original)}>
          <Trash className="text-red-500 w-5 hover:text-red-600" />
        </button>
      </div>
    ),
  },
];

const handleVisualizar = (usuario: Usuarios) => {
  console.log("Visualizar usuário", usuario);
};

const handleEditar = (usuario: Usuarios) => {
  console.log("Editar usuário", usuario);
};

const handleExcluir = (usuario: Usuarios) => {
  console.log("Excluir usuário", usuario);
};
