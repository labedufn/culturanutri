"use client";

import { getPages } from "@/lib/pages";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function PageTitle() {
  const pathname = usePathname();
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    const pages = getPages(pathname, "ADMINISTRADOR" || "AVALIADOR");
    const activeMenus = pages.map(({ menus }) => menus.find((menu) => menu.active));

    let foundTitle = "";

    for (const menu of activeMenus) {
      if (menu?.submenus?.length ?? 0 > 0) {
        const activeSubmenu = menu?.submenus?.find((submenu) => submenu.active);
        if (activeSubmenu) {
          foundTitle = activeSubmenu.label;
          break;
        }
      } else if (menu) {
        foundTitle = menu.label;
        break;
      }
    }

    if (foundTitle) {
      setPageTitle(foundTitle);
    } else {
      // Extrai o texto antes do |
      const tabTitle = document.title.split("|")[0].trim();
      setPageTitle(tabTitle);
    }
  }, [pathname]);

  return <h1 className="font-bold">{pageTitle}</h1>;
}
