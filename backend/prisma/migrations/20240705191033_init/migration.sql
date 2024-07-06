/*
  Warnings:

  - You are about to drop the column `gestoresId` on the `analises_quantitativas` table. All the data in the column will be lost.
  - You are about to drop the column `manipuladorAlimentoId` on the `analises_quantitativas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "analises_quantitativas" DROP CONSTRAINT "analises_quantitativas_gestoresId_fkey";

-- DropForeignKey
ALTER TABLE "analises_quantitativas" DROP CONSTRAINT "analises_quantitativas_manipuladorAlimentoId_fkey";

-- AlterTable
ALTER TABLE "analises_quantitativas" DROP COLUMN "gestoresId",
DROP COLUMN "manipuladorAlimentoId";
