// ─────────────────────────────────────────────────────────────────────────────
// lib/services/user.service.ts
// Service for managing the authenticated user's profile, password, and account.
// ─────────────────────────────────────────────────────────────────────────────

import apiClient from '@/lib/api/client';
import { useAuthStore, type AuthUser } from '@/lib/store/authStore';

export interface UpdateProfilePayload {
  name?: string;
  phone?: string;
  location?: string;
  skills?: string[];
  experience?: string;
  category?: string;
  resumeLink?: string;
  bio?: string;
}

export interface UpdatePasswordPayload {
  passwordCurrent: string;
  password: string;
}

interface UpdateUserResponse {
  status: string;
  data: { user: AuthUser };
}


export const userService = {

  /**
   * GET /auth/me
   * Gets the current user's profile.
   */
  getMe: async (): Promise<AuthUser> => {
    const { data } = await apiClient.get<UpdateUserResponse>('/auth/me');
    useAuthStore.getState().setUser(data.data.user);
    return data.data.user;
  },

  /**
   * PATCH /auth/update-me
   * Updates non-password profile fields.
   */
  updateProfile: async (payload: UpdateProfilePayload): Promise<AuthUser> => {
    const { data } = await apiClient.patch<UpdateUserResponse>('/auth/update-me', payload);
    useAuthStore.getState().setUser(data.data.user);
    return data.data.user;
  },

  /**
   * PATCH /auth/update-password
   * Updates the user's password.
   */
  updatePassword: async (payload: UpdatePasswordPayload): Promise<AuthUser> => {
    const { data } = await apiClient.patch<UpdateUserResponse>('/auth/update-password', payload);
    useAuthStore.getState().setUser(data.data.user);
    return data.data.user;
  },

  /**
   * DELETE /auth/delete-me
   * Deletes the user's account and clears local auth state.
   */
  deleteAccount: async (): Promise<void> => {
    await apiClient.delete('/auth/delete-me');
    useAuthStore.getState().clearAuth();
  },
};
