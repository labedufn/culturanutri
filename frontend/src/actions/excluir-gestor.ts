"use server";

import { apiErro } from "@/api/api-erros";
import { EXCLUIR_GESTOR } from "@/api/endpoints";
import { verificarToken } from "@/scripts/verificarToken";
import axios from "axios";
import { cookies } from "next/headers";

export async function excluirGestor(data: { id_gestor: string }) {
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
    const { url } = EXCLUIR_GESTOR();
    const response = await axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
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
