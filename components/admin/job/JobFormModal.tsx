'use client';

import { useEffect, useState } from 'react';
import { AdminModal, AdminModalFooter, AdminModalField, adminInputClass } from '@/components/admin/AdminModal';
import { useToast } from '@/components/ui/Toast';
import { jobsService } from '@/lib/services/jobs.service';
import {
  JOB_CATEGORIES,
  JOB_TYPES,
  EXPERIENCE_LEVELS,
  JOB_STATUSES,
  CURRENCIES,
  DEFAULT_SALARY,
  type AdminJob,
  type Salary,
} from '@/lib/types/job.type';

const EMPTY_FORM = {
  title: '',
  company: '',
  category: JOB_CATEGORIES[0],
  type: JOB_TYPES[0].value,
  location: '',
  salary: DEFAULT_SALARY,
  description: '',
  whatsappNumber: '',
  experienceRequired: EXPERIENCE_LEVELS[0].value,
  tags: '',
  requiredSkills: '',
  keyResponsibilities: '',
  isFeatured: false,
  status: JOB_STATUSES[0].value,
};

type FormState = typeof EMPTY_FORM;

function jobToForm(job: AdminJob): FormState {
  return {
    title: job.title,
    company: job.company,
    category: job.category,
    type: job.type,
    location: job.location,
    salary: { ...DEFAULT_SALARY, ...job.salary },
    description: job.description,
    whatsappNumber: job.whatsappNumber,
    experienceRequired: job.experienceRequired,
    tags: job.tags?.join(', ') ?? '',
    requiredSkills: job.requiredSkills?.join(', ') ?? '',
    keyResponsibilities: job.keyResponsibilities?.join('\n') ?? '',
    isFeatured: job.isFeatured,
    status: job.status,
  };
}

interface JobFormModalProps {
  open: boolean;
  job?: AdminJob | null;
  onClose: () => void;
  onSaved: (job: AdminJob) => void;
}

export function JobFormModal({ open, job, onClose, onSaved }: JobFormModalProps) {
  const toast = useToast();
  const isEdit = !!job;
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormState>(job ? jobToForm(job) : EMPTY_FORM);

  useEffect(() => {
    if (open) setForm(job ? jobToForm(job) : EMPTY_FORM);
  }, [open, job]);

  const update = <K extends keyof FormState>(field: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [field]: value }));

  const updateSalary = <K extends keyof Salary>(field: K, value: Salary[K]) =>
    setForm((f) => ({ ...f, salary: { ...f.salary, [field]: value } }));

  const baseline = job ? jobToForm(job) : EMPTY_FORM;
  const isDirty = JSON.stringify(form) !== JSON.stringify(baseline);

  const submit = async () => {
    if (!form.title.trim() || !form.company.trim()) {
      toast.error('Title and company are required.');
      return;
    }
    if (!form.whatsappNumber.trim()) {
      toast.error('WhatsApp number is required.');
      return;
    }
    if (
      !form.salary.isNegotiable &&
      form.salary.min != null &&
      form.salary.max != null &&
      form.salary.min > form.salary.max
    ) {
      toast.error('Minimum salary cannot be greater than maximum.');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map((s) => s.trim()).filter(Boolean),
        requiredSkills: form.requiredSkills.split(',').map((s) => s.trim()).filter(Boolean),
        keyResponsibilities: form.keyResponsibilities.split('\n').map((s) => s.trim()).filter(Boolean),
      };

      const saved = isEdit
        ? await jobsService.updateJob(job!._id, payload)
        : await jobsService.createJob(payload);

      toast.success(isEdit ? 'Job updated.' : 'Job created.');
      onSaved(saved);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminModal
      open={open}
      onClose={onClose}
      title={isEdit ? `Edit job — ${job!.title}` : 'New job listing'}
      isDirty={isDirty}
      footer={(requestClose) => (
        <AdminModalFooter
          onCancel={requestClose}
          onSubmit={submit}
          submitting={saving}
          submitLabel={isEdit ? 'Save changes' : 'Create job'}
        />
      )}
    >
      <AdminModalField label="Title">
        <input value={form.title} onChange={(e) => update('title', e.target.value)} className={adminInputClass} />
      </AdminModalField>
      <AdminModalField label="Company">
        <input value={form.company} onChange={(e) => update('company', e.target.value)} className={adminInputClass} />
      </AdminModalField>

      <div className="grid grid-cols-2 gap-3">
        <AdminModalField label="Category">
          <select value={form.category} onChange={(e) => update('category', e.target.value as FormState['category'])} className={adminInputClass}>
            {JOB_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </AdminModalField>
        <AdminModalField label="Type">
          <select value={form.type} onChange={(e) => update('type', e.target.value as FormState['type'])} className={adminInputClass}>
            {JOB_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </AdminModalField>
      </div>

      <AdminModalField label="Location">
        <input value={form.location} onChange={(e) => update('location', e.target.value)} className={adminInputClass} />
      </AdminModalField>

      {/* Salary block */}
      <AdminModalField label="Salary">
        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-3">
            <input
              type="number"
              placeholder="Min"
              value={form.salary.min ?? ''}
              disabled={form.salary.isNegotiable}
              onChange={(e) => updateSalary('min', e.target.value === '' ? null : Number(e.target.value))}
              className={`${adminInputClass} disabled:opacity-50`}
            />
            <input
              type="number"
              placeholder="Max"
              value={form.salary.max ?? ''}
              disabled={form.salary.isNegotiable}
              onChange={(e) => updateSalary('max', e.target.value === '' ? null : Number(e.target.value))}
              className={`${adminInputClass} disabled:opacity-50`}
            />
            <select
              value={form.salary.currency}
              onChange={(e) => updateSalary('currency', e.target.value as Salary['currency'])}
              className={adminInputClass}
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <label className="flex items-center gap-2 text-[13px] text-muted">
            <input
              type="checkbox"
              checked={form.salary.isNegotiable}
              onChange={(e) => updateSalary('isNegotiable', e.target.checked)}
            />
            Negotiable
          </label>
        </div>
      </AdminModalField>

      <div className="grid grid-cols-2 gap-3">
        <AdminModalField label="WhatsApp number">
          <input value={form.whatsappNumber} onChange={(e) => update('whatsappNumber', e.target.value)} className={adminInputClass} placeholder="+91XXXXXXXXXX" />
        </AdminModalField>
        <AdminModalField label="Experience required">
          <select value={form.experienceRequired} onChange={(e) => update('experienceRequired', e.target.value as FormState['experienceRequired'])} className={adminInputClass}>
            {EXPERIENCE_LEVELS.map((lvl) => (
              <option key={lvl.value} value={lvl.value}>{lvl.label}</option>
            ))}
          </select>
        </AdminModalField>
      </div>

      {isEdit && (
        <AdminModalField label="Status">
          <select value={form.status} onChange={(e) => update('status', e.target.value as FormState['status'])} className={adminInputClass}>
            {JOB_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </AdminModalField>
      )}

      <AdminModalField label="Required skills (comma separated)">
        <input value={form.requiredSkills} onChange={(e) => update('requiredSkills', e.target.value)} className={adminInputClass} placeholder="Excel, Tally, Communication" />
      </AdminModalField>

      <AdminModalField label="Tags (comma separated)">
        <input value={form.tags} onChange={(e) => update('tags', e.target.value)} className={adminInputClass} placeholder="urgent, remote-ok" />
      </AdminModalField>

      <AdminModalField label="Key responsibilities (one per line)">
        <textarea
          value={form.keyResponsibilities}
          onChange={(e) => update('keyResponsibilities', e.target.value)}
          rows={3}
          className={adminInputClass}
        />
      </AdminModalField>

      <AdminModalField label="Description">
        <textarea
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          rows={3}
          className={adminInputClass}
        />
      </AdminModalField>

      <label className="flex items-center gap-2 text-[13px] text-muted">
        <input
          type="checkbox"
          checked={form.isFeatured}
          onChange={(e) => update('isFeatured', e.target.checked)}
        />
        Feature this listing
      </label>
    </AdminModal>
  );
}