import { jobsService } from "@/lib/services/jobs.service";
import { listPublicTestimonials } from "@/lib/services/testimonials";
import { HomeContent, LatestJob } from "@/components/home/HomeContent";

// Next.js Revalidation Strategy for Homepage
// Revalidate every 60 seconds so fresh jobs appear without hammering backend API
export const revalidate = 60;

export default async function Home() {
  let initialJobs: LatestJob[] = [];
  let initialTestimonials = undefined;

  try {
    const res = await jobsService.getLatestJobs();
    initialJobs = (res.data?.jobs || []) as LatestJob[];
  } catch (err) {
    console.error("[SSR] Failed to fetch latest jobs on Homepage:", err);
  }

  try {
    initialTestimonials = await listPublicTestimonials();
  } catch (err) {
    console.error("[SSR] Failed to fetch public testimonials on Homepage:", err);
  }

  return (
    <HomeContent
      initialJobs={initialJobs}
      initialTestimonials={initialTestimonials}
    />
  );
}