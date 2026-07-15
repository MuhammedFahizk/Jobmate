// ─────────────────────────────────────────────────────────────────────────────
// app/dashboard/layout.tsx
// Shared layout for all /dashboard/* routes.
// DashboardShell handles: ProtectedRoute gate + sidebar + header + quick links.
// ─────────────────────────────────────────────────────────────────────────────
import type { ReactNode } from 'react';
import { DashboardShell } from '@/components/DashboardShell';

export const metadata = {
  title: 'Dashboard – JobMate',
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
