// app/(user)/login/layout.tsx — guest-only gate for the candidate login page
//
// role="candidate" added deliberately: this page's GuestRoute should
// only whisk away users who are already logged in AS A CANDIDATE. If it
// treated any authenticated session as "already logged in, go to
// /dashboard" (the previous behavior), an admin who ever ended up here
// — say, via a stale link or a future bug — would get bounced to
// /dashboard, fail ProtectedRoute's candidate check there, and bounce
// right back, recreating the same kind of loop this component exists to
// prevent. With role="candidate", an authenticated admin simply sees the
// (harmless) candidate login form instead of ping-ponging.
import type { ReactNode } from 'react';
import { GuestRoute } from '@/components/GuestRoute';

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <GuestRoute role="candidate" redirectTo="/dashboard">
      {children}
    </GuestRoute>
  );
}