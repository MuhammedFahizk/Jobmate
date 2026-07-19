// ─────────────────────────────────────────────────────────────────────────────
// lib/services/jobs.service.ts
// Job listing endpoints: list (with filters), single job.
// ─────────────────────────────────────────────────────────────────────────────

import apiClient from '@/lib/api/client';
import type { ApiResponse, PaginatedResponse, JobFilters } from '@/lib/api/types';
import type { Job } from '@/lib/dummy-data';
import { AdminJob, AdminJobListResponse, AdminJobResponse, CreateJobRequest, CreateJobResponse, UpdateJobRequest, UpdateJobResponse } from '../types/job.type';

// ── Service ───────────────────────────────────────────────────────────────────

export const jobsService = {
  /**
   * GET /jobs
   * Public, paginated, filterable list of active job listings.
   * Supports: search, category, type, experienceRequired, isFeatured,
   * isActive, tags, salaryMin/salaryMax, dateFrom/dateTo, sort, page, limit.
   *
   * @example
   * jobsService.getJobs({ search: 'react', category: 'IT & Software', sort: '-createdAt', page: 1, limit: 10 })
   */
  getJobs: async (params?: JobFilters): Promise<AdminJobListResponse> => {
    const { data } = await apiClient.get<AdminJobListResponse>('/jobs', { params });
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



  createJob: async (
    payload: CreateJobRequest
  ): Promise<AdminJob> => {
    const { data } = await apiClient.post<CreateJobResponse>(
      '/jobs',
      payload
    );

    return data.data.job;
  },


  /**
   * PATCH /jobs/:id
   * Partial update — used for both the edit form and the inline status dropdown.
   */
  updateJob: async (id: string, payload: UpdateJobRequest): Promise<AdminJob> => {
    const { status, ...rest } = payload;
    const body: Record<string, unknown> = { ...rest };

    if (status !== undefined) {
      body.isActive = status === 'active';
    }
    const { data } = await apiClient.patch<UpdateJobResponse>(`/jobs/${id}`, body);
    return data.data.job;

  },
  /**
     * GET /jobs/admin
     * Admin list — supports the same filter/search/sort/paginate query params
     * as APIFeatures (e.g. ?title=..., ?sort=-createdAt, ?page=1&limit=10).
     */
  getAllJobsAdmin: async (params?: JobFilters): Promise<AdminJobListResponse> => {
    const { data } = await apiClient.get<AdminJobListResponse>('/jobs/admin/all', { params });
    return data;
  },



  /**
 * GET /jobs/admin/:slug
 * Single job by slug, for the admin edit view.
 */
  getJobBySlugAdmin: async (slug: string): Promise<AdminJob> => {
    const { data } = await apiClient.get<AdminJobResponse>(`/jobs/admin/${slug}`); // was: /jobs/admin/all${slug}
    return data.data.job;
  },
};
