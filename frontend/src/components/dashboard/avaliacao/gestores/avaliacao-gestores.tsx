"use client";

import { useState } from "react";
import { AvaliacaoGestoresContent } from "./avaliacao-gestores-content";
import { AvaliacaoProvider } from "./avaliacao-gestores-provider";

interface AvaliacaoGestoresProps {
  id: string;
}

export function AvaliacaoGestores({ id }: AvaliacaoGestoresProps) {
  const [reloadKey, setReloadKey] = useState(0);

  const handleReload = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-8 text-black">Avaliação de gestores</h2>
      <AvaliacaoProvider key={reloadKey}>
        <AvaliacaoGestoresContent onReload={handleReload} id={id} />
      </AvaliacaoProvider>
    </>
  );
}
