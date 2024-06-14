import { cn } from "@/lib/utils";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  showPasswordToggle?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, type, showPasswordToggle, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleTogglePassword = () => setShowPassword((prev) => !prev);

    const inputType = showPasswordToggle ? (showPassword ? "text" : "password") : type;

    return (
      <div className="relative flex w-full">
        <input
          type={inputType}
          className={cn(
            "flex-1 h-10 rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
            { "pl-2": icon },
          )}
          ref={ref}
          {...props}
        />
        {icon && <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">{icon}</div>}
        {showPasswordToggle && (
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            {showPassword ? (
              <VisibilityOff className="text-zinc-400 hover:text-zinc-500 text-2xl" />
            ) : (
              <Visibility className="text-zinc-400 hover:text-zinc-500 text-2xl" />
            )}
          </button>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
