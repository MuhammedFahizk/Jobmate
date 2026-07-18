// ─────────────────────────────────────────────────────────────────────────────
// app/dashboard/security/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
'use client';

import { useState } from 'react';
import { Lock, Eye, EyeOff, Check, ShieldCheck } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { useConfirm } from '@/components/ui/ConfirmModal';
import { userService } from '@/lib/services/user.service';
import type { ApiError } from '@/lib/api/types';
import { useRouter } from 'next/navigation';

// ── Styles ─────────────────────────────────────────────────────────────────────
const INPUT =
  'w-full pl-9 pr-10 py-2.5 rounded-card-sm border border-border bg-white text-foreground font-body text-sm ' +
  'focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all duration-200';
const ICN = 'absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none';
const LBL = 'font-body text-[11px] font-semibold text-muted uppercase tracking-wider';

type VisKey = 'current' | 'next' | 'confirm';

// ── Page ───────────────────────────────────────────────────────────────────────
export default function SecurityPage() {
  const { success, error } = useToast();
  const confirm = useConfirm();
  const router = useRouter();

  const [form, setForm] = useState<Record<VisKey, string>>({
    current: '', next: '', confirm: '',
  });
  const [vis, setVis] = useState<Record<VisKey, boolean>>({
    current: false, next: false, confirm: false,
  });
  const [saving, setSaving] = useState(false);

  const toggleVis = (k: VisKey) => setVis((v) => ({ ...v, [k]: !v[k] }));
  const setField = (k: VisKey) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  // ── Validation + submit ───────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) {
      error('Current password required', 'Please enter your existing password.');
      return;
    }
    if (form.next.length < 8) {
      error('Password too short', 'New password must be at least 8 characters.');
      return;
    }
    if (form.next !== form.confirm) {
      error('Passwords do not match', 'Please ensure both new password fields match.');
      return;
    }

    const ok = await confirm({
      variant: 'info',
      title: 'Update your password?',
      description:
        'Make sure you remember your new password after confirming this change.',
      confirmLabel: 'Update Password',
      cancelLabel: 'Go Back',
    });
    if (!ok) return;

    setSaving(true);
    try {
      await userService.updatePassword({
        passwordCurrent: form.current,
        password: form.next,
      });
      setForm({ current: '', next: '', confirm: '' });
      success('Password updated', 'Your password has been changed successfully.');
    } catch (err) {
      const apiError = err as ApiError;
      error('Update failed', apiError.message || 'Something went wrong.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    const ok = await confirm({
      variant: 'danger',
      title: 'Delete Account',
      description: 'Are you sure you want to permanently delete your account? This action cannot be undone and all your data will be lost.',
      confirmLabel: 'Delete My Account',
      cancelLabel: 'Cancel',
    });
    if (!ok) return;

    try {
      await userService.deleteAccount();
      success('Account deleted', 'Your account has been permanently deleted.');
      router.push('/login');
    } catch (err) {
      const apiError = err as ApiError;
      error('Deletion failed', apiError.message || 'Could not delete account.');
    }
  };

  // ── Reusable password field ───────────────────────────────────────────────
  const PasswordField = ({
    id, label, placeholder,
  }: { id: VisKey; label: string; placeholder: string }) => (
    <div className="flex flex-col gap-1.5">
      <label className={LBL}>{label}</label>
      <div className="relative">
        <Lock size={15} className={ICN} />
        <input
          id={id}
          type={vis[id] ? 'text' : 'password'}
          placeholder={placeholder}
          value={form[id]}
          onChange={setField(id)}
          required
          autoComplete={id === 'current' ? 'current-password' : 'new-password'}
          className={INPUT}
        />
        <button
          type="button"
          onClick={() => toggleVis(id)}
          tabIndex={-1}
          aria-label={vis[id] ? 'Hide password' : 'Show password'}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
        >
          {vis[id] ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
    </div>
  );

  // ── Render ─────────────────────────────────────────────────────────────────
  return (

    <><form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-md">

      {/* Info banner */}
      <div className="flex items-start gap-2.5 p-3.5 rounded-card-sm bg-background border border-border">
        <ShieldCheck size={15} className="text-primary-500 mt-0.5 shrink-0" />
        <p className="font-body text-xs text-muted leading-relaxed">
          Choose a strong password you haven&apos;t used elsewhere. Aim for at least
          8 characters with a mix of letters, numbers and symbols.
        </p>
      </div>

      <PasswordField
        id="current"
        label="Current Password"
        placeholder="Enter your current password" />
      <PasswordField
        id="next"
        label="New Password"
        placeholder="At least 8 characters" />
      <PasswordField
        id="confirm"
        label="Confirm New Password"
        placeholder="Repeat your new password" />

      <div className="flex justify-end pt-2 border-t border-border">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 font-body text-sm font-medium bg-primary-500 hover:bg-primary-600 disabled:bg-primary-400 text-white px-6 py-2.5 rounded-pill shadow-sm transition-all duration-200 hover:-translate-y-0.5"
        >
          {saving ? (
            <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
          ) : (
            <><Check size={14} /><span>Update Password</span></>
          )}
        </button>
      </div>
    </form><div className="mt-8 border-t border-border pt-8">
        <h3 className="font-display text-lg font-bold text-red-600 mb-2">Danger Zone</h3>
        <p className="font-body text-sm text-muted mb-4">
          Permanently delete your JobMate account and all associated data. This action cannot be undone.
        </p>
        <button
          type="button"
          onClick={handleDeleteAccount}
          className="font-body text-sm font-medium bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-2 rounded-card-sm transition-colors"
        >
          Delete Account
        </button>
      </div></>
  );
}
