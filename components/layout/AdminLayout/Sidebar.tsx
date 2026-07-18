// ─────────────────────────────────────────────────────────────────────────────
// components/layouts/AdminLayout/Sidebar.tsx
// Plain, utilitarian admin nav — collapsible, icon-only when collapsed.
// Collapsed state is owned by the parent (AdminLayout/index.tsx), not a
// global store — this is UI chrome state only.
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
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const NAV = [
  { href: '/mc-ops/admin-dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { href: '/mc-ops/jobs', label: 'Jobs', Icon: Briefcase },
  { href: '/mc-ops/applications', label: 'Applications', Icon: FileText },
  { href: '/mc-ops/candidates', label: 'Candidates', Icon: Users },
  { href: '/mc-ops/services', label: 'Services', Icon: Wrench },
  { href: '/mc-ops/contacts', label: 'Contacts', Icon: Mail },
  { href: '/mc-ops/reviews', label: 'Reviews', Icon: Star },
] as const;

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`shrink-0 border-r border-gray-200 bg-white flex flex-col transition-all duration-200 ${collapsed ? 'w-16' : 'w-56'
        }`}
    >
      <div className="h-14 flex items-center justify-between px-3 border-b border-gray-200">
        {!collapsed && (
          <span className="text-sm font-semibold text-gray-900 truncate">
            JobMate Admin
          </span>
        )}
        <button
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="ml-auto p-1.5 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="flex-1 py-2 px-2 flex flex-col gap-0.5">
        {NAV.map(({ href, label, Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-3 px-2.5 py-2 rounded-md text-sm font-medium transition-colors ${active
                ? 'bg-primary-50 text-primary-700'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                } ${collapsed ? 'justify-center' : ''}`}
            >
              <Icon size={16} className={active ? 'text-primary-600' : 'text-gray-400'} />
              {!collapsed && <span className="truncate">{label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}