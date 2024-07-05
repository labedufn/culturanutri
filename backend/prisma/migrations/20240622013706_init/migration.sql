/*
  Warnings:

  - The values [GESTOR] on the enum `TipoUsuario` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TipoUsuario_new" AS ENUM ('ADMINISTRADOR', 'AVALIADOR');
ALTER TABLE "usuarios" ALTER COLUMN "tipo_usuario" TYPE "TipoUsuario_new" USING ("tipo_usuario"::text::"TipoUsuario_new");
ALTER TYPE "TipoUsuario" RENAME TO "TipoUsuario_old";
ALTER TYPE "TipoUsuario_new" RENAME TO "TipoUsuario";
DROP TYPE "TipoUsuario_old";
COMMIT;
