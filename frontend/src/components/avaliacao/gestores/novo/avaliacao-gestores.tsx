"use client";

import { useState } from "react";
import { AvaliacaoGestoresDialog } from "./avaliacao-gestores-content";
import { AvaliacaoGestoresProvider } from "./avaliacao-gestores-provider";

export function AvaliacaoGestores() {
  const [reloadKey, setReloadKey] = useState(0);

  const handleReload = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-8 text-black">Avaliação de gestores</h2>
      <AvaliacaoGestoresProvider key={reloadKey}>
        <AvaliacaoGestoresDialog onReload={handleReload} />
      </AvaliacaoGestoresProvider>
    </>
  );
}
