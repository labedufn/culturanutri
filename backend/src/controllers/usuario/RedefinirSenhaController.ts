import { RedefinirSenhaService } from "@services/usuario/RedefinirSenhaService";
import { Request, Response } from "express";

export class RedefinirSenhaController {
  async handle(req: Request, res: Response) {
    const { token } = req.query;
    const { novaSenha } = req.body;
    const redefinirSenhaService = new RedefinirSenhaService();

    try {
      const response = await redefinirSenhaService.execute(String(token), novaSenha);
      res.status(200).json(response);
    } catch (error) {
      let status = 500;
      if (
        error.message === "Token inválido." ||
        error.message === "Token inválido ou expirado." ||
        error.message === "Token inválido, expirado ou já utilizado."
      ) {
        status = 400;
      }
      res.status(status).json({ error: error.message });
    }
  }
}
