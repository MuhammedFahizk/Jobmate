'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginSchema, type LoginPayload } from '@/lib/validation/auth.schema';
import { authService } from '@/lib/services/auth.service';
import { useToast } from '@/components/ui/Toast';

export default function AdminLoginPage() {
  const router = useRouter();
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginPayload) => {
    setFormError(null);
    setSubmitting(true);
    try {
      await authService.adminLogin(values);
      toast.success('Welcome back.');
      // Was /admin-dashboard — fixed to match the actual route under the
      // (admin) group: app/mc-ops/(admin)/admin-dashboard/page.tsx.
      router.replace('/mc-ops/admin-dashboard');
    } catch (err) {
      const message =
        (err as { message?: string })?.message ?? 'Could not sign in. Check your credentials.';
      setFormError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-[360px]">
        <div className="mb-6 text-center">
          <p className="text-[13px] font-semibold tracking-wide text-muted uppercase">JobMate</p>
          <h1 className="text-lg font-semibold text-foreground mt-1">Admin sign in</h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border border-border rounded-md bg-white p-5 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-[12px] font-medium text-muted">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              {...register('email')}
              className="border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary-300"
              placeholder="admin@jobmate.dev"
            />
            {errors.email && <p className="text-[12px] text-danger-500">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-[12px] font-medium text-muted">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register('password')}
              className="border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary-300"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-[12px] text-danger-500">{errors.password.message}</p>}
          </div>

          {formError && (
            <p className="text-[12px] text-danger-500 bg-[#FCEAEA] border border-[#F3CBCB] rounded px-3 py-2">
              {formError}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-1 h-9 rounded-md bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white text-sm font-medium transition-colors"
          >
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}