'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SectionShell } from '@/components/dashboard/SectionShell';
import DataTable, { StatusBadge, type DataTableColumn } from '@/components/admin/DataTable';
import { AdminListToolbar } from '@/components/admin/AdminListToolbar';
import { useToast } from '@/components/ui/Toast';
import { candidatesService } from '@/lib/services/candidates.service';
import type { AdminCandidate } from '@/lib/types/user.type';

const PAGE_SIZE = 10;

const SORT_OPTIONS = [
  { value: '-createdAt', label: 'Newest first' },
  { value: 'createdAt', label: 'Oldest first' },
  { value: 'name', label: 'Name (A–Z)' },
];

export default function AdminCandidatesPage() {
  const router = useRouter();
  const toast = useToast();

  const [candidates, setCandidates] = useState<AdminCandidate[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isActiveFilter, setIsActiveFilter] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [sort, setSort] = useState(SORT_OPTIONS[0].value);

  const [statusUpdatingId, setStatusUpdatingId] = useState<string | null>(null);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const load = () => {
    setLoading(true);
    candidatesService
      .getCandidates({
        page,
        limit: PAGE_SIZE,
        sort,
        ...(search ? { search } : {}),
        ...(isActiveFilter ? { isActive: isActiveFilter } : {}),
        ...(paymentStatus ? { paymentStatus } : {}),
      })
      .then((data) => {
        setCandidates(data.data.candidates);
        setTotal(data.total);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Could not load candidates.');
        setLoading(false);
      });
  };

  useEffect(load, [page, search, isActiveFilter, paymentStatus, sort]);

  const updateSearch = (value: string) => { setSearch(value); setPage(1); };
  const updateIsActive = (value: string) => { setIsActiveFilter(value); setPage(1); };
  const updatePaymentStatus = (value: string) => { setPaymentStatus(value); setPage(1); };
  const updateSort = (value: string) => { setSort(value); setPage(1); };

  const handleActiveStatusChange = async (candidate: AdminCandidate, newStatus: boolean) => {
    if (newStatus === candidate.isActive) return;
    setStatusUpdatingId(candidate._id);
    try {
      const updated = await candidatesService.updateCandidateStatus(candidate._id, { isActive: newStatus });
      setCandidates((prev) => prev.map((c) => (c._id === candidate._id ? updated : c)));
      toast.success(newStatus ? 'Candidate activated.' : 'Candidate deactivated.');
    } catch {
      toast.error('Could not update status.');
    } finally {
      setStatusUpdatingId(null);
    }
  };

  const handlePaymentStatusChange = async (candidate: AdminCandidate, newStatus: 'unpaid' | 'paid') => {
    if (newStatus === candidate.paymentStatus) return;
    setStatusUpdatingId(candidate._id);
    try {
      const updated = await candidatesService.updateCandidateStatus(candidate._id, { paymentStatus: newStatus });
      setCandidates((prev) => prev.map((c) => (c._id === candidate._id ? updated : c)));
      toast.success(`Payment marked as ${newStatus}.`);
    } catch {
      toast.error('Could not update payment status.');
    } finally {
      setStatusUpdatingId(null);
    }
  };

  const columns: DataTableColumn<AdminCandidate>[] = [
    { key: 'name', header: 'Name', render: (c) => <span className="font-medium">{c.name}</span> },
    { key: 'email', header: 'Email' },
    { key: 'category', header: 'Category', render: (c) => c.category || '—' },
    { key: 'location', header: 'Location', render: (c) => c.location || '—' },
    {
      key: 'isActive',
      header: 'Status',
      render: (c) => (
        <select
          value={c.isActive ? 'true' : 'false'}
          disabled={statusUpdatingId === c._id}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => handleActiveStatusChange(c, e.target.value === 'true')}
          className={`text-[12px] rounded border px-1.5 py-1 capitalize disabled:opacity-50 ${c.isActive
            ? 'bg-[#EAF4FD] text-primary-700 border-primary-100'
            : 'bg-[#F0F0EE] text-muted border-border'
            }`}
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      ),
    },
    {
      key: 'paymentStatus',
      header: 'Payment',
      render: (c) => (
        <select
          value={c.paymentStatus}
          disabled={statusUpdatingId === c._id}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => handlePaymentStatusChange(c, e.target.value as 'unpaid' | 'paid')}
          className={`text-[12px] rounded border px-1.5 py-1 capitalize disabled:opacity-50 ${c.paymentStatus === 'paid'
            ? 'bg-[#EAF4FD] text-primary-700 border-primary-100'
            : 'bg-[#F0F0EE] text-muted border-border'
            }`}
        >
          <option value="unpaid">Unpaid</option>
          <option value="paid">Paid</option>
        </select>
      ),
    },
    {
      key: 'actions',
      header: '',
      align: 'right',
      render: (c) => (
        <div className="flex justify-end gap-2 items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/mc-ops/candidates/${c._id}`);
            }}
            className="text-[12px] text-muted hover:text-foreground"
          >
            View
          </button>
        </div>
      ),
    },
  ];

  return (
    <SectionShell title="Candidates" description="Everyone registered on the platform.">
      <AdminListToolbar
        searchValue={search}
        onSearchChange={updateSearch}
        searchPlaceholder="Search by name or email..."
        filters={[
          {
            key: 'isActive',
            label: 'account status',
            value: isActiveFilter,
            onChange: updateIsActive,
            options: [
              { value: 'true', label: 'Active' },
              { value: 'false', label: 'Inactive' },
            ],
          },
          {
            key: 'paymentStatus',
            label: 'payment',
            value: paymentStatus,
            onChange: updatePaymentStatus,
            options: [
              { value: 'paid', label: 'Paid' },
              { value: 'unpaid', label: 'Unpaid' },
            ],
          },
        ]}
        sortOptions={SORT_OPTIONS}
        sortValue={sort}
        onSortChange={updateSort}
      />

      <DataTable
        columns={columns}
        rows={candidates}
        rowKey={(c) => c._id}
        loading={loading}
        emptyLabel="No candidates match your filters."
        onRowClick={(c) => router.push(`/mc-ops/candidates/${c._id}`)}
        serverPagination={{ page, totalPages, total, onPageChange: setPage }}
      />
    </SectionShell>
  );
}
