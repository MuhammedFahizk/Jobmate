// ─────────────────────────────────────────────────────────────────────────────
// components/dashboard/SectionShell.tsx
// Shared card wrapper used by every dashboard sub-page.
// Provides the white card, section title, description, and content slot.
// ─────────────────────────────────────────────────────────────────────────────

import type { ReactNode } from 'react';

interface SectionShellProps {
  title: string;
  description: string;
  children: ReactNode;
  /** Optional extra className for the outer card */
  className?: string;
}

export function SectionShell({
  title,
  description,
  children,
  className = '',
}: SectionShellProps) {
  return (
    <div
      className={`bg-white rounded-card border border-border shadow-card p-6 sm:p-8 ${className}`}
    >
      <div className="mb-6 pb-5 border-b border-border">
        <h2 className="font-display font-bold text-lg text-foreground">{title}</h2>
        <p className="font-body text-xs text-muted mt-0.5">{description}</p>
      </div>
      {children}
    </div>
  );
}
