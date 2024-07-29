import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RadioGroupFieldProps {
  name: string;
  label: string;
  options: { label: string; value: string }[];
}

export const RadioGroupField: React.FC<RadioGroupFieldProps> = ({ name, label, options }) => {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              value={field.value ? field.value.toString() : ""}
              onValueChange={(value) => field.onChange(value)}
              className="flex gap-4"
            >
              {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <FormLabel htmlFor={option.value}>{option.label}</FormLabel>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
