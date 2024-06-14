"use client";

import { SvgIconProps } from "@mui/material";
import { ReactElement } from "react";
import { Button } from "../ui/button";

interface FeedbackMessageProps {
  icon?: ReactElement<SvgIconProps>;
  titulo: string;
  descricao: string;
  buttonText: string;
  redirectTo: string;
  type: "success" | "error";
}

export function FeedbackMessage({ icon, titulo, descricao, buttonText, redirectTo, type }: FeedbackMessageProps) {
  const iconColor = type === "error" ? "text-red-600" : "text-green-600";
  const titleColor = type === "error" ? "text-red-600" : "text-green-600";
  const buttonBgColor = type === "error" ? "bg-red-600" : "bg-green-600";

  return (
    <>
      <div className={`flex self-center ${iconColor}`}>{icon}</div>
      <div className="flex flex-col gap-1">
        <h1 className={`text-3xl text-center ${titleColor} font-bold`}>{titulo}</h1>
        <p className="text-center text-lg text-gray-500">{descricao}</p>
      </div>
      <Button
        size="lg"
        className={`${buttonBgColor} text-white font-medium`}
        onClick={() => window.location.replace(redirectTo)}
      >
        {buttonText}
      </Button>
    </>
  );
}
