'use client';

import { useEffect, useState } from 'react';
import { Plus, X } from 'lucide-react';
import { SectionShell } from '@/components/dashboard/SectionShell';
import DataTable, { StatusBadge, type DataTableColumn } from '@/components/admin/DataTable';
import { listServices, createService, updateService, type ServiceListing } from '@/lib/dummy-data';
import { useToast } from '@/components/ui/Toast';

const inputClass =
  'border border-border rounded-md px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary-300 w-full';

function ServiceModal({
  initial,
  onClose,
  onSaved,
}: {
  initial?: ServiceListing;
  onClose: () => void;
  onSaved: () => void;
}) {
  const toast = useToast();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: initial?.title ?? '',
    provider: initial?.provider ?? '',
    category: initial?.category ?? '',
    price: initial?.price ?? '',
    description: initial?.description ?? '',
    status: initial?.status ?? 'active',
  });

  const update = (field: keyof typeof form, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const submit = async () => {
    if (!form.title.trim() || !form.provider.trim()) {
      toast.error('Title and provider are required.');
      return;
    }
    setSaving(true);
    try {
      if (initial) {
        await updateService(initial.id, form);
        toast.success('Service updated.');
      } else {
        await createService({ ...form, status: form.status as ServiceListing['status'] });
        toast.success('Service created.');
      }
      onSaved();
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-[440px] bg-white rounded-md border border-border max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h2 className="text-[14px] font-semibold text-foreground">{initial ? 'Edit service' : 'New service'}</h2>
          <button onClick={onClose} className="text-muted hover:text-foreground" aria-label="Close">
            <X size={16} />
          </button>
        </div>
        <div className="p-4 flex flex-col gap-3">
          <label className="flex flex-col gap-1">
            <span className="text-[12px] font-medium text-muted">Title</span>
            <input className={inputClass} value={form.title} onChange={(e) => update('title', e.target.value)} />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[12px] font-medium text-muted">Provider</span>
            <input className={inputClass} value={form.provider} onChange={(e) => update('provider', e.target.value)} />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-[12px] font-medium text-muted">Category</span>
              <input className={inputClass} value={form.category} onChange={(e) => update('category', e.target.value)} />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[12px] font-medium text-muted">Price</span>
              <input className={inputClass} value={form.price} onChange={(e) => update('price', e.target.value)} />
            </label>
          </div>
          <label className="flex flex-col gap-1">
            <span className="text-[12px] font-medium text-muted">Description</span>
            <textarea
              rows={3}
              className={inputClass}
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[12px] font-medium text-muted">Status</span>
            <select className={inputClass} value={form.status} onChange={(e) => update('status', e.target.value)}>
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>
          </label>
        </div>
        <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-border">
          <button onClick={onClose} className="px-3 py-1.5 rounded-md border border-border text-sm text-foreground hover:bg-[#F0F0EE]">
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={saving}
            className="px-3 py-1.5 rounded-md bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white text-sm font-medium"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ mode: 'create' } | { mode: 'edit'; service: ServiceListing } | null>(null);

  const load = () => {
    setLoading(true);
    listServices().then((data) => {
      setServices(data);
      setLoading(false);
    });
  };

  useEffect(load, []);

  const columns: DataTableColumn<ServiceListing>[] = [
    { key: 'title', header: 'Title', render: (s) => <span className="font-medium">{s.title}</span> },
    { key: 'provider', header: 'Provider' },
    { key: 'category', header: 'Category' },
    { key: 'price', header: 'Price' },
    {
      key: 'status',
      header: 'Status',
      render: (s) => <StatusBadge status={s.status} tone={s.status === 'active' ? 'positive' : 'neutral'} />,
    },
    {
      key: 'actions',
      header: '',
      align: 'right',
      render: (s) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setModal({ mode: 'edit', service: s });
          }}
          className="text-[12px] text-primary-600 hover:underline"
        >
          Edit
        </button>
      ),
    },
  ];

  return (
    <SectionShell
      title="Services"
      description="Service listings offered on the platform."
      actions={
        <button
          onClick={() => setModal({ mode: 'create' })}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary-600 hover:bg-primary-700 text-white text-[13px] font-medium"
        >
          <Plus size={14} /> New service
        </button>
      }
    >
      <DataTable columns={columns} rows={services} rowKey={(s) => s.id} loading={loading} emptyLabel="No services yet." />

      {modal && (
        <ServiceModal
          initial={modal.mode === 'edit' ? modal.service : undefined}
          onClose={() => setModal(null)}
          onSaved={load}
        />
      )}
    </SectionShell>
  );
}
