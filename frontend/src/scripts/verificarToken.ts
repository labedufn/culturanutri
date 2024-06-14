import { jwtVerify } from "jose";

export async function verificarToken(token: string): Promise<boolean> {
  if (!token) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.SECRET_KEY), {
      algorithms: ["HS256"],
    });
    return true;
  } catch (error) {
    return false;
  }
}
