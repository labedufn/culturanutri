"use server";

import { apiErro } from "@/api/api-erros";
import { LISTAR_INFORMACOES_USUARIO } from "@/api/endpoints";
import axios from "axios";
import { cookies } from "next/headers";

export async function listarInformacoesUsuario() {
  const cookieData = cookies().get("token");
  const token = cookieData ? cookieData.value : null;

  try {
    const { url } = LISTAR_INFORMACOES_USUARIO();
    console.log("URL da API:", url);
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Resposta da API:", response);
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
