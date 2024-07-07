import { cn } from "@/lib/utils";
import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showPasswordToggle?: boolean;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, showPasswordToggle, icon, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleTogglePassword = () => setShowPassword((prev) => !prev);

    const inputType = showPasswordToggle ? (showPassword ? "text" : "password") : type;

    return (
      <div className="relative flex w-full">
        <input
          type={inputType}
          className={cn(
            "flex-1 h-10 rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus:ring-primary-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            icon ? "pl-11" : "",
            className,
          )}
          ref={ref}
          {...props}
        />
        {icon && <div className="absolute inset-y-0 left-0 text-zinc-400 text-2xl flex items-center pl-2">{icon}</div>}

        {showPasswordToggle && (
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            {showPassword ? (
              <EyeOff className="text-zinc-400 hover:text-zinc-500 text-2xl" />
            ) : (
              <Eye className="text-zinc-400 hover:text-zinc-500 text-2xl" />
            )}
          </button>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
