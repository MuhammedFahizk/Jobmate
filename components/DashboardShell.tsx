// ─────────────────────────────────────────────────────────────────────────────
// components/DashboardShell.tsx
// The persistent shell that wraps every /dashboard/* page:
//   • ProtectedRoute gate (role="candidate" — see fix note below)
//   • Profile header card (avatar, name, email, sign-out button)
//   • Sidebar nav on desktop / pill tabs on mobile
//   • Content slot ({children}) for the active sub-page
//   • Quick-link strip at the bottom
//
// Used ONCE, at the candidate dashboard layout level — NOT per-page.
// Individual pages (profile, applications, ...) use SectionShell for
// their own title bar; SectionShell has no auth logic of its own.
//
// FIX: role="candidate" added to the ProtectedRoute call below. Without
// it, ProtectedRoute only checked isAuthenticated — any valid session,
// admin included, passed. An admin logged in at /mc-ops/login could
// freely browse /dashboard/profile, /dashboard/applications, etc.
// ─────────────────────────────────────────────────────────────────────────────
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  User,
  BriefcaseBusiness,
  ShieldCheck,
  LogOut,
  LayoutDashboard,
  ArrowUpRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

import { useAuthStore } from '@/lib/store/authStore';
import { useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useConfirm } from '@/components/ui/ConfirmModal';
import { useToast } from '@/components/ui/Toast';

// ── Helpers ───────────────────────────────────────────────────────────────────

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

// ── Nav config ────────────────────────────────────────────────────────────────

const NAV = [
  { href: '/dashboard/profile', label: 'Profile', Icon: User },
  // { href: '/dashboard/applications', label: 'Applications', Icon: BriefcaseBusiness },
  { href: '/dashboard/security', label: 'Security', Icon: ShieldCheck },
] as const;

const QUICK_LINKS = [
  {
    href: '/jobs',
    label: 'Browse Jobs',
    sub: 'Explore all open positions',
    Icon: BriefcaseBusiness,
  },
  {
    href: '/services',
    label: 'Our Services',
    sub: 'Job consulting & home staffing',
    Icon: LayoutDashboard,
  },
];

// ── Inner shell (needs hooks, so must be client) ───────────────────────────────

function ShellInner({ children }: { children: ReactNode }) {
  const user = useAuthStore((s) => s.user);
  const { logout } = useAuth();
  const pathname = usePathname();
  const confirm = useConfirm();
  const { info } = useToast();

  if (!user) return null; // ProtectedRoute is redirecting

  const initials = getInitials(user.name);

  const handleSignOut = async () => {
    const ok = await confirm({
      variant: 'warning',
      title: 'Sign out of JobMate?',
      description: 'You will be redirected to the login page.',
      confirmLabel: 'Sign Out',
      cancelLabel: 'Stay',
    });
    if (!ok) return;
    info('Signed out', 'See you next time! 👋');
    await logout();
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background py-8 px-6">
      <div className=" max-w-7xl px-6 mx-auto flex flex-col gap-6">

        {/* ── Profile header ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-card border border-border shadow-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary-100 text-primary-700 font-display font-bold text-xl flex items-center justify-center shadow-inner shrink-0">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-display font-bold text-xl text-foreground leading-tight">
                  {user.name}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-pill bg-background border border-border font-body text-[10px] font-semibold text-muted uppercase tracking-wider">
                  <LayoutDashboard size={10} /> Candidate
                </span>
              </div>
              <p className="font-body text-sm text-muted mt-0.5">{user.email}</p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 rounded-pill border border-border font-body text-sm font-medium text-muted hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-all duration-200 shrink-0"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </motion.div>

        {/* ── Body ──────────────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.06 }}
            className="lg:w-56 shrink-0"
          >
            {/* Mobile: horizontal pills */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {NAV.map(({ href, label, Icon }) => {
                const active = pathname === href || pathname.startsWith(href + '/');
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-pill font-body text-sm font-medium transition-all duration-200 border ${active
                      ? 'bg-primary-500 text-white border-primary-500 shadow-sm'
                      : 'bg-white text-muted border-border hover:border-primary-300 hover:text-primary-600'
                      }`}
                  >
                    <Icon size={14} />
                    {label}
                  </Link>
                );
              })}
            </div>

            {/* Desktop: vertical list */}
            <div className="hidden lg:flex flex-col bg-white rounded-card border border-border shadow-card p-2 gap-0.5">
              {NAV.map(({ href, label, Icon }) => {
                const active = pathname === href || pathname.startsWith(href + '/');
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-card-sm font-body text-sm font-medium transition-all duration-200 ${active
                      ? 'bg-primary-50 text-primary-700 font-semibold'
                      : 'text-muted hover:bg-background hover:text-foreground'
                      }`}
                  >
                    <Icon
                      size={15}
                      className={active ? 'text-primary-500' : 'text-muted'}
                    />
                    {label}
                  </Link>
                );
              })}

              {/* Sign out in sidebar */}
              <div className="mt-2 pt-2 border-t border-border">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-card-sm font-body text-sm font-medium text-muted hover:text-rose-600 hover:bg-rose-50 transition-all duration-200"
                >
                  <LogOut size={15} />
                  Sign Out
                </button>
              </div>
            </div>
          </motion.aside>

          {/* Content slot */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 min-w-0"
          >
            {children}
          </motion.div>
        </div>

        {/* ── Quick links ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {QUICK_LINKS.map(({ href, label, sub, Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-4 p-4 bg-white rounded-card border border-border shadow-card hover:border-primary-300 hover:shadow-card-hover transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-card-sm bg-primary-50 text-primary-500 flex items-center justify-center group-hover:bg-primary-100 transition-colors shrink-0">
                <Icon size={18} />
              </div>
              <div className="min-w-0">
                <p className="font-body text-sm font-semibold text-foreground group-hover:text-primary-600 transition-colors">
                  {label}
                </p>
                <p className="font-body text-xs text-muted">{sub}</p>
              </div>
              <ArrowUpRight
                size={14}
                className="ml-auto text-muted group-hover:text-primary-500 transition-colors shrink-0"
              />
            </Link>
          ))}
        </motion.div>

      </div>
    </div>
  );
}

// ── Public export — wraps ProtectedRoute around the inner shell ───────────────

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute role="candidate">
      <ShellInner>{children}</ShellInner>
    </ProtectedRoute>
  );
}