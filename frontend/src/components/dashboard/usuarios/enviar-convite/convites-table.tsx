"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/dashboard/data-table";
import { formatarDataHora, verificarExpiracao } from "@/scripts/formatarData";
import { formatarPalavra } from "@/scripts/formatarPalavra";
import { Convites, columns } from "./table/columns";
import { listarConvites } from "@/actions/listar-convites";

export default function ConvitesTable() {
  const [convites, setConvites] = useState<Convites[]>([]);

  useEffect(() => {
    const fetchConvitesInfo = async () => {
      const response = await listarConvites();
      if (response.success) {
        const formattedData = response.data.convites.map((convite: any) => ({
          email: convite.email,
          tipoUsuario: formatarPalavra(convite.tipoUsuario),
          situacao: convite.usado === 1 ? "Usado" : "Não Usado",
          status: verificarExpiracao(convite.expira_em) ? "Expirado" : "Ativo",
          criadoEm: formatarDataHora(convite.criadoEm),
        }));
        setConvites(formattedData);
      } else {
        console.error(response.message);
      }
    };

    fetchConvitesInfo();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h3>Convites Enviados</h3>
      <DataTable columns={columns} data={convites} />
    </div>
  );
}
