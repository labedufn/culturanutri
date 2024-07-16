"use server";

import { apiErro } from "@/api/api-erros";
import { BUSCAR_USUARIO } from "@/api/endpoints";
import { cookies } from "next/headers";
import axios from "axios";

interface UsuarioResponse {
  success: boolean;
  data?: {
    usuario: {
      tipo_usuario: string;
      ativo: number;
    };
  };
  message?: string;
}

export async function buscarUsuario(): Promise<UsuarioResponse> {
  const cookieData = cookies().get("token");
  const token = cookieData ? cookieData.value : null;

  try {
    const { url } = BUSCAR_USUARIO();
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const dados = response.data;
    return {
      success: true,
      data: dados,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: apiErro(error),
    };
  }
}
