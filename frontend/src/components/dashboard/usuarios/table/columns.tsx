import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export type Usuarios = {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  instituicao: string;
  tipoUsuario: string;
  situacao: string;
  dataCadastro: string;
  ultimoLogin: string;
};

export const columns = (
  handleVisualizar: (usuario: Usuarios) => void,
  handleEditar: (usuario: Usuarios) => void,
  currentUserID: string | null, // Add currentUserID as a parameter
): Array<ColumnDef<Usuarios> & { sortable?: boolean }> => [
  {
    accessorKey: "nome",
    header: "Nome",
    sortable: true,
  },
  {
    accessorKey: "cpf",
    header: "CPF",
    sortable: true,
  },
  {
    accessorKey: "email",
    header: "E-mail",
    sortable: true,
  },
  {
    accessorKey: "instituicao",
    header: "Instituição",
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
      <Badge className={row.original.situacao === "Ativo" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}>
        {row.original.situacao}
      </Badge>
    ),
    sortable: true,
  },
  {
    accessorKey: "dataCadastro",
    header: "Data de Cadastro",
    sortable: true,
  },
  {
    accessorKey: "ultimoLogin",
    header: "Último Login",
    sortable: true,
  },
  {
    id: "acoes",
    header: "Ações",
    cell: ({ row }) => (
      <div className="flex items-center space-x-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={() => handleVisualizar(row.original)}>
                <Eye className="text-zinc-400 w-5 hover:text-zinc-500" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-zinc-800">
              <p className="text-white">Visualizar Usuário</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {currentUserID !== row.original.id && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={() => handleEditar(row.original)}>
                  <Edit className="text-zinc-400 w-5 hover:text-zinc-500" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-zinc-800">
                <p className="text-white">Editar Usuário</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={() => handleExcluir(row.original)}>
                <Trash className="text-red-500 w-5 hover:text-red-600" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-zinc-800">
              <p className="text-white">Excluir Usuário</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
    sortable: false,
  },
];

export const defaultSort = [
  {
    id: "dataCadastro",
    desc: true,
  },
];

export const handleExcluir = (usuario: Usuarios) => {
  console.log("Excluir", usuario);
};
