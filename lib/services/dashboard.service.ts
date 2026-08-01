import apiClient from '@/lib/api/client';
import type { AdminApplicationEntry } from './applications.service';

export interface DashboardStats {
  totalCandidates: number;
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  todayApplications: number;
  placedCount: number;
  unhandledContactsCount: number;
  placementRate: number;
}

export interface DashboardChartData {
  monthlyStats: { name: string; applications: number; candidates: number }[];
}

export interface AdminContactSummary {
  _id: string;
  name: string;
  subject: string;
  createdAt: string;
}

export interface DashboardResponse {
  status: string;
  data: {
    stats: DashboardStats;
    charts: DashboardChartData;
    recentApplications: AdminApplicationEntry[];
    recentContacts: AdminContactSummary[];
  };
}

export const dashboardService = {
  getStats: async (): Promise<DashboardResponse> => {
    const { data } = await apiClient.get<DashboardResponse>('/admin/dashboard');
    return data;
  },
};
