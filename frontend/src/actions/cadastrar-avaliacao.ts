"use server";

import { apiErro } from "@/api/api-erros";
import { CADASTRAR_AVALIACAO } from "@/api/endpoints";
import { verificarToken } from "@/scripts/verificarToken";
import axios from "axios";
import { cookies } from "next/headers";

export async function cadastrarAvaliacao(id_estabelecimento: string) {
  const cookieData = cookies().get("token");
  const token = cookieData ? cookieData.value : null;

  if (!token || !(await verificarToken(token))) {
    console.error("Token inválido ou expirado.");
    return {
      success: false,
      message: "Token inválido ou expirado.",
    };
  }

  try {
    const { url } = CADASTRAR_AVALIACAO();
    const response = await axios.post(
      url,
      { id_estabelecimento },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return {
      success: true,
      message: response.data.message,
      avaliacaoCriada: response.data,
    };
  } catch (error: unknown) {
    console.log(error);

    return {
      success: false,
      message: apiErro(error),
    };
  }
}
