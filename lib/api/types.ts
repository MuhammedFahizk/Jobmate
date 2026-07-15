// ─────────────────────────────────────────────────────────────────────────────
// lib/api/types.ts
// Shared API response/error contracts.
// Every service and hook imports from here — one source of truth.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Standard success envelope returned by every backend endpoint.
 * Backend should always return: { success, message, data }
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/**
 * Paginated list envelope for collection endpoints (e.g. GET /jobs).
 */
export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  total: number;
  page: number;
  limit: number;
}

/**
 * Normalised error shape thrown by the Axios response interceptor.
 * Catch this in components with: catch (e) { const err = e as ApiError }
 */
export interface ApiError {
  status: number;
  message: string;
  /** Field-level validation errors e.g. { field: "email", message: "Invalid" } */
  errors?: { field: string; message: string }[];
}

/**
 * Query parameters for paginated / filtered list requests.
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface JobFilters extends PaginationParams {
  category?: string;
  type?: string;
  location?: string;
  search?: string;
  status?: 'active' | 'closed';
}
