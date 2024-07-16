"use server";

import { apiErro } from "@/api/api-erros";
import { LISTAR_CONVITES } from "@/api/endpoints";
import axios from "axios";
import { cookies } from "next/headers";

export async function listarConvites() {
  const cookieData = cookies().get("token");
  const token = cookieData ? cookieData.value : null;

  try {
    const { url } = LISTAR_CONVITES();
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const dados = response.data;
    console.log(dados);
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
