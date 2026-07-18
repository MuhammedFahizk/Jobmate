// ─────────────────────────────────────────────────────────────────────────────
// components/layouts/AdminLayout/Topbar.tsx
// ─────────────────────────────────────────────────────────────────────────────

'use client';

import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '@/lib/store/authStore';
import { authService } from '@/lib/services/auth.service';

function titleFromPath(pathname: string): string {
  const last = pathname.split('/').filter(Boolean).pop() ?? 'admin-dashboard';
  return last
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

export default function Topbar() {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);

  const handleLogout = async () => {
    await authService.logout();
    window.location.href = '/mc-ops/login';
  };

  return (
    <header className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-6 shrink-0">
      <h1 className="text-sm font-semibold text-gray-900">{titleFromPath(pathname)}</h1>

      <div className="flex items-center gap-4">
        {user && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 text-xs font-semibold flex items-center justify-center">
              {getInitials(user.name)}
            </div>
            <span className="text-sm text-gray-700">{user.name}</span>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </header>
  );
}