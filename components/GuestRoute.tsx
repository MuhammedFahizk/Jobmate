'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

interface GuestRouteProps {
  children: React.ReactNode;
  role?: 'candidate' | 'admin';
  redirectTo?: string;
}

export function GuestRoute({ children, role, redirectTo }: GuestRouteProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isInitializing, user } = useAuthStore();

  // Honor ?redirect=<path> when present (e.g. sent here from a gated action
  // like "Apply Now"), falling back to the role-based default.
  const rawRedirect = searchParams.get('redirect');
  const queryRedirect = rawRedirect && rawRedirect.startsWith('/') && !rawRedirect.startsWith('//')
    ? rawRedirect
    : undefined;
  const target = queryRedirect ?? redirectTo ?? (role === 'admin' ? '/mc-ops/admin-dashboard' : '/dashboard');
  const roleMatches = role === undefined || user?.role === role;
  const shouldRedirect = isAuthenticated && roleMatches;

  console.log(user, "user", target, "target", queryRedirect, "queryRedirect", redirectTo, "redirectTo", role, "role", roleMatches, "roleMatches", shouldRedirect, "shouldRedirect");
  useEffect(() => {
    if (isInitializing) return;
    if (shouldRedirect) {
      router.replace(target);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitializing, shouldRedirect, target]);
  console.log("h", isInitializing, shouldRedirect, "shouldRedirect")
  if (isInitializing || shouldRedirect) {
    console.log("hiii")
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="h-5 w-5 rounded-full border-2 border-border border-t-primary-500 animate-spin" />
      </div>
    );
  }
  console.log('hellooo')
  return <>{children}</>;
}