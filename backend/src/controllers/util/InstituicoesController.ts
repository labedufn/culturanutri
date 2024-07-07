import { InstituicoesService } from "@services/util/InstituicoesService";
import { Request, Response } from "express";

export class InstituicoesController {
  async handle(req: Request, res: Response) {
    try {
      const buscarInstituicaoService = new InstituicoesService();
      const instituicoes = await buscarInstituicaoService.execute();

      return res.json(instituicoes);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
