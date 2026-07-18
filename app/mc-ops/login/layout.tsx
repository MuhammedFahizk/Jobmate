// app/mc-ops/login/layout.tsx — guest-only gate for the admin login page.
// Outside the (admin) route group deliberately — this must render without
// AdminLayout's sidebar/topbar/ProtectedRoute, but it still needs its own
// guard so an already-logged-in admin doesn't see the login form again.
import type { ReactNode } from 'react';
import { GuestRoute } from '@/components/GuestRoute';

export default function AdminLoginLayout({ children }: { children: ReactNode }) {
    return (
        <GuestRoute role="admin" redirectTo="/mc-ops/admin-dashboard">
            {children}
        </GuestRoute>
    );
}