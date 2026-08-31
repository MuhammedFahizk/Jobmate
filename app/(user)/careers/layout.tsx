import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the JobMate team. See our open internal positions and help us revolutionize job matching and recruitment in Kerala.",
  alternates: {
    canonical: "/careers",
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
