/*
  Warnings:

  - You are about to drop the `gestores_avaliacoes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "analises_quantitativas" DROP CONSTRAINT "analises_quantitativas_id_gestor_avaliacao_fkey";

-- DropTable
DROP TABLE "gestores_avaliacoes";

-- CreateTable
CREATE TABLE "gestores" (
    "id" TEXT NOT NULL,
    "data_cadastro" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_alteracao" TIMESTAMPTZ(3) NOT NULL,
    "informacoes" VARCHAR(255) NOT NULL,
    "ativo" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "gestores_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "analises_quantitativas" ADD CONSTRAINT "analises_quantitativas_id_gestor_avaliacao_fkey" FOREIGN KEY ("id_gestor_avaliacao") REFERENCES "gestores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
