import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    listTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    setTestimonialStatus,
    reorderTestimonials,
    TestimonialInput,
} from '@/lib/services/testimonials';

const KEY = ['admin', 'testimonials'] as const;

export function useTestimonials(params: { page?: number; limit?: number; search?: string } = {}) {
    return useQuery({
        queryKey: [...KEY, params],
        queryFn: () => listTestimonials(params),
    });
}

export function useCreateTestimonial() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (input: TestimonialInput) => createTestimonial(input),
        onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
    });
}

export function useUpdateTestimonial() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, input }: { id: string; input: Partial<TestimonialInput> }) => updateTestimonial(id, input),
        onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
    });
}

export function useDeleteTestimonial() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteTestimonial(id),
        onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
    });
}

export function useSetTestimonialStatus() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, patch }: { id: string; patch: { isActive?: boolean; featured?: boolean } }) =>
            setTestimonialStatus(id, patch),
        onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
    });
}

export function useReorderTestimonials() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (items: { id: string; displayOrder: number }[]) => reorderTestimonials(items),
        onSettled: () => qc.invalidateQueries({ queryKey: KEY }),
    });
}