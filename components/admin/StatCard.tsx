// ─────────────────────────────────────────────────────────────────────────────
// components/admin/StatCard.tsx
// Small number + label card used on the dashboard/analytics home.
// ─────────────────────────────────────────────────────────────────────────────

import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: number | string;
  icon?: LucideIcon;
  loading?: boolean;
}

export default function StatCard({ label, value, icon: Icon, loading }: StatCardProps) {
  return (
    <div className="border border-border rounded-md bg-white p-4 flex items-start justify-between">
      <div>
        <p className="text-[12px] uppercase tracking-wide text-muted font-medium">{label}</p>
        {loading ? (
          <div className="h-7 w-14 mt-2 rounded bg-[#EEEEEC] animate-pulse" />
        ) : (
          <p className="text-2xl font-semibold text-foreground mt-1 tabular-nums">{value}</p>
        )}
      </div>
      {Icon && (
        <div className="h-8 w-8 rounded-md bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
          <Icon size={16} strokeWidth={2} />
        </div>
      )}
    </div>
  );
}
