"use client";

import { Badge } from "@/components/ui/badge";
import { CorAnaliseQualitativa } from "./cor-analise-qualitativa";
import clsx from "clsx";

interface AgrupadorAnaliseQualitativaProps {
  analises: { ponto: string }[];
  score?: number;
  colunas?: number;
}

export function AgrupadorAnaliseQualitativa({ analises, score, colunas = 2 }: AgrupadorAnaliseQualitativaProps) {
  const gridTemplateColumns = clsx({
    "grid-cols-1": true,
    [`md:grid-cols-${colunas}`]: colunas > 1,
  });

  return (
    <>
      <div className="p-8 bg-gray-100 rounded-lg">
        {score !== undefined && <Badge className="bg-zinc-500 text-base text-white mb-8">Score: {score}</Badge>}
        <div className={`grid ${gridTemplateColumns} gap-8`}>
          {analises.map((analise, index) => (
            <div key={index} className="w-full">
              <CorAnaliseQualitativa content={analise.ponto} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
