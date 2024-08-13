"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/dashboard/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { listarGestor } from "@/actions/listar-gestor";
import { Toaster } from "@/components/ui/toaster";
import { ModalVisualizarGestor } from "./modal-visualizar-gestores";
import { ModalExcluirGestor } from "./modal-excluir-gestores";
import { columns } from "./table/columns";
import { Gestor } from "@/types/gestor";

export default function GestoresTable() {
  const [gestores, setGestores] = useState<Gestor[] | null>(null);
  const [filteredData, setFilteredData] = useState<Gestor[]>([]);
  const [selectedGestor, setSelectedGestor] = useState<Gestor | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const pathParts = url.pathname.split("/");
      const avaliacaoId = pathParts[pathParts.length - 1];
      fetchGestores(avaliacaoId);
    }
  }, []);

  const fetchGestores = async (avaliacaoId: string) => {
    const response = await listarGestor();
    if (response.success) {
      const filtered = response.data.filter((gestor: Gestor) => gestor.id_avaliacao === avaliacaoId);
      setGestores(filtered);
      setFilteredData(filtered);
    } else {
      console.error(response.message);
    }
  };

  const handleVisualizar = (gestor: Gestor) => {
    setSelectedGestor(gestor);
    setIsViewModalOpen(true);
  };

  const handleExcluir = (gestor: Gestor) => {
    setSelectedGestor(gestor);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      {!gestores ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <DataTable columns={columns(handleVisualizar, handleExcluir)} data={filteredData} />
      )}
      {selectedGestor && (
        <>
          <ModalVisualizarGestor
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            gestor={selectedGestor}
          />
          <ModalExcluirGestor
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            gestor={selectedGestor}
            onDelete={() => {
              if (typeof window !== "undefined") {
                const url = new URL(window.location.href);
                const pathParts = url.pathname.split("/");
                const avaliacaoId = pathParts[pathParts.length - 1];
                fetchGestores(avaliacaoId);
              }
            }}
          />
        </>
      )}
      <Toaster />
    </div>
  );
}
