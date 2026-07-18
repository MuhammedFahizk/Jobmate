// ─────────────────────────────────────────────────────────────────────────────
// components/GuestRoute.tsx
// Mirror of ProtectedRoute — for login/register pages. Redirects an
// ALREADY-authenticated user away from the login form instead of showing
// it to them again. Role-aware so it can guard both /login and
// /mc-ops/login without a separate admin-specific component.
//
// Usage:
//   app/(user)/login/layout.tsx      → <GuestRoute>{children}</GuestRoute>
//   app/mc-ops/login/layout.tsx      → <GuestRoute role="admin" redirectTo="/mc-ops/admin-dashboard">{children}</GuestRoute>
// ─────────────────────────────────────────────────────────────────────────────

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

interface GuestRouteProps {
  children: React.ReactNode;
  /** If set, only redirect away when the logged-in user matches this role. */
  role?: 'candidate' | 'admin';
  /** Where an already-authenticated user gets sent. */
  redirectTo?: string;
}

export function GuestRoute({ children, role, redirectTo }: GuestRouteProps) {
  const router = useRouter();
  const { isAuthenticated, isInitializing, user } = useAuthStore();

  const target = redirectTo ?? (role === 'admin' ? '/mc-ops/admin-dashboard' : '/dashboard');
  const roleMatches = role === undefined || user?.role === role;
  const shouldRedirect = isAuthenticated && roleMatches;

  useEffect(() => {
    if (isInitializing) return;
    if (shouldRedirect) {
      router.replace(target);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitializing, shouldRedirect]);

  // Don't flash the login form to an already-logged-in user while the
  // silent refresh is still resolving, or for the instant before the
  // redirect above fires.
  if (isInitializing || shouldRedirect) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="h-5 w-5 rounded-full border-2 border-border border-t-primary-500 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}