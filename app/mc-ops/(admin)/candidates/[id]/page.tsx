'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { SectionShell } from '@/components/dashboard/SectionShell';
import { StatusBadge } from '@/components/admin/DataTable';
import { useToast } from '@/components/ui/Toast';
import { candidatesService } from '@/lib/services/candidates.service';
import type { AdminCandidate, Application } from '@/lib/types/user.type';


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

export default function AdminCandidateDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();
  const toast = useToast();

  const [candidate, setCandidate] = useState<AdminCandidate | null | undefined>(undefined);
  const [applications, setApplications] = useState<Application[]>([]);
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
  }, [id, toast]);

  if (candidate === undefined || loading) {
    return <SectionShell title="Loading candidate..." >
      <div className='flex  gap-4 w-full justify-between '>
        {([1, 2,]).map((a: number) => (
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
            <div className="flex items-center justify-between py-1">
              <span className="text-muted text-[12px]">Phone</span>
              <div className="flex items-center gap-1.5">
                <span className="text-foreground text-[13px]">{candidate.phone || '—'}</span>
                {candidate.phone && (
                  <a
                    href={getWhatsAppLink(candidate.phone, `Hello ${candidate.name}, `)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-1.5 py-0.5 rounded transition-colors"
                  >
                    <WhatsAppIcon />
                    <span>Message</span>
                  </a>
                )}
              </div>
            </div>
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
              {applications.map((a) => (
                <li key={a._id || a.id} className="py-2 flex items-center justify-between text-sm">
                  <div>
                    <p className="text-foreground font-medium">{a.job?.title || a.jobTitle}</p>
                    <p className="text-[12px] text-muted">{formatDate(a.createdAt || a.appliedDate)}</p>
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