"use server";

import axios from "axios";
import { ADICIONAR_USUARIO } from "@/api/endpoints";
import { cookies } from "next/headers";
import { verificarToken } from "@/scripts/verificarToken";

interface AdicionarUsuarioData {
  email: string;
  tipo: string;
}

export async function adicionarUsuario(data: AdicionarUsuarioData): Promise<{ success: boolean; message: string }> {
  console.log("Envio de dados para adicionar usuário", data);

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
    const { url } = ADICIONAR_USUARIO();
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Resposta da API:", response.headers);

    return {
      success: true,
      message: response.data.message,
    };
  } catch (error: any) {
    console.error("Erro na resposta da API:", error.response?.data);
    return {
      success: false,
      message: "Erro ao adicionar usuário.",
    };
  }
}
