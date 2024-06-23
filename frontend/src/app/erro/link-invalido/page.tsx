import { FeedbackMessage } from "@/components/utils/feedback-message";
import LayoutAutenticacao from "@/layouts/autenticacao/layout";
import { LinkOffRounded } from "@mui/icons-material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Erro | Cultura de Segurança dos Alimentos",
  description: "Cultura de Segurança dos Alimentos",
};

export default function LinkInvalidoPage() {
  return (
    <>
      <LayoutAutenticacao>
        <div className="w-full flex flex-col max-w-md bg-white px-6 py-10 rounded-2xl gap-10">
          <FeedbackMessage
            type="error"
            icon={<LinkOffRounded className="w-32 h-32" />}
            titulo={"Ops, link inválido!"}
            descricao={"Link inválido ou expirado."}
            buttonText={"Voltar para login"}
            redirectTo={"/autenticacao/login"}
          />
        </div>
      </LayoutAutenticacao>
    </>
  );
}
