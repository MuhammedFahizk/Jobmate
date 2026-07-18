// ─────────────────────────────────────────────────────────────────────────────
// app/(user)/dashboard/layout.tsx
// DashboardShell lives HERE, once — not inside individual page.tsx files.
//
// Next's App Router only swaps out page.tsx on navigation; layout.tsx
// persists across routes within the same segment. So DashboardShell
// (sidebar, profile header, ProtectedRoute gate, quick links) mounts
// once when you first enter /dashboard/*, and stays mounted while you
// move between /dashboard/profile, /dashboard/applications, etc. — only
// the `{children}` slot (the actual page content) swaps.
//
// If any page.tsx under app/(user)/dashboard/ still imports and wraps
// itself in <DashboardShell>, remove that — it's what was causing a full
// shell remount (sidebar flicker, lost animation state, etc.) on every
// dashboard navigation. Pages should just return their content, using
// SectionShell for their own title bar.
// ─────────────────────────────────────────────────────────────────────────────

import { DashboardShell } from '@/components/DashboardShell';
import type { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return <DashboardShell>{children}</DashboardShell>;
}