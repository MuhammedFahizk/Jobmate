// ─────────────────────────────────────────────────────────────────────────────
// app/dashboard/profile/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
'use client';

import { useEffect, useState } from 'react';
import {
  User, Mail, Phone, BriefcaseBusiness, Code, Check, Plus,
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { userService } from '@/lib/services/user.service';
import type { ApiError } from '@/lib/api/types';

// ── Shared input styles ───────────────────────────────────────────────────────
const INPUT =
  'w-full pl-9 pr-4 py-2.5 rounded-card-sm border border-border bg-white text-foreground font-body text-sm ' +
  'focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all duration-200 ' +
  'disabled:bg-background disabled:text-muted disabled:cursor-not-allowed';
const ICN = 'absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none';
const LBL = 'font-body text-[11px] font-semibold text-muted uppercase tracking-wider';

interface ProfileUser {
  name: string;
  email: string;
  phone: string;
  experience: string;
  skills: string[];
}

const EMPTY_FORM = {
  name: '',
  phone: '',
  experience: '2+ Years',
  skills: [] as string[],
};

export default function ProfilePage() {
  const [user, setUser] = useState<ProfileUser | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const { success, error } = useToast();

  const [form, setForm] = useState(EMPTY_FORM);
  const [newSkill, setNewSkill] = useState('');
  const [saving, setSaving] = useState(false);

  // ── Handlers ──────────────────────────────────────────────────────────────

  useEffect(() => {
    fetchUser();
  }, []);

  // `form` is local editable state, separate from `user` (the fetched
  // record) — this is what keeps the fields populated once the API
  // response lands, instead of staying stuck on the empty initial state.
  useEffect(() => {
    if (!user) return;
    setForm({
      name: user.name ?? '',
      phone: user.phone ?? '',
      experience: user.experience ?? '2+ Years',
      skills: user.skills ?? [],
    });
  }, [user]);

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const fetched = await userService.getMe();
      setUser(fetched as ProfileUser);
    } catch (err) {
      const apiError = err as ApiError;
      error('Failed to load profile', apiError.message || 'Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const addSkill = () => {
    const t = newSkill.trim();
    if (!t) return;
    if (form.skills.includes(t)) {
      error('Already added', `"${t}" is already in your skills list.`);
      return;
    }
    setForm((f) => ({ ...f, skills: [...f.skills, t] }));
    setNewSkill('');
  };

  const removeSkill = (s: string) =>
    setForm((f) => ({ ...f, skills: f.skills.filter((sk) => sk !== s) }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      error('Name required', 'Please enter your full name.');
      return;
    }
    const phoneTrimmed = form.phone.trim();
    if (phoneTrimmed && !/^[6-9]\d{9}$/.test(phoneTrimmed)) {
      error('Invalid Phone', 'Please provide a valid 10-digit Indian mobile number.');
      return;
    }
    setSaving(true);
    try {
      await userService.updateProfile({
        name: form.name.trim(),
        phone: form.phone.trim(),
        experience: form.experience,
        skills: form.skills,
      });
      success('Profile updated', 'Your changes have been saved successfully.');
    } catch (err) {
      const apiError = err as ApiError;
      error('Update failed', apiError.message || 'Something went wrong.');
    } finally {
      setSaving(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  if (isLoading) {
    return (

      <div className="flex min-h-[30vh] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
      </div>
    );
  }

  return (

    <form onSubmit={handleSave} className="flex flex-col gap-6">

      {/* Personal info grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div className="flex flex-col gap-1.5">
          <label className={LBL}>Full Name</label>
          <div className="relative">
            <User size={15} className={ICN} />
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your full name"
              className={INPUT}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={LBL}>Email Address</label>
          <div className="relative">
            <Mail size={15} className={ICN} />
            <input
              type="email"
              value={user?.email ?? ''}
              disabled
              title="Email cannot be changed"
              className={INPUT}
            />
          </div>
          <p className="font-body text-[10px] text-muted">Contact support to change your email.</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={LBL}>Phone Number</label>
          <div className="relative">
            <Phone size={15} className={ICN} />

            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="9999999999"
              className={INPUT}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={LBL}>Experience Level</label>
          <div className="relative">
            <BriefcaseBusiness size={15} className={ICN} />
            <select
              value={form.experience}
              onChange={(e) => setForm({ ...form, experience: e.target.value })}
              className={INPUT}
            >
              <option value="Internship">Internship / Entry Level</option>
              <option value="1+ Years">1+ Years</option>
              <option value="2+ Years">2+ Years</option>
              <option value="5+ Years">5+ Years</option>
              <option value="10+ Years">10+ Years</option>
            </select>
          </div>
        </div>
      </div>

      <hr className="border-border" />

      {/* Skills */}
      <div className="flex flex-col gap-2">
        <label className={LBL}>Skills &amp; Technologies</label>
        <p className="font-body text-[10px] text-muted -mt-1">
          Press <kbd className="font-mono text-[10px] px-1 py-0.5 rounded bg-background border border-border">Enter</kbd> or click Add.
        </p>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Code size={15} className={ICN} />
            <input
              type="text"
              placeholder="e.g. React, Python, Figma…"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') { e.preventDefault(); addSkill(); }
              }}
              className={INPUT}
            />
          </div>
          <button
            type="button"
            onClick={addSkill}
            className="shrink-0 flex items-center gap-1 px-3 py-2 rounded-card-sm border border-border bg-background hover:bg-primary-50 hover:border-primary-300 font-body text-xs font-semibold text-foreground transition-colors"
          >
            <Plus size={14} /> Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 p-3 bg-background rounded-card-sm border border-border min-h-[48px]">
          {form.skills.length === 0 ? (
            <span className="font-body text-xs text-muted italic self-center">
              No skills added yet.
            </span>
          ) : (
            form.skills.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-primary-100 text-primary-700 font-body text-xs font-semibold border border-primary-200"
              >
                {s}
                <button
                  type="button"
                  onClick={() => removeSkill(s)}
                  aria-label={`Remove ${s}`}
                  className="w-3.5 h-3.5 rounded-full bg-primary-200 hover:bg-primary-300 flex items-center justify-center text-[10px] leading-none transition-colors"
                >
                  ×
                </button>
              </span>
            ))
          )}
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end pt-2 border-t border-border">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 font-body text-sm font-medium bg-primary-500 hover:bg-primary-600 disabled:bg-primary-400 text-white px-6 py-2.5 rounded-pill shadow-sm transition-all duration-200 hover:-translate-y-0.5"
        >
          {saving ? (
            <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
          ) : (
            <><Check size={14} /><span>Save Changes</span></>
          )}
        </button>
      </div>
    </form>
  );
}