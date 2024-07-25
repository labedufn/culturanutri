import { Gestor } from "@models/Gestor";
import { PrismaClient } from "@prisma/client";
import desconverterBase64JSON from "@utils/desconverterBase64JSON";

const prisma = new PrismaClient();

<<<<<<< HEAD:backend/src/services/gestor/EditarGestorService.ts
export class EditarGestosService {
  async execute(idGestor: string, gestor: Gestor) {
    const gestorAlterado = await prisma.gestores.update({
=======
export class EditarGestorAvaliacaoService {
  async execute(idGestor: string, gestorAvaliacao: GestorAvaliacao) {
    console.log("idGestor:", idGestor);
    console.log("gestorAvaliacao:", gestorAvaliacao);

    const estabelecimento = await prisma.estabelecimento.findUnique({
      where: {
        id: gestorAvaliacao.id_estabelecimento,
      },
    });

    if (!estabelecimento) {
      throw new Error("Estabelecimento não encontrado");
    }

    const gestorExistente = await prisma.gestorAvaliacao.findUnique({
      where: {
        id: idGestor,
      },
    });

    if (!gestorExistente) {
      throw new Error("Gestor Avaliador não encontrado");
    }

    const gestorAlterado = await prisma.gestorAvaliacao.update({
>>>>>>> main:backend/src/services/gestor-avaliacao/EditarGestorAvaliacaoService.ts
      where: {
        id: idGestor,
      },
      data: {
<<<<<<< HEAD:backend/src/services/gestor/EditarGestorService.ts
        data_alteracao: gestor.data_alteracao,
        data_cadastro: gestor.data_cadastro,
        informacoes: gestor.informacoes,
        ativo: gestor.ativo,
      },
      select: {
=======
        id_estabelecimento: gestorAvaliacao.id_estabelecimento,
        informacoes: gestorAvaliacao.informacoes,
        ativo: gestorAvaliacao.ativo,
        data_alteracao: new Date().toISOString(),
      },
      select: {
        id: true,
        id_estabelecimento: true,
>>>>>>> main:backend/src/services/gestor-avaliacao/EditarGestorAvaliacaoService.ts
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
