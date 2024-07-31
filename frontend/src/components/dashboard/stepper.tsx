"use client";

import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type Step = {
  icon: React.ElementType;
  tooltip: string;
  content: React.ReactNode;
};

type StepperProps = {
  steps: Step[];
  currentStep: number;
  onStepChange: (stepIndex: number) => void;
};

export function Stepper({ steps, currentStep, onStepChange }: StepperProps) {
  const handleStepClick = (index: number) => {
    onStepChange(index);
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
                    (index <= currentStep
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
                      index <= currentStep
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
      <div className="mt-4 w-full">{steps[currentStep]?.content}</div>
    </div>
  );
}
