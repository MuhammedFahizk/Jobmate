'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { KeyRound, ShieldCheck, CheckCircle2, MoveLeft, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, type ResetPasswordPayload } from '@/lib/validation/auth.schema';
import { FormField } from '@/components/form/FormField';
import { FormError } from '@/components/form/FormError';
import AuthShowcasePanel from '@/components/auth/AuthShowcasePanel';
import { LoadingButton } from '@/components/auth/LoadingButton';
import { authService } from '@/lib/services/auth.service';
import { getApiErrorMessage } from '@/utils/apiError';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Auto-redirect after success
  useEffect(() => {
    if (isSuccess) {
      setCountdown(5);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(t);
    }
    if (countdown === 0 && isSuccess) {
      router.push('/dashboard');
    }
  }, [countdown, isSuccess, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordPayload>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token },
    mode: 'onChange',
  });

  const onSubmit = async (data: ResetPasswordPayload) => {
    setIsSubmitting(true);
    setApiError(null);

    try {
      await authService.resetPassword({ token: data.token, password: data.password });
      setIsSuccess(true);
    } catch (err: unknown) {
      setApiError(getApiErrorMessage(err, 'Something went wrong. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  // No token in URL — invalid link state
  if (!token) {
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-[420px] text-center py-16">
          <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 mx-auto mb-6">
            <AlertTriangle size={32} strokeWidth={1.5} />
          </div>
          <h1 className="font-display text-[26px] font-bold text-foreground tracking-tight mb-3">
            Invalid Link
          </h1>
          <p className="font-body text-sm text-muted max-w-[320px] mx-auto leading-relaxed mb-8">
            This reset link is invalid or has already been used. Please request a new one.
          </p>
          <Link
            href="/forgot-password"
            className="inline-flex items-center gap-2 font-body font-medium bg-primary-500 hover:bg-primary-700 text-white py-3 px-8 rounded-xl shadow-sm transition-all duration-200 hover:-translate-y-0.5"
          >
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-4 h-[calc(100vh-24px)] lg:h-[calc(100vh-32px)]">
        {/* LEFT — auth card */}
        <div className="relative flex items-center justify-center px-4 sm:px-8 overflow-y-auto custom-scrollbar">
          <Link href="/login" className="absolute top-6 left-6 sm:top-8 sm:left-8 flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors group z-10">
            <MoveLeft strokeWidth={2} size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Back to login</span>
            <span className="sm:hidden">Login</span>
          </Link>

          <div className="w-full max-w-[420px] py-10 relative min-h-[400px]">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Heading */}
                  <div className="flex flex-col items-center mb-8 text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-500 mb-5">
                      <KeyRound size={24} strokeWidth={1.5} />
                    </div>
                    <h1 className="font-display text-[26px] font-bold text-foreground tracking-tight">
                      Set New Password
                    </h1>
                    <p className="font-body text-sm text-muted mt-2 max-w-[320px] leading-relaxed">
                      Choose a strong password. You will be logged in automatically after resetting.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
                    {/* Hidden token field */}
                    <input type="hidden" {...register('token')} />

                    {/* Password */}
                    <FormField
                      id="password"
                      label="New Password"
                      icon={<ShieldCheck size={16} strokeWidth={1.5} />}
                      error={errors.password}
                    >
                      <div className="relative w-full">
                        <input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          autoComplete="new-password"
                          placeholder="Min 8 characters"
                          {...register('password')}
                          className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-border bg-white text-foreground font-body text-sm placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all duration-200"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                          tabIndex={-1}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
                        </button>
                      </div>
                    </FormField>

                    {/* Confirm Password */}
                    <FormField
                      id="confirmPassword"
                      label="Confirm Password"
                      icon={<ShieldCheck size={16} strokeWidth={1.5} />}
                      error={errors.confirmPassword}
                    >
                      <div className="relative w-full">
                        <input
                          id="confirmPassword"
                          type={showConfirm ? 'text' : 'password'}
                          autoComplete="new-password"
                          placeholder="Repeat your password"
                          {...register('confirmPassword')}
                          className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-border bg-white text-foreground font-body text-sm placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all duration-200"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm((v) => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                          tabIndex={-1}
                          aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                        >
                          {showConfirm ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
                        </button>
                      </div>
                    </FormField>

                    <FormError message={apiError || undefined} />

                    <LoadingButton
                      isSubmitting={isSubmitting}
                      defaultText="Reset Password"
                      loadingText="Resetting..."
                    />
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center pt-4"
                >
                  <div className="w-16 h-16 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-green-500 mb-6">
                    <CheckCircle2 size={32} strokeWidth={1.5} />
                  </div>

                  <h1 className="font-display text-[26px] font-bold text-foreground tracking-tight mb-3">
                    Password Updated!
                  </h1>

                  <p className="font-body text-sm text-muted max-w-[340px] leading-relaxed mb-8">
                    Your password has been reset successfully. You are now logged in and will be redirected to your dashboard in{' '}
                    <span className="font-semibold text-foreground">{countdown}s</span>.
                  </p>

                  <Link
                    href="/dashboard"
                    className="w-full font-body font-medium bg-primary-500 hover:bg-primary-700 text-white py-3 rounded-xl shadow-sm transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5"
                  >
                    Go to Dashboard
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT — hero showcase panel */}
        <div className="hidden lg:block h-full">
          <AuthShowcasePanel />
        </div>
      </div>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}
