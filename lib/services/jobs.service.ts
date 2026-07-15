// ─────────────────────────────────────────────────────────────────────────────
// lib/services/jobs.service.ts
// Job listing endpoints: list (with filters), single job.
// ─────────────────────────────────────────────────────────────────────────────

import apiClient from '@/lib/api/client';
import type { ApiResponse, PaginatedResponse, JobFilters } from '@/lib/api/types';
import type { Job } from '@/lib/dummy-data';

// ── Service ───────────────────────────────────────────────────────────────────

export const jobsService = {
  /**
   * GET /jobs
   * Returns a paginated, filterable list of job listings.
   *
   * @example
   * const jobs = await jobsService.getJobs({ category: 'Design', page: 1, limit: 10 });
   */
  getJobs: async (params?: JobFilters): Promise<PaginatedResponse<Job>> => {
    const { data } = await apiClient.get<PaginatedResponse<Job>>('/jobs', { params });
    return data;
  },

  /**
   * GET /jobs/:id
   * Returns a single job by its ID.
   */
  getJobById: async (id: string): Promise<ApiResponse<Job>> => {
    const { data } = await apiClient.get<ApiResponse<Job>>(`/jobs/${id}`);
    return data;
  },
};
