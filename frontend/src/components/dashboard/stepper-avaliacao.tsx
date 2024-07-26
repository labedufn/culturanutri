"use client";

import { CookingPot, Handshake, ListChecks, UtensilsCrossed, NotebookPen } from "lucide-react";
import { Stepper } from "./stepper";
import { Button } from "../ui/button";
import { AvaliacaoInfos } from "../avaliacao/avaliacao-infos";
import { useState } from "react";
import { AvaliacaoGestores } from "../avaliacao/avaliacao-gestores";
import { AvaliacaoManipuladores } from "../avaliacao/avaliacao-manipuladores";

export function StepperAvaliacao() {
  const [isFormValid, setIsFormValid] = useState(false);

  const steps = [
    {
      icon: UtensilsCrossed,
      completed: true,
      onClick: () => console.log("Step 1 clicked"),
      tooltip: "Informações",
      content: ({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) => (
        <div>
          <AvaliacaoInfos onFormValidation={handleFormValidation} />
          <div className="flex justify-end gap-4 mt-8 ">
            <Button className="bg-neutral-200 text-neutral-700 hover:bg-neutral-300" onClick={onPrev} disabled>
              Anterior
            </Button>
            <Button onClick={() => isFormValid && onNext()} disabled={!isFormValid}>
              Próximo
            </Button>
          </div>
        </div>
      ),
    },
    {
      icon: Handshake,
      completed: false,
      onClick: () => console.log("Step 2 clicked"),
      tooltip: "Gestor",
      content: ({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) => (
        <div>
          <AvaliacaoGestores onFormValidation={handleFormValidation} />
          <div className="flex justify-end gap-4">
            <Button className="bg-neutral-200 text-neutral-700 hover:bg-neutral-300" onClick={onPrev}>
              Anterior
            </Button>
            <Button onClick={onNext} disabled={!isFormValid}>
              Próximo
            </Button>
          </div>
        </div>
      ),
    },
    {
      icon: CookingPot,
      completed: false,
      onClick: () => console.log("Step 3 clicked"),
      tooltip: "Manipulador de alimentos",
      content: ({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) => (
        <div>
          <AvaliacaoManipuladores onFormValidation={handleFormValidation} />
          <div className="flex justify-end gap-4">
            <Button className="bg-neutral-200 text-neutral-700 hover:bg-neutral-300" onClick={onPrev}>
              Anterior
            </Button>
            <Button onClick={onNext}>Próximo</Button>
          </div>
        </div>
      ),
    },
    {
      icon: ListChecks,
      completed: false,
      onClick: () => console.log("Step 4 clicked"),
      tooltip: "Lista de verificação",
      content: ({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) => (
        <div>
          Step 4 Content
          <div className="flex justify-end gap-4">
            <Button className="bg-neutral-200 text-neutral-700 hover:bg-neutral-300" onClick={onPrev}>
              Anterior
            </Button>
            <Button onClick={onNext}>Próximo</Button>
          </div>
        </div>
      ),
    },
    {
      icon: NotebookPen,
      completed: false,
      onClick: () => console.log("Step 5 clicked"),
      tooltip: "Análise qualitativa",
      content: ({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) => (
        <div>
          Step 5 Content
          <div className="flex justify-end gap-4">
            <Button className="bg-neutral-200 text-neutral-700 hover:bg-neutral-300" onClick={onPrev}>
              Anterior
            </Button>
            <Button onClick={onNext}>Concluir</Button>
          </div>
        </div>
      ),
    },
  ];

  const handleFormValidation = (isValid: boolean) => {
    setIsFormValid(isValid);
  };

  return (
    <div className="">
      <Stepper steps={steps} />
    </div>
  );
}
