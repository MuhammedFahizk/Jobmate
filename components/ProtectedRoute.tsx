// ─────────────────────────────────────────────────────────────────────────────
// components/ProtectedRoute.tsx
// Default export, `role`-aware. Used by both:
//   - components/DashboardShell.tsx (role="candidate")
//   - components/layouts/AdminLayout/index.tsx (role="admin")
//
// FIX — redirect-loop bug: a wrong-role but AUTHENTICATED user (e.g. an
// admin hitting a candidate route) previously fell back to the generic
// /login fallback, same as a fully logged-out visitor. /login is guarded
// by GuestRoute, which — seeing a valid session — bounced them straight
// back to /dashboard, which bounced them back to /login, forever.
//
// Fix: distinguish "not logged in at all" (→ the appropriate login page)
// from "logged in, wrong role" (→ that user's OWN home, never /login).
// An authenticated admin hitting a candidate-only route now goes straight
// to /mc-ops/admin-dashboard, not through /login at all.
// ─────────────────────────────────────────────────────────────────────────────

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** If set, the authenticated user's `role` must match this value. */
  role?: 'candidate' | 'admin';
  /** Where to send unauthenticated users. Wrong-role users go to their own home instead — see homeForRole. */
  redirectTo?: string;
}

function homeForRole(r?: 'candidate' | 'admin') {
  if (r === 'admin') return '/mc-ops/admin-dashboard';
  if (r === 'candidate') return '/dashboard';
  return '/login';
}

export default function ProtectedRoute({
  children,
  role,
  redirectTo,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, isInitializing, user } = useAuthStore();

  const notLoggedIn = !isAuthenticated;
  const wrongRole = isAuthenticated && role !== undefined && user?.role !== role;

  // Not logged in at all → the login page for this section.
  // Logged in but wrong role → THEIR OWN home, never /login (this is
  // what breaks the loop — a wrong-role user never touches a page
  // guarded by GuestRoute, so there's nothing to bounce back from).
  const fallback = wrongRole
    ? homeForRole(user?.role)
    : redirectTo ?? (role === 'admin' ? '/mc-ops/login' : '/login');

  useEffect(() => {
    if (isInitializing) return;
    if (notLoggedIn || wrongRole) {
      router.replace(fallback);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitializing, notLoggedIn, wrongRole]);

  if (isInitializing || notLoggedIn || wrongRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3 text-muted">
          <div className="h-5 w-5 rounded-full border-2 border-border border-t-primary-500 animate-spin" />
          <span className="text-sm">Checking access…</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}