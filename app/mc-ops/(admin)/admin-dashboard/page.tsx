'use client';

import { useEffect, useState } from 'react';
import { Briefcase, FileText, Users, Star } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import { SectionShell } from '@/components/dashboard/SectionShell';
import { fetchDashboardStats } from '@/lib/dummy-data';

interface Stats {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  totalCandidates: number;
  pendingReviews: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchDashboardStats().then((data) => {
      if (!cancelled) {
        setStats(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <SectionShell title="Dashboard" description="Key numbers at a glance.">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Total jobs" value={stats?.totalJobs ?? 0} icon={Briefcase} loading={loading} />
        <StatCard label="Applications" value={stats?.totalApplications ?? 0} icon={FileText} loading={loading} />
        <StatCard label="Candidates" value={stats?.totalCandidates ?? 0} icon={Users} loading={loading} />
        <StatCard label="Pending reviews" value={stats?.pendingReviews ?? 0} icon={Star} loading={loading} />
      </div>
    </SectionShell>
  );
}
