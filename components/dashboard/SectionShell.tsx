// ─────────────────────────────────────────────────────────────────────────────
// components/dashboard/SectionShell.tsx
// Purely presentational — title, optional description, optional
// right-aligned actions slot, content area. NO auth logic here.
//
// This is shared by BOTH sides of the app:
//   - candidate dashboard pages (app/(user)/dashboard/*)
//   - admin pages (app/mc-ops/(admin)/*, e.g. AdminCandidatesPage)
//
// The previous version of this file had `<ProtectedRoute role="candidate">`
// wrapped around its children — that's what broke every admin page using
// it: an admin session doesn't have role "candidate", so loading any
// admin page that used SectionShell (e.g. Candidates) silently redirected
// the admin away. Auth gating belongs at the LAYOUT level (once per
// route group), not inside a title-bar component used many times per
// page. See:
//   - components/DashboardShell.tsx → ProtectedRoute role="candidate"
//     (wraps the whole candidate dashboard, once)
//   - components/layouts/AdminLayout/index.tsx → ProtectedRoute role="admin"
//     (wraps the whole admin panel, once)
// ─────────────────────────────────────────────────────────────────────────────

import type { ReactNode } from 'react';

interface SectionShellProps {
  title: ReactNode;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function SectionShell({ title, description, actions, children }: SectionShellProps) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
          {description && (
            <p className="text-sm text-muted mt-0.5">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {children}
    </section>
  );
}