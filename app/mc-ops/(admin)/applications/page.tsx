'use client'
import DataTable, { DataTableColumn, StatusBadge } from "@/components/admin/DataTable";
import { SectionShell } from "@/components/dashboard/SectionShell";
import { useToast } from "@/components/ui/Toast";
import {
  listApplications,
  updateApplicationStatus,
  type AdminApplication,
  type AdminApplicationStatus,
} from '@/lib/dummy-data';
import { useEffect, useState } from "react";
const STATUS_OPTIONS: AdminApplicationStatus[] = ['pending', 'reviewed', 'shortlisted', 'rejected', 'accepted'];

const TONE: Record<AdminApplicationStatus, 'neutral' | 'positive' | 'warning' | 'negative'> = {
  pending: 'neutral',
  reviewed: 'warning',
  shortlisted: 'positive',
  accepted: 'positive',
  rejected: 'negative',
};

export default function AdminApplicationsPage() {
  const toast = useToast();
  const [applications, setApplications] = useState<AdminApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<AdminApplicationStatus | 'all'>('all');

  const load = () => {
    setLoading(true);
    listApplications().then((data) => {
      setApplications(data);
      setLoading(false);
    });
  };

  useEffect(load, []);

  const handleStatusChange = async (id: string, status: AdminApplicationStatus) => {
    await updateApplicationStatus(id, status);
    toast.success('Application status updated.');
    load();
  };

  const filtered = statusFilter === 'all' ? applications : applications.filter((a) => a.status === statusFilter);

  const columns: DataTableColumn<AdminApplication>[] = [
    { key: 'candidateName', header: 'Candidate', render: (a) => <span className="font-medium">{a.candidateName}</span> },
    { key: 'jobTitle', header: 'Job' },
    { key: 'appliedAt', header: 'Applied' },
    {
      key: 'note',
      header: 'Note',
      render: (a) => <span className="text-muted text-[12px]">{a.note ?? '—'}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (a) => <StatusBadge status={a.status} tone={TONE[a.status]} />,
    },
    {
      key: 'actions',
      header: 'Change status',
      align: 'right',
      render: (a) => (
        <select
          value={a.status}
          onChange={(e) => handleStatusChange(a.id, e.target.value as AdminApplicationStatus)}
          className="border border-border rounded-md px-2 py-1 text-[12px] text-foreground"
          onClick={(e) => e.stopPropagation()}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      ),
    },
  ];

  return (
    <SectionShell
      title="Applications"
      description="Every application submitted across all listings."
      actions={
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as AdminApplicationStatus | 'all')}
          className="border border-border rounded-md px-2.5 py-1.5 text-[13px] text-foreground"
        >
          <option value="all">All statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      }
    >
      <DataTable columns={columns} rows={filtered} rowKey={(a) => a.id} loading={loading} emptyLabel="No applications yet." />
    </SectionShell>
  );
}