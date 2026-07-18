// ─────────────────────────────────────────────────────────────────────────────
// components/layouts/AdminLayout/index.tsx
// The actual admin layout logic — ProtectedRoute gate, session rehydrate,
// sidebar collapse state. app/mc-ops/(admin)/layout.tsx just renders this.
// ─────────────────────────────────────────────────────────────────────────────

'use client';

import { useEffect, useState, type ReactNode } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useAuthStore } from '@/lib/store/authStore';
import { authService } from '@/lib/services/auth.service';

const SIDEBAR_STORAGE_KEY = 'jobmate_admin_sidebar_collapsed';

export default function AdminLayout({ children }: { children: ReactNode }) {
    const setInitializing = useAuthStore((s) => s.setInitializing);
    const isInitializing = useAuthStore((s) => s.isInitializing);
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

    const [collapsed, setCollapsed] = useState(false);

    // Rehydrate on reload — reuses the SAME silent /auth/refresh flow the
    // candidate-facing AuthProvider uses (same httpOnly cookie, same store).
    // Awaited before setInitializing(false), so ProtectedRoute never
    // evaluates isAuthenticated before the rehydrate attempt actually resolves.
    useEffect(() => {
        let cancelled = false;

        if (isAuthenticated) {
            setInitializing(false);
            return;
        }

        authService
            .refresh()
            .catch(() => {
                // No valid refresh cookie — genuinely not logged in.
            })
            .finally(() => {
                if (!cancelled) setInitializing(false);
            });

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const stored = window.localStorage.getItem(SIDEBAR_STORAGE_KEY);
        if (stored !== null) setCollapsed(stored === '1');
    }, []);

    const toggleCollapsed = () => {
        setCollapsed((prev) => {
            const next = !prev;
            window.localStorage.setItem(SIDEBAR_STORAGE_KEY, next ? '1' : '0');
            return next;
        });
    };

    if (isInitializing) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="h-5 w-5 rounded-full border-2 border-border border-t-primary-500 animate-spin" />
            </div>
        );
    }

    return (
        <ProtectedRoute role="admin">
            <div className="min-h-screen flex bg-background">
                <Sidebar collapsed={collapsed} onToggle={toggleCollapsed} />
                <div className="flex-1 min-w-0 flex flex-col">
                    <Topbar />
                    <main className="flex-1 p-6">{children}</main>
                </div>
            </div>
        </ProtectedRoute>
    );
}