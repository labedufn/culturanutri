"use client";

import { useEffect, useState } from "react";
import { Estabelecimentos, columns, defaultSort } from "../../../components/dashboard/estabelecimentos/table/columns";
import DataTable from "@/components/dashboard/data-table";
import { listarEstabelecimentos } from "@/actions/listar-estabelecimentos";
import { ModalVisualizarEstabelecimento } from "./modal-visualizar-estabelecimento";
import { ModalExcluirEstabelecimento } from "./modal-excluir-estabelecimento";
import { Toaster } from "@/components/ui/toaster";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import SearchInput from "../usuarios/search-input";
import { ModalEditarEstabelecimento } from "./modal-editar-estabelecimento";
import { ModalCadastrarEstabelecimento } from "./modal-cadastrar-estabelecimento";
import { PlusIcon } from "lucide-react";
import { formatarData } from "@/scripts/formatarData";
import { formatarCnae } from "@/scripts/formatarCnae";

export default function EstabelecimentosTable() {
  const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimentos[] | null>(null);
  const [filteredData, setFilteredData] = useState<Estabelecimentos[]>([]);
  const [selectedEstabelecimento, setSelectedEstabelecimento] = useState<Estabelecimentos | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchEstabelecimentos();
  }, []);

  const fetchEstabelecimentos = async () => {
    const response = await listarEstabelecimentos();
    if (response.success) {
      const formattedData = response.data.estabelecimentos.map((estabelecimento: any) => ({
        id: estabelecimento.id,
        nome: estabelecimento.nome,
        cnae: estabelecimento.cnae ? formatarCnae(estabelecimento.cnae) : "Não informado",
        endereco: estabelecimento.endereco,
        pessoal_ocupado: estabelecimento.pessoal_ocupado,
        numero_refeicoes: estabelecimento.numero_refeicoes,
        possui_alvara_sanitario: estabelecimento.possui_alvara_sanitario,
        possui_responsavel_boas_praticas: estabelecimento.possui_responsavel_boas_praticas,
        data_alteracao: formatarData(estabelecimento.data_alteracao),
        ativo: estabelecimento.ativo,
        usuario: {
          nome: estabelecimento.usuario.nome,
          sobrenome: estabelecimento.usuario.sobrenome,
        },
      }));
      setEstabelecimentos(formattedData);
      setFilteredData(formattedData);
    } else {
      console.error(response.message);
    }
  };

  const handleSearch = (query: string) => {
    if (estabelecimentos) {
      const filtered = estabelecimentos.filter(
        (estabelecimento) =>
          estabelecimento.nome.toLowerCase().includes(query.toLowerCase()) ||
          estabelecimento.cnae.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredData(filtered);
    }
  };

  const handleVisualizar = (estabelecimento: Estabelecimentos) => {
    setSelectedEstabelecimento(estabelecimento);
    setIsViewModalOpen(true);
  };

  const handleEditar = (estabelecimento: Estabelecimentos) => {
    setSelectedEstabelecimento(estabelecimento);
    setIsEditModalOpen(true);
  };

  const handleExcluir = (estabelecimento: Estabelecimentos) => {
    setSelectedEstabelecimento(estabelecimento);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      {!estabelecimentos ? (
        <Skeleton className="h-10 w-full" />
      ) : (
        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-between sm:items-center">
          <SearchInput onSearch={handleSearch} placeholder="Buscar por nome ou CNAE" />
          <Button className="w-full sm:w-auto" onClick={() => setIsCreateModalOpen(true)}>
            <PlusIcon className="pr-2" />
            Cadastrar Estabelecimento
          </Button>
        </div>
      )}
      {!estabelecimentos ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <DataTable
          columns={columns(handleVisualizar, handleEditar, handleExcluir)}
          data={filteredData}
          defaultSort={defaultSort}
        />
      )}
      {selectedEstabelecimento && (
        <>
          <ModalVisualizarEstabelecimento
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            estabelecimento={selectedEstabelecimento}
          />
          <ModalEditarEstabelecimento
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            estabelecimento={selectedEstabelecimento}
            onUpdate={fetchEstabelecimentos}
          />
          <ModalExcluirEstabelecimento
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            estabelecimento={selectedEstabelecimento}
            onDelete={fetchEstabelecimentos}
          />
        </>
      )}
      <ModalCadastrarEstabelecimento
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={fetchEstabelecimentos}
      />
      <Toaster />
    </div>
  );
}
