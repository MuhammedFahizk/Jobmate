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
          <p className="text-[11px] text-muted">{a.candidate?.email ?? ''}</p>
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
      key: 'whatsappClicked',
      header: 'WhatsApp',
      render: (a) => (
        <StatusBadge
          status={a.whatsappClicked ? 'clicked' : 'not yet'}
          tone={a.whatsappClicked ? 'positive' : 'neutral'}
        />
      ),
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