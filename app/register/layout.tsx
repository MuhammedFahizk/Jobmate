// app/register/layout.tsx — guest-only gate for the register page
import { Suspense, type ReactNode } from 'react';
import { GuestRoute } from '@/components/GuestRoute';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <GuestRoute role="candidate" redirectTo="/dashboard">{children}
      </GuestRoute>
    </Suspense>
  )
}
