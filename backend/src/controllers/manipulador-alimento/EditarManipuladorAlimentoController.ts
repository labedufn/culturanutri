import { ManipuladorAlimento } from "@models/ManipuladorAlimento";
import { EditarManipuladorAlimentoService } from "@services/manipulador-alimento/EditarManipuladorAlimentoService";
import converterBase64JSON from "@utils/converterBase64JSON";
import { Request, Response } from "express";

export class EditarManipuladorAlimentoController {
  async handle(req: Request, res: Response) {
    const { id_manipulador_alimento, id_estabelecimento, json_informacoes, ativo } = req.body;

    try {
<<<<<<< HEAD
      const { informacoes } = await converterBase64JSON(json_informacoes, "informacoes");

      const manipuladorAlimento = new ManipuladorAlimento(informacoes, ativo);
=======
      const { informacoes } = await converterBase64JSON(json_informacoes);

      const manipuladorAlimento = new ManipuladorAlimento(informacoes, ativo, id_estabelecimento);
>>>>>>> main
      const editarManipuladorAlimentoService = new EditarManipuladorAlimentoService();
      const gestorAlterado = await editarManipuladorAlimentoService.execute(
        id_manipulador_alimento,
        manipuladorAlimento,
      );

      return res.json(gestorAlterado);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
