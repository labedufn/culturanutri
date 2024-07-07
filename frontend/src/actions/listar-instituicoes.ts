"use server";

import { apiErro } from "@/api/api-erros";
import { LISTAR_INSTITUICOES } from "@/api/endpoints";
import axios from "axios";

export async function listarInstituicoes() {
  try {
    const { url } = LISTAR_INSTITUICOES();
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
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
