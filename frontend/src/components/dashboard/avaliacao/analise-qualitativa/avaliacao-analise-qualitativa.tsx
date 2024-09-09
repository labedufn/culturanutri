"use client";

import { AnaliseQualitativa } from "./analise-qualitativa";

interface AvaliacaoAnaliseQualitativaProps {
  id: string;
}

export function AvaliacaoAnaliseQualitativa({ id }: AvaliacaoAnaliseQualitativaProps) {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-8 text-black">Análise qualitativa</h2>
      <AnaliseQualitativa id={id} />
    </>
  );
}
