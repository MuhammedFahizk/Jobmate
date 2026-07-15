"use client";

import React from "react";
import type { FieldError } from "react-hook-form";
import { AlertCircle } from "lucide-react";

interface FormFieldProps {
  id: string;
  label: string;
  error?: FieldError;
  icon?: React.ReactNode;
  children: React.ReactNode;
  extraHeaderAction?: React.ReactNode;
}

export function FormField({ id, label, error, icon, children, extraHeaderAction }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <label htmlFor={id} className="font-body text-xs font-semibold text-brand-text uppercase tracking-wider">
          {label}
        </label>
        {extraHeaderAction}
      </div>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none">
            {icon}
          </div>
        )}
        {children}
      </div>
      {error && (
        <span className="font-body text-xs text-red-500 flex items-center gap-1 mt-0.5">
          <AlertCircle size={12} />
          {error.message}
        </span>
      )}
    </div>
  );
}
