'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { SectionShell } from '@/components/dashboard/SectionShell';
import DataTable, { StatusBadge, type DataTableColumn } from '@/components/admin/DataTable';
import { listContacts, markContactHandled, type ContactSubmission } from '@/lib/dummy-data';
import { useToast } from '@/components/ui/Toast';

function ContactModal({ contact, onClose, onHandled }: { contact: ContactSubmission; onClose: () => void; onHandled: () => void }) {
  const toast = useToast();
  const [saving, setSaving] = useState(false);

  const handle = async () => {
    setSaving(true);
    try {
      await markContactHandled(contact.id);
      toast.success('Marked as handled.');
      onHandled();
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-[440px] bg-white rounded-md border border-border">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h2 className="text-[14px] font-semibold text-foreground">{contact.subject}</h2>
          <button onClick={onClose} className="text-muted hover:text-foreground" aria-label="Close">
            <X size={16} />
          </button>
        </div>
        <div className="p-4 flex flex-col gap-2 text-sm">
          <p className="text-foreground">
            <span className="font-medium">{contact.name}</span>{' '}
            <span className="text-muted">· {contact.email}</span>
          </p>
          <p className="text-[12px] text-muted">{contact.submittedAt}</p>
          <p className="text-foreground mt-2">{contact.message}</p>
        </div>
        <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-border">
          <button onClick={onClose} className="px-3 py-1.5 rounded-md border border-border text-sm text-foreground hover:bg-[#F0F0EE]">
            Close
          </button>
          {!contact.handled && (
            <button
              onClick={handle}
              disabled={saving}
              className="px-3 py-1.5 rounded-md bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white text-sm font-medium"
            >
              {saving ? 'Saving…' : 'Mark handled'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<ContactSubmission | null>(null);

  const load = () => {
    setLoading(true);
    listContacts().then((data) => {
      setContacts(data);
      setLoading(false);
    });
  };

  useEffect(load, []);

  const columns: DataTableColumn<ContactSubmission>[] = [
    { key: 'name', header: 'Name', render: (c) => <span className="font-medium">{c.name}</span> },
    { key: 'email', header: 'Email' },
    { key: 'subject', header: 'Subject' },
    { key: 'submittedAt', header: 'Submitted' },
    {
      key: 'handled',
      header: 'Status',
      render: (c) => <StatusBadge status={c.handled ? 'handled' : 'new'} tone={c.handled ? 'neutral' : 'positive'} />,
    },
  ];

  return (
    <SectionShell title="Contact submissions" description="Messages sent through the public contact form.">
      <DataTable
        columns={columns}
        rows={contacts}
        rowKey={(c) => c.id}
        loading={loading}
        emptyLabel="No submissions yet."
        onRowClick={(c) => setActive(c)}
      />
      {active && (
        <ContactModal
          contact={active}
          onClose={() => setActive(null)}
          onHandled={() => {
            load();
            setActive(null);
          }}
        />
      )}
    </SectionShell>
  );
}
