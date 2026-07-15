// ─────────────────────────────────────────────────────────────────────────────
// app/dashboard/applications/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
'use client';

import { BriefcaseBusiness, ArrowUpRight } from 'lucide-react';
import { dummyApplications, type Application } from '@/lib/dummy-data';
import { SectionShell } from '@/components/dashboard/SectionShell';

// ── Status styles ─────────────────────────────────────────────────────────────

const STATUS_BADGE: Record<Application['status'], string> = {
  Accepted:     'bg-emerald-50 text-emerald-700 border-emerald-200',
  Interviewing: 'bg-secondary-50 text-secondary-700 border-secondary-100',
  Applied:      'bg-primary-50 text-primary-700 border-primary-100',
  Reviewing:    'bg-amber-50 text-amber-700 border-amber-200',
  Rejected:     'bg-rose-50 text-rose-700 border-rose-200',
};

const STATUS_DOT: Record<Application['status'], string> = {
  Accepted:     'bg-emerald-500',
  Interviewing: 'bg-secondary-500',
  Applied:      'bg-primary-500',
  Reviewing:    'bg-amber-500',
  Rejected:     'bg-rose-500',
};

function StatusBadge({ status }: { status: Application['status'] }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-pill text-[10px] font-semibold border ${STATUS_BADGE[status]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[status]}`} />
      {status}
    </span>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ApplicationsPage() {
  const apps = dummyApplications;

  return (
    <SectionShell
      title="My Applications"
      description="Track the status of every job you have applied for."
    >
      {apps.length === 0 ? (
        /* ── Empty state ───────────────────────────────────────────────── */
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center">
            <BriefcaseBusiness size={20} className="text-muted" />
          </div>
          <p className="font-display font-semibold text-foreground">No applications yet</p>
          <p className="font-body text-sm text-muted max-w-xs">
            Browse available jobs and apply — your applications will show up here.
          </p>
          <a
            href="/jobs"
            className="flex items-center gap-1 mt-1 font-body text-sm font-semibold text-primary-500 hover:underline"
          >
            Explore Jobs <ArrowUpRight size={13} />
          </a>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="font-body text-xs text-muted">
            {apps.length} application{apps.length !== 1 ? 's' : ''} tracked.
          </p>

          {/* ── Desktop table ───────────────────────────────────────────── */}
          <div className="hidden sm:block overflow-x-auto -mx-1 px-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border">
                  {['Job Title', 'Company', 'Date Applied', 'Status'].map((h) => (
                    <th
                      key={h}
                      className="pb-3 pr-4 last:pr-0 last:text-right font-body text-[11px] font-semibold text-muted uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {apps.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-background/50 transition-colors group"
                  >
                    <td className="py-3.5 pr-4 font-body text-sm font-semibold text-foreground">
                      {app.jobTitle}
                    </td>
                    <td className="py-3.5 pr-4 font-body text-sm text-muted">
                      {app.company}
                    </td>
                    <td className="py-3.5 pr-4 font-body text-sm text-muted">
                      {app.appliedDate}
                    </td>
                    <td className="py-3.5 text-right">
                      <StatusBadge status={app.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Mobile cards ────────────────────────────────────────────── */}
          <div className="flex flex-col gap-3 sm:hidden">
            {apps.map((app) => (
              <div
                key={app.id}
                className="p-4 rounded-card-sm border border-border bg-background/40 flex items-start justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="font-body text-sm font-semibold text-foreground truncate">
                    {app.jobTitle}
                  </p>
                  <p className="font-body text-xs text-muted">{app.company}</p>
                  <p className="font-body text-xs text-muted mt-1">{app.appliedDate}</p>
                </div>
                <StatusBadge status={app.status} />
              </div>
            ))}
          </div>
        </div>
      )}
    </SectionShell>
  );
}
