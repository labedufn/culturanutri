import { ColumnDef } from "@tanstack/react-table";
import { Eye, Edit, Trash } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Gestor } from "@/types/gestor";

export const columns = (
  handleVisualizar: (gestor: Gestor) => void,
  handleEditar: (gestor: Gestor) => void,
  handleExcluir: (gestor: Gestor) => void,
): Array<ColumnDef<Gestor> & { sortable?: boolean }> => [
  {
    accessorKey: "informacoes.dados_individuais.nome_completo",
    header: "Nome Completo",
    sortable: true,
  },
  {
    accessorKey: "informacoes.dados_individuais.genero",
    header: "Gênero",
    cell: ({ row }) => (
      <span>{row.original.informacoes.dados_individuais.genero === 0 ? "Masculino" : "Feminino"}</span>
    ),
    sortable: true,
  },
  {
    accessorKey: "informacoes.dados_individuais.idade",
    header: "Idade",
    sortable: true,
  },
  {
    accessorKey: "informacoes.dados_individuais.escolaridade",
    header: "Escolaridade",
    cell: ({ row }) => (
      <span>
        {row.original.informacoes.dados_individuais.escolaridade === 1
          ? "Ensino Fundamental"
          : row.original.informacoes.dados_individuais.escolaridade === 2
            ? "Ensino Médio"
            : "Ensino Superior"}
      </span>
    ),
    sortable: true,
  },
  {
    accessorKey: "informacoes.dados_individuais.formacao",
    header: "Formação",
    cell: ({ row }) => <div>{row.original.informacoes.dados_individuais.formacao || "Não possui"}</div>,
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
              <p className="text-white">Visualizar Gestor</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={() => handleEditar(row.original)}>
                <Edit className="text-zinc-400 w-5 hover:text-zinc-500" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-zinc-800">
              <p className="text-white">Editar Gestor</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={() => handleExcluir(row.original)}>
                <Trash className="text-red-500 w-5 hover:text-red-600" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-zinc-800">
              <p className="text-white">Excluir Gestor</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
    sortable: false,
  },
];
