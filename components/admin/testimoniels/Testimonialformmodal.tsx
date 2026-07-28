'use client';

import { useEffect, useState } from 'react';
import { Star, X, Loader2 } from 'lucide-react';
import type { Testimonial, TestimonialInput } from '@/lib/services/testimonials';

const REVIEW_MAX = 500;

interface TestimonialFormModalProps {
  open: boolean;
  initial?: Testimonial | null;
  submitting?: boolean;
  onClose: () => void;
  onSubmit: (input: TestimonialInput) => void;
}

interface FormState {
  name: string;
  designation: string;
  company: string;
  location: string;
  avatar: string;
  review: string;
  rating: number;
}

const EMPTY_FORM: FormState = {
  name: '',
  designation: '',
  company: '',
  location: '',
  avatar: '',
  review: '',
  rating: 5,
};

export default function TestimonialFormModal({
  open,
  initial,
  submitting,
  onClose,
  onSubmit,
}: TestimonialFormModalProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  useEffect(() => {
    if (!open) return;
    setErrors({});
    setForm(
      initial
        ? {
          name: initial.name,
          designation: initial.designation,
          company: initial.company ?? '',
          location: initial.location,
          avatar: initial.avatar ?? '',
          review: initial.review,
          rating: initial.rating,
        }
        : EMPTY_FORM
    );
  }, [open, initial]);

  if (!open) return null;

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = 'Name is required.';
    if (!form.designation.trim()) next.designation = 'Designation is required.';
    if (!form.location.trim()) next.location = 'Location is required.';
    if (!form.review.trim()) next.review = 'Review is required.';
    else if (form.review.length > REVIEW_MAX) next.review = `Review cannot exceed ${REVIEW_MAX} characters.`;
    if (form.rating < 1 || form.rating > 5) next.rating = 'Rating must be between 1 and 5.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit({
      name: form.name.trim(),
      designation: form.designation.trim(),
      company: form.company.trim() || undefined,
      location: form.location.trim(),
      avatar: form.avatar.trim() || undefined,
      review: form.review.trim(),
      rating: form.rating,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
          <h2 className="text-sm font-semibold">{initial ? 'Edit Testimonial' : 'New Testimonial'}</h2>
          <button onClick={onClose} className="text-muted hover:text-foreground">
            <X size={16} />
          </button>
        </div>

        <div className="max-h-[70vh] space-y-4 overflow-y-auto px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full bg-[#F1F5F9]">
              {form.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={form.avatar} alt="" className="h-full w-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
              ) : null}
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-[12px] font-medium text-muted">Avatar URL (optional)</label>
              <input
                value={form.avatar}
                onChange={(e) => setForm((f) => ({ ...f, avatar: e.target.value }))}
                placeholder="https://..."
                className="w-full rounded border border-border px-2.5 py-1.5 text-[13px]"
              />
            </div>
          </div>

          <Field label="Name" error={errors.name}>
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded border border-border px-2.5 py-1.5 text-[13px]"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Designation" error={errors.designation}>
              <input
                value={form.designation}
                onChange={(e) => setForm((f) => ({ ...f, designation: e.target.value }))}
                className="w-full rounded border border-border px-2.5 py-1.5 text-[13px]"
              />
            </Field>
            <Field label="Company (optional)">
              <input
                value={form.company}
                onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                className="w-full rounded border border-border px-2.5 py-1.5 text-[13px]"
              />
            </Field>
          </div>

          <Field label="Location" error={errors.location}>
            <input
              value={form.location}
              onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              className="w-full rounded border border-border px-2.5 py-1.5 text-[13px]"
            />
          </Field>

          <Field label="Rating" error={errors.rating}>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, rating: i + 1 }))}
                >
                  <Star
                    size={20}
                    className={i < form.rating ? 'fill-primary-500 text-primary-500' : 'text-border'}
                  />
                </button>
              ))}
            </div>
          </Field>

          <Field label="Review" error={errors.review}>
            <textarea
              value={form.review}
              onChange={(e) => setForm((f) => ({ ...f, review: e.target.value.slice(0, REVIEW_MAX) }))}
              rows={4}
              className="w-full rounded border border-border px-2.5 py-1.5 text-[13px]"
            />
            <div className="mt-1 text-right text-[11px] text-muted">
              {form.review.length}/{REVIEW_MAX}
            </div>
          </Field>
        </div>

        <div className="flex justify-end gap-2 border-t border-border px-5 py-3.5">
          <button onClick={onClose} className="rounded border border-border px-3 py-1.5 text-[13px]">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex items-center gap-1.5 rounded bg-primary-500 px-3 py-1.5 text-[13px] font-medium text-white disabled:opacity-60"
          >
            {submitting && <Loader2 size={13} className="animate-spin" />}
            {initial ? 'Save Changes' : 'Create Testimonial'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-[12px] font-medium text-muted">{label}</label>
      {children}
      {error && <p className="mt-1 text-[11px] text-danger-500">{error}</p>}
    </div>
  );
}