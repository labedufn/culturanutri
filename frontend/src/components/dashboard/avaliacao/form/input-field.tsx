import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface InputFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  min?: number;
}

export const InputField: React.FC<InputFieldProps> = ({ name, label, type = "text", placeholder, min }) => {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} type={type} placeholder={placeholder} min={min} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
