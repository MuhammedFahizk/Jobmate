// ─────────────────────────────────────────────────────────────────────────────
// lib/store/authStore.ts
// Zustand store — the single source of truth for auth state.
//
// accessToken lives here ONLY, in memory. It is never written to
// localStorage or any JS-readable cookie, so it can't be lifted by an XSS
// payload. It's lost on full page reload by design — AuthProvider
// re-hydrates it on mount via a silent /auth/refresh call, backed by the
// httpOnly `refreshToken` cookie the backend already sets on login.
// ─────────────────────────────────────────────────────────────────────────────

import { create } from 'zustand';

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    phone: string;
    isVerified: boolean;
    paymentStatus: 'pending' | 'paid';
    location?: string;
    skills?: string[];
    experience?: string;
    category?: string;
    resumeLink?: string;
    bio?: string;
    role: 'candidate' | 'admin';
}

interface AuthState {
    accessToken: string | null;
    user: AuthUser | null;
    isAuthenticated: boolean;
    /** True until the first silent-refresh attempt (on app load) resolves. */
    isInitializing: boolean;

    setAuth: (accessToken: string, user: AuthUser) => void;
    setUser: (user: AuthUser) => void;
    clearAuth: () => void;
    setInitializing: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    user: null,
    isAuthenticated: false,
    isInitializing: true,

    setAuth: (accessToken, user) =>
        set({ accessToken, user, isAuthenticated: true }),

    setUser: (user) => set({ user }),

    clearAuth: () =>
        set({ accessToken: null, user: null, isAuthenticated: false }),

    setInitializing: (value) => set({ isInitializing: value }),
}));