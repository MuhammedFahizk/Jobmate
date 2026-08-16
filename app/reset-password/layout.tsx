import { Suspense, type ReactNode } from 'react';

export default function ResetPasswordLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      {children}
    </Suspense>
  );
}
