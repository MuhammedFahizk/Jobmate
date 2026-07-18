// app/dashboard/page.tsx — redirect to the default sub-page
import { redirect } from 'next/navigation';

export default function DashboardIndexPage() {
  redirect('/dashboard/profile');
}
