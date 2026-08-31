import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Search FAQ",
  description:
    "Find answers to frequently asked questions about finding jobs, applying to vacancies, and utilizing recruiting services on JobMate.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
