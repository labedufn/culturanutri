-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('ADMINISTRADOR', 'GESTOR', 'AVALIADOR');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "tipo" "TipoUsuario" NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "ultimo_login" TIMESTAMPTZ(3),
    "criado_em" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reset_senha_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "usado" BOOLEAN NOT NULL DEFAULT false,
    "expira_em" TIMESTAMPTZ(3) NOT NULL,
    "criado_em" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reset_senha_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cadastro_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tipo" "TipoUsuario" NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "usado" BOOLEAN NOT NULL DEFAULT false,
    "expira_em" TIMESTAMPTZ(3) NOT NULL,
    "criado_em" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cadastro_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aplicacoes" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "aplicacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario_aplicacoes" (
    "usuario_id" TEXT NOT NULL,
    "aplicacao_id" TEXT NOT NULL,

    CONSTRAINT "usuario_aplicacoes_pkey" PRIMARY KEY ("usuario_id","aplicacao_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_cpf_key" ON "usuarios"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "reset_senha_tokens_token_key" ON "reset_senha_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "cadastro_tokens_token_key" ON "cadastro_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "aplicacoes_nome_key" ON "aplicacoes"("nome");

-- AddForeignKey
ALTER TABLE "reset_senha_tokens" ADD CONSTRAINT "reset_senha_tokens_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cadastro_tokens" ADD CONSTRAINT "cadastro_tokens_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_aplicacoes" ADD CONSTRAINT "usuario_aplicacoes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_aplicacoes" ADD CONSTRAINT "usuario_aplicacoes_aplicacao_id_fkey" FOREIGN KEY ("aplicacao_id") REFERENCES "aplicacoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
