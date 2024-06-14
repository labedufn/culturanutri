"use client";

interface CopyProps {
  className?: string;
}

export function Copy({ className }: CopyProps) {
  const anoAtual = new Date().getFullYear();

  return (
    <>
      <p className={className}> &copy; {anoAtual} LABED - Laboratório de Eletrônica e Desenvolvimento.</p>
    </>
  );
}
