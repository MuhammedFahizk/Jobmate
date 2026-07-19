'use client';

import { MapPin, BriefcaseBusiness, ArrowRight, Star } from 'lucide-react';
import type { AdminJob } from '@/lib/types/job.type';

const AVATAR_TONES = [
  'bg-primary-50 text-primary-700 border-primary-200',
  'bg-amber-50 text-amber-700 border-amber-200',
  'bg-rose-50 text-rose-700 border-rose-200',
  'bg-indigo-50 text-indigo-700 border-indigo-200',
  'bg-emerald-50 text-emerald-700 border-emerald-200',
];
function avatarTone(seed: string) {
  return AVATAR_TONES[seed.charCodeAt(0) % AVATAR_TONES.length];
}

export function formatSalary(s: AdminJob['salary']) {
  if (!s) return 'Not disclosed';
  if (s.isNegotiable) return 'Negotiable';
  if (s.min == null && s.max == null) return 'Not disclosed';
  const fmt = (n: number) => `${(n / 100000).toFixed(1)}L`;
  if (s.min != null && s.max != null) return `${s.currency} ${fmt(s.min)} – ${fmt(s.max)}`;
  return `${s.currency} ${fmt((s.min ?? s.max)!)}`;
}

interface JobCardProps {
  job: AdminJob;
  selected: boolean;
  onSelect: (job: AdminJob) => void;
}

export function JobCard({ job, selected, onSelect }: JobCardProps) {
  return (
    <div
      onClick={() => onSelect(job)}
      className={`cursor-pointer bg-white border rounded-2xl p-5 relative overflow-hidden transition-all duration-200 group ${selected
          ? 'border-primary-500 shadow-md ring-1 ring-primary-500/20'
          : 'border-border shadow-sm hover:border-primary-300 hover:shadow-md hover:-translate-y-0.5'
        }`}
    >
      {selected && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary-500" />}

      <div className="flex justify-between items-start mb-3 pl-1">
        <div className="flex gap-3 items-center min-w-0">
          <div className={`w-10 h-10 rounded-lg border-[1.5px] font-display font-semibold text-sm flex items-center justify-center -rotate-3 flex-shrink-0 ${avatarTone(job.company)}`}>
            {job.company.substring(0, 1)}
          </div>
          <div className="min-w-0">
            <h3 className="font-display font-semibold text-[15px] group-hover:text-primary-600 transition-colors leading-tight truncate">
              {job.title}
            </h3>
            <p className="font-body text-[12px] text-muted mt-0.5 truncate">{job.company}</p>
          </div>
        </div>
        {job.isFeatured && (
          <span className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[9px] font-semibold tracking-wider uppercase border bg-amber-50 text-amber-700 border-amber-200">
            <Star size={10} className="fill-current" /> Featured
          </span>
        )}
      </div>

      <div className="pl-1 mb-4 flex flex-wrap gap-2 text-[11px] font-body text-muted">
        <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
        <span className="text-border">•</span>
        <span className="flex items-center gap-1 capitalize"><BriefcaseBusiness size={12} /> {job.type}</span>
      </div>

      <div className="pl-1 border-t border-dashed border-border pt-3 flex items-center justify-between">
        <span className="font-mono text-[10px] text-primary-500 font-semibold tracking-[0.04em] uppercase">
          {formatSalary(job.salary)}
        </span>
        <span className={`font-body text-[11px] font-semibold flex items-center gap-1 transition-colors ${selected ? 'text-primary-600' : 'text-muted group-hover:text-foreground'
          }`}>
          View Details <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </div>
  );
}