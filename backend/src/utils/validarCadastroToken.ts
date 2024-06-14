import { prisma } from "@config/prismaClient";
import { Request, Response } from "express";
import { verify } from "jsonwebtoken";

export async function validarCadastroToken(req: Request, res: Response) {
  const { token } = req.query;

  if (!token || typeof token !== "string") {
    return res.status(400).json({ error: "Token é obrigatório." });
  }

  try {
    verify(token, process.env.SECRET_KEY);

    const cadastroToken = await prisma.cadastroToken.findUnique({
      where: { token: token },
    });

    if (!cadastroToken || new Date() > cadastroToken.expira_em) {
      throw new Error("Token inválido ou expirado.");
    }

    res.json(true);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
