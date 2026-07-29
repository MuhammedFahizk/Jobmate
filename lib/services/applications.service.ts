import apiClient from '@/lib/api/client';
import type { ApiResponse, PaginationParams } from '@/lib/api/types';
import axios from 'axios';
import { Application } from '../types/user.type';

// ── Payload shapes ────────────────────────────────────────────────────────────

export interface ApplyPayload {
  note?: string;
}

export interface AdminApplicationEntry {
  _id: string;
  job: { _id: string; title: string; company: string; location: string } | null;
  candidate: { _id: string; name: string; email: string; phone?: string; location?: string } | null;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'placed' | 'rejected';
  whatsappClicked: boolean;
  whatsappClickedAt?: string;
  adminNote?: string;
  createdAt: string;
}

export interface AdminApplicationsListResponse {
  status: string;
  results: number;
  total: number;
  data: { applications: AdminApplicationEntry[] };
}

export interface AdminApplicationFilters extends PaginationParams {
  status?: string;
  search?: string;
  sort?: string;
  jobId?: string;
}

export type ApplyResult =
  | { ok: true; code: 'CREATED' | 'ALREADY_APPLIED' }
  | { ok: false; code: 'PAYMENT_REQUIRED' | 'ACCOUNT_INACTIVE' | 'NOT_FOUND' | 'ERROR'; message: string };

// ── Service ───────────────────────────────────────────────────────────────────

export const applicationsService = {
  /**
   * GET /applications/my
   * Returns all applications for the authenticated candidate.
   */
  getMyApplications: async (params?: PaginationParams): Promise<ApiResponse<Application>> => {
    const { data } = await apiClient.get<ApiResponse<Application>>('/applications/my', { params });
    return data;
  },

  /**
   * POST /applications/:jobId
   * Apply to a job. Returns a typed result instead of throwing so the caller
   * can handle 402/403 gracefully without try/catch per call-site.
   */
  applyToJob: async (jobId: string): Promise<ApplyResult> => {
    try {
      const { data } = await apiClient.post<{ status: string; code?: string }>(
        `/applications/${jobId}`,
        {}
      );

      return {
        ok: true,
        code: data.code === 'ALREADY_APPLIED' ? 'ALREADY_APPLIED' : 'CREATED',
      };
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        const code = err.response?.data?.code;
        const message = err.response?.data?.message ?? 'Something went wrong.';

        if (status === 402 || code === 'PAYMENT_REQUIRED') {
          return { ok: false, code: 'PAYMENT_REQUIRED', message };
        }

        if (status === 403 || code === 'ACCOUNT_INACTIVE') {
          return { ok: false, code: 'ACCOUNT_INACTIVE', message };
        }

        if (status === 404) {
          return { ok: false, code: 'NOT_FOUND', message };
        }

        return { ok: false, code: 'ERROR', message };
      }

      return {
        ok: false,
        code: 'ERROR',
        message: 'Unexpected error occurred.',
      };
    }
  },


  // ── Admin ─────────────────────────────────────────────────────────────────

  /**
   * GET /applications  (admin only)
   * Paginated, filterable list of all applications.
   */
  getAllApplicationsAdmin: async (params?: AdminApplicationFilters): Promise<AdminApplicationsListResponse> => {
    const { data } = await apiClient.get<AdminApplicationsListResponse>('/applications', { params });
    return data;
  },

  /**
   * PATCH /applications/:id/status  (admin only)
   */
  updateApplicationStatus: async (
    id: string,
    status: string,
    adminNote?: string,
  ): Promise<AdminApplicationEntry> => {
    const { data } = await apiClient.patch<{ data: { application: AdminApplicationEntry } }>(
      `/applications/${id}/status`,
      { status, ...(adminNote !== undefined ? { adminNote } : {}) },
    );
    return data.data.application;
  },
};
