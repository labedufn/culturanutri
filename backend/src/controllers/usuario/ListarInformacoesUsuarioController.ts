import { ListarInformacoesUsuarioService } from "@services/usuario/ListarInformacoesUsuarioService";
import { Request, Response } from "express";

export class ListarInformacoesUsuarioController {
  async handle(req: Request, res: Response) {
    const idUsuario = req.id_usuario;

    try {
      console.log("ListarInformacoesUsuarioController -> idUsuario", idUsuario);
      const listarInformacoesUsuarioService = new ListarInformacoesUsuarioService();
      const usuarios = await listarInformacoesUsuarioService.execute(idUsuario);

      return res.json(usuarios);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
