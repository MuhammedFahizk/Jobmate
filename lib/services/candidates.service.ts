import apiClient from '@/lib/api/client';
import type { AdminCandidate } from '../types/user.type';
import type { AdminApplication } from '@/lib/dummy-data';

export interface CandidatesListResponse {
  status: string;
  results: number;
  total: number;
  data: {
    candidates: AdminCandidate[];
  };
}

export interface CandidateResponse {
  status: string;
  data: {
    candidate: AdminCandidate;
    applications: AdminApplication[];
  };
}

export interface CandidateFilters {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  isVerified?: boolean | string;
  paymentStatus?: string;
}

export const candidatesService = {
  getCandidates: async (params?: CandidateFilters): Promise<CandidatesListResponse> => {
    const { data } = await apiClient.get<CandidatesListResponse>('/admin/candidates', { params });
    return data;
  },

  getCandidateById: async (id: string): Promise<CandidateResponse> => {
    const { data } = await apiClient.get<CandidateResponse>(`/admin/candidates/${id}`);
    return data;
  },

  updateCandidateStatus: async (
    id: string,
    payload: { isVerified?: boolean; paymentStatus?: 'unpaid' | 'paid'; isActive?: boolean }
  ): Promise<AdminCandidate> => {
    const { data } = await apiClient.patch<{ data: { candidate: AdminCandidate } }>(
      `/admin/candidates/${id}/status`,
      payload
    );
    return data.data.candidate;
  },
};
