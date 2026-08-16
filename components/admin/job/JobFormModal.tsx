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
  type JobCategory,
  type JobType,
  type ExperienceLevel,
  type JobStatus,
} from '@/lib/types/job.type';

const EMPTY_FORM = {
  title: '',
  company: '',
  category: JOB_CATEGORIES[0],
  type: JOB_TYPES[0].value,
  location: '',
  salary: DEFAULT_SALARY,
  description: '',
  experienceRequired: EXPERIENCE_LEVELS[0].value,
  tags: '',
  requiredSkills: '',
  keyResponsibilities: '',
  isFeatured: false,
  status: JOB_STATUSES[0].value,
};



interface FormState {
  title: string;
  company: string;
  category: JobCategory;
  type: JobType;
  location: string;
  salary: Salary;
  description: string;
  experienceRequired: ExperienceLevel;
  tags: string;
  requiredSkills: string;
  keyResponsibilities: string;
  isFeatured: boolean;
  status: JobStatus;
}
function jobToForm(job: AdminJob): FormState {
  return {
    title: job.title,
    company: job.company,
    category: job.category,
    type: job.type,
    location: job.location,
    salary: { ...DEFAULT_SALARY, ...job.salary },
    description: job.description,
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
  const [errors, setErrors] = useState<Partial<Record<keyof FormState | 'salaryMin' | 'salaryMax', string>>>({});

  useEffect(() => {
    if (open) {
      setForm(job ? jobToForm(job) : EMPTY_FORM);
      setErrors({});
    }
  }, [open, job]);

  const update = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const updateSalary = <K extends keyof Salary>(field: K, value: Salary[K]) => {
    setForm((f) => {
      const updatedSalary = { ...f.salary, [field]: value };
      if (field === 'isNegotiable' && value === true) {
        updatedSalary.min = null;
        updatedSalary.max = null;
      }
      return { ...f, salary: updatedSalary };
    });

    if (field === 'isNegotiable' && value === true) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.salaryMin;
        delete next.salaryMax;
        return next;
      });
    } else {
      const errKey = field === 'min' ? 'salaryMin' : field === 'max' ? 'salaryMax' : null;
      if (errKey && errors[errKey]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[errKey];
          return next;
        });
      }
    }
  };

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof FormState | 'salaryMin' | 'salaryMax', string>> = {};

    if (!form.title.trim()) {
      nextErrors.title = 'Job title is required.';
    } else if (form.title.length > 150) {
      nextErrors.title = 'Title cannot exceed 150 characters.';
    }

    if (!form.company.trim()) {
      nextErrors.company = 'Company name is required.';
    } else if (form.company.length > 100) {
      nextErrors.company = 'Company name cannot exceed 100 characters.';
    }

    if (!form.location.trim()) {
      nextErrors.location = 'Location is required.';
    }

    if (!form.description.trim()) {
      nextErrors.description = 'Job description is required.';
    } else if (form.description.length > 3000) {
      nextErrors.description = 'Description cannot exceed 3000 characters.';
    }

    if (!form.salary.isNegotiable) {
      if (form.salary.min === null || form.salary.min === undefined || isNaN(form.salary.min)) {
        nextErrors.salaryMin = 'Minimum salary is required.';
      } else if (form.salary.min < 0) {
        nextErrors.salaryMin = 'Salary cannot be negative.';
      }

      if (form.salary.max === null || form.salary.max === undefined || isNaN(form.salary.max)) {
        nextErrors.salaryMax = 'Maximum salary is required.';
      } else if (form.salary.max < 0) {
        nextErrors.salaryMax = 'Salary cannot be negative.';
      }

      if (
        form.salary.min !== null &&
        form.salary.max !== null &&
        !isNaN(form.salary.min) &&
        !isNaN(form.salary.max) &&
        form.salary.min > form.salary.max
      ) {
        nextErrors.salaryMin = 'Minimum salary cannot exceed maximum salary.';
      }
    }

    const skills = form.requiredSkills.split(',').map((s) => s.trim()).filter(Boolean);
    if (skills.length > 20) {
      nextErrors.requiredSkills = `Maximum 20 skills allowed (currently ${skills.length}).`;
    }

    const responsibilities = form.keyResponsibilities.split('\n').map((s) => s.trim()).filter(Boolean);
    if (responsibilities.length > 30) {
      nextErrors.keyResponsibilities = `Maximum 30 responsibilities allowed (currently ${responsibilities.length}).`;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const baseline = job ? jobToForm(job) : EMPTY_FORM;
  const isDirty = JSON.stringify(form) !== JSON.stringify(baseline);

  const submit = async () => {
    if (!validate()) {
      toast.error('Please fix the validation errors before submitting.');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...form,
        salary: {
          ...form.salary,
          min: form.salary.isNegotiable || form.salary.min === null ? undefined : form.salary.min,
          max: form.salary.isNegotiable || form.salary.max === null ? undefined : form.salary.max,
        },
        tags: form.tags.split(',').map((s) => s.trim()).filter(Boolean),
        requiredSkills: form.requiredSkills.split(',').map((s) => s.trim()).filter(Boolean),
        keyResponsibilities: form.keyResponsibilities.split('\n').map((s) => s.trim()).filter(Boolean),
      };

      const saved = isEdit
        ? await jobsService.updateJob(job!._id, payload as unknown as AdminJob)
        : await jobsService.createJob(payload as unknown as AdminJob);

      toast.success(isEdit ? 'Job updated successfully.' : 'Job created successfully.');
      onSaved(saved);
      onClose();
    } catch {
      toast.error('Failed to save job listing.');
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
      <AdminModalField label="Title" required error={errors.title}>
        <input
          value={form.title}
          onChange={(e) => update('title', e.target.value)}
          className={`${adminInputClass} ${errors.title ? 'border-rose-500 focus:ring-rose-200' : ''}`}
          placeholder="e.g. Senior Full Stack Developer"
        />
      </AdminModalField>

      <AdminModalField label="Company" required error={errors.company}>
        <input
          value={form.company}
          onChange={(e) => update('company', e.target.value)}
          className={`${adminInputClass} ${errors.company ? 'border-rose-500 focus:ring-rose-200' : ''}`}
          placeholder="e.g. Acme Corporation"
        />
      </AdminModalField>

      <div className="grid grid-cols-2 gap-3">
        <AdminModalField label="Category" required>
          <select
            value={form.category}
            onChange={(e) => update('category', e.target.value as FormState['category'])}
            className={adminInputClass}
          >
            {JOB_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </AdminModalField>
        <AdminModalField label="Type" required>
          <select
            value={form.type}
            onChange={(e) => update('type', e.target.value as FormState['type'])}
            className={adminInputClass}
          >
            {JOB_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </AdminModalField>
      </div>

      <AdminModalField label="Location" required error={errors.location}>
        <input
          value={form.location}
          onChange={(e) => update('location', e.target.value)}
          className={`${adminInputClass} ${errors.location ? 'border-rose-500 focus:ring-rose-200' : ''}`}
          placeholder="e.g. Bangalore, Karnataka (Hybrid)"
        />
      </AdminModalField>

      {/* Salary block */}
      <AdminModalField
        label="Salary Range (per annum)"
        required={!form.salary.isNegotiable}
        error={errors.salaryMin || errors.salaryMax}
      >
        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-3">
            <input
              type="number"
              placeholder="Min Salary"
              value={form.salary.min ?? ''}
              disabled={form.salary.isNegotiable}
              onChange={(e) => updateSalary('min', e.target.value === '' ? null : Number(e.target.value))}
              className={`${adminInputClass} disabled:opacity-50 ${errors.salaryMin ? 'border-rose-500 focus:ring-rose-200' : ''}`}
            />
            <input
              type="number"
              placeholder="Max Salary"
              value={form.salary.max ?? ''}
              disabled={form.salary.isNegotiable}
              onChange={(e) => updateSalary('max', e.target.value === '' ? null : Number(e.target.value))}
              className={`${adminInputClass} disabled:opacity-50 ${errors.salaryMax ? 'border-rose-500 focus:ring-rose-200' : ''}`}
            />
            <select
              value={form.salary.currency}
              onChange={(e) => updateSalary('currency', e.target.value as Salary['currency'])}
              className={adminInputClass}
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <label className="flex items-center gap-2 text-[13px] text-muted cursor-pointer">
            <input
              type="checkbox"
              checked={form.salary.isNegotiable}
              onChange={(e) => updateSalary('isNegotiable', e.target.checked)}
              className="rounded border-border text-primary-600 focus:ring-primary-300"
            />
            Negotiable / Undisclosed
          </label>
        </div>
      </AdminModalField>

      <div className="grid grid-cols-2 gap-3">
        <AdminModalField label="Experience required" required>
          <select
            value={form.experienceRequired}
            onChange={(e) => update('experienceRequired', e.target.value as FormState['experienceRequired'])}
            className={adminInputClass}
          >
            {EXPERIENCE_LEVELS.map((lvl) => (
              <option key={lvl.value} value={lvl.value}>
                {lvl.label}
              </option>
            ))}
          </select>
        </AdminModalField>

        {isEdit && (
          <AdminModalField label="Status" required>
            <select
              value={form.status}
              onChange={(e) => update('status', e.target.value as FormState['status'])}
              className={adminInputClass}
            >
              {JOB_STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </AdminModalField>
        )}
      </div>

      <AdminModalField label="Required skills (comma separated)" error={errors.requiredSkills}>
        <input
          value={form.requiredSkills}
          onChange={(e) => update('requiredSkills', e.target.value)}
          className={`${adminInputClass} ${errors.requiredSkills ? 'border-rose-500 focus:ring-rose-200' : ''}`}
          placeholder="e.g. React, TypeScript, Node.js"
        />
        <span className="text-[11px] text-muted mt-0.5">Maximum 20 skills allowed.</span>
      </AdminModalField>

      <AdminModalField label="Tags (comma separated)">
        <input
          value={form.tags}
          onChange={(e) => update('tags', e.target.value)}
          className={adminInputClass}
          placeholder="e.g. urgent, remote, hybrid"
        />
        <span className="text-[11px] text-muted mt-0.5">Helper tags to improve search discoverability.</span>
      </AdminModalField>

      <AdminModalField label="Key responsibilities (one per line)" error={errors.keyResponsibilities}>
        <textarea
          value={form.keyResponsibilities}
          onChange={(e) => update('keyResponsibilities', e.target.value)}
          rows={3}
          className={`${adminInputClass} ${errors.keyResponsibilities ? 'border-rose-500 focus:ring-rose-200' : ''}`}
          placeholder="e.g. Design and develop clean scalable APIs&#10;Collaborate with cross-functional teams"
        />
        <span className="text-[11px] text-muted mt-0.5">Maximum 30 responsibilities.</span>
      </AdminModalField>

      <AdminModalField label="Description" required error={errors.description}>
        <textarea
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          rows={4}
          className={`${adminInputClass} ${errors.description ? 'border-rose-500 focus:ring-rose-200' : ''}`}
          placeholder="Detailed description of the job role and requirements..."
        />
      </AdminModalField>

      <label className="flex items-center gap-2 text-[13px] text-muted cursor-pointer mt-1">
        <input
          type="checkbox"
          checked={form.isFeatured}
          onChange={(e) => update('isFeatured', e.target.checked)}
          className="rounded border-border text-primary-600 focus:ring-primary-300"
        />
        Feature this listing on the home page
      </label>
    </AdminModal>
  );
}