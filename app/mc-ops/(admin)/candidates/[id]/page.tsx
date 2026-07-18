'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, BadgeCheck } from 'lucide-react';
import { SectionShell } from '@/components/dashboard/SectionShell';
import { StatusBadge } from '@/components/admin/DataTable';
import {
  getCandidateById,
  getApplicationsForCandidate,
  verifyCandidate,
  type Candidate,
  type AdminApplication,
} from '@/lib/dummy-data';
import { useToast } from '@/components/ui/Toast';

export default function AdminCandidateDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();
  const toast = useToast();

  const [candidate, setCandidate] = useState<Candidate | null | undefined>(undefined);
  const [applications, setApplications] = useState<AdminApplication[]>([]);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    if (!id) return;
    const found = getCandidateById(id);
    setCandidate(found ?? null);
    if (found) setApplications(getApplicationsForCandidate(found.id));
  }, [id]);

  if (candidate === undefined) return null;

  if (candidate === null) {
    return (
      <SectionShell title="Candidate not found">
        <button onClick={() => router.push('/candidates')} className="text-[13px] text-primary-600 hover:underline">
          Back to candidates
        </button>
      </SectionShell>
    );
  }

  const handleVerify = async () => {
    setVerifying(true);
    try {
      await verifyCandidate(candidate.id);
      setCandidate((c) => (c ? { ...c, isVerified: true } : c));
      toast.success('Candidate verified.');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <SectionShell
      title={
        <button onClick={() => router.push('/candidates')} className="inline-flex items-center gap-1.5 text-foreground">
          <ArrowLeft size={15} /> {candidate.name}
        </button>
      }
      description={candidate.email}
      actions={
        !candidate.isVerified ? (
          <button
            onClick={handleVerify}
            disabled={verifying}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white text-[13px] font-medium"
          >
            <BadgeCheck size={14} /> {verifying ? 'Verifying…' : 'Verify candidate'}
          </button>
        ) : undefined
      }
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div className="border border-border rounded-md bg-white p-5">
          <h3 className="text-[13px] font-semibold text-foreground mb-3">Profile</h3>
          <dl className="flex flex-col gap-2 text-sm">
            <Row label="Phone" value={candidate.phone} />
            <Row label="Location" value={candidate.location ?? '—'} />
            <Row label="Category" value={candidate.category ?? '—'} />
            <Row label="Experience" value={candidate.experience ?? '—'} />
            <Row label="Skills" value={candidate.skills?.join(', ') ?? '—'} />
            <Row label="Joined" value={candidate.joinedAt} />
            <div className="flex items-center justify-between py-1">
              <span className="text-muted text-[12px]">Verification</span>
              <StatusBadge status={candidate.isVerified ? 'verified' : 'unverified'} tone={candidate.isVerified ? 'positive' : 'neutral'} />
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-muted text-[12px]">Payment</span>
              <StatusBadge status={candidate.paymentStatus} tone={candidate.paymentStatus === 'paid' ? 'positive' : 'warning'} />
            </div>
          </dl>
          {candidate.bio && <p className="text-sm text-foreground mt-3 border-t border-border pt-3">{candidate.bio}</p>}
        </div>

        <div className="border border-border rounded-md bg-white p-5">
          <h3 className="text-[13px] font-semibold text-foreground mb-3">Applications ({applications.length})</h3>
          {applications.length === 0 ? (
            <p className="text-sm text-muted">No applications from this candidate yet.</p>
          ) : (
            <ul className="flex flex-col divide-y divide-border">
              {applications.map((a) => (
                <li key={a.id} className="py-2 flex items-center justify-between text-sm">
                  <div>
                    <p className="text-foreground font-medium">{a.jobTitle}</p>
                    <p className="text-[12px] text-muted">{a.appliedAt}</p>
                  </div>
                  <StatusBadge status={a.status} tone="neutral" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </SectionShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-muted text-[12px]">{label}</span>
      <span className="text-foreground text-[13px] text-right max-w-[60%]">{value}</span>
    </div>
  );
}