import { useQuery } from '@tanstack/react-query';
import { listPublicTestimonials } from '@/lib/services/testimonials';

export function usePublicTestimonials() {
    return useQuery({
        queryKey: ['public', 'testimonials'],
        queryFn: listPublicTestimonials,
        staleTime: 5 * 60 * 1000, // 5 min cache — homepage should query once
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
    });
}