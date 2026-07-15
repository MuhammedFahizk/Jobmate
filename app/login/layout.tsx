// app/login/layout.tsx — guest-only gate for the login page
import type { ReactNode } from 'react';
import { GuestRoute } from '@/components/GuestRoute';

export default function LoginLayout({ children }: { children: ReactNode }) {
  return <GuestRoute>{children}</GuestRoute>;
}
