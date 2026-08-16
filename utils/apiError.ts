import axios from 'axios';
import type { ApiError } from '@/lib/api/types';

/**
 * Narrows an unknown `catch` error down to your ApiError shape when it's an
 * axios error carrying one, otherwise returns null. This is the one place
 * that knows how to read an axios error body — nothing else in the app
 * should reach into `err.response.data` directly.
 */
export function getApiError(err: any): ApiError | null {
    if (axios.isAxiosError<ApiError>(err)) {
        return err.response?.data ?? null;
    }
    if (err && typeof err === 'object' && 'status' in err && 'message' in err) {
        return {
            status: String(err.status),
            message: err.message,
            errors: err.errors
        } as ApiError;
    }
    return null;
}

/**
 * Convenience wrapper for the common case: you just want a string to show
 * the user, and don't care about the rest of the ApiError shape.
 *
 * Priority: server's first field-level validation message (err.errors[0].message)
 * → server's top-level message → err.message (for non-axios JS errors,
 * e.g. a thrown Error) → the fallback you pass in.
 */
export function getApiErrorMessage(err: unknown, fallback = 'Something went wrong. Please try again.'): string {
    const apiError = getApiError(err);
    if (apiError?.errors?.[0]?.message) return apiError.errors[0].message;
    if (apiError?.message) return apiError.message;
    if (err instanceof Error && err.message) return err.message;
    return fallback;
}