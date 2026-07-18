import UserLayout from "@/components/layout/UserLayout";
import type { ReactNode } from "react";

export default function UserRouteLayout({ children }: { children: ReactNode }) {
  return <UserLayout>{children}</UserLayout>;
}