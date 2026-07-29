// app/register/layout.tsx — guest-only gate for the register page
import { Suspense, type ReactNode } from 'react';
import { GuestRoute } from '@/components/GuestRoute';

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <GuestRoute role="candidate" redirectTo="/dashboard">{children}
      </GuestRoute>
    </Suspense>
  )
}
