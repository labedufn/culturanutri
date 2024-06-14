import { RedefinirSenhaForm } from "@/components/autenticacao/redefinir-senha-form";
import LayoutAutenticacao from "@/layouts/autenticacao/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Redefinir Senha | Cultura de Segurança dos Alimentos",
  description: "Cultura de Segurança dos Alimentos",
};

export default function LoginPage() {
  return (
    <>
      <LayoutAutenticacao>
        <div className="w-full flex flex-col max-w-md bg-white px-6 py-10 rounded-3xl gap-10">
          <RedefinirSenhaForm />
        </div>
      </LayoutAutenticacao>
    </>
  );
}
