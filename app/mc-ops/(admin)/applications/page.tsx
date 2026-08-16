'use client';

import { useEffect, useState, useCallback } from 'react';
import DataTable, { type DataTableColumn, StatusBadge } from '@/components/admin/DataTable';
import { AdminListToolbar } from '@/components/admin/AdminListToolbar';
import { SectionShell } from '@/components/dashboard/SectionShell';
import { useToast } from '@/components/ui/Toast';
import {
  applicationsService,
  type AdminApplicationEntry,
} from '@/lib/services/applications.service';

const PAGE_SIZE = 10;

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'reviewed', label: 'Reviewed' },
  { value: 'shortlisted', label: 'Shortlisted' },
  { value: 'placed', label: 'Placed' },
  { value: 'rejected', label: 'Rejected' },
];

const SORT_OPTIONS = [
  { value: '-createdAt', label: 'Newest first' },
  { value: 'createdAt', label: 'Oldest first' },
];

const TONE_MAP: Record<string, 'neutral' | 'positive' | 'warning' | 'negative'> = {
  pending: 'neutral',
  reviewed: 'warning',
  shortlisted: 'positive',
  placed: 'positive',
  rejected: 'negative',
};

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="12"
    height="12"
    fill="currentColor"
    className="inline-block"
  >
    <path d="M12.012 2c-5.506 0-9.988 4.47-9.988 9.951 0 1.758.459 3.474 1.33 4.982L2 22l5.215-1.365a9.902 9.902 0 0 0 4.797 1.233c5.507 0 9.988-4.47 9.988-9.951C22 6.47 17.519 2 12.012 2zm0 17.531c-1.572 0-3.11-.42-4.46-1.218l-.32-.19-3.097.81.826-3.018-.21-.334c-.874-1.39-1.334-3-1.334-4.664 0-4.693 3.829-8.511 8.595-8.511 4.764 0 8.593 3.818 8.593 8.511 0 4.694-3.829 8.513-8.593 8.513zm4.706-6.425c-.258-.13-1.528-.752-1.764-.838-.236-.086-.407-.13-.578.13-.171.26-.66.838-.81.996-.148.158-.297.18-.555.05-.258-.13-1.09-.402-2.077-1.28-.767-.684-1.285-1.53-1.436-1.79-.15-.26-.016-.401.113-.53.117-.116.258-.302.387-.453.128-.15.172-.258.258-.43.086-.171.043-.323-.021-.453-.065-.13-.578-1.396-.792-1.912-.208-.5-.437-.43-.578-.437-.148-.007-.323-.007-.495-.007-.172 0-.451.065-.688.324-.236.258-.902.882-.902 2.15 0 1.27.924 2.496 1.053 2.668.129.172 1.819 2.778 4.407 3.896.615.266 1.096.424 1.47.543.618.196 1.18.169 1.624.103.495-.073 1.528-.624 1.742-1.226.215-.602.215-1.118.15-1.226-.065-.107-.236-.171-.494-.301z"/>
  </svg>
);

function getWhatsAppLink(phone: string, text?: string) {
  const cleanPhone = phone.replace(/\D/g, '');
  const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  const url = new URL(`https://wa.me/${formattedPhone}`);
  if (text) {
    url.searchParams.set('text', text);
  }
  return url.toString();
}

function getApplicationWhatsAppMessage(candidateName: string, jobTitle: string, companyName: string, status: string) {
  switch (status) {
    case 'shortlisted':
      return `Hello ${candidateName}, we are pleased to inform you that your application for the "${jobTitle}" position at ${companyName} has been shortlisted. We will reach out shortly for the next steps. - JobMate`;
    case 'placed':
      return `Hello ${candidateName}, congratulations! You have been successfully placed for the "${jobTitle}" position at ${companyName}. Our team will contact you to finalize the onboarding. - JobMate`;
    case 'rejected':
      return `Hello ${candidateName}, thank you for your interest in the "${jobTitle}" position at ${companyName}. We regret to inform you that we will not be moving forward with your application at this time. - JobMate`;
    case 'reviewed':
      return `Hello ${candidateName}, your application for the "${jobTitle}" position at ${companyName} has been reviewed by our team. We will keep you updated on any status updates. - JobMate`;
    case 'pending':
    default:
      return `Hello ${candidateName}, thank you for applying for the "${jobTitle}" position at ${companyName}. We have received your application and are currently reviewing it. - JobMate`;
  }
}

export default function AdminApplicationsPage() {
  const toast = useToast();

  const [applications, setApplications] = useState<AdminApplicationEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sort, setSort] = useState(SORT_OPTIONS[0].value);

  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const load = useCallback(() => {
    setLoading(true);
    applicationsService
      .getAllApplicationsAdmin({
        page,
        limit: PAGE_SIZE,
        sort,
        ...(search ? { search } : {}),
        ...(statusFilter ? { status: statusFilter } : {}),
      })
      .then((data) => {
        setApplications(data.data.applications);
        setTotal(data.total);
      })
      .catch(() => toast.error('Could not load applications.'))
      .finally(() => setLoading(false));
  }, [page, search, statusFilter, sort, toast]);

  useEffect(load, [load]);

  const updateSearch = (v: string) => { setSearch(v); setPage(1); };
  const updateStatus = (v: string) => { setStatusFilter(v); setPage(1); };
  const updateSort = (v: string) => { setSort(v); setPage(1); };

  const handleStatusChange = async (app: AdminApplicationEntry, newStatus: string) => {
    if (newStatus === app.status) return;
    setUpdatingId(app._id);

    // Optimistic update
    setApplications((prev) =>
      prev.map((a) => (a._id === app._id ? { ...a, status: newStatus as AdminApplicationEntry['status'] } : a))
    );

    try {
      const updated = await applicationsService.updateApplicationStatus(app._id, newStatus);
      setApplications((prev) => prev.map((a) => (a._id === app._id ? { ...a, ...updated } : a)));
      toast.success(`Status updated to ${newStatus}.`);
    } catch {
      // Rollback
      setApplications((prev) =>
        prev.map((a) => (a._id === app._id ? { ...a, status: app.status } : a))
      );
      toast.error('Could not update status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });

  const columns: DataTableColumn<AdminApplicationEntry>[] = [
    {
      key: 'candidate',
      header: 'Candidate',
      render: (a) => (
        <div>
          <p className="font-medium text-foreground text-[13px]">{a.candidate?.name ?? '—'}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-[11px] text-muted">{a.candidate?.email ?? ''}</p>
            {a.candidate?.phone && (
              <a
                href={getWhatsAppLink(
                  a.candidate.phone,
                  getApplicationWhatsAppMessage(
                    a.candidate.name,
                    a.job?.title ?? 'Job Listing',
                    a.job?.company ?? 'Company',
                    a.status
                  )
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-1.5 py-0.5 rounded transition-colors"
                title="Message on WhatsApp"
              >
                <WhatsAppIcon />
                <span>WhatsApp</span>
              </a>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'job',
      header: 'Job',
      render: (a) => (
        <div>
          <p className="font-medium text-foreground text-[13px]">{a.job?.title ?? '—'}</p>
          <p className="text-[11px] text-muted">{a.job?.company ?? ''}</p>
        </div>
      ),
    },
    {
      key: 'createdAt',
      header: 'Applied',
      render: (a) => <span className="text-[12px] text-muted">{formatDate(a.createdAt)}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (a) => <StatusBadge status={a.status} tone={TONE_MAP[a.status] ?? 'neutral'} />,
    },
    {
      key: 'actions',
      header: 'Change status',
      align: 'right',
      render: (a) => (
        <select
          value={a.status}
          disabled={updatingId === a._id}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => handleStatusChange(a, e.target.value)}
          className="border border-border rounded-md px-2 py-1 text-[12px] text-foreground disabled:opacity-50"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      ),
    },
  ];

  return (
    <SectionShell
      title="Applications"
      description="Every application submitted across all listings."
    >
      <AdminListToolbar
        searchValue={search}
        onSearchChange={updateSearch}
        searchPlaceholder="Search candidate or job..."
        filters={[
          {
            key: 'status',
            label: 'statuses',
            value: statusFilter,
            onChange: updateStatus,
            options: STATUS_OPTIONS,
          },
        ]}
        sortOptions={SORT_OPTIONS}
        sortValue={sort}
        onSortChange={updateSort}
      />

      <DataTable
        columns={columns}
        rows={applications}
        rowKey={(a) => a._id}
        loading={loading}
        emptyLabel="No applications match your filters."
        serverPagination={{ page, totalPages, total, onPageChange: setPage }}
      />
    </SectionShell>
  );
}