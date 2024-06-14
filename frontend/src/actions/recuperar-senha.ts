"use server";

import { apiErro } from "@/api/api-erros";
import { RECUPERAR_SENHA } from "@/api/endpoints";
import axios from "axios";

export async function recuperarSenha(data: { email: string }) {
  try {
    const { url } = RECUPERAR_SENHA();
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
