import { RecuperarSenhaForm } from "@/components/autenticacao/recuperar-senha-form";
import LayoutAutenticacao from "@/layouts/autenticacao/layout";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Recuperar Senha | Cultura de Segurança dos Alimentos",
  description: "Cultura de Segurança dos Alimentos",
};

export default function LoginPage() {
  return (
    <>
      <LayoutAutenticacao>
        <div className="w-full flex flex-col max-w-md bg-white px-6 py-10 rounded-2xl gap-10">
          <RecuperarSenhaForm />

          <Link
            className="flex self-center text-md font-medium text-green-700 hover:text-green-900"
            href="/autenticacao/login"
          >
            Voltar para o login
          </Link>
        </div>
      </LayoutAutenticacao>
    </>
  );
}
