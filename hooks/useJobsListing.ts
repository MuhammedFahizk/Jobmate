'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { jobsService } from '@/lib/services/jobs.service';
import { applicationsService, type ApplyResult } from '@/lib/services/applications.service';
import type { AdminJob } from '@/lib/types/job.type';
import { useAuth } from '@/hooks/useAuth';

export type ApplyBlockReason = 'payment' | 'inactive' | null;

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
    salaryMin: string;
    salaryMax: string;
    location: string;
    dateFrom: string;
    dateTo: string;
    sort: string;
}

export const EMPTY_FILTERS: JobFiltersState = {
    search: '', category: '', type: [], experienceRequired: '', isFeatured: '', location: '',
    salaryMin: '', salaryMax: '', dateFrom: '', dateTo: '', sort: SORT_OPTIONS[0].value,
};

export function useJobsListing() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { isAuthenticated } = useAuth();

    const page = Number(searchParams.get('page')) || 1;

    const filters = useMemo<JobFiltersState>(() => ({
        search: searchParams.get('search') || '',
        category: searchParams.get('category') || '',
        type: searchParams.getAll('type'),
        experienceRequired: searchParams.get('experienceRequired') || '',
        isFeatured: searchParams.get('isFeatured') || '',
        salaryMin: searchParams.get('salaryMin') || '',
        salaryMax: searchParams.get('salaryMax') || '',
        dateFrom: searchParams.get('dateFrom') || '',
        location: searchParams.get('location') || '',
        dateTo: searchParams.get('dateTo') || '',
        sort: searchParams.get('sort') || SORT_OPTIONS[0].value,
    }), [searchParams]);

    const [searchInput, setSearchInput] = useState(filters.search);

    const [jobs, setJobs] = useState<AdminJob[]>([]);
    const [total, setTotal] = useState(0);
    const [initialLoading, setInitialLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(false);

    const [selectedJob, setSelectedJob] = useState<AdminJob | null>(null);
    const [isApplying, setIsApplying] = useState(false);
    const [applyBlock, setApplyBlock] = useState<ApplyBlockReason>(null);

    // ── Track which jobs the user has already applied to ──
    const [appliedJobIds, setAppliedJobIds] = useState<Set<string>>(new Set());
    const appliedFetched = useRef(false);

    // Fetch user's existing applications on mount (if authenticated)
    useEffect(() => {
        if (!isAuthenticated || appliedFetched.current) return;
        appliedFetched.current = true;
        applicationsService
            .getMyApplications({ limit: 500 })
            .then((res) => {
                const ids = new Set<string>();
                // Each application has a `job` field (string or object with _id)
                (res.data?.applications ?? []).forEach((app: any) => {
                    const jobId = typeof app.job === 'string' ? app.job : app.job?._id;
                    if (jobId) ids.add(jobId);
                });
                setAppliedJobIds(ids);
            })
            .catch(() => { /* silently ignore — non-critical */ });
    }, [isAuthenticated]);

    const markJobApplied = useCallback((jobId: string) => {
        setAppliedJobIds((prev) => new Set(prev).add(jobId));
    }, []);

    const totalPages = Math.max(1, Math.ceil(total / JOBS_PER_PAGE));

    // Keep search input in sync with URL changes (e.g. back button)
    useEffect(() => {
        setSearchInput(filters.search);
    }, [filters.search]);

    useEffect(() => {
        const handle = setTimeout(() => {
            if (searchInput !== filters.search) {
                const params = new URLSearchParams(searchParams.toString());
                if (searchInput) params.set('search', searchInput);
                else params.delete('search');
                params.set('page', '1');
                router.push(`${pathname}?${params.toString()}`, { scroll: false });
            }
        }, SEARCH_DEBOUNCE_MS);
        return () => clearTimeout(handle);
    }, [searchInput, filters.search, pathname, router, searchParams]);

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
                ...(filters.salaryMin ? { salaryMin: Number(filters.salaryMin) } : {}),
                ...(filters.salaryMax ? { salaryMax: Number(filters.salaryMax) } : {}),
                ...(filters.location ? { location: filters.location } : {}),   // ← add this
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

    useEffect(() => {
        const applyId = searchParams.get('apply');
        if (!applyId || jobs.length === 0) return;

        const job = jobs.find((j) => j._id === applyId || j.slug === applyId);
        if (!job) return;

        setSelectedJob(job);

        const shouldResume = searchParams.get('resume') === '1';
        if (shouldResume && isAuthenticated) {
            // Auto-apply after returning from login
            applyToJobRef.current?.(job);
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

    const updateURL = useCallback((newParams: URLSearchParams) => {
        router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
    }, [pathname, router]);

    const updateFilter = useCallback(<K extends keyof JobFiltersState>(key: K, value: JobFiltersState[K]) => {
        const params = new URLSearchParams(searchParams.toString());
        if (Array.isArray(value)) {
            params.delete(key);
            value.forEach(v => params.append(key, v));
        } else if (value) {
            params.set(key, value as string);
        } else {
            params.delete(key);
        }
        params.set('page', '1');
        updateURL(params);
    }, [searchParams, updateURL]);

    const toggleTypeFilter = useCallback((value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const currentTypes = params.getAll('type');
        params.delete('type');
        const newTypes = currentTypes.includes(value) ? currentTypes.filter(t => t !== value) : [...currentTypes, value];
        newTypes.forEach(t => params.append('type', t));
        params.set('page', '1');
        updateURL(params);
    }, [searchParams, updateURL]);

    const activeFilterCount = useMemo(
        () =>
            [
                filters.category, filters.type.length ? 'type' : '', filters.experienceRequired,
                filters.isFeatured, filters.salaryMin, filters.salaryMax,
                filters.location,
                filters.dateFrom, filters.dateTo,
            ].filter(Boolean).length,
        [filters],
    );

    const clearFilters = useCallback(() => {
        const params = new URLSearchParams(searchParams.toString());
        const search = params.get('search');
        const sort = params.get('sort');
        const apply = params.get('apply');

        const keys = Array.from(params.keys());
        for (const key of keys) {
            params.delete(key);
        }

        if (search) params.set('search', search);
        if (sort) params.set('sort', sort);
        if (apply) params.set('apply', apply);

        params.set('page', '1');
        updateURL(params);
    }, [searchParams, updateURL]);

    const goToPage = useCallback((p: number) => {
        if (p < 1 || p > totalPages) return;
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', p.toString());
        updateURL(params);
    }, [searchParams, updateURL, totalPages]);

    /**
     * Apply to a job via the API.
     * Returns the ApplyResult so the calling component can show toasts.
     * Returns null if redirected to login (not authenticated).
     */
    const applyToJob = useCallback(async (job: AdminJob): Promise<ApplyResult | null> => {
        // 1. Not logged in — bounce to login with a return URL
        if (!isAuthenticated) {
            const returnTo = `${pathname}?apply=${job.slug}&resume=1`;
            router.push(`/login?redirect=${encodeURIComponent(returnTo)}`);
            return null;
        }

        // 2. Hit the apply API
        setIsApplying(true);
        setApplyBlock(null);

        const result = await applicationsService.applyToJob(job._id);

        setIsApplying(false);

        if (!result.ok) {
            if (result.code === 'PAYMENT_REQUIRED') {
                setApplyBlock('payment');
            } else if (result.code === 'ACCOUNT_INACTIVE') {
                setApplyBlock('inactive');
            }
            return result;
        }

        // 3. Success — mark as applied
        markJobApplied(job._id);
        return result;
    }, [isAuthenticated, pathname, router, markJobApplied]);

    // Ref so the auto-resume effect can call applyToJob without stale closure
    const applyToJobRef = useRef(applyToJob);
    applyToJobRef.current = applyToJob;

    const dismissApplyBlock = useCallback(() => setApplyBlock(null), []);

    return {
        jobs, total, totalPages, page, initialLoading, isFetching, error, selectedJob,
        filters, searchInput, activeFilterCount,
        setSearchInput, updateFilter, toggleTypeFilter, clearFilters, goToPage,
        setSelectedJob, applyToJob, isApplying, applyBlock, dismissApplyBlock,
        appliedJobIds,
        retry: load,
    };
}