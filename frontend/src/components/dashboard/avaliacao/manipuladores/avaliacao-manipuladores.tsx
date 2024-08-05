"use client";

import { useState } from "react";
import { AvaliacaoProvider } from "./avaliacao-manipuladores-provider";
import { AvaliacaoManipuladoresContent } from "./avaliacao-manipuladores-content";

interface AvaliacaoManipuladoresProps {
  id: string;
}

export function AvaliacaoManipuladores({ id }: AvaliacaoManipuladoresProps) {
  const [reloadKey, setReloadKey] = useState(0);

  const handleReload = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-8 text-black">Avaliação de manipuladores</h2>
      <AvaliacaoProvider key={reloadKey}>
        <AvaliacaoManipuladoresContent onReload={handleReload} id={id} />
      </AvaliacaoProvider>
    </>
  );
}
