"use client";

import { getPages } from "@/lib/pages";
import { usePathname } from "next/navigation";

export function PageTitle() {
  const pathname = usePathname();
  const pages = getPages(pathname);

  const activeMenus = pages.map(({ menus }) => menus.find((menu) => menu.active));

  let pageTitle = "";
  for (const menu of activeMenus) {
    if (menu?.submenus?.length ?? 0 > 0) {
      const activeSubmenu = menu?.submenus?.find((submenu) => submenu.active);
      if (activeSubmenu) {
        pageTitle = activeSubmenu.label;
      }
    } else if (menu) {
      pageTitle = menu.label;
    }
  }

  return <h1 className="font-bold">{pageTitle}</h1>;
}
