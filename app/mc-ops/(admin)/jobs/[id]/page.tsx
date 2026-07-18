'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { SectionShell } from '@/components/dashboard/SectionShell';
import { getJobById, updateJob, closeJob, getApplicationsForJob, type Job } from '@/lib/dummy-data';
import { useToast } from '@/components/ui/Toast';

const inputClass =
  'border border-border rounded-md px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary-300 w-full';

export default function AdminJobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const toast = useToast();

  const [job, setJob] = useState<Job | null | undefined>(undefined);
  const [saving, setSaving] = useState(false);
  const [applicantCount, setApplicantCount] = useState(0);

  useEffect(() => {
    const found = getJobById(id);
    setJob(found ?? null);
    if (found) setApplicantCount(getApplicationsForJob(found.id).length);
  }, [id]);

  if (job === undefined) return null;

  if (job === null) {
    return (
      <SectionShell title="Job not found">
        <p className="text-sm text-muted">No job listing with this ID exists.</p>
        <button onClick={() => router.push('/jobs')} className="text-[13px] text-primary-600 hover:underline mt-2">
          Back to jobs
        </button>
      </SectionShell>
    );
  }

  const update = (field: keyof Job, value: string) => setJob((j) => (j ? { ...j, [field]: value } : j));

  const save = async () => {
    setSaving(true);
    try {
      await updateJob(job.id, job);
      toast.success('Job updated.');
    } finally {
      setSaving(false);
    }
  };

  const handleClose = async () => {
    await closeJob(job.id);
    setJob((j) => (j ? { ...j, status: 'closed' } : j));
    toast.success('Listing closed.');
  };

  return (
    <SectionShell
      title={
        <button onClick={() => router.push('/jobs')} className="inline-flex items-center gap-1.5 text-foreground">
          <ArrowLeft size={15} /> Edit job
        </button>
      }
      description={`${applicantCount} applicant${applicantCount === 1 ? '' : 's'} · posted ${job.postedAt}`}
    >
      <div className="border border-border rounded-md bg-white p-5 max-w-[560px] flex flex-col gap-3">
        <Field label="Title">
          <input className={inputClass} value={job.title} onChange={(e) => update('title', e.target.value)} />
        </Field>
        <Field label="Company">
          <input className={inputClass} value={job.company} onChange={(e) => update('company', e.target.value)} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Category">
            <input className={inputClass} value={job.category} onChange={(e) => update('category', e.target.value)} />
          </Field>
          <Field label="Type">
            <select className={inputClass} value={job.type} onChange={(e) => update('type', e.target.value)}>
              {['Full-time', 'Part-time', 'Contract', 'Gig'].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Location">
            <input className={inputClass} value={job.location} onChange={(e) => update('location', e.target.value)} />
          </Field>
          <Field label="Salary">
            <input className={inputClass} value={job.salary} onChange={(e) => update('salary', e.target.value)} />
          </Field>
        </div>
        <Field label="Description">
          <textarea
            className={inputClass}
            rows={4}
            value={job.description}
            onChange={(e) => update('description', e.target.value)}
          />
        </Field>

        <div className="flex items-center justify-between pt-2">
          <span className="text-[12px] text-muted capitalize">Status: {job.status}</span>
          <div className="flex gap-2">
            {job.status === 'active' && (
              <button
                onClick={handleClose}
                className="px-3 py-1.5 rounded-md border border-border text-sm text-foreground hover:bg-[#F0F0EE]"
              >
                Close listing
              </button>
            )}
            <button
              onClick={save}
              disabled={saving}
              className="px-3 py-1.5 rounded-md bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white text-sm font-medium"
            >
              {saving ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[12px] font-medium text-muted">{label}</span>
      {children}
    </label>
  );
}
