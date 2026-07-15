// ─────────────────────────────────────────────────────────────────────────────
// lib/api/client.ts
// Single Axios instance — base URL, auth headers, silent-refresh, error handling.
//
// Access tokens are held IN MEMORY ONLY (via the Zustand auth store) — never
// localStorage, never a JS-readable cookie. On a 401, a single shared
// refresh call is made (backed by the httpOnly `refreshToken` cookie) and
// every queued request is retried once the new access token lands.
// ─────────────────────────────────────────────────────────────────────────────

import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { ApiError } from './types';
import { useAuthStore, type AuthUser } from '@/lib/store/authStore';

// ── Axios instance ────────────────────────────────────────────────────────────

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1',
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  // REQUIRED: the httpOnly refreshToken cookie only travels with the
  // request if this is true. Without it, /auth/refresh silently 401s with
  // no cookie attached — easy to lose an hour to.
  withCredentials: true,
});

// ── Request interceptor ───────────────────────────────────────────────────────
// Attach the in-memory access token on every outgoing request.

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Refresh queue ─────────────────────────────────────────────────────────────
// Multiple requests can 401 at the same instant — e.g. a page firing several
// parallel fetches right as the 15m access token expires. Without this,
// each one would fire its own /auth/refresh call, racing the backend's
// rotation logic: the second call would see an already-rotated refresh
// token and get flagged as reuse, which wipes ALL of the user's sessions
// server-side. So: at most one refresh in flight at a time, everyone else
// just awaits the same promise.

interface RefreshResponse {
  accessToken: string;
  data: { user: AuthUser };
}

let refreshPromise: Promise<string> | null = null;

function refreshAccessToken(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = axios
      .post<RefreshResponse>(
        `${apiClient.defaults.baseURL}/auth/refresh`,
        {},
        { withCredentials: true },
      )
      .then(({ data }) => {
        useAuthStore.getState().setAuth(data.accessToken, data.data.user);
        return data.accessToken;
      })
      .catch((err) => {
        useAuthStore.getState().clearAuth();
        throw err;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

// ── Response interceptor ─────────────────────────────────────────────────────
// 1. On 401 (and not already retried, and not the refresh call itself):
//    refresh once, retry the original request with the new token.
// 2. If the refresh itself fails → clear auth, bounce to /login.
// 3. Normalise every other error into ApiError.

interface RetryableConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableConfig | undefined;
    const status = error.response?.status ?? 0;
    const isAuthCall = originalRequest?.url?.includes('/auth/refresh') || originalRequest?.url?.includes('/auth/login') || originalRequest?.url?.includes('/auth/register');

    if (status === 401 && originalRequest && !originalRequest._retry && !isAuthCall) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshAccessToken();
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        return apiClient(originalRequest);
      } catch {
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        // fall through to the normalised rejection below
      }
    }

    const serverData = error.response?.data as Record<string, unknown> | undefined;
    const apiError: ApiError = {
      status,
      message:
        (serverData?.message as string) ??
        error.message ??
        'An unexpected error occurred.',
      errors: (serverData?.errors as ApiError['errors']) ?? undefined,
    };

    return Promise.reject(apiError);
  },
);

export default apiClient;