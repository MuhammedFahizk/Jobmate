'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, MoveLeft, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginPayload } from '@/lib/validation/auth.schema';
import { FormField } from '@/components/form/FormField';
import { FormError } from '@/components/form/FormError';
import AuthShowcasePanel from '@/components/auth/AuthShowcasePanel';




export default function LoginForm() {
    const searchParams = useSearchParams();
    const rawRedirect = searchParams.get('redirect');
    const redirectTo =
        rawRedirect && rawRedirect.startsWith('/') && !rawRedirect.startsWith('//')
            ? rawRedirect
            : undefined;

    const { login, isSubmitting, error } = useAuth();
    const [remember, setRemember] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginPayload>({
        resolver: zodResolver(loginSchema),
    });
    const onSubmit = async (data: LoginPayload) => {
        await login(data, { redirectTo });
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
                    <motion.div
                        className="w-full max-w-[580px] py-10"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* logo + heading */}
                        <div className="flex flex-col items-center mb-8 text-center">

                            <h1 className="font-display text-[26px] font-bold text-foreground tracking-tight">
                                Welcome Back
                            </h1>
                            <p className="font-body text-sm text-muted mt-2 max-w-[320px] leading-relaxed">
                                Sign in to continue managing your applications and discover new AI career
                                opportunities.
                            </p>
                            {redirectTo && (
                                <p className="font-body text-xs text-primary-500 mt-2">
                                    You&apos;ll be returned to where you left off after signing in.
                                </p>
                            )}
                        </div>





                        {/* email/password form */}
                        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col lg:gap-3 gap-8" >
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

                            <FormField
                                id="password"
                                label="Password"
                                icon={<Lock size={16} strokeWidth={1.5} />}
                                error={errors.password}
                                extraHeaderAction={
                                    <Link
                                        href="/forgot-password"
                                        className="font-body text-xs text-primary-500 hover:text-primary-700 hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                }
                            >
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    {...register('password')}
                                    className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-border bg-white text-foreground font-body text-sm placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all duration-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors focus:outline-none"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
                                </button>
                            </FormField>

                            <label className="flex items-center gap-2.5 -mt-1 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                    className="peer sr-only"
                                />
                                <span
                                    className={`h-4 w-4 rounded-md border flex items-center justify-center transition-colors duration-150 ${remember ? 'bg-primary-500 border-primary-500' : 'bg-white border-border'
                                        }`}
                                >
                                    {remember && (
                                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                            <path
                                                d="M1 4L3.5 6.5L9 1"
                                                stroke="white"
                                                strokeWidth="1.7"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    )}
                                </span>
                                <span className="font-body text-sm text-foreground">Remember me</span>
                            </label>

                            <FormError message={error?.message} />

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full mt-1 font-body font-medium bg-primary-500 hover:bg-primary-700 disabled:bg-primary-500/70 text-white py-3 rounded-xl shadow-sm transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                ) : (
                                    <>
                                        <span>Sign In</span>
                                        <ArrowRight size={16} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center text-sm font-body text-muted border-t border-border pt-6">
                            Don&apos;t have an account?{' '}
                            <Link
                                href="/register"
                                className="font-semibold text-primary-500 hover:text-primary-700 hover:underline"
                            >
                                Create Account
                            </Link>
                        </div>

                        <div className="mt-6 text-center text-xs font-body text-muted">
                            <Link href="/terms" className="hover:text-foreground hover:underline">
                                Terms of Service
                            </Link>
                            <span className="mx-2">and</span>
                            <Link href="/privacy" className="hover:text-foreground hover:underline">
                                Privacy Policy
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT — hero showcase panel */}
                <div className="hidden lg:block h-full">
                    <AuthShowcasePanel />
                </div>
            </div>
        </div>
    );
}

