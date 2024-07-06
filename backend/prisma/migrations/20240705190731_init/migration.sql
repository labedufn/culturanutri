/*
  Warnings:

  - You are about to drop the column `id_gestor` on the `analises_quantitativas` table. All the data in the column will be lost.
  - You are about to drop the column `id_manipulador_alimentos` on the `analises_quantitativas` table. All the data in the column will be lost.
  - Added the required column `id_estabelecimento` to the `analises_quantitativas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "analises_quantitativas" DROP CONSTRAINT "analises_quantitativas_id_gestor_fkey";

-- DropForeignKey
ALTER TABLE "analises_quantitativas" DROP CONSTRAINT "analises_quantitativas_id_manipulador_alimentos_fkey";

-- AlterTable
ALTER TABLE "analises_quantitativas" DROP COLUMN "id_gestor",
DROP COLUMN "id_manipulador_alimentos",
ADD COLUMN     "gestoresId" TEXT,
ADD COLUMN     "id_estabelecimento" TEXT NOT NULL,
ADD COLUMN     "manipuladorAlimentoId" TEXT;

-- AddForeignKey
ALTER TABLE "analises_quantitativas" ADD CONSTRAINT "analises_quantitativas_id_estabelecimento_fkey" FOREIGN KEY ("id_estabelecimento") REFERENCES "estabelecimentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "analises_quantitativas" ADD CONSTRAINT "analises_quantitativas_gestoresId_fkey" FOREIGN KEY ("gestoresId") REFERENCES "gestores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "analises_quantitativas" ADD CONSTRAINT "analises_quantitativas_manipuladorAlimentoId_fkey" FOREIGN KEY ("manipuladorAlimentoId") REFERENCES "manipuladores_alimentos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
