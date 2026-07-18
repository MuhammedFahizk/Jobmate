// ─────────────────────────────────────────────────────────────────────────────
// components/admin/AdminSidebar.tsx
// Collapsible sidebar, icon-only when collapsed. Collapsed/expanded state is
// owned by app/(admin)/layout.tsx (simple useState + localStorage), not a
// global store — this component is purely presentational + the toggle.
// ─────────────────────────────────────────────────────────────────────────────

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Users,
  Wrench,
  Mail,
  Star,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/jobs', label: 'Jobs', icon: Briefcase },
  { href: '/applications', label: 'Applications', icon: FileText },
  { href: '/candidates', label: 'Candidates', icon: Users },
  { href: '/services', label: 'Services', icon: Wrench },
  { href: '/contacts', label: 'Contacts', icon: Mail },
  { href: '/reviews', label: 'Reviews', icon: Star },
] as const;

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`h-screen sticky top-0 flex flex-col border-r border-border bg-white transition-[width] duration-150 ${
        collapsed ? 'w-[64px]' : 'w-[220px]'
      }`}
    >
      <div className={`h-14 flex items-center border-b border-border ${collapsed ? 'justify-center' : 'justify-between px-4'}`}>
        {!collapsed && (
          <span className="font-semibold text-[13px] tracking-wide text-foreground">JobMate Ops</span>
        )}
        <button
          type="button"
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="h-7 w-7 flex items-center justify-center rounded text-muted hover:bg-[#F0F0EE] hover:text-foreground"
        >
          {collapsed ? <ChevronsRight size={15} /> : <ChevronsLeft size={15} />}
        </button>
      </div>

      <nav className="flex-1 py-2 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`mx-2 mb-0.5 flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] transition-colors ${
                collapsed ? 'justify-center' : ''
              } ${
                active
                  ? 'bg-primary-50 text-primary-700 font-medium'
                  : 'text-muted hover:bg-[#F0F0EE] hover:text-foreground'
              }`}
            >
              <Icon size={16} strokeWidth={2} className="flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
