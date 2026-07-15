// ─────────────────────────────────────────────────────────────────────────────
// components/ui/Toast.tsx
// Reusable toast notification system.
//
// Architecture: React Context + auto-dismiss + animated stack.
// Up to 5 toasts shown simultaneously; oldest is dropped when limit exceeded.
//
// Setup — wrap your app root (or layout) once:
//   <ToastProvider>{children}</ToastProvider>
//
// Usage anywhere inside:
//   const { success, error, warning, info, toast, dismiss } = useToast();
//   success('Saved!', 'Your changes have been applied.');
//   error('Failed', 'Something went wrong. Please try again.');
//   toast({ type: 'info', title: 'Hey', duration: 6000 });
// ─────────────────────────────────────────────────────────────────────────────
'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';

// ── Types ────────────────────────────────────────────────────────────────────

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  /** Auto-dismiss duration in ms. Default: 4000 */
  duration?: number;
}

export interface ToastContextValue {
  /** Low-level push — full control */
  toast: (opts: Omit<ToastItem, 'id'>) => string;
  success: (title: string, message?: string, duration?: number) => void;
  error:   (title: string, message?: string, duration?: number) => void;
  warning: (title: string, message?: string, duration?: number) => void;
  info:    (title: string, message?: string, duration?: number) => void;
  /** Manually remove a toast by id */
  dismiss: (id: string) => void;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const MAX_VISIBLE = 5;
const DEFAULT_DURATION = 4000;

const ICONS: Record<ToastType, ReactNode> = {
  success: <CheckCircle2 size={16} />,
  error:   <XCircle size={16} />,
  warning: <AlertTriangle size={16} />,
  info:    <Info size={16} />,
};

const STYLES: Record<ToastType, { icon: string; bar: string }> = {
  success: { icon: 'text-emerald-500', bar: 'bg-emerald-500' },
  error:   { icon: 'text-rose-500',    bar: 'bg-rose-500' },
  warning: { icon: 'text-amber-500',   bar: 'bg-amber-500' },
  info:    { icon: 'text-primary-500', bar: 'bg-primary-500' },
};

// ── Single toast card ─────────────────────────────────────────────────────────

function ToastCard({
  item,
  onDismiss,
}: {
  item: ToastItem;
  onDismiss: (id: string) => void;
}) {
  const duration = item.duration ?? DEFAULT_DURATION;
  const style = STYLES[item.type];

  // Auto-dismiss timer
  useEffect(() => {
    const t = setTimeout(() => onDismiss(item.id), duration);
    return () => clearTimeout(t);
  }, [item.id, duration, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 48, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 48, scale: 0.95 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      role="alert"
      aria-live="polite"
      className="relative w-full max-w-[360px] bg-white rounded-card border border-border shadow-card-hover overflow-hidden"
    >
      {/* Shrinking progress bar */}
      <motion.div
        className={`absolute top-0 left-0 h-[3px] ${style.bar}`}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        style={{ transformOrigin: 'left' }}
        transition={{ duration: duration / 1000, ease: 'linear' }}
      />

      <div className="flex items-start gap-3 px-4 pt-5 pb-4 pr-9">
        <span className={`mt-0.5 shrink-0 ${style.icon}`}>
          {ICONS[item.type]}
        </span>
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className="font-body text-sm font-semibold text-foreground leading-snug">
            {item.title}
          </p>
          {item.message && (
            <p className="font-body text-xs text-muted leading-relaxed">
              {item.message}
            </p>
          )}
        </div>
      </div>

      <button
        onClick={() => onDismiss(item.id)}
        aria-label="Dismiss notification"
        className="absolute top-3 right-3 w-5 h-5 rounded-full text-muted hover:text-foreground hover:bg-background flex items-center justify-center transition-colors"
      >
        <X size={11} />
      </button>
    </motion.div>
  );
}

// ── Context + Provider ────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback((opts: Omit<ToastItem, 'id'>): string => {
    const id = Math.random().toString(36).slice(2, 10);
    setItems((prev) => [...prev.slice(-(MAX_VISIBLE - 1)), { ...opts, id }]);
    return id;
  }, []);

  const ctx: ToastContextValue = {
    toast:   push,
    success: (title, message, duration) => push({ type: 'success', title, message, duration }),
    error:   (title, message, duration) => push({ type: 'error',   title, message, duration }),
    warning: (title, message, duration) => push({ type: 'warning', title, message, duration }),
    info:    (title, message, duration) => push({ type: 'info',    title, message, duration }),
    dismiss,
  };

  return (
    <ToastContext.Provider value={ctx}>
      {children}

      {/* Fixed bottom-right stack */}
      <div
        aria-label="Notifications"
        className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 items-end pointer-events-none"
      >
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <div key={item.id} className="pointer-events-auto w-full">
              <ToastCard item={item} onDismiss={dismiss} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
}
