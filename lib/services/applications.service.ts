// ─────────────────────────────────────────────────────────────────────────────
// lib/services/applications.service.ts
// Job application endpoints: list, submit.
// ─────────────────────────────────────────────────────────────────────────────

import apiClient from '@/lib/api/client';
import type { ApiResponse, PaginatedResponse, PaginationParams } from '@/lib/api/types';
import type { Application } from '@/lib/dummy-data';

// ── Payload shapes ────────────────────────────────────────────────────────────

export interface ApplyPayload {
  /** Cover note or pre-filled WhatsApp message body */
  note?: string;
}

// ── Service ───────────────────────────────────────────────────────────────────

export const applicationsService = {
  /**
   * GET /applications
   * Returns all applications for the authenticated user.
   */
  getApplications: async (
    params?: PaginationParams,
  ): Promise<PaginatedResponse<Application>> => {
    const { data } = await apiClient.get<PaginatedResponse<Application>>('/applications', {
      params,
    });
    return data;
  },

  /**
   * POST /applications/:jobId
   * Submits an application for a specific job.
   */
  applyToJob: async (
    jobId: string,
    payload?: ApplyPayload,
  ): Promise<ApiResponse<Application>> => {
    const { data } = await apiClient.post<ApiResponse<Application>>(
      `/applications/${jobId}`,
      payload ?? {},
    );
    return data;
  },

  /**
   * DELETE /applications/:id
   * Withdraws a pending application.
   */
  withdrawApplication: async (applicationId: string): Promise<ApiResponse<null>> => {
    const { data } = await apiClient.delete<ApiResponse<null>>(
      `/applications/${applicationId}`,
    );
    return data;
  },
};
