/*
  Warnings:

  - Added the required column `tipo` to the `cadastros_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cadastros_tokens" ADD COLUMN     "tipo" "TipoUsuario" NOT NULL;
