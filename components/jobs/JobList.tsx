'use client';

import { AlertCircle } from 'lucide-react';
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
    onPageChange: () => void;
    totalResults: number;
}

import { useEffect, useRef } from 'react';

export function JobList({
    jobs, selectedJob, onSelect, initialLoading, isFetching, error, onRetry,
    page, totalPages, onPageChange, totalResults,
}: JobListProps) {
    const loadMoreRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isFetching && page < totalPages) {
                    onPageChange();
                }
            },
            { rootMargin: '100px' }
        );

        if (loadMoreRef.current) observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [isFetching, page, totalPages, onPageChange]);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col">
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
                    <div className="flex flex-col gap-3">
                        {jobs.map((job) => (
                            <JobCard key={job._id} job={job} selected={selectedJob?._id === job._id} onSelect={onSelect} />
                        ))}
                    </div>
                )}
            </div>

            {!initialLoading && !error && jobs.length > 0 && (
                <div className="flex flex-col items-center gap-4 py-4">
                    <span className="text-[12px] font-medium text-muted">Showing {jobs.length} of {totalResults} roles</span>
                    
                    {page < totalPages && (
                        <div ref={loadMoreRef} className="w-full flex flex-col gap-3 pt-2">
                            {isFetching ? (
                                Array.from({ length: 2 }).map((_, i) => (
                                    <div key={`skeleton-${i}`} className="bg-white border border-border rounded-2xl p-5 h-[150px] animate-pulse" />
                                ))
                            ) : null}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}