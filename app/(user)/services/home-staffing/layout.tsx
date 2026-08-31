import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Staffing Services",
  description:
    "Professional home staffing solutions by JobMate. Find verified domestic workers, caregivers, and household staff in Kozhikode and Kerala.",
  alternates: {
    canonical: "/services/home-staffing",
  },
};

export default function HomeStaffingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
