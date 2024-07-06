import { Request, Response } from "express";
import { EditarUsuarioService } from "@services/usuario/EditarUsuarioService";
import { BuscarUsuarioService } from "@services/usuario/BuscarUsuarioService";
import { compare } from "bcrypt";

export class EditarSenhaUsuarioController {
  async handle(req: Request, res: Response) {
    const { senhaAtual, novaSenha } = req.body;
    const idUsuario = req.id_usuario;

    try {
      const buscarUsuarioService = new BuscarUsuarioService();
      const { usuario: usuarioAtual } = await buscarUsuarioService.execute(idUsuario);

      const senhaCorreta = await compare(senhaAtual, usuarioAtual.senha);
      if (!senhaCorreta) {
        return res.status(400).json({ error: "Senha atual incorreta." });
      }

      const editarUsuarioService = new EditarUsuarioService();
      const resultado = await editarUsuarioService.atualizarSenha(idUsuario, novaSenha);

      return res.json(resultado);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
