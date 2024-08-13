import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export function useLocalStorageFormSync(keys: string[], suffix: string) {
  const form = useFormContext();

  useEffect(() => {
    const subscription = form.watch((values) => {
      keys.forEach((key) => {
        const value = values[key];
        localStorage.setItem(`${key}${suffix}`, String(value ?? ""));
      });
    });

    return () => subscription.unsubscribe();
  }, [form, keys, suffix]);
}
