'use client';

import { useEffect, useState } from 'react';
import { SectionShell } from '@/components/dashboard/SectionShell';
import { dashboardService, DashboardResponse } from '@/lib/services/dashboard.service';
import { useToast } from '@/components/ui/Toast';
import { Users, Briefcase, FileText, Mail, TrendingUp } from 'lucide-react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import Link from 'next/link';


export default function AdminDashboardPage() {
  const toast = useToast();
  const [data, setData] = useState<DashboardResponse['data'] | null>(null);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  useEffect(() => {
    dashboardService.getStats()
      .then(res => {
        setData(res.data);
      })
      .catch(() => {
        toast.error('Could not load dashboard data.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [toast]);

  if (loading) {
    return (
      <SectionShell title="Dashboard">
        <div className="flex items-center justify-center h-64 text-muted">Loading dashboard...</div>
      </SectionShell>
    );
  }

  if (!data) return null;

  const { stats, charts, recentApplications, recentContacts } = data;

  const kpiCards = [
    { label: 'Total Candidates', value: stats.totalCandidates, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Jobs', value: stats.activeJobs, icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Total Applications', value: stats.totalApplications, icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Unhandled Contacts', value: stats.unhandledContactsCount, icon: Mail, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <SectionShell title="Admin Dashboard" description="Overview of platform activity and metrics.">
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4 shadow-sm">
              <div className={`p-3 rounded-lg ${card.bg} ${card.color}`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{card.label}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Monthly Trends Chart */}
      <div className="mt-4 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4 text-gray-800">
          <TrendingUp size={20} className="text-indigo-600" />
          <h2 className="font-semibold text-lg">Growth & Engagement (Last 1 Year)</h2>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={charts.monthlyStats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
              <YAxis allowDecimals={false} tick={{fontSize: 12}} axisLine={false} tickLine={false} />
              <Tooltip 
                cursor={{fill: '#f3f4f6'}}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                labelStyle={{ fontWeight: 'bold', color: '#1f2937' }}
              />
              <Bar dataKey="applications" name="Applications" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={30} />
              <Bar dataKey="candidates" name="New Candidates" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        
        {/* Recent Applications */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h2 className="font-semibold text-gray-800">Recent Applications</h2>
            <Link href="/mc-ops/applications" className="text-sm text-indigo-600 hover:underline">View All</Link>
          </div>
          <div className="divide-y divide-gray-100 flex-1">
            {recentApplications.length === 0 ? (
              <div className="p-6 text-center text-gray-500 text-sm">No recent applications</div>
            ) : (
              recentApplications.map(app => (
                <div key={app._id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{app.candidate?.name || 'Unknown'}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{app.job?.title || 'Deleted Job'}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider ${
                      app.status === 'placed' ? 'bg-green-100 text-green-700' :
                      app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {app.status}
                    </span>
                    <p className="text-[11px] text-gray-400 mt-1">{formatDate(app.createdAt)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Unhandled Contacts */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h2 className="font-semibold text-gray-800">Unhandled Contacts</h2>
            <Link href="/mc-ops/contacts" className="text-sm text-indigo-600 hover:underline">View Inbox</Link>
          </div>
          <div className="divide-y divide-gray-100 flex-1">
            {recentContacts.length === 0 ? (
              <div className="p-6 text-center text-gray-500 text-sm">No unhandled messages</div>
            ) : (
              recentContacts.map(contact => (
                <div key={contact._id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{contact.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5 truncate max-w-[200px]">{contact.subject}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider bg-amber-100 text-amber-700">
                      New
                    </span>
                    <p className="text-[11px] text-gray-400 mt-1">{formatDate(contact.createdAt)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </SectionShell>
  );
}
