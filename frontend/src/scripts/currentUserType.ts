"use server";

import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function currentUserType() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.SECRET_KEY));
    console.log("Tipo de usuário:", payload.tipo_usuario);
    return payload.tipo_usuario;
  } catch (error) {
    console.error("Token inválido:", error);
    return null;
  }
}
