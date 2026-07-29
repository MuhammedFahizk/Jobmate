// ─────────────────────────────────────────────────────────────────────────────
// hooks/useAuth.ts
// Convenience hook for pages/components — wraps authStore + authService so
// callers don't have to import both separately, and gets submit/error
// state for free.
// ─────────────────────────────────────────────────────────────────────────────

'use client';
import { useToast } from "@/components/ui/Toast";

interface AuthOptions {
    redirectTo?: string;
    rememberMe?: boolean;
}

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/services/auth.service';
import type { LoginPayload, RegisterPayload } from '@/lib/validation/auth.schema';
import { useAuthStore } from '@/lib/store/authStore';
import type { ApiError } from '@/lib/api/types';
import { getApiError } from '@/utils/apiError';

export function useAuth() {
    const router = useRouter();
    const user = useAuthStore((s) => s.user);
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const isInitializing = useAuthStore((s) => s.isInitializing);
    const { success, error: toastError } = useToast();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<ApiError | null>(null);

    const login = useCallback(
        async (
            payload: LoginPayload,
            options?: AuthOptions
        ) => {
            const redirectTo = options?.redirectTo ?? "/dashboard";
            const rememberMe = options?.rememberMe ?? false;

            setIsSubmitting(true);
            setError(null);

            try {
                await authService.login({ ...payload, rememberMe });

                success("Login Successful", "Redirecting...");

                router.push(redirectTo);
            } catch (err: unknown) {
                const apiError =
                    getApiError(err) ?? {
                        status: "error",
                        message: "Unexpected error",
                        errors: [],
                    };

                setError(apiError);

                toastError(
                    "Login Failed",
                    apiError.errors?.[0]?.message ?? apiError.message
                );

                // Don't rethrow if the hook is responsible for handling errors.
            } finally {
                setIsSubmitting(false);
            }
        },
        [router, success, toastError]
    );

    const register = useCallback(
        async (
            payload: RegisterPayload,
            options?: AuthOptions
        ) => {
            const redirectTo = options?.redirectTo ?? "/dashboard";

            setIsSubmitting(true);
            setError(null);

            try {
                await authService.register(payload);

                success(
                    "Account created successfully!",
                    "Redirecting..."
                );

                router.push(redirectTo);
            } catch (err: unknown) {
                const apiError =
                    getApiError(err) ?? {
                        status: "error",
                        message: "Unexpected error",
                        errors: [],
                    };

                setError(apiError);

                toastError(
                    "Registration Failed",
                    apiError.errors?.[0]?.message ??
                    apiError.message
                );

                throw err; // optional
            } finally {
                setIsSubmitting(false);
            }
        },
        [router, success, toastError]
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