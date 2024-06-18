/*
  Warnings:

  - You are about to drop the column `codigo_tipo_usuario` on the `cadastros_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `item_tipo_usuario` on the `cadastros_tokens` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cadastros_tokens" DROP COLUMN "codigo_tipo_usuario",
DROP COLUMN "item_tipo_usuario";
