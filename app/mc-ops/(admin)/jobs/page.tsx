'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Plus } from 'lucide-react';
import { SectionShell } from '@/components/dashboard/SectionShell';
import DataTable, { type DataTableColumn } from '@/components/admin/DataTable';
import { AdminListToolbar } from '@/components/admin/AdminListToolbar';
import { JobFormModal } from '@/components/admin/job/JobFormModal';
import { useToast } from '@/components/ui/Toast';
import { jobsService } from '@/lib/services/jobs.service';
import { JOB_CATEGORIES, JOB_STATUSES, type AdminJob, type JobStatus } from '@/lib/types/job.type';

const PAGE_SIZE = 5;

const SORT_OPTIONS = [
  { value: '-createdAt', label: 'Newest first' },
  { value: 'createdAt', label: 'Oldest first' },
  { value: 'title', label: 'Title (A–Z)' },
  { value: '-applicantCount', label: 'Most applicants' },
];

export default function AdminJobsPage() {
  const router = useRouter();
  const toast = useToast();

  const [jobs, setJobs] = useState<AdminJob[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [sort, setSort] = useState(SORT_OPTIONS[0].value);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<AdminJob | null>(null);
  const [statusUpdatingId, setStatusUpdatingId] = useState<string | null>(null);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const load = () => {
    setLoading(true);
    jobsService
      .getAllJobsAdmin({
        page,
        limit: PAGE_SIZE,
        sort,
        ...(search ? { search } : {}),
        ...(category ? { category } : {}),
        ...(status ? { status: status as JobStatus } : {}),
      })
      .then((data) => {
        setJobs(data.data.jobs);
        setTotal(data.total);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Could not load jobs.');
        setLoading(false);
      });
  };

  // Reload whenever any filter/sort/page changes.
  useEffect(load, [page, search, category, status, sort]);

  // Any filter/search/sort change should reset back to page 1.
  const updateSearch = (value: string) => { setSearch(value); setPage(1); };
  const updateCategory = (value: string) => { setCategory(value); setPage(1); };
  const updateStatus = (value: string) => { setStatus(value); setPage(1); };
  const updateSort = (value: string) => { setSort(value); setPage(1); };

  const formatSalary = (s: AdminJob['salary']) => {
    if (s.isNegotiable) return 'Negotiable';
    if (s.min == null && s.max == null) return '—';
    const fmt = (n: number) => n.toLocaleString('en-IN');
    if (s.min != null && s.max != null) return `${s.currency} ${fmt(s.min)}–${fmt(s.max)}`;
    return `${s.currency} ${fmt((s.min ?? s.max)!)}`;
  };

  const openCreate = () => { setEditingJob(null); setModalOpen(true); };
  const openEdit = (job: AdminJob) => { setEditingJob(job); setModalOpen(true); };

  const handleSaved = (job: AdminJob) => {
    setJobs((prev) => {
      const exists = prev.some((j) => j._id === job._id);
      if (exists) return prev.map((j) => (j._id === job._id ? job : j));
      // A brand-new job was created — simplest correct behavior is to refetch
      // so pagination/total/sort stay accurate rather than guessing locally.
      load();
      return prev;
    });
  };

  const handleStatusChange = async (job: AdminJob, newStatus: JobStatus) => {
    if (newStatus === job.status) return;
    setStatusUpdatingId(job._id);
    const prevJobs = jobs;
    setJobs((prev) => prev.map((j) => (j._id === job._id ? { ...j, status: newStatus } : j)));
    try {
      const updated = await jobsService.updateJob(job._id, { status: newStatus });
      setJobs((prev) => prev.map((j) => (j._id === job._id ? updated : j)));
      toast.success(`Marked as ${newStatus}.`);
    } catch {
      setJobs(prevJobs);
      toast.error('Could not update status.');
    } finally {
      setStatusUpdatingId(null);
    }
  };

  const columns: DataTableColumn<AdminJob>[] = [
    { key: 'title', header: 'Title', render: (j) => <span className="font-medium">{j.title}</span> },
    { key: 'company', header: 'Company' },
    { key: 'category', header: 'Category' },
    { key: 'type', header: 'Type' },
    { key: 'location', header: 'Location' },
    { key: 'applicantCount', header: 'Applicants', align: 'right' },
    { key: 'salary', header: 'Salary', render: (j) => formatSalary(j.salary) },
    {
      key: 'status',
      header: 'Status',
      render: (j) => (
        <select
          value={j.isActive ? 'active' : 'closed'}
          disabled={statusUpdatingId === j._id}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => handleStatusChange(j, e.target.value as JobStatus)}
          className={`text-[12px] rounded border px-1.5 py-1 capitalize disabled:opacity-50 ${j.isActive
            ? 'bg-[#EAF4FD] text-primary-700 border-primary-100'
            : 'bg-[#F0F0EE] text-muted border-border'
            }`}
        >
          {JOB_STATUSES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      ),
    },
    {
      key: 'actions',
      header: '',
      align: 'right',
      render: (j) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); openEdit(j); }}
            className="text-[12px] text-primary-600 hover:underline"
          >
            <Pencil size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <SectionShell
      title="Jobs"
      description="All job listings on the platform."
      actions={
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary-600 hover:bg-primary-700 text-white text-[13px] font-medium"
        >
          <Plus size={14} /> New job
        </button>
      }
    >
      <AdminListToolbar
        searchValue={search}
        onSearchChange={updateSearch}
        searchPlaceholder="Search title or company..."
        filters={[
          {
            key: 'category',
            label: 'categories',
            value: category,
            onChange: updateCategory,
            options: JOB_CATEGORIES.map((c) => ({ value: c, label: c })),
          },
          {
            key: 'status',
            label: 'statuses',
            value: status,
            onChange: updateStatus,
            options: JOB_STATUSES.map((s) => ({ value: s.value, label: s.label })),
          },
        ]}
        sortOptions={SORT_OPTIONS}
        sortValue={sort}
        onSortChange={updateSort}
      />

      <DataTable
        columns={columns}
        rows={jobs}
        rowKey={(j) => j._id}
        loading={loading}
        emptyLabel="No job listings match your filters."
        onRowClick={(job) => router.push(`/mc-ops/jobs/${job.slug}`)}
        serverPagination={{ page, totalPages, total, onPageChange: setPage }}
      />

      <JobFormModal
        open={modalOpen}
        job={editingJob}
        onClose={() => setModalOpen(false)}
        onSaved={handleSaved}
      />
    </SectionShell>
  );
}