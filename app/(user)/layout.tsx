import UserLayout from "@/components/layout/UserLayout";
import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobs in Kerala & Kozhikode - Find Latest Jobs",
  description:
    "Find the latest jobs and vacancies across Kerala including Kozhikode, Mukkam, Koduvally, Kattangal and nearby areas. Discover opportunities and apply easily with JobMate.",
  alternates: {
    canonical: "/",
  },
};

export default function UserRouteLayout({ children }: { children: ReactNode }) {
  return <UserLayout>{children}</UserLayout>;
}