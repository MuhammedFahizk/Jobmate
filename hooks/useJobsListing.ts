'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { jobsService } from '@/lib/services/jobs.service';
import type { AdminJob } from '@/lib/types/job.type';
import { useAuth } from '@/hooks/useAuth'; // ← ADJUST to your actual auth hook

export const JOBS_PER_PAGE = 6;
const SEARCH_DEBOUNCE_MS = 400;

export const SORT_OPTIONS = [
    { value: '-createdAt', label: 'Newest first' },
    { value: 'createdAt', label: 'Oldest first' },
    { value: '-salary.min', label: 'Salary: high to low' },
    { value: 'salary.min', label: 'Salary: low to high' },
    { value: 'title', label: 'Title (A–Z)' },
] as const;

export interface JobFiltersState {
    search: string;
    category: string;
    type: string[];
    experienceRequired: string;
    isFeatured: string;
    tags: string;
    salaryMin: string;
    salaryMax: string;
    dateFrom: string;
    dateTo: string;
    sort: string;
}

export const EMPTY_FILTERS: JobFiltersState = {
    search: '', category: '', type: [], experienceRequired: '', isFeatured: '',
    tags: '', salaryMin: '', salaryMax: '', dateFrom: '', dateTo: '', sort: SORT_OPTIONS[0].value,
};

export function useJobsListing() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { isAuthenticated } = useAuth(); // ← ADJUST to your actual auth hook's shape

    const [filters, setFilters] = useState<JobFiltersState>(EMPTY_FILTERS);
    const [searchInput, setSearchInput] = useState('');

    const [jobs, setJobs] = useState<AdminJob[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [initialLoading, setInitialLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(false);

    const [selectedJob, setSelectedJob] = useState<AdminJob | null>(null);

    const totalPages = Math.max(1, Math.ceil(total / JOBS_PER_PAGE));

    useEffect(() => {
        const handle = setTimeout(() => {
            setFilters((f) => (f.search === searchInput ? f : { ...f, search: searchInput }));
            setPage(1);
        }, SEARCH_DEBOUNCE_MS);
        return () => clearTimeout(handle);
    }, [searchInput]);

    const load = useCallback(() => {
        setIsFetching(true);
        setError(false);
        jobsService
            .getJobs({
                page,
                limit: JOBS_PER_PAGE,
                sort: filters.sort,
                isActive: true,
                ...(filters.search ? { search: filters.search } : {}),
                ...(filters.category ? { category: filters.category } : {}),
                ...(filters.type.length ? { type: filters.type.join(',') } : {}),
                ...(filters.experienceRequired ? { experienceRequired: filters.experienceRequired } : {}),
                ...(filters.isFeatured ? { isFeatured: filters.isFeatured === 'true' } : {}),
                ...(filters.tags ? { tags: filters.tags } : {}),
                ...(filters.salaryMin ? { salaryMin: Number(filters.salaryMin) } : {}),
                ...(filters.salaryMax ? { salaryMax: Number(filters.salaryMax) } : {}),
                ...(filters.dateFrom ? { dateFrom: filters.dateFrom } : {}),
                ...(filters.dateTo ? { dateTo: filters.dateTo } : {}),
            })
            .then((data) => {
                setJobs(data.data.jobs);
                setTotal(data.total);
            })
            .catch(() => setError(true))
            .finally(() => {
                setIsFetching(false);
                setInitialLoading(false);
            });
    }, [page, filters]);

    useEffect(load, [load]);

    // Deep-link ?apply=<id|slug> — now also drives the post-login resume flow.
    useEffect(() => {
        const applyId = searchParams.get('apply');
        if (!applyId || jobs.length === 0) return;

        const job = jobs.find((j) => j._id === applyId || j.slug === applyId);
        if (!job) return;

        setSelectedJob(job);

        // If the user just came back from login with ?apply=<slug>&resume=1,
        // and they're now authenticated, fire the WhatsApp apply immediately
        // instead of making them click "Apply Now" again.
        const shouldResume = searchParams.get('resume') === '1';
        if (shouldResume && isAuthenticated) {
            openWhatsApp(job);
            // Clean the resume flag out of the URL so a refresh doesn't re-fire it.
            const params = new URLSearchParams(searchParams.toString());
            params.delete('resume');
            router.replace(`${pathname}?${params.toString()}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, jobs, isAuthenticated]);

    useEffect(() => {
        if (jobs.length > 0 && typeof window !== 'undefined' && window.innerWidth >= 1024) {
            setSelectedJob((prev) => (prev && jobs.some((j) => j._id === prev._id) ? prev : jobs[0]));
        } else if (jobs.length === 0) {
            setSelectedJob(null);
        }
    }, [jobs]);

    const updateFilter = useCallback(<K extends keyof JobFiltersState>(key: K, value: JobFiltersState[K]) => {
        setFilters((f) => ({ ...f, [key]: value }));
        setPage(1);
    }, []);

    const toggleTypeFilter = useCallback((value: string) => {
        setFilters((f) => ({
            ...f,
            type: f.type.includes(value) ? f.type.filter((t) => t !== value) : [...f.type, value],
        }));
        setPage(1);
    }, []);

    const activeFilterCount = useMemo(
        () =>
            [
                filters.category, filters.type.length ? 'type' : '', filters.experienceRequired,
                filters.isFeatured, filters.tags, filters.salaryMin, filters.salaryMax,
                filters.dateFrom, filters.dateTo,
            ].filter(Boolean).length,
        [filters],
    );

    const clearFilters = useCallback(() => {
        setFilters((f) => ({ ...EMPTY_FILTERS, search: f.search, sort: f.sort }));
        setPage(1);
    }, []);

    const goToPage = useCallback((p: number) => {
        setPage((curr) => (p < 1 || p > totalPages ? curr : p));
    }, [totalPages]);

    const openWhatsApp = (job: AdminJob) => {
        const text = `Hi! I want to apply for "${job.title}" (${job.company}). Please review my application.`;
        const waUrl = `https://wa.me/${job.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
        window.open(waUrl, '_blank');
    };

    /**
     * Gated entry point for the "Apply Now" button. Unauthenticated users get
     * redirected to login with a return URL that brings them straight back to
     * this job with ?resume=1, which auto-fires the WhatsApp apply once
     * they're authenticated (see the deep-link effect above).
     */
    const applyOnWhatsApp = useCallback((job: AdminJob) => {
        if (!isAuthenticated) {
            const returnTo = `${pathname}?apply=${job.slug}&resume=1`;
            router.push(`/login?redirect=${encodeURIComponent(returnTo)}`);
            return;
        }
        openWhatsApp(job);
    }, [isAuthenticated, pathname, router]);

    return {
        jobs, total, totalPages, page, initialLoading, isFetching, error, selectedJob,
        filters, searchInput, activeFilterCount,
        setSearchInput, updateFilter, toggleTypeFilter, clearFilters, goToPage,
        setSelectedJob, applyOnWhatsApp, retry: load,
    };
}