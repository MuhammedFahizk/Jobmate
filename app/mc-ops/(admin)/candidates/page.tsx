'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SectionShell } from '@/components/dashboard/SectionShell';
import DataTable, { StatusBadge, type DataTableColumn } from '@/components/admin/DataTable';
import { listCandidates, verifyCandidate, type Candidate } from '@/lib/dummy-data';
import { useToast } from '@/components/ui/Toast';

export default function AdminCandidatesPage() {
  const router = useRouter();
  const toast = useToast();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    listCandidates().then((data) => {
      setCandidates(data);
      setLoading(false);
    });
  };

  useEffect(load, []);

  const handleVerify = async (id: string) => {
    await verifyCandidate(id);
    toast.success('Candidate verified.');
    load();
  };

  const columns: DataTableColumn<Candidate>[] = [
    { key: 'name', header: 'Name', render: (c) => <span className="font-medium">{c.name}</span> },
    { key: 'email', header: 'Email' },
    { key: 'category', header: 'Category' },
    { key: 'location', header: 'Location' },
    {
      key: 'isVerified',
      header: 'Verified',
      render: (c) => <StatusBadge status={c.isVerified ? 'verified' : 'unverified'} tone={c.isVerified ? 'positive' : 'neutral'} />,
    },
    {
      key: 'paymentStatus',
      header: 'Payment',
      render: (c) => <StatusBadge status={c.paymentStatus} tone={c.paymentStatus === 'paid' ? 'positive' : 'warning'} />,
    },
    {
      key: 'actions',
      header: '',
      align: 'right',
      render: (c) => (
        <div className="flex justify-end gap-2">
          {!c.isVerified && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleVerify(c.id);
              }}
              className="text-[12px] text-primary-600 hover:underline"
            >
              Verify
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/candidates/${c.id}`);
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
      <DataTable
        columns={columns}
        rows={candidates}
        rowKey={(c) => c.id}
        loading={loading}
        emptyLabel="No candidates yet."
        onRowClick={(c) => router.push(`/candidates/${c.id}`)}
      />
    </SectionShell>
  );
}
