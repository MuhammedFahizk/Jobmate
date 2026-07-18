'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, X } from 'lucide-react';
import { SectionShell } from '@/components/dashboard/SectionShell';
import DataTable, { StatusBadge, type DataTableColumn } from '@/components/admin/DataTable';
import { listJobs, createJob, closeJob, type Job } from '@/lib/dummy-data';
import { useToast } from '@/components/ui/Toast';

const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Gig'] as const;

function NewJobModal({ onClose, onCreated }: { onClose: () => void; onCreated: (job: Job) => void }) {
  const toast = useToast();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '',
    company: '',
    category: '',
    type: 'Full-time' as (typeof JOB_TYPES)[number],
    location: '',
    salary: '',
    description: '',
  });

  const update = (field: keyof typeof form, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const submit = async () => {
    if (!form.title.trim() || !form.company.trim()) {
      toast.error('Title and company are required.');
      return;
    }
    setSaving(true);
    try {
      const job = await createJob({ ...form, status: 'active' });
      toast.success('Job created.');
      onCreated(job);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-[480px] bg-white rounded-md border border-border max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h2 className="text-[14px] font-semibold text-foreground">New job listing</h2>
          <button onClick={onClose} className="text-muted hover:text-foreground" aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <div className="p-4 flex flex-col gap-3">
          <Field label="Title">
            <input value={form.title} onChange={(e) => update('title', e.target.value)} className={inputClass} />
          </Field>
          <Field label="Company">
            <input value={form.company} onChange={(e) => update('company', e.target.value)} className={inputClass} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Category">
              <input value={form.category} onChange={(e) => update('category', e.target.value)} className={inputClass} />
            </Field>
            <Field label="Type">
              <select value={form.type} onChange={(e) => update('type', e.target.value)} className={inputClass}>
                {JOB_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Location">
              <input value={form.location} onChange={(e) => update('location', e.target.value)} className={inputClass} />
            </Field>
            <Field label="Salary">
              <input value={form.salary} onChange={(e) => update('salary', e.target.value)} className={inputClass} placeholder="₹20,000/mo" />
            </Field>
          </div>
          <Field label="Description">
            <textarea
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              rows={3}
              className={inputClass}
            />
          </Field>
        </div>

        <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-border">
          <button onClick={onClose} className="px-3 py-1.5 rounded-md border border-border text-sm text-foreground hover:bg-[#F0F0EE]">
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={saving}
            className="px-3 py-1.5 rounded-md bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white text-sm font-medium"
          >
            {saving ? 'Creating…' : 'Create job'}
          </button>
        </div>
      </div>
    </div>
  );
}

const inputClass =
  'border border-border rounded-md px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary-300';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[12px] font-medium text-muted">{label}</span>
      {children}
    </label>
  );
}

export default function AdminJobsPage() {
  const router = useRouter();
  const toast = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const load = () => {
    setLoading(true);
    listJobs().then((data) => {
      setJobs(data);
      setLoading(false);
    });
  };

  useEffect(load, []);

  const handleClose = async (id: string) => {
    await closeJob(id);
    toast.success('Listing closed.');
    load();
  };

  const columns: DataTableColumn<Job>[] = [
    { key: 'title', header: 'Title', render: (j) => <span className="font-medium">{j.title}</span> },
    { key: 'company', header: 'Company' },
    { key: 'category', header: 'Category' },
    { key: 'type', header: 'Type' },
    { key: 'location', header: 'Location' },
    { key: 'applicantCount', header: 'Applicants', align: 'right' },
    {
      key: 'status',
      header: 'Status',
      render: (j) => <StatusBadge status={j.status} tone={j.status === 'active' ? 'positive' : 'neutral'} />,
    },
    {
      key: 'actions',
      header: '',
      align: 'right',
      render: (j) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/jobs/${j.id}`);
            }}
            className="text-[12px] text-primary-600 hover:underline"
          >
            Edit
          </button>
          {j.status === 'active' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClose(j.id);
              }}
              className="text-[12px] text-muted hover:text-danger-500"
            >
              Close
            </button>
          )}
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
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary-600 hover:bg-primary-700 text-white text-[13px] font-medium"
        >
          <Plus size={14} /> New job
        </button>
      }
    >
      <DataTable
        columns={columns}
        rows={jobs}
        rowKey={(j) => j.id}
        loading={loading}
        emptyLabel="No job listings yet."
        onRowClick={(j) => router.push(`/jobs/${j.id}`)}
      />

      {modalOpen && (
        <NewJobModal onClose={() => setModalOpen(false)} onCreated={() => load()} />
      )}
    </SectionShell>
  );
}
