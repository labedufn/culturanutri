import { AutenticarUsuarioService } from "@services/usuario/AutenticarUsuarioService";
import { Request, Response } from "express";

export class AutenticarUsuarioController {
  async handle(req: Request, res: Response) {
    const { emailOuCpf, senha } = req.body;
    const autenticarUsuarioService = new AutenticarUsuarioService();

    try {
      const autenticar = await autenticarUsuarioService.execute({
        emailOuCpf,
        senha,
      });
      return res.json(autenticar);
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        return res.status(401).json({ error: error.message });
      } else {
        return res.status(500).json({ error: "Erro interno do servidor" });
      }
    }
  }
}
