'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SectionShell } from '@/components/dashboard/SectionShell';
import DataTable, { type DataTableColumn } from '@/components/admin/DataTable';
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          {c.phone && (
            <a
              href={getWhatsAppLink(c.phone, `Hello ${c.name}, `)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-[12px] font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-1 rounded transition-colors"
              title="Message on WhatsApp"
            >
              <WhatsAppIcon />
              <span>WhatsApp</span>
            </a>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/mc-ops/candidates/${c._id}`);
            }}
            className="text-[12px] text-muted hover:text-foreground px-2.5 py-1 border border-border rounded hover:bg-[#FAFAF9]"
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
