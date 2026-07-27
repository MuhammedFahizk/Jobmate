import Link from "next/link";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface TermsCheckboxProps {
  id: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

export function TermsCheckbox({ id, register, error }: TermsCheckboxProps) {
  return (
    <div className="flex flex-col gap-1 mt-2">
      <label className="flex items-start gap-2.5 cursor-pointer select-none">
        <div className="pt-0.5">
          <input
            id={id}
            type="checkbox"
            className="peer sr-only"
            {...register}
          />
          <div className="h-4 w-4 rounded border border-border bg-white flex items-center justify-center transition-colors duration-150 peer-checked:bg-primary-500 peer-checked:border-primary-500 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500/40 peer-focus-visible:ring-offset-1">
            <svg
              className="opacity-0 peer-checked:opacity-100 transition-opacity"
              width="10"
              height="8"
              viewBox="0 0 10 8"
              fill="none"
            >
              <path
                d="M1 4L3.5 6.5L9 1"
                stroke="white"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <span className="font-body text-sm text-foreground">
          I agree to the{" "}
          <Link href="/terms" className="text-primary-500 hover:text-primary-700 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary-500 hover:text-primary-700 hover:underline">
            Privacy Policy
          </Link>.
        </span>
      </label>
      {error && <p className="text-xs text-red-500 font-medium ml-6">{error.message}</p>}
    </div>
  );
}
