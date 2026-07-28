import apiClient from "../api/client";

export interface Testimonial {
    _id: string;
    name: string;
    designation: string;
    company?: string;
    location: string;
    avatar?: string;
    review: string;
    rating: number;
    displayOrder: number;
    isActive: boolean;
    featured: boolean;
    createdAt: string;
    updatedAt: string;
}

export type PublicTestimonial = Pick<
    Testimonial,
    'name' | 'designation' | 'location' | 'avatar' | 'review' | 'rating' | 'featured'
>;

export interface TestimonialInput {
    name: string;
    designation: string;
    company?: string;
    location: string;
    avatar?: string;
    review: string;
    rating: number;
    displayOrder?: number;
    isActive?: boolean;
    featured?: boolean;
}

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface PaginatedTestimonials {
    items: Testimonial[];
    pagination: { page: number; limit: number; total: number; totalPages: number };
}

const ADMIN_BASE = '/testimonials/admin/';
const PUBLIC_BASE = '/testimonials';

export async function listTestimonials(
    params: { page?: number; limit?: number; search?: string } = {}
): Promise<PaginatedTestimonials> {
    const { data } = await apiClient.get<ApiResponse<PaginatedTestimonials>>(ADMIN_BASE, { params });
    return data.data;
}

export async function getTestimonial(id: string): Promise<Testimonial> {
    const { data } = await apiClient.get<ApiResponse<Testimonial>>(`${ADMIN_BASE}/${id}`);
    return data.data;
}

export async function createTestimonial(input: TestimonialInput): Promise<Testimonial> {
    const { data } = await apiClient.post<ApiResponse<Testimonial>>(ADMIN_BASE, input);
    return data.data;
}

export async function updateTestimonial(id: string, input: Partial<TestimonialInput>): Promise<Testimonial> {
    const { data } = await apiClient.patch<ApiResponse<Testimonial>>(`${ADMIN_BASE}/${id}`, input);
    return data.data;
}

export async function deleteTestimonial(id: string): Promise<null> {
    const { data } = await apiClient.delete<ApiResponse<null>>(`${ADMIN_BASE}/${id}`);
    return data.data;
}

export async function setTestimonialStatus(
    id: string,
    patch: { isActive?: boolean; featured?: boolean }
): Promise<Testimonial> {
    const { data } = await apiClient.patch<ApiResponse<Testimonial>>(`${ADMIN_BASE}/${id}/status`, patch);
    return data.data;
}

export async function reorderTestimonials(items: { id: string; displayOrder: number }[]): Promise<null> {
    const { data } = await apiClient.patch<ApiResponse<null>>(`${ADMIN_BASE}/reorder`, { items });
    return data.data;
}

export async function listPublicTestimonials(): Promise<PublicTestimonial[]> {
    const { data } = await apiClient.get<ApiResponse<PublicTestimonial[]>>(PUBLIC_BASE);
    return data.data;
}