// ─────────────────────────────────────────────────────────────────────────────
// contexts/AuthProvider.tsx
// Runs once on app mount: attempts a silent refresh so a returning user
// (with a still-valid httpOnly refresh cookie) doesn't have to log in again
// just because the in-memory access token was lost on page reload.
//
// Wrap the app root with this, e.g. in app/layout.tsx:
//   <AuthProvider>{children}</AuthProvider>
//
// Downstream, gate protected UI on `isInitializing` from useAuthStore —
// don't redirect or render "logged out" state until it flips to false, or
// you'll flash a logged-out UI for every returning user on every reload.
// ─────────────────────────────────────────────────────────────────────────────

'use client';

import { useEffect, type ReactNode } from 'react';
import { authService } from '@/lib/services/auth.service';
import { useAuthStore } from '@/lib/store/authStore';

export function AuthProvider({ children }: { children: ReactNode }) {
    const setInitializing = useAuthStore((s) => s.setInitializing);

    useEffect(() => {
        let cancelled = false;

        authService
            .refresh()
            .catch(() => {
                // No valid refresh cookie — the user simply isn't logged in.
                // Not an error worth surfacing.
            })
            .finally(() => {
                if (!cancelled) setInitializing(false);
            });

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <>{children}</>;
}