"use client";

import { Badge } from "@/components/ui/badge";
import { CorAnaliseQualitativa } from "./cor-analise-qualitativa";
import clsx from "clsx";

interface AgrupadorAnaliseQualitativaProps {
  elemento: string;
  analises: { pontos: string }[];
  score?: number;
  colunas?: number;
}

export function AgrupadorAnaliseQualitativa({
  elemento,
  analises,
  score,
  colunas = 2,
}: AgrupadorAnaliseQualitativaProps) {
  const gridTemplateColumns = clsx({
    "grid-cols-1": true,
    [`md:grid-cols-${colunas}`]: colunas > 1,
  });

  return (
    <>
      <h3 className="font-semibold text-black mb-2">{elemento}</h3>
      <div className="p-8 bg-gray-100 rounded-lg">
        {score !== undefined && <Badge className="bg-zinc-500 text-base text-white">Score: {score}</Badge>}
        <div className={`mt-6 grid ${gridTemplateColumns} gap-8`}>
          {analises.map((analise, index) => (
            <div key={index} className="w-full">
              <CorAnaliseQualitativa content={analise.pontos} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
