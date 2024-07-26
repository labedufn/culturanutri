"use client";

import { CookingPot, Handshake, ListChecks, UtensilsCrossed, NotebookPen } from "lucide-react";
import { Stepper } from "./stepper";
import { Button } from "../ui/button";
import { AvaliacaoInfos } from "../avaliacao/avaliacao-infos";
import { useState } from "react";
import { AvaliacaoGestores } from "../avaliacao/avaliacao-gestores";
import { AvaliacaoManipuladores } from "../avaliacao/avaliacao-manipuladores";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

export function StepperAvaliacao() {
  const [isFormValid, setIsFormValid] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleFormValidation = (isValid: boolean) => {
    setIsFormValid(isValid);
  };

  const steps = [
    {
      icon: UtensilsCrossed,
      tooltip: "Informações",
      content: <AvaliacaoInfos onFormValidation={handleFormValidation} />,
    },
    {
      icon: Handshake,
      tooltip: "Gestor",
      content: <AvaliacaoGestores />,
    },
    {
      icon: CookingPot,
      tooltip: "Manipulador de alimentos",
      content: <AvaliacaoManipuladores onFormValidation={handleFormValidation} />,
    },
    {
      icon: ListChecks,
      tooltip: "Lista de verificação",
      content: <div>Step 4 Content</div>,
    },
    {
      icon: NotebookPen,
      tooltip: "Análise qualitativa",
      content: <div>Step 5 Content</div>,
    },
  ];

  const handleStepChange = (stepIndex: number) => {
    if (currentStep === 0 && !isFormValid) {
      toast({
        className: cn(
          "bg-red-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        ),
        title: "Erro!",
        description: "Você deve definir um estabelecimento antes de continuar.",
      });
    } else {
      setCurrentStep(stepIndex);
    }
  };

  const handleNext = () => {
    if (currentStep === 0 && !isFormValid) {
      toast({
        className: cn(
          "bg-red-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        ),
        title: "Erro!",
        description: "Você deve definir um estabelecimento antes de continuar.",
      });
    } else if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="">
      <Stepper steps={steps} currentStep={currentStep} onStepChange={handleStepChange} />
      <div className="flex justify-end gap-4 mt-8">
        <Button
          className="bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
          onClick={handlePrev}
          disabled={currentStep === 0}
        >
          Anterior
        </Button>
        <Button onClick={handleNext} disabled={currentStep === steps.length - 1}>
          Próximo
        </Button>
      </div>
    </div>
  );
}
