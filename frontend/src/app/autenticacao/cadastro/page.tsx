import { CadastroForm } from "@/components/autenticacao/cadastro-form";
import LayoutAutenticacao from "@/layouts/autenticacao/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadastro | Cultura de Segurança dos Alimentos",
  description: "Cultura de Segurança dos Alimentos",
};

export default async function CadastroPage() {
  return (
    <>
      <LayoutAutenticacao>
        <div className="w-full flex flex-col max-w-md bg-white px-6 py-10 rounded-2xl gap-10">
          <CadastroForm />
        </div>
      </LayoutAutenticacao>
    </>
  );
}
