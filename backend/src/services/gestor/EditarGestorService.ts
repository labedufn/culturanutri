import { Gestor } from "@models/Gestor";
import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

export class EditarGestosService {
  async execute(idGestor: string, gestor: Gestor) {
    const gestorAlterado = await prisma.gestores.update({
      where: {
        id: idGestor,
      },
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

    const informacoesDecodificadas = await desconverterBase64JSON(gestorAlterado.informacoes);

    return {
      ...gestorAlterado,
      informacoesDecodificadas: informacoesDecodificadas,
    };
  }
}
