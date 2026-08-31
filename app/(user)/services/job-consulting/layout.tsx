import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Consulting Services",
  description:
    "Expert job consulting and recruitment services by JobMate. We help job seekers find direct employment with top companies in Kerala.",
  alternates: {
    canonical: "/services/job-consulting",
  },
};

export default function JobConsultingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
