"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/dashboard/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { listarGestor } from "@/actions/listar-gestor";
import { Toaster } from "@/components/ui/toaster";
import { ModalVisualizarGestor } from "./modal-visualizar-gestores";
import { ModalEditarGestor } from "./modal-editar-gestores";
import { ModalExcluirGestor } from "./modal-excluir-gestores";
import { columns, defaultSort, Gestor } from "./table/columns";
import { AvaliacaoProvider } from "./avaliacao-gestores-provider";

export default function GestoresTable() {
  const [gestores, setGestores] = useState<Gestor[] | null>(null);
  const [filteredData, setFilteredData] = useState<Gestor[]>([]);
  const [selectedGestor, setSelectedGestor] = useState<Gestor | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchGestores();
  }, []);

  const fetchGestores = async () => {
    const response = await listarGestor();
    if (response.success) {
      setGestores(response.data);
      setFilteredData(response.data);
    } else {
      console.error(response.message);
    }
  };

  const handleVisualizar = (gestor: Gestor) => {
    setSelectedGestor(gestor);
    setIsViewModalOpen(true);
  };

  const handleEditar = (gestor: Gestor) => {
    setSelectedGestor(gestor);
    setIsEditModalOpen(true);
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
        <DataTable
          columns={columns(handleVisualizar, handleEditar, handleExcluir)}
          data={filteredData}
          defaultSort={defaultSort}
        />
      )}
      {selectedGestor && (
        <>
          <ModalVisualizarGestor
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            gestor={selectedGestor}
          />
          <AvaliacaoProvider>
            <ModalEditarGestor
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              gestor={selectedGestor}
              onUpdate={fetchGestores}
            />
          </AvaliacaoProvider>
          <ModalExcluirGestor
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            gestor={selectedGestor}
            onDelete={fetchGestores}
          />
        </>
      )}
      <Toaster />
    </div>
  );
}
