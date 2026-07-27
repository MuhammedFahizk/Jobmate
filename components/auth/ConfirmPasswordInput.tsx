import { useState } from "react";
import { Eye, EyeOff, Lock, CheckCircle2, AlertCircle } from "lucide-react";
import { FormField } from "@/components/form/FormField";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface ConfirmPasswordInputProps {
  id: string;
  label: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  passwordValue?: string;
  confirmValue?: string;
}

export function ConfirmPasswordInput({
  id,
  label,
  placeholder = "••••••••",
  register,
  error,
  passwordValue = "",
  confirmValue = "",
}: ConfirmPasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const hasValue = confirmValue.length > 0;
  const isMatch = hasValue && passwordValue === confirmValue;
  const isMismatch = hasValue && passwordValue !== confirmValue;

  return (
    <FormField id={id} label={label} icon={<Lock size={16} strokeWidth={1.5} />} error={error}>
      <div className="relative w-full">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          placeholder={placeholder}
          {...register}
          className={`w-full pl-9 pr-10 py-2.5 rounded-xl border bg-white text-foreground font-body text-sm placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary-500/40 transition-all duration-200 ${isMismatch
              ? "border-red-300 focus:border-red-500"
              : isMatch
                ? "border-green-300 focus:border-green-500"
                : "border-border focus:border-primary-500"
            }`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {hasValue && (
        <div className="mt-1.5 flex items-center gap-1.5 text-xs font-medium">
          {isMatch ? (
            <span className="text-green-600 flex items-center gap-1">
              <CheckCircle2 size={12} /> Passwords match
            </span>
          ) : null}
        </div>
      )}
    </FormField>
  );
}
