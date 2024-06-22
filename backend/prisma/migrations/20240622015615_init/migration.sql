/*
  Warnings:

  - You are about to drop the column `tipo` on the `cadastros_tokens` table. All the data in the column will be lost.
  - Added the required column `tipo_usuario` to the `cadastros_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cadastros_tokens" DROP COLUMN "tipo",
ADD COLUMN     "tipo_usuario" "TipoUsuario" NOT NULL;
