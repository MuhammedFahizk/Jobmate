// ─────────────────────────────────────────────────────────────────────────────
// hooks/useAuth.ts
// Convenience hook for pages/components — wraps authStore + authService so
// callers don't have to import both separately, and gets submit/error
// state for free.
// ─────────────────────────────────────────────────────────────────────────────

'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/services/auth.service';
import type { LoginPayload, RegisterPayload } from '@/lib/validation/auth.schema';
import { useAuthStore } from '@/lib/store/authStore';
import type { ApiError } from '@/lib/api/types';

export function useAuth() {
    const router = useRouter();
    const user = useAuthStore((s) => s.user);
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const isInitializing = useAuthStore((s) => s.isInitializing);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<ApiError | null>(null);

    const login = useCallback(
        async (payload: LoginPayload, redirectTo = '/dashboard') => {
            setIsSubmitting(true);
            setError(null);
            try {
                await authService.login(payload);
                router.push(redirectTo);
            } catch (err) {
                setError(err as ApiError);
                setIsSubmitting(false);
                throw err;
            }
        },
        [router],
    );

    const register = useCallback(
        async (payload: RegisterPayload, redirectTo = '/dashboard') => {
            setIsSubmitting(true);
            setError(null);
            try {
                await authService.register(payload);
                router.push(redirectTo);
            } catch (err) {
                setError(err as ApiError);
                setIsSubmitting(false);
                throw err;
            }
        },
        [router],
    );

    const logout = useCallback(async () => {
        await authService.logout();
        router.push('/login');
    }, [router]);

    return {
        user,
        isAuthenticated,
        isInitializing,
        isSubmitting,
        error,
        login,
        register,
        logout,
    };
}