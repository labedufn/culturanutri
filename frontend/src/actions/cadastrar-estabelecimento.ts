"use server";

import { apiErro } from "@/api/api-erros";
import { CADASTRAR_ESTABELECIMENTO } from "@/api/endpoints";
import { verificarToken } from "@/scripts/verificarToken";
import axios from "axios";
import { cookies } from "next/headers";

export async function cadastrarEstabelecimento(data: {
  nome: string;
  cnae: string;
  endereco: string;
  pessoal_ocupado: number;
  numero_refeicoes: number;
  possui_alvara_sanitario: number;
  possui_responsavel_boas_praticas: number;
}) {
  const cookieData = cookies().get("token");
  const token = cookieData ? cookieData.value : null;
  console.log("Token do usuário", token);

  if (!token || !(await verificarToken(token))) {
    console.error("Token inválido ou expirado.");
    return {
      success: false,
      message: "Token inválido ou expirado.",
    };
  }

  try {
    const { url } = CADASTRAR_ESTABELECIMENTO();
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      success: true,
      message: response.data.message,
    };
  } catch (error: unknown) {
    console.log(error);

    return {
      success: false,
      message: apiErro(error),
    };
  }
}
