// ─────────────────────────────────────────────────────────────────────────────
// lib/services/auth.service.ts
// Authentication endpoints: login, register, logout, silent refresh.
//
// Access token: returned in the response body, held in Zustand memory only
// (see lib/store/authStore.ts) — never persisted.
// Refresh token: httpOnly cookie named `refreshToken`, Path=/api/v1/auth,
//   SameSite=strict, 7d TTL. Rotated on every refresh; reuse wipes all of
//   the user's sessions server-side. The client never reads or writes this
//   cookie directly — the browser handles it automatically as long as
//   `withCredentials: true` is set (see client.ts).
// ─────────────────────────────────────────────────────────────────────────────

import apiClient from '@/lib/api/client';
import { useAuthStore, type AuthUser } from '@/lib/store/authStore';

// ── Payload / response shapes ─────────────────────────────────────────────────

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  data: { user: AuthUser };
}

// ── Service ───────────────────────────────────────────────────────────────────

export const authService = {
  /**
   * POST /auth/login
   * Backend sets the refreshToken httpOnly cookie on the response;
   * we store the accessToken in memory and mark the user authenticated.
   */
  login: async (payload: LoginPayload): Promise<AuthUser> => {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', payload);
    useAuthStore.getState().setAuth(data.accessToken, data.data.user);
    return data.data.user;
  },

  /**
   * POST /auth/register
   * Same contract as login — registering logs the user in immediately.
   */
  register: async (payload: RegisterPayload): Promise<AuthUser> => {
    const { data } = await apiClient.post<AuthResponse>('/auth/register', payload);
    useAuthStore.getState().setAuth(data.accessToken, data.data.user);
    return data.data.user;
  },

  /**
   * POST /auth/logout
   * Server clears/invalidates the refresh cookie; we always clear local
   * state regardless of whether the request itself succeeds.
   */
  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      useAuthStore.getState().clearAuth();
    }
  },

  /**
   * POST /auth/admin/login
   * Backend rejects (401, generic "incorrect email or password" — same
   * message as a bad password, to avoid revealing that a non-admin
   * account exists) unless the account's role is 'admin'. No token is
   * ever issued to a non-admin caller, even momentarily.
   */
  adminLogin: async (payload: LoginPayload): Promise<AuthUser> => {
    const { data } = await apiClient.post<AuthResponse>('/auth/admin/login', payload);
    useAuthStore.getState().setAuth(data.accessToken, data.data.user);
    return data.data.user;
  },

  /**
   * POST /auth/refresh
   * Silent refresh — relies solely on the httpOnly cookie, no body needed.
   * Used on app mount (AuthProvider) and by the client.ts 401 interceptor.
   *
   * Throws if there's no valid refresh cookie (first-ever visit, expired
   * cookie, etc.) — callers should treat that as "not logged in," not as
   * an error worth surfacing to the user.
   */
  refresh: async (): Promise<AuthUser> => {
    const { data } = await apiClient.post<AuthResponse>('/auth/refresh');
    useAuthStore.getState().setAuth(data.accessToken, data.data.user);
    return data.data.user;
  },
};