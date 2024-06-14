"use server";

import { apiErro } from "@/api/api-erros";
import { LOGIN } from "@/api/endpoints";
import axios from "axios";
import { cookies } from "next/headers";

export async function login(data: { emailOuCpf: string; senha: string; rememberMe: boolean }) {
  console.log(data);
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
    const maxAge = data.rememberMe ? 604800 : 14400; // 7 dias se lembrar, senão 4 horas
    cookies().set("token", dados.token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: maxAge,
    });
  } catch (error: any) {
    console.error(error.response?.data);

    return {
      success: false,
      message: apiErro(error),
    };
  }
}
