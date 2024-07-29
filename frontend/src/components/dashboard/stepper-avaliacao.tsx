"use client";

import {
  Handshake,
  ListChecks,
  UtensilsCrossed,
  ChevronRight,
  ChevronLeft,
  ChefHat,
  FileCheck,
  TextSearch,
  Check,
} from "lucide-react";
import { Stepper } from "./stepper";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { CadastrarEstabelecimento } from "./avaliacao/estabelecimento/cadastrar-estabelecimento";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { AvaliacaoGestores } from "./avaliacao/gestores/avaliacao-gestores";

export function StepperAvaliacao() {
  // Inicializa o estado currentStep e isEstabelecimentoCadastrado com base no localStorage
  const [currentStep, setCurrentStep] = useState(() => {
    const estabelecimentoId = localStorage.getItem("estabelecimentoId");
    if (estabelecimentoId) {
      const savedStep = localStorage.getItem("currentStep");
      return savedStep ? parseInt(savedStep, 10) : 0;
    }
    return 0;
  });

  const [isEstabelecimentoCadastrado, setIsEstabelecimentoCadastrado] = useState(() => {
    return localStorage.getItem("estabelecimentoId") !== null;
  });

  useEffect(() => {
    if (isEstabelecimentoCadastrado) {
      localStorage.setItem("currentStep", currentStep.toString());
    } else {
      localStorage.removeItem("currentStep");
    }
  }, [currentStep, isEstabelecimentoCadastrado]);

  const handleNext = () => {
    if (currentStep === 0 && !isEstabelecimentoCadastrado) {
      toast({
        className: cn(
          "bg-red-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        ),
        title: "Erro!",
        description: "Você precisa cadastrar o estabelecimento antes de continuar.",
      });
      return;
    }
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
    if (stepIndex === 0) {
      setCurrentStep(stepIndex);
      return;
    }
    if (stepIndex !== 0 && !isEstabelecimentoCadastrado) {
      toast({
        className: cn(
          "bg-red-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        ),
        title: "Erro!",
        description: "Você precisa cadastrar o estabelecimento antes de continuar.",
      });
      return;
    }
    setCurrentStep(stepIndex);
  };

  const handleEstabelecimentoSuccess = () => {
    setIsEstabelecimentoCadastrado(true);
    setCurrentStep(1);
  };

  const steps = [
    {
      icon: isEstabelecimentoCadastrado ? Check : UtensilsCrossed,
      tooltip: "Cadastrar estabelecimento",
      content: <CadastrarEstabelecimento onSuccess={handleEstabelecimentoSuccess} />,
    },
    {
      icon: Handshake,
      tooltip: "Gestores",
      content: <AvaliacaoGestores />,
    },
    {
      icon: ChefHat,
      tooltip: "Manipuladores de alimentos",
      content: <div>Manipuladores</div>,
    },
    {
      icon: ListChecks,
      tooltip: "Lista de verificação",
      content: <div>Lista de verificação</div>,
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
    <div className="">
      <Stepper steps={steps} currentStep={currentStep} onStepChange={handleStepChange} />
      <div className="flex justify-end gap-4 mt-8">
        <Button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground gap-1 h-9 bg-transparent text-black shadow-none"
          onClick={handlePrev}
          disabled={currentStep === 0 || currentStep === 1}
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
