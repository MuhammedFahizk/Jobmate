'use client';

import { useEffect, useState } from 'react';
import { Star, Check, X as XIcon, Trash2 } from 'lucide-react';
import { SectionShell } from '@/components/dashboard/SectionShell';
import DataTable, { StatusBadge, type DataTableColumn } from '@/components/admin/DataTable';
import { listReviews, setReviewStatus, deleteReview, type Review, type ReviewStatus } from '@/lib/dummy-data';
import { useToast } from '@/components/ui/Toast';

const TONE: Record<ReviewStatus, 'neutral' | 'positive' | 'warning' | 'negative'> = {
  pending: 'warning',
  approved: 'positive',
  rejected: 'negative',
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={i < rating ? 'fill-primary-500 text-primary-500' : 'text-border'}
        />
      ))}
    </div>
  );
}

export default function AdminReviewsPage() {
  const toast = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    listReviews().then((data) => {
      setReviews(data);
      setLoading(false);
    });
  };

  useEffect(load, []);

  const handleStatus = async (id: string, status: ReviewStatus) => {
    await setReviewStatus(id, status);
    toast.success(status === 'approved' ? 'Review approved.' : 'Review rejected.');
    load();
  };

  const handleDelete = async (id: string) => {
    await deleteReview(id);
    toast.success('Review deleted.');
    load();
  };

  const columns: DataTableColumn<Review>[] = [
    { key: 'author', header: 'Author', render: (r) => <span className="font-medium">{r.author}</span> },
    { key: 'targetName', header: 'On' },
    { key: 'rating', header: 'Rating', render: (r) => <Stars rating={r.rating} /> },
    { key: 'comment', header: 'Comment', render: (r) => <span className="text-[12px] text-muted line-clamp-2">{r.comment}</span> },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} tone={TONE[r.status]} /> },
    {
      key: 'actions',
      header: '',
      align: 'right',
      render: (r) => (
        <div className="flex justify-end gap-1.5">
          {r.status !== 'approved' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleStatus(r.id, 'approved');
              }}
              title="Approve"
              className="h-6 w-6 flex items-center justify-center rounded text-muted hover:bg-[#EAF4FD] hover:text-primary-600"
            >
              <Check size={13} />
            </button>
          )}
          {r.status !== 'rejected' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleStatus(r.id, 'rejected');
              }}
              title="Reject"
              className="h-6 w-6 flex items-center justify-center rounded text-muted hover:bg-[#FCEAEA] hover:text-danger-500"
            >
              <XIcon size={13} />
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(r.id);
            }}
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
    <SectionShell title="Reviews" description="Candidate reviews of jobs and services.">
      <DataTable columns={columns} rows={reviews} rowKey={(r) => r.id} loading={loading} emptyLabel="No reviews yet." />
    </SectionShell>
  );
}
