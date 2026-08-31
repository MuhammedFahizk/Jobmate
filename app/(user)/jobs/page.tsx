import { jobsService } from "@/lib/services/jobs.service";
import { JobsListingClient } from "@/components/jobs/JobsListingClient";
import type { AdminJobListResponse } from "@/lib/types/job.type";
import type { JobFilters } from "@/lib/api/types";

// Next.js Revalidation Strategy for Jobs Listing
// Revalidate every 60 seconds so new job postings land without hammering the database
export const revalidate = 60;

interface JobsPageProps {
  searchParams?: {
    search?: string;
    category?: string;
    type?: string | string[];
    experienceRequired?: string;
    isFeatured?: string;
    salaryMin?: string;
    salaryMax?: string;
    location?: string;
    dateFrom?: string;
    dateTo?: string;
    sort?: string;
    page?: string;
  };
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  let initialData: AdminJobListResponse | undefined = undefined;

  const typeParam = Array.isArray(searchParams?.type)
    ? searchParams.type.join(',')
    : searchParams?.type;

  const params: JobFilters = {
    page: searchParams?.page ? Number(searchParams.page) : 1,
    limit: 6,
    sort: searchParams?.sort || '-createdAt',
    isActive: true,
    ...(searchParams?.search ? { search: searchParams.search } : {}),
    ...(searchParams?.category ? { category: searchParams.category } : {}),
    ...(typeParam ? { type: typeParam } : {}),
    ...(searchParams?.experienceRequired ? { experienceRequired: searchParams.experienceRequired } : {}),
    ...(searchParams?.isFeatured ? { isFeatured: searchParams.isFeatured === 'true' } : {}),
    ...(searchParams?.salaryMin ? { salaryMin: Number(searchParams.salaryMin) } : {}),
    ...(searchParams?.salaryMax ? { salaryMax: Number(searchParams.salaryMax) } : {}),
    ...(searchParams?.location ? { location: searchParams.location } : {}),
    ...(searchParams?.dateFrom ? { dateFrom: searchParams.dateFrom } : {}),
    ...(searchParams?.dateTo ? { dateTo: searchParams.dateTo } : {}),
  };

  try {
    initialData = await jobsService.getJobs(params);
  } catch (err) {
    console.error("[SSR] Failed to fetch initial jobs for /jobs page:", err);
  }

  return <JobsListingClient initialData={initialData} />;
}