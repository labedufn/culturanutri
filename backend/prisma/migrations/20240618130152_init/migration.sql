/*
  Warnings:

  - You are about to drop the column `tipo_usuario` on the `usuarios` table. All the data in the column will be lost.
  - Added the required column `codigo_tipo_usuario` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item_tipo_usuario` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "tipo_usuario",
ADD COLUMN     "codigo_tipo_usuario" INTEGER NOT NULL,
ADD COLUMN     "item_tipo_usuario" INTEGER NOT NULL;
