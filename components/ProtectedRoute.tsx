// ─────────────────────────────────────────────────────────────────────────────
// components/ProtectedRoute.tsx
// The real auth gate (middleware.ts can't see the Path-scoped cookie — see
// AUTH_FLOW.md). This reads the in-memory Zustand store instead, which is
// populated either by a successful login/register or by AuthProvider's
// silent /auth/refresh call on mount.
//
// Usage — wrap a protected layout or page:
//   export default function DashboardLayout({ children }) {
//     return <ProtectedRoute>{children}</ProtectedRoute>;
//   }
//
// Waits for `isInitializing` to resolve before deciding anything, so a
// returning user with a valid refresh cookie doesn't get bounced to
// /login during the brief window before the silent refresh completes.
// ─────────────────────────────────────────────────────────────────────────────

'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

export function ProtectedRoute({ children }: { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const isInitializing = useAuthStore((s) => s.isInitializing);

    useEffect(() => {
        if (!isInitializing && !isAuthenticated) {
            router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
        }
    }, [isInitializing, isAuthenticated, pathname, router]);

    // Still waiting on the silent refresh — don't flash "logged out" UI.
    if (isInitializing) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-accent border-t-transparent" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return null; // redirect above is already in flight
    }

    return <>{children}</>;
}