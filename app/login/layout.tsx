
import { Suspense, type ReactNode } from 'react';
import { GuestRoute } from '@/components/GuestRoute';

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>

      <GuestRoute role="candidate" redirectTo="/dashboard">
        {children}
      </GuestRoute>
    </Suspense>
  );
}