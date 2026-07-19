// ─────────────────────────────────────────────────────────────────────────────
// components/admin/AdminModal.tsx
// Reusable modal shell for admin panel forms.
//
// - Standard header (title + optional subtitle description + X), scrollable
//   body, footer slot.
// - Any close attempt (X, backdrop click, Esc) is dirty-aware: if `isDirty`
//   is true, it routes through useConfirm() for a "Discard changes?" prompt
//   before actually closing. If not dirty, it closes immediately.
// - `footer` is a render-prop so footer buttons (e.g. Cancel) call the SAME
//   dirty-aware close instead of a raw onClose.
// - Body scroll is locked while open, so the page behind can't scroll.
// - `closeOnBackdrop` / `closeOnEsc` let a caller disable those individually
//   for cases like a multi-step wizard that shouldn't close on a stray click.
//
// Usage:
//   <AdminModal
//     open={modalOpen}
//     onClose={() => setModalOpen(false)}
//     title="New job listing"
//     description="Fill in the details below to publish a new listing."
//     isDirty={isDirty}
//     footer={(requestClose) => (
//       <AdminModalFooter
//         onCancel={requestClose}
//         onSubmit={submit}
//         submitting={saving}
//         submitLabel="Create job"
//       />
//     )}
//   >
//     ...form fields...
//   </AdminModal>
// ─────────────────────────────────────────────────────────────────────────────
'use client';

import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { useConfirm } from '@/components/ui/ConfirmModal';

export type AdminModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

const SIZE: Record<AdminModalSize, string> = {
    xs: 'max-w-sm',
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-3xl',
    xl: 'max-w-5xl',
    '2xl': 'max-w-6xl',
    full: 'max-w-[95vw]',
};

export interface AdminModalProps {
    open: boolean;
    onClose: () => void;
    title: ReactNode;
    /** Optional subtitle under the title, e.g. "Fill in the details below." */
    description?: ReactNode;
    children: ReactNode;
    footer?: (requestClose: () => void) => ReactNode;
    size?: AdminModalSize;
    isDirty?: boolean;
    closeOnBackdrop?: boolean;
    closeOnEsc?: boolean;
    discardTitle?: string;
    discardDescription?: ReactNode;
    discardConfirmLabel?: string;
    discardCancelLabel?: string;
}

export function AdminModal({
    open,
    onClose,
    title,
    description,
    children,
    footer,
    size = 'md',
    isDirty = false,
    closeOnBackdrop = true,
    closeOnEsc = true,
    discardTitle = 'Discard changes?',
    discardDescription = (
        <>
            You have unsaved changes.
            <br />
            If you leave now, your edits will be lost.
        </>
    ),
    discardConfirmLabel = 'Discard Changes',
    discardCancelLabel = 'Continue Editing',
}: AdminModalProps) {
    const confirm = useConfirm();

    const requestClose = async () => {
        if (isDirty) {
            const ok = await confirm({
                variant: 'discard',
                title: discardTitle,
                description: discardDescription,
                confirmLabel: discardConfirmLabel,
                cancelLabel: discardCancelLabel,
            });
            if (!ok) return;
        }
        onClose();
    };

    // Esc to close (dirty-aware)
    useEffect(() => {
        if (!open || !closeOnEsc) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') requestClose();
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
        // requestClose intentionally omitted from deps: it's re-created every
        // render (closes over isDirty/confirm), and including it would tear
        // down/re-attach the listener every render. open + closeOnEsc are the
        // only things that should re-run this effect.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, closeOnEsc]);

    // Lock body scroll while the modal is open
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
            onClick={closeOnBackdrop ? requestClose : undefined}
        >
            <div
                className={`w-full ${SIZE[size]} bg-white rounded-md border border-border max-h-[90vh] flex flex-col overflow-hidden`}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="admin-modal-title"
            >
                <div className="flex items-start justify-between px-4 py-3 border-b border-border shrink-0">
                    <div className="min-w-0">
                        <h2 id="admin-modal-title" className="text-[14px] font-semibold text-foreground">
                            {title}
                        </h2>
                        {description && <p className="text-[12px] text-muted mt-0.5">{description}</p>}
                    </div>
                    <button
                        onClick={requestClose}
                        className="text-muted hover:text-foreground shrink-0 ml-3"
                        aria-label="Close"
                    >
                        <X size={16} />
                    </button>
                </div>

                <div className="p-4 flex flex-col gap-3 overflow-y-auto">{children}</div>

                {footer && (
                    <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-border shrink-0">
                        {footer(requestClose)}
                    </div>
                )}
            </div>
        </div>
    );
}

// ── Standard footer button set ──────────────────────────────────────────────

export function AdminModalFooter({
    onCancel,
    onSubmit,
    submitLabel = 'Save',
    cancelLabel = 'Cancel',
    submitting = false,
    submitDisabled = false,
    danger = false,
}: {
    onCancel: () => void;
    onSubmit: () => void;
    submitLabel?: string;
    cancelLabel?: string;
    submitting?: boolean;
    submitDisabled?: boolean;
    danger?: boolean;
}) {
    return (
        <>
            <button
                onClick={onCancel}
                disabled={submitting}
                className="px-3 py-1.5 rounded-md border border-border text-sm text-foreground hover:bg-[#F0F0EE] disabled:opacity-60"
            >
                {cancelLabel}
            </button>
            <button
                onClick={onSubmit}
                disabled={submitting || submitDisabled}
                className={`px-3 py-1.5 rounded-md disabled:opacity-60 text-white text-sm font-medium ${danger ? 'bg-rose-500 hover:bg-rose-600' : 'bg-primary-600 hover:bg-primary-700'
                    }`}
            >
                {submitting ? 'Saving…' : submitLabel}
            </button>
        </>
    );
}

// ── Field wrapper (shared label styling, used by every admin form) ─────────

export function AdminModalField({
    label,
    required,
    children,
}: {
    label: string;
    required?: boolean;
    children: ReactNode;
}) {
    return (
        <label className="flex flex-col gap-1">
            <span className="text-[12px] font-medium text-muted">
                {label}
                {required && <span className="text-rose-500 ml-0.5">*</span>}
            </span>
            {children}
        </label>
    );
}

export const adminInputClass =
    'border border-border rounded-md px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary-300';