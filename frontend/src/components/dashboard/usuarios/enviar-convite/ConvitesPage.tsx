"use client";

import { useState } from "react";
import { EnviarConviteUsuarioForm } from "../enviar-convite-usuario-form";
import { Separator } from "@/components/ui/separator";
import ConvitesTable from "./convites-table";

export default function ConvitesPage() {
  const [refetch, setRefetch] = useState(false);

  const handleInviteSent = () => {
    setRefetch((prev) => !prev);
  };

  return (
    <>
      <EnviarConviteUsuarioForm onInviteSent={handleInviteSent} />
      <Separator className="my-12" />
      <ConvitesTable refetch={refetch} />
    </>
  );
}
