'use client';

import { MapPin, BriefcaseBusiness, Clock, HashIcon, Search, CheckCircle2, Send } from 'lucide-react';
import { formatSalary } from './JobCard';
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

interface JobDetailPanelProps {
    job: AdminJob | null;
    onApply: (job: AdminJob) => void;
    isApplying?: boolean;
    hasApplied?: boolean;
}

export function JobDetailPanel({ job, onApply, isApplying = false, hasApplied = false }: JobDetailPanelProps) {
    if (!job) {
        return (
            <div className="bg-white border border-border rounded-2xl shadow-sm flex items-center justify-center h-full text-center p-8">
                <div>
                    <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4 border border-border">
                        <Search size={24} className="text-muted" />
                    </div>
                    <h3 className="font-display font-semibold text-xl mb-2">Select a Job</h3>
                    <p className="text-[14px] text-muted max-w-sm mx-auto">
                        Click on a job from the list to view its full details, requirements, and apply instantly.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border border-border rounded-2xl shadow-sm flex flex-col h-full min-h-0">
            {/* Only this inner region scrolls; header/apply button stay accessible */}
            <div className="flex-1 min-h-0 overflow-y-auto p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 pb-8 border-b border-dashed border-border">
                    <div className="flex gap-4 items-start min-w-0">
                        <div className={`w-14 h-14 rounded-xl border-2 font-display font-bold text-xl flex items-center justify-center -rotate-3 shadow-sm flex-shrink-0 ${avatarTone(job.company)}`}>
                            {job.company.substring(0, 1)}
                        </div>
                        <div className="min-w-0">
                            <h2 className="font-display font-bold text-2xl md:text-[28px] leading-tight mb-2">{job.title}</h2>
                            <div className="text-[14px] text-muted flex flex-wrap items-center gap-2">
                                <span className="font-semibold text-foreground">{job.company}</span>
                                <span className="text-border">•</span>
                                <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                            </div>
                        </div>
                    </div>

                    {hasApplied ? (
                        <div className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded bg-emerald-50 border border-emerald-200 text-emerald-700">
                            <CheckCircle2 size={16} className="text-emerald-500" />
                            <span className="font-mono text-[11px] font-semibold tracking-widest uppercase">Applied</span>
                        </div>
                    ) : (
                        <button
                            onClick={() => onApply(job)}
                            disabled={isApplying}
                            className="flex-shrink-0 font-mono text-[11px] font-semibold tracking-widest uppercase flex items-center justify-center gap-2 px-6 py-3 rounded bg-foreground hover:bg-primary-600 text-white shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        >
                            {isApplying ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Applying…
                                </>
                            ) : (
                                <>
                                    <Send size={14} />
                                    Apply Now
                                </>
                            )}
                        </button>
                    )}
                </div>

                <div className="bg-white border border-border rounded-2xl overflow-hidden mb-8 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary-500" />
                    <div className="grid grid-cols-2 divide-x divide-dashed divide-border">
                        <MetaCell icon={<span className="font-display font-bold text-[11px]">₹</span>} label="Salary" value={formatSalary(job.salary)} />
                        <MetaCell icon={<BriefcaseBusiness size={14} />} label="Job Type" value={job.type} valueClass="capitalize" />
                    </div>
                    <div className="relative border-t-[1.5px] border-dashed border-border before:content-[''] before:absolute before:-top-[7px] before:-left-[7px] before:w-3.5 before:h-3.5 before:rounded-full before:bg-background before:border-[1.5px] before:border-border after:content-[''] after:absolute after:-top-[7px] after:-right-[7px] after:w-3.5 after:h-3.5 after:rounded-full after:bg-background after:border-[1.5px] after:border-border" />
                    <div className="grid grid-cols-2 divide-x divide-dashed divide-border">
                        <MetaCell icon={<Clock size={14} />} label="Experience" value={job.experienceRequired} />
                        <MetaCell icon={<HashIcon size={14} />} label="Category" value={job.category} />
                    </div>
                </div>

                <div className="space-y-8">
                    <div>
                        <h3 className="font-display font-semibold text-lg mb-3">About the Role</h3>
                        <p className="text-[14px] text-muted leading-[1.7] whitespace-pre-wrap">{job.description}</p>
                    </div>

                    {job.requiredSkills?.length > 0 && (
                        <div>
                            <h3 className="font-display font-semibold text-lg mb-3">Required Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {job.requiredSkills.map((skill) => (
                                    <span key={skill} className="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-lg text-[12px] font-medium border border-primary-100">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {job.keyResponsibilities?.length > 0 && (
                        <div>
                            <h3 className="font-display font-semibold text-lg mb-3">Key Responsibilities</h3>
                            <ul className="space-y-2 text-[14px] text-muted">
                                {job.keyResponsibilities.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="font-mono text-primary-500 font-bold text-[10px] mt-1 flex-shrink-0">++</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {job.tags?.length > 0 && (
                        <div>
                            <h3 className="font-display font-semibold text-lg mb-3">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {job.tags.map((tag) => (
                                    <span key={tag} className="px-3 py-1.5 bg-[#F0F0EE] text-foreground rounded-lg text-[12px] font-medium">#{tag}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function MetaCell({ icon, label, value, valueClass }: { icon: React.ReactNode; label: string; value: string; valueClass?: string }) {
    return (
        <div className="p-5 flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg border-[1.5px] border-primary-500 bg-primary-50 text-primary-700 flex items-center justify-center -rotate-3 flex-shrink-0">
                {icon}
            </div>
            <div className="min-w-0">
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted block mb-1">{label}</span>
                <span className={`font-display font-semibold text-[14px] leading-tight block truncate ${valueClass ?? ''}`}>{value}</span>
            </div>
        </div>
    );
}