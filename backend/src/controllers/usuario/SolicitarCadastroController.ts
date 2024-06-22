import { SolicitarCadastroService } from "@services/usuario/SolicitarCadastroService";
import { Request, Response } from "express";

export class SolicitarCadastroController {
  async handle(req: Request, res: Response) {
    const { email, tipo_usuario } = req.body;

    const idUsuario = req.id_usuario;

    try {
      const solicitarCadastroService = new SolicitarCadastroService();

      await solicitarCadastroService.execute(idUsuario, email, tipo_usuario);
      res.status(200).json({ message: "E-mail para realizar o cadastro enviado com sucesso!" });
    } catch (error) {
      if (error.message === "Usuário já existe.") {
        res.status(400).json({ error: error.message });
      } else {
        console.error("Erro ao enviar o e-mail:", error);
        res.status(500).json({
          error: "Ocorreu um erro ao enviar o e-mail para cadastro.",
        });
      }
    }
  }
}
