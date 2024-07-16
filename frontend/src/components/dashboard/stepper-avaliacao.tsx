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

const steps = [
  { label: "Informações", icon: UtensilsCrossed },
  { label: "Gestores", icon: Handshake },
  { label: "Manipuladores", icon: CookingPot },
  { label: "Lista de verificação", icon: ListChecks },
  { label: "Análises quali.", icon: Brush },
  { label: "Análises quanti.", icon: ListOrdered },
  { label: "Triangulação", icon: Triangle },
] satisfies StepItem[];

export default function StepperAvaliacao() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper
        initialStep={0}
        steps={steps}
        onClickStep={(step, setStep) => {
          setStep(step);
        }}
      >
        {steps.map((stepProps, index) => {
          return (
            <Step key={stepProps.label} {...stepProps}>
              <div className="h-40 flex items-center justify-center my-2 border bg-secondary text-primary rounded-md">
                <h1 className="text-xl">Passo {index + 1}</h1>
              </div>
            </Step>
          );
        })}
        <Footer />
      </Stepper>
    </div>
  );
}

const Footer = () => {
  const { nextStep, prevStep, isDisabledStep, hasCompletedAllSteps, isLastStep, isOptionalStep } = useStepper();
  return (
    <>
      {hasCompletedAllSteps && (
        <div className="h-40 flex items-center justify-center my-2 border bg-secondary text-primary rounded-md">
          <h1 className="text-xl">Resultado</h1>
        </div>
      )}
      <div className="w-full flex justify-end gap-2">
        <>
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
            disabled={hasCompletedAllSteps}
          >
            <span>{isLastStep ? "Concluir" : isOptionalStep ? "Pular" : "Próximo"}</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      </div>
    </>
  );
};
