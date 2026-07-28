'use client';

import { useMemo, useState } from 'react';
import { Star, Check, X as XIcon, Trash2, Pencil, Plus, ChevronUp, ChevronDown, BadgeCheck } from 'lucide-react';
import { SectionShell } from '@/components/dashboard/SectionShell';
import DataTable, { StatusBadge, type DataTableColumn } from '@/components/admin/DataTable';
import { useToast } from '@/components/ui/Toast';
import {
  useTestimonials,
  useCreateTestimonial,
  useUpdateTestimonial,
  useDeleteTestimonial,
  useSetTestimonialStatus,
  useReorderTestimonials,
} from '@/hooks/useTestimonials';
import type { Testimonial, TestimonialInput } from '@/lib/services/testimonials';
import TestimonialFormModal from '@/components/admin/testimoniels/Testimonialformmodal';

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={12} className={i < rating ? 'fill-primary-500 text-primary-500' : 'text-border'} />
      ))}
    </div>
  );
}

export default function AdminTestimonialsPage() {
  const toast = useToast();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [deleting, setDeleting] = useState<Testimonial | null>(null);

  const { data, isLoading } = useTestimonials({ page, limit: 20, search: search || undefined });
  const createMutation = useCreateTestimonial();
  const updateMutation = useUpdateTestimonial();
  const deleteMutation = useDeleteTestimonial();
  const statusMutation = useSetTestimonialStatus();
  const reorderMutation = useReorderTestimonials();

  const rows = useMemo(() => data?.items ?? [], [data]);

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (row: Testimonial) => {
    setEditing(row);
    setFormOpen(true);
  };

  const handleSubmit = (input: TestimonialInput) => {
    if (editing) {
      updateMutation.mutate(
        { id: editing._id, input },
        {
          onSuccess: () => {
            toast.success('Testimonial updated.');
            setFormOpen(false);
          },
          onError: () => toast.error('Failed to update testimonial.'),
        }
      );
    } else {
      createMutation.mutate(input, {
        onSuccess: () => {
          toast.success('Testimonial created.');
          setFormOpen(false);
        },
        onError: () => toast.error('Failed to create testimonial.'),
      });
    }
  };

  const handleToggleActive = (row: Testimonial) => {
    statusMutation.mutate(
      { id: row._id, patch: { isActive: !row.isActive } },
      {
        onSuccess: () => toast.success(row.isActive ? 'Testimonial disabled.' : 'Testimonial enabled.'),
        onError: () => toast.error('Failed to update status.'),
      }
    );
  };

  const handleToggleFeatured = (row: Testimonial) => {
    statusMutation.mutate(
      { id: row._id, patch: { featured: !row.featured } },
      {
        onSuccess: () => toast.success(row.featured ? 'Removed from featured.' : 'Marked as featured.'),
        onError: () => toast.error('Failed to update featured status.'),
      }
    );
  };

  const handleDelete = () => {
    if (!deleting) return;
    deleteMutation.mutate(deleting._id, {
      onSuccess: () => {
        toast.success('Testimonial deleted.');
        setDeleting(null);
      },
      onError: () => toast.error('Failed to delete testimonial.'),
    });
  };

  const handleMove = (row: Testimonial, direction: 'up' | 'down') => {
    const index = rows.findIndex((r: { _id: string; }) => r._id === row._id);
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= rows.length) return;
    const swapRow = rows[swapIndex];

    reorderMutation.mutate(
      [
        { id: row._id, displayOrder: swapRow.displayOrder },
        { id: swapRow._id, displayOrder: row.displayOrder },
      ],
      { onError: () => toast.error('Failed to reorder testimonials.') }
    );
  };

  const columns: DataTableColumn<Testimonial>[] = [
    {
      key: 'avatar',
      header: '',
      render: (r) =>
        r.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={r.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
        ) : (
          <div className="h-8 w-8 rounded-full bg-[#F1F5F9]" />
        ),
    },
    { key: 'name', header: 'Name', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'designation', header: 'Designation', render: (r) => <span className="text-[12px] text-muted">{r.designation}</span> },
    { key: 'location', header: 'Location', render: (r) => <span className="text-[12px] text-muted">{r.location}</span> },
    { key: 'rating', header: 'Rating', render: (r) => <Stars rating={r.rating} /> },
    {
      key: 'featured',
      header: 'Featured',
      render: (r) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleToggleFeatured(r);
          }}
          title={r.featured ? 'Remove from featured' : 'Mark as featured'}
        >
          <BadgeCheck size={16} className={r.featured ? 'fill-primary-500 text-white' : 'text-border'} />
        </button>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (r) => <StatusBadge status={r.isActive ? 'active' : 'disabled'} tone={r.isActive ? 'positive' : 'neutral'} />,
    },
    {
      key: 'updatedAt',
      header: 'Updated',
      render: (r) => <span className="text-[12px] text-muted">{new Date(r.updatedAt).toLocaleDateString()}</span>,
    },
    {
      key: 'order',
      header: '',
      render: (r) => (
        <div className="flex flex-col">
          <button onClick={(e) => { e.stopPropagation(); handleMove(r, 'up'); }} className="text-muted hover:text-foreground">
            <ChevronUp size={13} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); handleMove(r, 'down'); }} className="text-muted hover:text-foreground">
            <ChevronDown size={13} />
          </button>
        </div>
      ),
    },
    {
      key: 'actions',
      header: '',
      align: 'right',
      render: (r) => (
        <div className="flex justify-end gap-1.5">
          <button
            onClick={(e) => { e.stopPropagation(); openEdit(r); }}
            title="Edit"
            className="h-6 w-6 flex items-center justify-center rounded text-muted hover:bg-[#EAF4FD] hover:text-primary-600"
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleToggleActive(r); }}
            title={r.isActive ? 'Disable' : 'Enable'}
            className="h-6 w-6 flex items-center justify-center rounded text-muted hover:bg-[#EAF4FD] hover:text-primary-600"
          >
            {r.isActive ? <XIcon size={13} /> : <Check size={13} />}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setDeleting(r); }}
            title="Delete"
            className="h-6 w-6 flex items-center justify-center rounded text-muted hover:bg-[#FCEAEA] hover:text-danger-500"
          >
            <Trash2 size={13} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <SectionShell
      title="Testimonials"
      description="Homepage testimonials, managed by admins. Not user-submitted — no approval workflow."
      actions={
        <button
          onClick={openCreate}
          className="flex items-center gap-1.5 rounded bg-primary-500 px-3 py-1.5 text-[13px] font-medium text-white"
        >
          <Plus size={14} /> New Testimonial
        </button>
      }
    >
      <div className="mb-3">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search by name..."
          className="w-64 rounded border border-border px-2.5 py-1.5 text-[13px]"
        />
      </div>

      <DataTable columns={columns} rows={rows} rowKey={(r) => r._id} loading={isLoading} emptyLabel="No testimonials yet." />

      <TestimonialFormModal
        open={formOpen}
        initial={editing}
        submitting={createMutation.isPending || updateMutation.isPending}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
      />

      {deleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-lg bg-white p-5 shadow-xl">
            <h3 className="text-sm font-semibold">Delete testimonial?</h3>
            <p className="mt-1 text-[13px] text-muted">
              This will permanently remove &quot;{deleting.name}&quot;. This can&apos;t be undone.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setDeleting(null)} className="rounded border border-border px-3 py-1.5 text-[13px]">
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                className="rounded bg-danger-500 px-3 py-1.5 text-[13px] font-medium text-white disabled:opacity-60"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </SectionShell>
  );
}