'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, BadgeCheck } from 'lucide-react';
import { SectionShell } from '@/components/dashboard/SectionShell';
import { StatusBadge } from '@/components/admin/DataTable';
import { useToast } from '@/components/ui/Toast';
import { candidatesService } from '@/lib/services/candidates.service';
import type { AdminCandidate } from '@/lib/types/user.type';
import type { AdminApplication } from '@/lib/dummy-data';

export default function AdminCandidateDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();
  const toast = useToast();

  const [candidate, setCandidate] = useState<AdminCandidate | null | undefined>(undefined);
  const [applications, setApplications] = useState<AdminApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    candidatesService.getCandidateById(id)
      .then((res) => {
        setCandidate(res.data.candidate);
        setApplications(res.data.applications);
      })
      .catch(() => {
        setCandidate(null);
        toast.error('Could not load candidate details.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (candidate === undefined || loading) {
    return <SectionShell title="Loading candidate..." >
      <div className='flex  gap-4 w-full justify-between '>
        {([1, 2,] as any).map((a: number) => (
          //skelten for lading time 
          <div key={a} className=' w-full h-[400px] rounded-lg bg-gray-200 rounded animate-pulse '>

          </div>
        ))}
      </div>
    </SectionShell>;
  }

  if (candidate === null) {
    return (
      <SectionShell title="Candidate not found">
        <button onClick={() => router.push('/mc-ops/candidates')} className="text-[13px] text-primary-600 hover:underline">
          Back to candidates
        </button>
      </SectionShell>
    );
  }

  const handleActiveStatusChange = async (newStatus: boolean) => {
    if (newStatus === candidate.isActive) return;
    setUpdating(true);
    try {
      const updated = await candidatesService.updateCandidateStatus(candidate._id, { isActive: newStatus });
      setCandidate(updated);
      toast.success(newStatus ? 'Candidate activated.' : 'Candidate deactivated.');
    } catch {
      toast.error('Failed to update status.');
    } finally {
      setUpdating(false);
    }
  };

  const handlePaymentChange = async (newStatus: 'unpaid' | 'paid') => {
    if (newStatus === candidate.paymentStatus) return;
    setUpdating(true);
    try {
      const updated = await candidatesService.updateCandidateStatus(candidate._id, { paymentStatus: newStatus });
      setCandidate(updated);
      toast.success(`Payment marked as ${newStatus}.`);
    } catch {
      toast.error('Failed to update payment status.');
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <SectionShell
      title={
        <button onClick={() => router.push('/mc-ops/candidates')} className="inline-flex items-center gap-1.5 text-foreground">
          <ArrowLeft size={15} /> {candidate.name}
        </button>
      }
      description={candidate.email}
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div className="border border-border rounded-md bg-white p-5">
          <h3 className="text-[13px] font-semibold text-foreground mb-3">Profile</h3>
          <dl className="flex flex-col gap-2 text-sm">
            <Row label="Phone" value={candidate.phone || '—'} />
            <Row label="Location" value={candidate.location || '—'} />
            <Row label="Category" value={candidate.category || '—'} />
            <Row label="Experience" value={candidate.experience || '—'} />
            <Row label="Skills" value={candidate.skills?.join(', ') || '—'} />
            <Row label="Joined" value={formatDate(candidate.createdAt)} />
            <div className="flex items-center justify-between py-1">
              <span className="text-muted text-[12px]">Account Status</span>
              <select
                value={candidate.isActive ? 'true' : 'false'}
                disabled={updating}
                onChange={(e) => handleActiveStatusChange(e.target.value === 'true')}
                className={`text-[12px] rounded border px-1.5 py-1 capitalize disabled:opacity-50 ${candidate.isActive
                  ? 'bg-[#EAF4FD] text-primary-700 border-primary-100'
                  : 'bg-[#F0F0EE] text-muted border-border'
                  }`}
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-muted text-[12px]">Payment</span>
              <select
                value={candidate.paymentStatus}
                disabled={updating}
                onChange={(e) => handlePaymentChange(e.target.value as 'unpaid' | 'paid')}
                className={`text-[12px] rounded border px-1.5 py-1 capitalize disabled:opacity-50 ${candidate.paymentStatus === 'paid'
                  ? 'bg-[#EAF4FD] text-primary-700 border-primary-100'
                  : 'bg-[#F0F0EE] text-muted border-border'
                  }`}
              >
                <option value="unpaid">Unpaid</option>
                <option value="paid">Paid</option>
              </select>
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
              {applications.map((a: any) => (
                <li key={a._id || a.id} className="py-2 flex items-center justify-between text-sm">
                  <div>
                    <p className="text-foreground font-medium">{a.job?.title || a.jobTitle}</p>
                    <p className="text-[12px] text-muted">{formatDate(a.createdAt || a.appliedAt)}</p>
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