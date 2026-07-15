// ─────────────────────────────────────────────────────────────────────────────
// components/ui/ConfirmModal.tsx
// Reusable confirmation dialog — Promise-based API via React Context.
//
// Setup — wrap once (e.g. in layout):
//   <ConfirmModalProvider>{children}</ConfirmModalProvider>
//
// Usage anywhere inside:
//   const confirm = useConfirm();
//
//   const ok = await confirm({
//     variant: 'danger',
//     title: 'Delete this item?',
//     description: 'This action cannot be undone.',
//     confirmLabel: 'Delete',
//   });
//   if (ok) { /* user confirmed */ }
// ─────────────────────────────────────────────────────────────────────────────
'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, AlertTriangle, Info, X } from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

export type ConfirmVariant = 'danger' | 'warning' | 'info';

export interface ConfirmOptions {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Visual style. Default: 'danger' */
  variant?: ConfirmVariant;
}

interface ConfirmState extends ConfirmOptions {
  resolve: (ok: boolean) => void;
}

// ── Variant styles ─────────────────────────────────────────────────────────────

const VARIANT: Record<
  ConfirmVariant,
  { iconBg: string; icon: ReactNode; btn: string }
> = {
  danger: {
    iconBg: 'bg-rose-100 text-rose-600',
    icon: <Trash2 size={18} />,
    btn: 'bg-rose-500 hover:bg-rose-600 text-white',
  },
  warning: {
    iconBg: 'bg-amber-100 text-amber-600',
    icon: <AlertTriangle size={18} />,
    btn: 'bg-amber-500 hover:bg-amber-600 text-white',
  },
  info: {
    iconBg: 'bg-primary-100 text-primary-600',
    icon: <Info size={18} />,
    btn: 'bg-primary-500 hover:bg-primary-600 text-white',
  },
};

// ── Context ──────────────────────────────────────────────────────────────────

type ConfirmFn = (opts: ConfirmOptions) => Promise<boolean>;
const ConfirmContext = createContext<ConfirmFn | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────────

export function ConfirmModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ConfirmState | null>(null);

  const confirm = useCallback((opts: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => setState({ ...opts, resolve }));
  }, []);

  const handle = useCallback(
    (ok: boolean) => {
      state?.resolve(ok);
      setState(null);
    },
    [state],
  );

  const v = VARIANT[state?.variant ?? 'danger'];

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}

      <AnimatePresence>
        {state && (
          <motion.div
            key="confirm-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]"
            onClick={() => handle(false)}
          >
            <motion.div
              key="confirm-panel"
              initial={{ opacity: 0, scale: 0.93, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 14 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="confirm-title"
              className="w-full max-w-[420px] bg-white rounded-card border border-border shadow-card-hover overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Body */}
              <div className="flex items-start gap-4 p-6 pb-4">
                <div
                  className={`w-10 h-10 rounded-card-sm flex items-center justify-center shrink-0 ${v.iconBg}`}
                >
                  {v.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h2
                    id="confirm-title"
                    className="font-display font-bold text-base text-foreground"
                  >
                    {state.title}
                  </h2>
                  {state.description && (
                    <p className="font-body text-sm text-muted mt-1 leading-relaxed">
                      {state.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handle(false)}
                  aria-label="Close"
                  className="shrink-0 w-7 h-7 rounded-full text-muted hover:bg-background hover:text-foreground flex items-center justify-center transition-colors -mt-0.5 -mr-1"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-background/40">
                <button
                  onClick={() => handle(false)}
                  className="font-body text-sm font-medium px-4 py-2 rounded-pill border border-border text-muted bg-white hover:bg-background transition-all duration-200"
                >
                  {state.cancelLabel ?? 'Cancel'}
                </button>
                <button
                  onClick={() => handle(true)}
                  className={`font-body text-sm font-medium px-5 py-2 rounded-pill shadow-sm transition-all duration-200 hover:-translate-y-0.5 ${v.btn}`}
                >
                  {state.confirmLabel ?? 'Confirm'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ConfirmContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useConfirm(): ConfirmFn {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error('useConfirm must be used within <ConfirmModalProvider>');
  return ctx;
}
