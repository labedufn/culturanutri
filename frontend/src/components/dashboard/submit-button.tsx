"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useFormContext } from "./form-provider-component";

const SubmitButton: React.FC = () => {
  const { handleSubmit } = useFormContext();
  return (
    <Button type="submit" onClick={handleSubmit((data) => console.log(data))}>
      Enviar
    </Button>
  );
};

export default SubmitButton;
