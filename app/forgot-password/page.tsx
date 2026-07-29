'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ShieldCheck, MailCheck, MoveLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, type ForgotPasswordPayload } from '@/lib/validation/auth.schema';
import { FormField } from '@/components/form/FormField';
import { FormError } from '@/components/form/FormError';
import AuthShowcasePanel from '@/components/auth/AuthShowcasePanel';
import { LoadingButton } from '@/components/auth/LoadingButton';
import { authService } from '@/lib/services/auth.service';

function ForgotPasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Resend countdown state
  const [countdown, setCountdown] = useState(0);
  const [lastEmail, setLastEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordPayload>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange',
  });

  // Handle countdown effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const onSubmit = async (data: ForgotPasswordPayload) => {
    setIsSubmitting(true);
    setApiError(null);

    try {
      await authService.forgotPassword(data);
      setLastEmail(data.email);
      setIsSuccess(true);
      setCountdown(60);
    } catch (err: unknown) {
      const errorMessage = (err as { errors?: { message?: string }[]; message?: string }).errors?.[0]?.message || (err as { message?: string }).message || "Something went wrong. Please try again.";

      setApiError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }

  };

  const handleResend = async () => {
    if (countdown > 0) return;
    setIsSubmitting(true);
    setApiError(null);
    try {
      await authService.forgotPassword({ email: lastEmail });
      setCountdown(60);
    } catch (err: unknown) {
      const errorMessage = (err as { errors?: { message?: string }[]; message?: string }).errors?.[0]?.message || (err as { message?: string }).message || 'Something went wrong. Please try again.';
      setApiError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-4 h-[calc(100vh-24px)] lg:h-[calc(100vh-32px)]">
        {/* LEFT — auth card */}
        <div className="relative flex items-center justify-center px-4 sm:px-8 overflow-y-auto custom-scrollbar">
          <Link href="/" className="absolute top-6 left-6 sm:top-8 sm:left-8 flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors group z-10">
            <MoveLeft strokeWidth={2} size={16} className='group-hover:-translate-x-1 transition-transform' />
            <span className="hidden sm:inline">Back to home</span>
            <span className="sm:hidden">Home</span>
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
                  {/* heading */}
                  <div className="flex flex-col items-center mb-8 text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-500 mb-5">
                      <ShieldCheck size={24} strokeWidth={1.5} />
                    </div>
                    <h1 className="font-display text-[26px] font-bold text-foreground tracking-tight">
                      Forgot Password?
                    </h1>
                    <p className="font-body text-sm text-muted mt-2 max-w-[320px] leading-relaxed">
                      Enter the email address associated with your account and we&apos;ll send you a password reset link.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
                    <FormField
                      id="email"
                      label="Email Address"
                      icon={<Mail size={16} strokeWidth={1.5} />}
                      error={errors.email}
                    >
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@company.com"
                        {...register('email')}
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-white text-foreground font-body text-sm placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all duration-200"
                      />
                    </FormField>

                    <FormError message={apiError || undefined} />

                    <LoadingButton
                      isSubmitting={isSubmitting}
                      defaultText="Send Reset Link"
                      loadingText="Sending..."
                    />
                  </form>

                  <div className="mt-8 flex flex-col items-center gap-2 text-sm font-body text-muted border-t border-border pt-6">
                    <div>
                      Remember your password?{' '}
                      <Link
                        href="/login"
                        className="font-semibold text-primary-500 hover:text-primary-700 hover:underline"
                      >
                        Sign In
                      </Link>
                    </div>
                    <div>
                      Need an account?{' '}
                      <Link
                        href="/register"
                        className="font-semibold text-primary-500 hover:text-primary-700 hover:underline"
                      >
                        Create Account
                      </Link>
                    </div>
                  </div>
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
                    <MailCheck size={32} strokeWidth={1.5} />
                  </div>

                  <h1 className="font-display text-[26px] font-bold text-foreground tracking-tight mb-3">
                    Check your email
                  </h1>

                  <p className="font-body text-sm text-muted max-w-[340px] leading-relaxed mb-8">
                    If an account exists for <span className="font-medium text-foreground">{lastEmail}</span>, we&apos;ve sent password reset instructions. Please check your inbox and spam folder.
                  </p>

                  <div className="flex flex-col w-full gap-3">
                    <Link
                      href="/login"
                      className="w-full font-body font-medium bg-primary-500 hover:bg-primary-700 text-white py-3 rounded-xl shadow-sm transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5"
                    >
                      Back to Login
                    </Link>

                    <button
                      onClick={handleResend}
                      disabled={countdown > 0 || isSubmitting}
                      className="w-full font-body font-medium bg-white border border-border hover:bg-gray-50 disabled:bg-gray-50 disabled:text-muted disabled:cursor-not-allowed text-foreground py-3 rounded-xl transition-all duration-200 flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 rounded-full border-2 border-primary-500 border-t-transparent animate-spin" />
                      ) : countdown > 0 ? (
                        `Resend available in ${countdown}s`
                      ) : (
                        'Resend Email'
                      )}
                    </button>
                  </div>
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

export default function ForgotPassword() {
  return (
    <Suspense fallback={null}>
      <ForgotPasswordForm />
    </Suspense>
  );
}
