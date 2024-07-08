"use client";

import { useEffect, useState } from "react";
import { Usuarios, columns, defaultSort } from "../../../components/dashboard/usuarios/table/columns";
import DataTable from "@/components/dashboard/data-table";
import SearchInput from "./search-input";
import { listarUsuarios } from "@/actions/listar-usuarios";
import { formatarCpf } from "@/lib/cpf";
import { formatarData, formatarDataHora } from "@/scripts/formatarData";
import { formatarPalavra } from "@/scripts/formatarPalavra";

export default function UserTable() {
  const [userInfo, setUserInfo] = useState<Usuarios[]>([]);
  const [filteredData, setFilteredData] = useState<Usuarios[]>([]);

  useEffect(() => {
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

    fetchUsersInfo();
  }, []);

  const handleSearch = (query: string) => {
    const filtered = userInfo.filter(
      (user) =>
        user.nome.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase()) ||
        user.instituicao.toLowerCase().includes(query.toLowerCase()) ||
        user.cpf.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  return (
    <div className="flex flex-col gap-6">
      <SearchInput onSearch={handleSearch} />
      <DataTable columns={columns} data={filteredData} defaultSort={defaultSort} />
    </div>
  );
}
