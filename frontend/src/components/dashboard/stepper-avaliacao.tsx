"use client";

import { Handshake, ListChecks, ChevronRight, ChevronLeft, ChefHat, FileCheck, TextSearch } from "lucide-react";
import { Stepper } from "./stepper";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { AvaliacaoGestores } from "./avaliacao/gestores/avaliacao-gestores";
import { AvaliacaoManipuladores } from "./avaliacao/manipuladores/avaliacao-manipuladores";
import { ListaVerificacao } from "./avaliacao/lista-verificacao/lista-verificacao";

interface StepperAvaliacaoProps {
  id: string;
}

export function StepperAvaliacao({ id }: StepperAvaliacaoProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const savedStep = localStorage.getItem("currentStep");
    if (savedStep !== null) {
      setCurrentStep(parseInt(savedStep, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currentStep", currentStep.toString());
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepChange = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const steps = [
    {
      icon: Handshake,
      tooltip: "Gestores",
      content: <AvaliacaoGestores id={id} />,
    },
    {
      icon: ChefHat,
      tooltip: "Manipuladores de alimentos",
      content: <AvaliacaoManipuladores id={id} />,
    },
    {
      icon: ListChecks,
      tooltip: "Lista de verificação",
      content: <ListaVerificacao id={id} />,
    },
    {
      icon: TextSearch,
      tooltip: "Análise qualitativa",
      content: <div>Análise qualitativa</div>,
    },
    {
      icon: FileCheck,
      tooltip: "Análises e resultados",
      content: <div>Análises e resultados</div>,
    },
  ];

  return (
    <div>
      <Stepper steps={steps} currentStep={currentStep} onStepChange={handleStepChange} />
      <div className="flex justify-end gap-4 mt-8">
        <Button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground gap-1 h-9 bg-transparent text-black shadow-none"
          onClick={handlePrev}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </Button>
        <Button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground gap-1 h-9 bg-transparent text-black shadow-none"
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
        >
          Próximo
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
