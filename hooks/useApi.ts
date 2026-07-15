// ─────────────────────────────────────────────────────────────────────────────
// lib/hooks/useApi.ts
// Generic data-fetching hook.
// Wraps any async service call with loading / error / data lifecycle.
//
// Usage:
//   const { data, isLoading, error, refetch } = useApi(() => jobsService.getJobs());
//
// With dependencies (re-fetch when `id` changes):
//   const { data } = useApi(() => jobsService.getJobById(id), [id]);
// ─────────────────────────────────────────────────────────────────────────────

'use client';

import { useState, useEffect, useCallback, useRef, DependencyList } from 'react';
import type { ApiError } from '@/lib/api/types';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface UseApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: ApiError | null;
}

export interface UseApiReturn<T> extends UseApiState<T> {
  /** Manually trigger a re-fetch. */
  refetch: () => void;
}

// ── Hook ──────────────────────────────────────────────────────────────────────

/**
 * @param fetcher  A function that returns a Promise. Recreate with useCallback if
 *                 it captures local variables — or pass `deps` to auto-memoize.
 * @param deps     Re-run the fetch whenever these values change (like useEffect deps).
 */
export function useApi<T>(
  fetcher: () => Promise<T>,
  deps: DependencyList = [],
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  // Keep a stable ref to the latest fetcher so the execute callback
  // never goes stale without triggering unnecessary re-renders.
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  // Increment this to trigger a manual refetch.
  const [trigger, setTrigger] = useState(0);

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const result = await fetcherRef.current();
      setState({ data: result, isLoading: false, error: null });
    } catch (err) {
      setState({
        data: null,
        isLoading: false,
        error: err as ApiError,
      });
    }
  }, [trigger, ...deps]);

  useEffect(() => {
    execute();
  }, [execute]);

  const refetch = useCallback(() => setTrigger((n) => n + 1), []);

  return { ...state, refetch };
}
