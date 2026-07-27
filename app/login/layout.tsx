
import type { ReactNode } from 'react';
import { GuestRoute } from '@/components/GuestRoute';

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <GuestRoute role="candidate" redirectTo="/dashboard">
      {children}
    </GuestRoute>
  );
}