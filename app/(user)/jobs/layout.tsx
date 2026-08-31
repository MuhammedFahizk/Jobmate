import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Latest Jobs in Kerala & Kozhikode",
  description:
    "Browse the latest job vacancies in Kerala and Kozhikode, including opportunities around Mukkam, Koduvally, Kattangal and nearby locations.",
  alternates: {
    canonical: "/jobs",
  },
};

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
