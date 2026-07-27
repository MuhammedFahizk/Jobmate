import type { ReactNode } from 'react';
import { GuestRoute } from '@/components/GuestRoute';

export default function ForgotPasswordLayout({ children }: { children: ReactNode }) {
  return (
    <GuestRoute role="candidate" redirectTo="/dashboard">
      {children}
    </GuestRoute>
  );
}
