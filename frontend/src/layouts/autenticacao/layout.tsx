"use client";

import { Logo } from "@/components/utils/logo";

interface LayoutAutenticacaoProps {
  children: React.ReactNode;
}

export default function LayoutAutenticacao({ children }: LayoutAutenticacaoProps) {
  return (
    <>
      <div className="flex items-center justify-center flex-col gap-10 min-h-screen bg-[url('../assets/images/background-auth.png')] bg-cover px-6">
        <div className="mt-6">
          <Logo />
        </div>
        {children}
      </div>
    </>
  );
}
