// ─────────────────────────────────────────────────────────────────────────────
// components/GuestRoute.tsx
// Inverse of ProtectedRoute — for pages that should only be visible to
// *unauthenticated* users (login, register).
//
// If the user is already authenticated, they are silently redirected to
// /dashboard (or the `redirectTo` prop). While the silent refresh is still
// running (isInitializing) we wait without rendering anything to avoid a
// flash of the login form before the redirect kicks in.
//
// Usage:
//   export default function LoginLayout({ children }) {
//     return <GuestRoute>{children}</GuestRoute>;
//   }
// ─────────────────────────────────────────────────────────────────────────────

'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

interface GuestRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export function GuestRoute({ children, redirectTo = '/dashboard' }: GuestRouteProps) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isInitializing = useAuthStore((s) => s.isInitializing);

  useEffect(() => {
    if (!isInitializing && isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isInitializing, isAuthenticated, redirectTo, router]);

  // Wait for the silent refresh to finish — don't briefly flash the
  // login form to a user who is already authenticated.
  if (isInitializing) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-accent border-t-transparent" />
      </div>
    );
  }

  // Already authenticated — redirect is in-flight, render nothing.
  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
