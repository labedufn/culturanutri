"use client";

import React, { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type Step = {
  icon: React.ElementType;
  completed: boolean;
  onClick: () => void;
  tooltip: string;
  content: React.FC<{ onNext: () => void; onPrev: () => void }>;
};

type StepperProps = {
  steps: Step[];
};

export function Stepper({ steps }: StepperProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
    steps[index].onClick();
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      steps[currentStep + 1].onClick();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      steps[currentStep - 1].onClick();
    }
  };

  return (
    <div>
      <TooltipProvider>
        <ol className="flex w-full">
          {steps.map((step, index) => (
            <li
              key={index}
              className={`flex items-center ${
                index !== steps.length - 1
                  ? "w-full after:content-[''] after:flex-1 after:h-0 after:border-b after:border-2 after:inline-block" +
                    (step.completed || index <= currentStep
                      ? " after:border-primary-700"
                      : " after:border-gray-100 dark:after:border-gray-700")
                  : "w-auto"
              }`}
              onClick={() => handleStepClick(index)}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 cursor-pointer ${
                      step.completed || index <= currentStep
                        ? "bg-primary-700 text-white"
                        : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-100"
                    }`}
                  >
                    <step.icon className="w-4 h-4 lg:w-5 lg:h-5" />
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top" align="center" className="bg-zinc-800">
                  <p className="text-white">{step.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </li>
          ))}
        </ol>
      </TooltipProvider>
      <div className="mt-4 w-full">
        {steps[currentStep]?.content({
          onNext: handleNext,
          onPrev: handlePrev,
        })}
      </div>
    </div>
  );
}
