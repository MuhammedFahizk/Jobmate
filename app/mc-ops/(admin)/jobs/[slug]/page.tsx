'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Pencil, Star } from 'lucide-react';
import { SectionShell } from '@/components/dashboard/SectionShell';
import { StatusBadge } from '@/components/admin/DataTable';
import { JobFormModal } from '@/components/admin/job/JobFormModal';
import { jobsService } from '@/lib/services/jobs.service';
import type { AdminJob } from '@/lib/types/job.type';

function formatSalary(s: AdminJob['salary']) {
  if (s.isNegotiable) return 'Negotiable';
  if (s.min == null && s.max == null) return 'Not disclosed';
  const fmt = (n: number) => n.toLocaleString('en-IN');
  if (s.min != null && s.max != null) return `${s.currency} ${fmt(s.min)}–${fmt(s.max)}`;
  return `${s.currency} ${fmt((s.min ?? s.max)!)}`;
}

export default function AdminJobDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const router = useRouter();

  const [job, setJob] = useState<AdminJob | null | undefined>(undefined); // undefined = loading
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;
    jobsService
      .getJobBySlugAdmin(slug)
      .then(setJob)
      .catch(() => setJob(null));
  }, [slug]);

  if (job === undefined) return null;

  if (job === null) {
    return (
      <SectionShell title="Job not found">
        <p className="text-sm text-muted">No job listing with this slug exists.</p>
        <button onClick={() => router.push('/mc-ops/jobs')} className="text-[13px] text-primary-600 hover:underline mt-2">
          Back to jobs
        </button>
      </SectionShell>
    );
  }

  return (
    <SectionShell
      title={
        <button onClick={() => router.push('/mc-ops/jobs')} className="inline-flex items-center gap-1.5 text-foreground">
          <ArrowLeft size={15} /> {job.title}
        </button>
      }
      description={`${job.applicantCount} applicant${job.applicantCount === 1 ? '' : 's'} · posted ${new Date(job.postedAt).toLocaleDateString()}`}
      actions={
        <button
          onClick={() => setEditOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary-600 hover:bg-primary-700 text-white text-[13px] font-medium"
        >
          <Pencil size={14} /> Edit
        </button>
      }
    >
      <div className="border border-border rounded-md bg-white p-5 min  -w-[640px] flex flex-col gap-5">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[15px] font-semibold text-foreground">{job.title}</h2>
            <p className="text-[13px] text-muted">{job.company}</p>
          </div>
          <div className="flex items-center gap-2">
            {job.isFeatured && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#8A5A14] bg-[#FEF6E7] border border-[#F3E0B8] rounded px-2 py-0.5">
                <Star size={11} className="fill-current" /> Featured
              </span>
            )}
            <StatusBadge status={job.isActive ? 'active' : 'closed'} tone={job.isActive ? 'positive' : 'neutral'} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          <DetailField label="Category" value={job.category} />
          <DetailField label="Type" value={job.type} className="capitalize" />
          <DetailField label="Location" value={job.location} />
          <DetailField label="Salary" value={formatSalary(job.salary)} />
          <DetailField label="Experience required" value={job.experienceRequired} />
          <DetailField label="WhatsApp number" value={job.whatsappNumber} />
        </div>

        {job.requiredSkills?.length > 0 && (
          <DetailBlock label="Required skills">
            <div className="flex flex-wrap gap-1.5">
              {job.requiredSkills.map((skill) => (
                <span key={skill} className="text-[12px] bg-[#F0F0EE] text-foreground rounded px-2 py-0.5">
                  {skill}
                </span>
              ))}
            </div>
          </DetailBlock>
        )}

        {job.tags?.length > 0 && (
          <DetailBlock label="Tags">
            <div className="flex flex-wrap gap-1.5">
              {job.tags.map((tag) => (
                <span key={tag} className="text-[12px] bg-[#EAF4FD] text-primary-700 rounded px-2 py-0.5">
                  {tag}
                </span>
              ))}
            </div>
          </DetailBlock>
        )}

        {job.keyResponsibilities?.length > 0 && (
          <DetailBlock label="Key responsibilities">
            <ul className="list-disc list-inside text-[13px] text-foreground space-y-1">
              {job.keyResponsibilities.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </DetailBlock>
        )}

        <DetailBlock label="Description">
          <p className="text-[13px] text-foreground whitespace-pre-wrap">{job.description}</p>
        </DetailBlock>
      </div>

      <JobFormModal
        open={editOpen}
        job={job}
        onClose={() => setEditOpen(false)}
        onSaved={(updated) => setJob(updated)}
      />
    </SectionShell>
  );
}

function DetailField({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] font-medium uppercase tracking-wide text-muted">{label}</span>
      <span className={`text-[13px] text-foreground ${className ?? ''}`}>{value}</span>
    </div>
  );
}

function DetailBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 pt-3 border-t border-border">
      <span className="text-[11px] font-medium uppercase tracking-wide text-muted">{label}</span>
      {children}
    </div>
  );
}