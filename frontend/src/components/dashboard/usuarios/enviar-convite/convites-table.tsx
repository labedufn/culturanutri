"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/dashboard/data-table";
import { formatarDataHora, verificarExpiracao } from "@/scripts/formatarData";
import { formatarPalavra } from "@/scripts/formatarPalavra";
import { Convites, columns, defaultSort } from "./table/columns";
import { listarConvites } from "@/actions/listar-convites";

interface ConvitesTableProps {
  refetch: boolean;
}

export default function ConvitesTable({ refetch }: ConvitesTableProps) {
  const [convites, setConvites] = useState<Convites[]>([]);

  const fetchConvitesInfo = async () => {
    const response = await listarConvites();
    if (response.success) {
      const formattedData = response.data.map((convite: any) => ({
        email: convite.email,
        tipoUsuario: formatarPalavra(convite.tipo_usuario),
        situacao: convite.usado === 1 ? "Usado" : "Não Usado",
        status: verificarExpiracao(convite.expira_em) ? "Expirado" : "Disponível",
        criadoEm: formatarDataHora(convite.criado_em),
      }));
      setConvites(formattedData);
    } else {
      console.error(response.message);
    }
  };

  useEffect(() => {
    fetchConvitesInfo();
  }, [refetch]);

  return (
    <div className="flex flex-col gap-8">
      <h3>Convites Enviados</h3>
      <DataTable columns={columns} data={convites} defaultSort={defaultSort} />
    </div>
  );
}
