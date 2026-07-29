'use client';

import { Check } from 'lucide-react';
import { SectionShell } from '@/components/dashboard/SectionShell';

export default function AdminServicesPage() {
  const features = [
    'Create Services',
    'Edit Services',
    'Manage Categories',
    'Configure Pricing',
    'Enable / Disable Services',
    'Manage Providers',
    'Visibility Controls'
  ];

  return (
    <SectionShell
      title="Services"
      description="Service listings offered on the platform."
    >
      <div className="flex flex-col items-center justify-center py-6 px-4 text-center border border-dashed border-border rounded-xl bg-background/50">


        <h2 className="text-xl font-display font-bold text-foreground mb-3">
          Service Management
        </h2>

        <p className="text-sm font-body text-muted max-w-md mx-auto mb-8 leading-relaxed">
          This module is currently under development and will be available in a future platform update.
        </p>

        <div className="bg-white border border-border rounded-xl p-6 text-left max-w-3xl w-full shadow-sm mb-8">
          <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-4 text-center sm:text-left">
            Coming Soon
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-6">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-sm font-medium text-foreground">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                  <Check size={12} className="text-green-600" strokeWidth={2.5} />
                </div>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full text-amber-700 text-xs font-medium">
          <span>🚧</span> Under Development
        </div>
      </div>
    </SectionShell>
  );
}
