import { Home, NotebookPen, Settings, Users, UtensilsCrossed } from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getPages(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Visão Geral",
          active: pathname === "/dashboard",
          icon: Home,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Funcionalidades",
      menus: [
        {
          href: "/dashboard/avaliacoes",
          label: "Avaliações",
          active: pathname.startsWith("/dashboard/avaliacoes/") || pathname === "/dashboard/avaliacoes",
          icon: NotebookPen,
          submenus: [
            {
              href: "/dashboard/avaliacoes",
              label: "Todas as Avaliações",
              active: pathname === "/dashboard/avaliacoes",
            },
            {
              href: "/dashboard/avaliacoes/nova",
              label: "Nova Avaliação",
              active: pathname === "/dashboard/avaliacoes/nova",
            },
            {
              href: "/dashboard/avaliacoes/minhas",
              label: "Minhas Avaliações",
              active: pathname === "/dashboard/avaliacoes/minhas",
            },
          ],
        },
      ],
    },
    {
      groupLabel: "Configurações",
      menus: [
        {
          href: "/dashboard/estabelecimentos",
          label: "Estabelecimentos",
          active: pathname.startsWith("/dashboard/estabelecimentos/") || pathname === "/dashboard/estabelecimentos",
          icon: UtensilsCrossed,
          submenus: [
            {
              href: "/dashboard/estabelecimentos",
              label: "Todos os Locais",
              active: pathname === "/dashboard/estabelecimentos",
            },
            {
              href: "/dashboard/estabelecimentos/add",
              label: "Adicionar Local",
              active: pathname === "/dashboard/estabelecimentos/add",
            },
          ],
        },
        {
          href: "/dashboard/usuarios",
          label: "Usuários",
          active: pathname.startsWith("/dashboard/usuarios/") || pathname === "/dashboard/usuarios",
          icon: Users,
          submenus: [
            {
              href: "/dashboard/usuarios",
              label: "Todos os Usuários",
              active: pathname === "/dashboard/usuarios",
            },
            {
              href: "/dashboard/usuarios/add",
              label: "Adicionar Usuário",
              active: pathname === "/dashboard/usuarios/add",
            },
            {
              href: "/dashboard/usuarios/convites",
              label: "Convites Enviados",
              active: pathname === "/dashboard/usuarios/convites",
            },
          ],
        },
        {
          href: "/dashboard/conta",
          label: "Conta",
          active: pathname.startsWith("/dashboard/conta") || pathname === "/dashboard/conta",
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
