// app/register/layout.tsx — guest-only gate for the register page
import type { ReactNode } from 'react';
import { GuestRoute } from '@/components/GuestRoute';

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return <GuestRoute>{children}</GuestRoute>;
}
