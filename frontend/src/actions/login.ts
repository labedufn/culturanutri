"use server";

import { apiErro } from "@/api/api-erros";
import { LOGIN } from "@/api/endpoints";
import axios from "axios";
import { cookies } from "next/headers";

export async function login(data: { emailOuCpf: string; senha: string; rememberMe: boolean }) {
  try {
    const { url } = LOGIN();
    const response = await axios.post(
      url,
      {
        emailOuCpf: data.emailOuCpf,
        senha: data.senha,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const dados = response.data;

    const cookieOptions: any = {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    };

    if (data.rememberMe) {
      cookieOptions.maxAge = 604800; // 7 dias
    }

    cookies().set("token", dados.token, cookieOptions);

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      message: apiErro(error),
    };
  }
}

export async function logout() {
  try {
    cookies().delete({
      name: "token",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      message: "Erro ao tentar sair",
    };
  }
}
