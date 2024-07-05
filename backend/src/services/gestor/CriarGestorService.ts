import { Gestor } from "@models/Gestor";
import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class CriarGestorService {
  async execute(gestor: Gestor) {
    const gestorCriado = await prisma.gestores.create({
      data: {
        id_estabelecimento: gestor.id_estabelecimento,
        informacoes: gestor.informacoes,
        ativo: gestor.ativo,
      },
      select: {
        id: true,
        id_estabelecimento: true,
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