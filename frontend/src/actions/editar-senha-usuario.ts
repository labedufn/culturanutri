"use server";

import { apiErro } from "@/api/api-erros";
import { ALTERAR_SENHA_USUARIO } from "@/api/endpoints";
import { verificarToken } from "@/scripts/verificarToken";
import axios from "axios";
import { cookies } from "next/headers";

export async function alterarSenhaUsuario(data: { senhaAtual: string; novaSenha: string }) {
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
    const { url } = ALTERAR_SENHA_USUARIO();
    const response = await axios.put(url, data, {
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
