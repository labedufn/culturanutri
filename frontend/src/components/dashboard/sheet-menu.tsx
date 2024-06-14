import { MenuIcon } from "lucide-react";
import Link from "next/link";

import { Menu } from "@/components/dashboard/menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { IconNutri } from "../utils/icon-nutri";

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outlineWhite" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col bg-zinc-800 text-white" side="left">
        <SheetHeader>
          <Button className="flex justify-center items-center pb-2 pt-1" variant="title" asChild>
            <Link href="/dashboard" className="flex items-center gap-2">
              <IconNutri className="w-8 h-8 mr-1" color="#F5A524" />
              <h1 className="font-bold text-lg">Cultura</h1>
            </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}
