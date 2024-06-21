-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('ADMINISTRADOR', 'GESTOR', 'AVALIADOR');

-- CreateTable
CREATE TABLE "gestores" (
    "id" TEXT NOT NULL,
    "data_cadastro" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_alteracao" TIMESTAMPTZ(3) NOT NULL,
    "informacoes" VARCHAR(255) NOT NULL,
    "ativo" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "gestores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manipuladores_alimentos" (
    "id" TEXT NOT NULL,
    "data_cadastro" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_alteracao" TIMESTAMPTZ(3) NOT NULL,
    "informacoes" VARCHAR(255) NOT NULL,
    "ativo" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "manipuladores_alimentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listas_verificacoes" (
    "id" TEXT NOT NULL,
    "informacoes" VARCHAR(255) NOT NULL,
    "data_cadastro" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_alteracao" TIMESTAMPTZ(3) NOT NULL,
    "categoria" INTEGER NOT NULL,
    "verificacao_id" TEXT NOT NULL,
    "id_triangulacoes" TEXT NOT NULL,

    CONSTRAINT "listas_verificacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tabelas_auxiliares" (
    "id" TEXT NOT NULL,
    "codigo_tabela" INTEGER NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "item_tabela" INTEGER NOT NULL,
    "id_listas_verificacoes" TEXT NOT NULL,
    "id_triangulacoes" TEXT NOT NULL,
    "id_analises_qualitativas" TEXT NOT NULL,
    "id_resultados" TEXT NOT NULL,

    CONSTRAINT "tabelas_auxiliares_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analises_qualitativas" (
    "id" TEXT NOT NULL,
    "analise_qualitativa_id" INTEGER NOT NULL,
    "categoria" INTEGER NOT NULL,
    "informacoes" VARCHAR(255) NOT NULL,
    "data_cadastro" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_alteracao" TIMESTAMPTZ(3) NOT NULL,
    "id_triangulacoes" TEXT NOT NULL,

    CONSTRAINT "analises_qualitativas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "triangulacoes" (
    "id" TEXT NOT NULL,
    "triangulacao_id" TEXT NOT NULL,
    "categoria" INTEGER NOT NULL,
    "id_lista_verificacao" TEXT NOT NULL,
    "id_analise_qualitativa" TEXT NOT NULL,
    "id_analise_quantitativa" TEXT NOT NULL,
    "informacoes" VARCHAR(255) NOT NULL,
    "data_cadastro" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_alteracao" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "triangulacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resultados" (
    "id" TEXT NOT NULL,
    "id_estabelecimento" TEXT NOT NULL,
    "id_triangulacao" TEXT NOT NULL,

    CONSTRAINT "resultados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analises_quantitativas" (
    "id" TEXT NOT NULL,
    "id_gestor" TEXT NOT NULL,
    "id_manipulador_alimentos" TEXT NOT NULL,
    "caracteristicas_socio_demograficas" VARCHAR(255) NOT NULL,
    "resultados_avaliacao_quantitativas_csa" VARCHAR(255) NOT NULL,
    "vies_otimista" VARCHAR(255) NOT NULL,
    "data_cadastro" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_alteracao" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "analises_quantitativas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estabelecimentos" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "cnae" VARCHAR(255) NOT NULL,
    "endereco" VARCHAR(255) NOT NULL,
    "pessoal_ocupado" INTEGER NOT NULL,
    "numero_refeicoes" INTEGER NOT NULL,
    "possui_alvara_sanitario" INTEGER NOT NULL,
    "possui_responsavel_boas_praticas" INTEGER NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL,
    "data_alteracao" TIMESTAMPTZ(3) NOT NULL,
    "alterado_por" TEXT NOT NULL,
    "ativo" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "estabelecimentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "sobrenome" VARCHAR(255) NOT NULL,
    "cpf" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "instituicao" VARCHAR(255) NOT NULL,
    "tipo_usuario" "TipoUsuario" NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "ativo" INTEGER NOT NULL DEFAULT 1,
    "data_cadastro" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_alteracao" TIMESTAMPTZ(3) NOT NULL,
    "ultimo_login" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reset_senhas_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "usado" INTEGER NOT NULL DEFAULT 0,
    "expira_em" TIMESTAMPTZ(3) NOT NULL,
    "criado_em" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reset_senhas_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cadastros_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "criado_por" TEXT NOT NULL,
    "usado" INTEGER NOT NULL DEFAULT 0,
    "expira_em" TIMESTAMPTZ(3) NOT NULL,
    "criado_em" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cadastros_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reset_senhas_tokens_token_key" ON "reset_senhas_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "cadastros_tokens_token_key" ON "cadastros_tokens"("token");

-- AddForeignKey
ALTER TABLE "triangulacoes" ADD CONSTRAINT "triangulacoes_id_lista_verificacao_fkey" FOREIGN KEY ("id_lista_verificacao") REFERENCES "listas_verificacoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "triangulacoes" ADD CONSTRAINT "triangulacoes_id_analise_qualitativa_fkey" FOREIGN KEY ("id_analise_qualitativa") REFERENCES "analises_qualitativas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "triangulacoes" ADD CONSTRAINT "triangulacoes_id_analise_quantitativa_fkey" FOREIGN KEY ("id_analise_quantitativa") REFERENCES "analises_quantitativas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resultados" ADD CONSTRAINT "resultados_id_triangulacao_fkey" FOREIGN KEY ("id_triangulacao") REFERENCES "triangulacoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resultados" ADD CONSTRAINT "resultados_id_estabelecimento_fkey" FOREIGN KEY ("id_estabelecimento") REFERENCES "estabelecimentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "analises_quantitativas" ADD CONSTRAINT "analises_quantitativas_id_gestor_fkey" FOREIGN KEY ("id_gestor") REFERENCES "gestores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "analises_quantitativas" ADD CONSTRAINT "analises_quantitativas_id_manipulador_alimentos_fkey" FOREIGN KEY ("id_manipulador_alimentos") REFERENCES "manipuladores_alimentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estabelecimentos" ADD CONSTRAINT "estabelecimentos_alterado_por_fkey" FOREIGN KEY ("alterado_por") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reset_senhas_tokens" ADD CONSTRAINT "reset_senhas_tokens_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cadastros_tokens" ADD CONSTRAINT "cadastros_tokens_criado_por_fkey" FOREIGN KEY ("criado_por") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
