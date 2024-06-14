import { LoginForm } from "@/components/autenticacao/login-form";
import LayoutAutenticacao from "@/layouts/autenticacao/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Laagin | Cultura de Segurança dos Alimentos",
  description: "Cultura de Segurança dos Alimentos",
};

export default function LoginPage() {
  return (
    <>
      <LayoutAutenticacao>
        <div className="w-full flex flex-col max-w-md bg-white px-6 py-10 rounded-2xl gap-10">
          <LoginForm />
          <a
            className="flex self-center text-md font-medium text-green-700 hover:text-green-900"
            href="/autenticacao/recuperar-senha"
          >
            Esqueceu sua senha?
          </a>
        </div>
      </LayoutAutenticacao>
    </>
  );
}
