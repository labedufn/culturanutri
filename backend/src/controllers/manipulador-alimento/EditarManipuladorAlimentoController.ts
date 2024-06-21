import { ManipuladorAlimento } from "@models/ManipuladorAlimento";
import { EditarManipuladorAlimentoService } from "@services/manipulador-alimento/EditarManipuladorAlimentoService";
import converterBase64JSON from "@utils/converterBase64JSON";
import { Request, Response } from "express";

export class EditarManipuladorAlimentoController {
  async handle(req: Request, res: Response) {
    const { id_manipulador_alimento, id_estabelecimento, json_informacoes, ativo } = req.body;

    try {
      const { informacoes } = await converterBase64JSON(json_informacoes);
      const data_cadastro = new Date();
      const data_alteracao = new Date();

      const manipuladorAlimento = new ManipuladorAlimento(
        id_estabelecimento,
        informacoes,
        data_cadastro,
        data_alteracao,
        ativo,
      );
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
