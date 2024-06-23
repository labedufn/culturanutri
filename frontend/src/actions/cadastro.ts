"use server";

import { apiErro } from "@/api/api-erros";
import { CADASTRO } from "@/api/endpoints";
import { verificarToken } from "@/scripts/verificarToken";
import axios from "axios";
import { cookies } from "next/headers";

function extrairToken(url: string): string | null {
  const match = url.match(/token=([^&]+)/);
  return match ? match[1] : null;
}

export async function cadastro(
  data: { nome: string; sobrenome: string; cpf: string; email: string; senha: string },
  url: string,
) {
  console.log(data);
  const token = extrairToken(url);
  if (!token || !(await verificarToken(token))) {
    console.error("Token inválido ou expirado.");
    return {
      success: false,
      message: "Token inválido ou expirado.",
    };
  }

  try {
    const { url } = CADASTRO();
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const dados = response.data;
    cookies().set("token", dados.token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 14400, // 4 horas
    });
    return {
      success: true,
    };
  } catch (error: unknown) {
    console.log(error);

    return {
      success: false,
      message: apiErro(error),
    };
  }
}
