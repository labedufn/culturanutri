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
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

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
  const [isFormValid, setIsFormValid] = useState(false);
  const [initialStep, setInitialStep] = useState<number | null>(null);
  const { toast } = useToast();
  const { currentStep, setStep } = useStepper();

  useEffect(() => {
    const savedStep = localStorage.getItem("currentStep");
    if (savedStep !== null) {
      setInitialStep(parseInt(savedStep, 10));
    } else {
      setInitialStep(0);
    }
  }, []);

  useEffect(() => {
    if (initialStep !== null) {
      setStep(initialStep);
    }
  }, [initialStep, setStep]);

  useEffect(() => {
    if (currentStep !== undefined) {
      localStorage.setItem("currentStep", currentStep.toString());
    }
  }, [currentStep]);

  const handleFormValidation = (isValid: boolean) => {
    setIsFormValid(isValid);
  };

  const stepComponents = [
    <AvaliacaoInfos key="step1" onFormValidation={handleFormValidation} />,
    <AvaliacaoGestores key="step2" onFormValidation={handleFormValidation} />,
    <div key="step3">Passo 3 - Manipuladores de alimentos</div>,
    <div key="step4">Passo 4 - Lista de verificação</div>,
    <div key="step5">Passo 5 - Análises qualitativas</div>,
    <div key="step6">Passo 6 - Análises quantitativas</div>,
    <div key="step7">Passo 7 - Triangulação</div>,
  ];

  if (initialStep === null) {
    return null;
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper
        initialStep={initialStep}
        steps={steps}
        onClickStep={(step, setStep) => {
          if (step === 0 || isFormValid) {
            setStep(step);
            localStorage.setItem("currentStep", step.toString());
          } else {
            toast({
              className: cn(
                "bg-red-600 border-none text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
              ),
              title: "Campos obrigatórios não preenchidos!",
              description: "Por favor, preencha todos os campos obrigatórios antes de prosseguir.",
            });
          }
        }}
      >
        {steps.map((stepProps, index) => (
          <Step key={stepProps.label} {...stepProps}>
            {stepComponents[index]}
          </Step>
        ))}
        <Footer isFormValid={isFormValid} setStep={setStep} />
      </Stepper>
    </div>
  );
}

type FooterProps = {
  isFormValid: boolean;
  setStep: (step: number) => void;
};

const Footer = ({ isFormValid, setStep }: FooterProps) => {
  const { nextStep, prevStep, isDisabledStep, hasCompletedAllSteps, isLastStep, isOptionalStep, currentStep } =
    useStepper();
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
          onClick={() => {
            prevStep();
            setStep(parseInt(currentStep.toString(), 10) - 1);
            localStorage.setItem("currentStep", (parseInt(currentStep.toString(), 10) - 1).toString());
          }}
          size="sm"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Anterior</span>
        </Button>
        <Button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground gap-1 h-9 bg-transparent text-black shadow-none"
          size="sm"
          onClick={() => {
            nextStep();
            setStep(Number(currentStep) + 1);
            localStorage.setItem("currentStep", (Number(currentStep) + 1).toString());
          }}
          disabled={!isFormValid || hasCompletedAllSteps}
        >
          <span>{isLastStep ? "Concluir" : isOptionalStep ? "Pular" : "Próximo"}</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};
