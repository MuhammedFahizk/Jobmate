'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, User, Phone, MoveLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterPayload } from '@/lib/validation/auth.schema';
import { FormField } from '@/components/form/FormField';
import { FormError } from '@/components/form/FormError';
import AuthShowcasePanel from '@/components/auth/AuthShowcasePanel';

import { PasswordInput } from '@/components/auth/PasswordInput';
import { ConfirmPasswordInput } from '@/components/auth/ConfirmPasswordInput';
import { TermsCheckbox } from '@/components/auth/TermsCheckbox';
import { LoadingButton } from '@/components/auth/LoadingButton';

export default function RegisterForm() {
    const { register: registerAuth, isSubmitting, error } = useAuth();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<RegisterPayload>({
        resolver: zodResolver(registerSchema),
        mode: 'onChange',
    });

    const passwordValue = useWatch({ control, name: 'password' });
    const confirmPasswordValue = useWatch({ control, name: 'confirmPassword' });

    const onSubmit = async (data: RegisterPayload) => {
        await registerAuth(data);
    };

    return (
        <div className="min-h-screen w-full bg-background flex items-center justify-center px-4">
            <div className="w-full max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-1 h-[calc(100vh-24px)] lg:h-[calc(100vh-32px)]">
                <div className="hidden lg:block h-full">
                    <AuthShowcasePanel />
                </div>
                {/* LEFT — auth card */}
                <div className="relative flex items-center justify-center px-4 sm:px-8 overflow-y-auto custom-scrollbar">
                    <Link href="/" className="absolute top-6 left-6 sm:top-8 sm:left-8 flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors group z-10">
                        <MoveLeft strokeWidth={2} size={16} className='group-hover:-translate-x-1 transition-transform' />
                        <span className="hidden sm:inline">Back to home</span>
                        <span className="sm:hidden">Home</span>
                    </Link>
                    <motion.div
                        className="w-full max-w-[580px] py-1"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* heading */}
                        <div className="flex flex-col items-center mb-3 text-center">
                            <h1 className="font-display text-[26px] font-bold text-foreground tracking-tight">
                                Create Account
                            </h1>
                            <p className="font-body text-sm text-muted  max-w-[320px] leading-relaxed">
                                Join JobMate and explore new career opportunities.
                            </p>
                        </div>

                        {/* <SocialLogin /> */}

                        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6 lg:gap-3.5">
                            <div className=' grid grid-cols-1 lg:grid-cols-2 lg:gap-2  gap-3.5'>
                                <FormField
                                    id="name"
                                    label="Full Name"
                                    icon={<User size={16} strokeWidth={1.5} />}
                                    error={errors.name}
                                >
                                    <input
                                        id="name"
                                        type="text"
                                        autoComplete="name"
                                        placeholder="Michael Darwin"
                                        {...register('name')}
                                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-white text-foreground font-body text-sm placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all duration-200"
                                    />
                                </FormField>
                                <FormField
                                    id="phone"
                                    label="Phone Number"
                                    icon={<Phone size={16} strokeWidth={1.5} />}
                                    error={errors.phone}
                                >
                                    <input
                                        id="phone"
                                        type="tel"
                                        autoComplete="tel"
                                        placeholder="+91 9999999999"
                                        {...register('phone')}
                                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-white text-foreground font-body text-sm placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all duration-200"
                                    />
                                </FormField>
                            </div>
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



                            <div className='   grid lg:grid-cols-2 lg:gap-2  gap-3.5'>
                                <PasswordInput
                                    id="password"
                                    label="Password"
                                    register={register('password')}
                                    error={errors.password}
                                />

                                <ConfirmPasswordInput
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    register={register('confirmPassword')}
                                    error={errors.confirmPassword}
                                    passwordValue={passwordValue}
                                    confirmValue={confirmPasswordValue}
                                />
                            </div>

                            <TermsCheckbox
                                id="terms"
                                register={register('terms')}
                                error={errors.terms}
                            />

                            <FormError message={error?.errors?.[0]?.message || error?.message} />

                            <LoadingButton
                                isSubmitting={isSubmitting}
                                defaultText="Create Account"
                                loadingText="Creating Account..."
                            />
                        </form>

                        <div className="mt-2 text-center text-sm mb-3 font-body text-muted ">
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                className="font-semibold text-primary-500 hover:text-primary-700 hover:underline"
                            >
                                Sign In
                            </Link>
                        </div>
                    </motion.div>
                </div>


            </div>
        </div>
    );
}