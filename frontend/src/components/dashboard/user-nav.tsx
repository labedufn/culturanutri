"use client";

import { useState, useEffect } from "react";
import { listarInformacoesUsuario } from "@/actions/listar-informacoes-usuario";
import { logout } from "@/actions/login";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CircleUserRound, Home, LogOut, User } from "lucide-react";
import Link from "next/link";
import { formatarPalavra } from "@/scripts/formatarPalavra";

export function UserNav() {
  const [userInfo, setUserInfo] = useState({ nome: "Nome", sobrenome: "Usuário", tipo_usuario: "Avaliador" });
  const [menuOpen, setMenuOpen] = useState(false);

  const fetchUserInfo = async () => {
    const response = await listarInformacoesUsuario();
    if (response.success) {
      setUserInfo({
        nome: response.data.usuario.nome,
        sobrenome: response.data.usuario.sobrenome,
        tipo_usuario: response.data.usuario.tipo_usuario,
      });
    } else {
      console.error(response.message);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      fetchUserInfo();
    }
  }, [menuOpen]);

  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
      window.location.href = "/autenticacao/login";
    } else {
      console.error(response.message);
    }
  };

  return (
    <DropdownMenu onOpenChange={setMenuOpen}>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <CircleUserRound size={28} className="cursor-pointer text-zinc-800" />
            </DropdownMenuTrigger>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {formatarPalavra(userInfo.nome) + " " + formatarPalavra(userInfo.sobrenome)}
            </p>
            <p className="text-xs leading-none text-muted-foreground">{formatarPalavra(userInfo.tipo_usuario)}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/dashboard" className="flex items-center">
              <Home className="w-4 h-4 mr-3 text-muted-foreground" />
              Visão Geral
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/dashboard/conta" className="flex items-center">
              <User className="w-4 h-4 mr-3 text-muted-foreground" />
              Conta
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:cursor-pointer" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
