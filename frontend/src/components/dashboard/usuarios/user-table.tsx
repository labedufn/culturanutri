"use client";

import { useEffect, useState } from "react";
import { Usuarios, columns, defaultSort } from "../../../components/dashboard/usuarios/table/columns";
import DataTable from "@/components/dashboard/data-table";
import SearchInput from "./search-input";
import { listarUsuarios } from "@/actions/listar-usuarios";
import { formatarCpf } from "@/lib/cpf";
import { formatarData, formatarDataHora } from "@/scripts/formatarData";
import { formatarPalavra } from "@/scripts/formatarPalavra";
import { ModalVisualizarUsuario } from "./modal-visualizar-usuario";
import { ModalEditarUsuario } from "./modal-editar-usuario";
import { ModalExcluirUsuario } from "./modal-excluir-usuario";
import { Toaster } from "@/components/ui/toaster";
import { Skeleton } from "@/components/ui/skeleton";
import { currentUserId } from "@/scripts/currentUserId";

export default function UserTable() {
  const [userInfo, setUserInfo] = useState<Usuarios[] | null>(null);
  const [filteredData, setFilteredData] = useState<Usuarios[]>([]);
  const [selectedUser, setSelectedUser] = useState<Usuarios | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentUserID, setCurrentUserID] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentUserID = async () => {
      const id = await currentUserId();
      setCurrentUserID(id || null);
    };

    fetchCurrentUserID();
    fetchUsersInfo();
  }, []);

  const fetchUsersInfo = async () => {
    const response = await listarUsuarios();
    if (response.success) {
      const formattedData = response.data.usuarios.map((user: any) => ({
        id: user.id,
        nome: user.nome + " " + user.sobrenome,
        cpf: formatarCpf(user.cpf),
        email: user.email,
        instituicao: user.instituicao,
        tipoUsuario: formatarPalavra(user.tipo_usuario),
        situacao: user.ativo ? "Ativo" : "Inativo",
        dataCadastro: formatarData(user.data_cadastro),
        ultimoLogin: formatarDataHora(user.ultimo_login),
      }));
      setUserInfo(formattedData);
      setFilteredData(formattedData);
    } else {
      console.error(response.message);
    }
  };

  const handleSearch = (query: string) => {
    if (userInfo) {
      const filtered = userInfo.filter(
        (user) =>
          user.nome.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase()) ||
          user.instituicao.toLowerCase().includes(query.toLowerCase()) ||
          user.cpf.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredData(filtered);
    }
  };

  const handleVisualizar = (usuario: Usuarios) => {
    setSelectedUser(usuario);
    setIsViewModalOpen(true);
  };

  const handleEditar = (usuario: Usuarios) => {
    setSelectedUser(usuario);
    setIsEditModalOpen(true);
  };

  const handleExcluir = (usuario: Usuarios) => {
    setSelectedUser(usuario);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      {!userInfo ? (
        <Skeleton className="h-10 w-full" />
      ) : (
        <SearchInput onSearch={handleSearch} placeholder="Buscar por nome, CPF, e-mail ou instituição" />
      )}
      {!userInfo ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <DataTable
          columns={columns(handleVisualizar, handleEditar, handleExcluir, currentUserID)}
          data={filteredData}
          defaultSort={defaultSort}
        />
      )}
      {selectedUser && (
        <>
          <ModalVisualizarUsuario
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            usuario={selectedUser}
          />
          <ModalEditarUsuario
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            usuario={selectedUser}
            onUpdate={fetchUsersInfo}
          />
          <ModalExcluirUsuario
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            usuario={selectedUser}
            onDelete={fetchUsersInfo}
          />
          <Toaster />
        </>
      )}
    </div>
  );
}
