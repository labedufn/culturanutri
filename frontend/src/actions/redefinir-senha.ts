"use server";

import { apiErro } from "@/api/api-erros";
import { REDEFINIR_SENHA } from "@/api/endpoints";
import { verificarToken } from "@/scripts/verificarToken";
import axios from "axios";

function extrairToken(url: string): string | null {
  const match = url.match(/token=([^&]+)/);
  return match ? match[1] : null;
}

export async function redefinirSenha(data: { novaSenha: string }, url: string) {
  const token = extrairToken(url)?.toString();

  if (!token || !(await verificarToken(token))) {
    console.error("Token inválido ou expirado.");
    return {
      success: false,
      message: "Token inválido ou expirado.",
    };
  }

  try {
    const url = REDEFINIR_SENHA().url + `?token=${token}`;
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      success: true,
      message: response.data.message,
    };
  } catch (error: any) {
    console.error(error.response?.data);

    return {
      success: false,
      message: apiErro(error),
    };
  }
}
