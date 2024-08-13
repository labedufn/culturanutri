"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/dashboard/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { listarManipulador } from "@/actions/listar-manipulador";
import { Toaster } from "@/components/ui/toaster";
import { columns } from "./table/columns";
import { Manipulador } from "@/types/manipulador";
import { ModalVisualizarManipulador } from "./modal-visualizar-manipuladores";
import { ModalExcluirManipulador } from "./modal-excluir-manipulador";

export default function ManipuladoresTable() {
  const [manipuladores, setManipuladores] = useState<Manipulador[] | null>(null);
  const [filteredData, setFilteredData] = useState<Manipulador[]>([]);
  const [selectedManipulador, setSelectedManipulador] = useState<Manipulador | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const pathParts = url.pathname.split("/");
      const avaliacaoId = pathParts[pathParts.length - 1];
      fetchManipuladores(avaliacaoId);
    }
  }, []);

  const fetchManipuladores = async (avaliacaoId: string) => {
    const response = await listarManipulador();
    if (response.success) {
      const filtered = response.data.filter((manipulador: Manipulador) => manipulador.id_avaliacao === avaliacaoId);
      setManipuladores(filtered);
      setFilteredData(filtered);
    } else {
      console.error(response.message);
    }
  };

  const handleVisualizar = (manipulador: Manipulador) => {
    setSelectedManipulador(manipulador);
    setIsViewModalOpen(true);
  };

  const handleExcluir = (manipulador: Manipulador) => {
    setSelectedManipulador(manipulador);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      {!manipuladores ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <DataTable columns={columns(handleVisualizar, handleExcluir)} data={filteredData} />
      )}
      {selectedManipulador && (
        <>
          <ModalVisualizarManipulador
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            manipulador={selectedManipulador}
          />
          <ModalExcluirManipulador
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            manipulador={selectedManipulador}
            onDelete={() => {
              if (typeof window !== "undefined") {
                const url = new URL(window.location.href);
                const pathParts = url.pathname.split("/");
                const avaliacaoId = pathParts[pathParts.length - 1];
                fetchManipuladores(avaliacaoId);
              }
            }}
          />
        </>
      )}
      <Toaster />
    </div>
  );
}
