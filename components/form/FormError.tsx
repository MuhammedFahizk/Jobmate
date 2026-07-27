"use client";

import { AlertCircle } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;
  return (
    <div className="flex items-start gap-2 text-red-600 font-body text-sm">
      <AlertCircle size={16} className="shrink-0 mt-0.5" />
      <p>{message}</p>
    </div>
  );
}
