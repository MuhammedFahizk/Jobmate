'use client';

import { AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { JobCard } from './JobCard';
import type { AdminJob } from '@/lib/types/job.type';

interface JobListProps {
    jobs: AdminJob[];
    selectedJob: AdminJob | null;
    onSelect: (job: AdminJob) => void;
    initialLoading: boolean;
    isFetching: boolean;
    error: boolean;
    onRetry: () => void;
    page: number;
    totalPages: number;
    onPageChange: (p: number) => void;
    totalResults: number;
}

export function JobList({
    jobs, selectedJob, onSelect, initialLoading, isFetching, error, onRetry,
    page, totalPages, onPageChange, totalResults,
}: JobListProps) {
    return (
        <div className="flex flex-col h-full min-h-0">
            {/* Independently scrollable — this is the key overflow fix: the list
          pane scrolls on its own, the page shell never does. */}
            <div className="flex-1 min-h-0 overflow-y-auto pr-1 custom-scrollbar">
                {initialLoading ? (
                    <div className="flex flex-col gap-3">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="bg-white border border-border rounded-2xl p-5 h-[150px] animate-pulse" />
                        ))}
                    </div>
                ) : error ? (
                    <div className="bg-white border border-border rounded-2xl p-10 text-center shadow-sm">
                        <AlertCircle size={40} className="text-rose-400 mx-auto mb-4" strokeWidth={1.5} />
                        <h3 className="font-display font-semibold text-lg mb-2">Couldn&apos;t load jobs</h3>
                        <p className="text-[13px] text-muted leading-[1.6] mb-4">Something went wrong fetching listings.</p>
                        <button onClick={onRetry} className="text-[13px] font-semibold text-primary-600 hover:underline">
                            Try again
                        </button>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="bg-white border border-border rounded-2xl p-10 text-center shadow-sm">
                        <AlertCircle size={40} className="text-muted mx-auto mb-4" strokeWidth={1.5} />
                        <h3 className="font-display font-semibold text-lg mb-2">No roles found</h3>
                        <p className="text-[13px] text-muted leading-[1.6]">
                            Try adjusting your search terms or filters to find what you&apos;re looking for.
                        </p>
                    </div>
                ) : (
                    <div className={`flex flex-col gap-3 transition-opacity ${isFetching ? 'opacity-50' : 'opacity-100'}`}>
                        {jobs.map((job) => (
                            <JobCard key={job._id} job={job} selected={selectedJob?._id === job._id} onSelect={onSelect} />
                        ))}
                    </div>
                )}
            </div>

            {!initialLoading && !error && jobs.length > 0 && (
                <div className="flex-shrink-0 pt-4 flex items-center justify-between">
                    <span className="text-[11px] text-muted">{totalResults} results</span>
                    {totalPages > 1 && (
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => onPageChange(page - 1)}
                                disabled={page === 1 || isFetching}
                                className="w-8 h-8 rounded-lg border border-border bg-white flex items-center justify-center text-muted hover:text-foreground hover:border-primary-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft size={14} />
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                <button
                                    key={p}
                                    onClick={() => onPageChange(p)}
                                    disabled={isFetching}
                                    className={`w-8 h-8 rounded-lg text-[12px] font-semibold transition-colors ${p === page ? 'bg-foreground text-white' : 'bg-white border border-border text-muted hover:border-primary-300 hover:text-foreground'
                                        }`}
                                >
                                    {p}
                                </button>
                            ))}
                            <button
                                onClick={() => onPageChange(page + 1)}
                                disabled={page === totalPages || isFetching}
                                className="w-8 h-8 rounded-lg border border-border bg-white flex items-center justify-center text-muted hover:text-foreground hover:border-primary-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}