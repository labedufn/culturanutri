import { Gestor } from "@models/Gestor";
import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class CriarGestorService {
  async execute(gestor: Gestor) {
    const gestorCriado = await prisma.gestores.create({
      data: {
        data_alteracao: gestor.data_alteracao,
        data_cadastro: gestor.data_cadastro,
        informacoes: gestor.informacoes,
        ativo: gestor.ativo,
      },
      select: {
        id: true,
        data_cadastro: true,
        data_alteracao: true,
        informacoes: true,
        ativo: true,
      },
    });

    const informacoesDecodificadas = await desconverterBase64JSON(gestorCriado.informacoes);

    return {
      ...gestorCriado,
      informacoesDecodificadas: informacoesDecodificadas,
    };
  }
}
