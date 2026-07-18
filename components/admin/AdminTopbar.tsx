// ─────────────────────────────────────────────────────────────────────────────
// components/admin/AdminTopbar.tsx
// Top bar: page title (derived from route) + admin name/avatar + logout.
// ─────────────────────────────────────────────────────────────────────────────

'use client';

import { usePathname, useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '@/lib/store/authStore';
import { authService } from '@/lib/services/auth.service';
import { useToast } from '@/components/ui/Toast';

const TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/jobs': 'Jobs',
  '/applications': 'Applications',
  '/candidates': 'Candidates',
  '/services': 'Services',
  '/contacts': 'Contact submissions',
  '/reviews': 'Reviews',
};

function titleFor(pathname: string): string {
  const base = `/${pathname.split('/').filter(Boolean)[0] ?? ''}`;
  return TITLES[base] ?? 'Admin';
}

export default function AdminTopbar() {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const toast = useToast();

  const handleLogout = () => {
    authService.logout();
    toast.info('Logged out.');
    router.replace('/mc-ops/login');
  };

  const initials = (user?.name ?? 'A')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <header className="h-14 border-b border-border bg-white flex items-center justify-between px-5 sticky top-0 z-10">
      <h1 className="text-[15px] font-semibold text-foreground">{titleFor(pathname ?? '')}</h1>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-primary-100 text-primary-700 text-[11px] font-semibold flex items-center justify-center">
            {initials}
          </div>
          <span className="text-[13px] text-foreground hidden sm:inline">{user?.name ?? 'Admin'}</span>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="h-7 w-7 flex items-center justify-center rounded text-muted hover:bg-[#F0F0EE] hover:text-foreground"
          aria-label="Log out"
          title="Log out"
        >
          <LogOut size={15} />
        </button>
      </div>
    </header>
  );
}
