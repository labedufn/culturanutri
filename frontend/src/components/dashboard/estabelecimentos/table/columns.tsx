import { ColumnDef } from "@tanstack/react-table";
import { Eye, Edit, Trash } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

export type Estabelecimentos = {
  id: string;
  nome: string;
  cnae: string;
  endereco: string;
  pessoal_ocupado: number;
  numero_refeicoes: number;
  possui_alvara_sanitario: number;
  possui_responsavel_boas_praticas: number;
  data_alteracao: string;
  ativo: number;
  usuario: {
    nome: string;
    sobrenome: string;
  };
};

export const columns = (
  handleVisualizar: (estabelecimento: Estabelecimentos) => void,
  handleEditar: (estabelecimento: Estabelecimentos) => void,
  handleExcluir: (estabelecimento: Estabelecimentos) => void,
): Array<ColumnDef<Estabelecimentos> & { sortable?: boolean }> => [
  {
    accessorKey: "nome",
    header: "Nome",
    sortable: true,
  },
  {
    accessorKey: "cnae",
    header: "CNAE",
    sortable: true,
  },
  {
    accessorKey: "pessoal_ocupado",
    header: "Pessoal Ocupado",
    cell: ({ row }) => <Badge className="bg-zinc-100 text-zinc-500">{row.original.pessoal_ocupado}</Badge>,
    sortable: true,
  },
  {
    accessorKey: "numero_refeicoes",
    header: "Número de Refeições",
    cell: ({ row }) => <Badge className="bg-zinc-100 text-zinc-500">{row.original.numero_refeicoes}</Badge>,
    sortable: true,
  },
  {
    accessorKey: "possui_alvara_sanitario",
    header: "Possui Alvará Sanitário?",
    cell: ({ row }) => (
      <Badge
        className={row.original.possui_alvara_sanitario ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}
      >
        {row.original.possui_alvara_sanitario ? "Sim" : "Não"}
      </Badge>
    ),
    sortable: true,
  },
  {
    accessorKey: "possui_responsavel_boas_praticas",
    header: "Possui Responsável?",
    cell: ({ row }) => (
      <Badge
        className={
          row.original.possui_responsavel_boas_praticas ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"
        }
      >
        {row.original.possui_responsavel_boas_praticas ? "Sim" : "Não"}
      </Badge>
    ),
    sortable: true,
  },
  {
    accessorKey: "ativo",
    header: "Situação",
    cell: ({ row }) => (
      <Badge className={row.original.ativo === 1 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}>
        {row.original.ativo ? "Ativo" : "Inativo"}
      </Badge>
    ),
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
              <p className="text-white">Visualizar Estabelecimento</p>
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
              <p className="text-white">Editar Estabelecimento</p>
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
              <p className="text-white">Excluir Estabelecimento</p>
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
    id: "nome",
    desc: true,
  },
];
