"use server";

import { apiErro } from "@/api/api-erros";
import { cookies } from "next/headers";
import axios from "axios";
import { BUSCAR_AVALIACAO } from "@/api/endpoints";

interface AvaliacaoResponse {
  success: boolean;
  data?: {
    id: string;
    id_estabelecimento: string;
    data_cadastro: string;
    slug: string;
    ativo: number;
    Estabelecimento: {
      nome: string;
    };
  };
  message?: string;
}

export async function buscarAvaliacao(id_avaliacao: string): Promise<AvaliacaoResponse> {
  const cookieData = cookies().get("token");
  const token = cookieData ? cookieData.value : null;

  try {
    const { url } = BUSCAR_AVALIACAO();
    const response = await axios.get(`${url}?id_avaliacao=${id_avaliacao}`, {
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
