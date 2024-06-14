import { RecuperarSenhaService } from "@services/usuario/RecuperarSenhaService";
import { Request, Response } from "express";

export class RecuperarSenhaController {
  async handle(req: Request, res: Response) {
    const { email } = req.body;
    const recuperarSenhaService = new RecuperarSenhaService();

    try {
      await recuperarSenhaService.execute(email);
      res.status(200).json({ message: "E-mail de recuperação de senha enviado com sucesso!" });
    } catch (error) {
      if (error.message === "Usuário não encontrado.") {
        res.status(404).json({ error: error.message });
      } else {
        console.error("Erro ao enviar o e-mail:", error);
        res.status(500).json({
          error: "Ocorreu um erro ao enviar o e-mail de recuperação de senha.",
        });
      }
    }
  }
}
