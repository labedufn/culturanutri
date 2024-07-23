"use client";

import {
  Brush,
  ChevronLeft,
  ChevronRight,
  CookingPot,
  Handshake,
  ListChecks,
  ListOrdered,
  Triangle,
  UtensilsCrossed,
} from "lucide-react";
import { Step, type StepItem, Stepper, useStepper } from "./stepper";
import { Button } from "@/components/ui/button";
import { AvaliacaoGestores } from "../avaliacao/avaliacao-gestores";
import { AvaliacaoInfos } from "../avaliacao/avaliacao-infos";
import { useState } from "react";

const steps = [
  { label: "Informações", icon: UtensilsCrossed },
  { label: "Gestores", icon: Handshake },
  { label: "Manipuladores de alimentos", icon: CookingPot },
  { label: "Lista de verificação", icon: ListChecks },
  { label: "Análises qualitativas", icon: Brush },
  { label: "Análises quantitativas", icon: ListOrdered },
  { label: "Triangulação", icon: Triangle },
] satisfies StepItem[];

export default function StepperAvaliacao() {
  const [isFormValid, setIsFormValid] = useState(true);

  // Definindo a função handleFormValidation
  const handleFormValidation = (isValid: boolean) => {
    setIsFormValid(isValid);
  };

  const stepComponents = [
    <AvaliacaoInfos key="step1" onFormValidation={handleFormValidation} />,
    <AvaliacaoGestores key="step2" />,
    <div key="step3">Passo 3 - Manipuladores de alimentos</div>,
    <div key="step4">Passo 4 - Lista de verificação</div>,
    <div key="step5">Passo 5 - Análises qualitativas</div>,
    <div key="step6">Passo 6 - Análises quantitativas</div>,
    <div key="step7">Passo 7 - Triangulação</div>,
  ];

  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper
        initialStep={0}
        steps={steps}
        onClickStep={(step, setStep) => {
          if (step === 0 || isFormValid) {
            setStep(step);
          }
        }}
      >
        {steps.map((stepProps, index) => (
          <Step key={stepProps.label} {...stepProps}>
            {stepComponents[index]}
          </Step>
        ))}
        <Footer isFormValid={isFormValid} />
      </Stepper>
    </div>
  );
}

const Footer = ({ isFormValid }: { isFormValid: boolean }) => {
  const { nextStep, prevStep, isDisabledStep, hasCompletedAllSteps, isLastStep, isOptionalStep } = useStepper();
  return (
    <>
      {hasCompletedAllSteps && (
        <div className="h-40 flex items-center justify-center my-2 border bg-secondary text-primary rounded-md">
          <h1 className="text-xl">Resultado</h1>
        </div>
      )}
      <div className="w-full flex justify-end gap-2">
        <Button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground gap-1 px-4 py-2 h-9 bg-transparent text-black shadow-none"
          disabled={isDisabledStep}
          onClick={prevStep}
          size="sm"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Anterior</span>
        </Button>
        <Button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground gap-1 h-9 bg-transparent text-black shadow-none"
          size="sm"
          onClick={nextStep}
          disabled={!isFormValid || hasCompletedAllSteps}
        >
          <span>{isLastStep ? "Concluir" : isOptionalStep ? "Pular" : "Próximo"}</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};
