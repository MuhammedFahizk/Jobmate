"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, BriefcaseBusiness } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginPayload } from "@/lib/validation/auth.schema";
import { FormField } from "@/components/form/FormField";
import { FormError } from "@/components/form/FormError";

export default function Login() {
  const { login, isSubmitting, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginPayload) => {
    try {
      await login(data);
      // useAuth's login() already redirects to /dashboard on success
    } catch {
      // error is already captured in `error` below
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-brand-bg px-6 py-12">

      {/* Blurred decorative background blobs */}
      <div className="absolute left-[35%] top-[25%] w-[300px] h-[300px] rounded-full bg-brand-accent-light/30 blur-[80px] pointer-events-none -z-10" />

      <motion.div
        className="w-full max-w-[480px] bg-brand-surface p-8 sm:p-10 rounded-card border border-brand-border shadow-card relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Card border accent line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-accent-dark to-brand-accent" />

        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-card-sm bg-brand-accent flex items-center justify-center text-white mb-4">
            <BriefcaseBusiness size={24} strokeWidth={1.5} />
          </div>
          <h1 className="font-display text-2xl font-bold text-brand-text">
            Welcome Back
          </h1>
          <p className="font-body text-sm text-brand-muted mt-1 text-center">
            Sign in to manage your applications and find new opportunities
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
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
              placeholder="you@example.com"
              {...register("email")}
              className="w-full pl-9 pr-4 py-2.5 rounded-card-sm border border-brand-border bg-brand-surface text-brand-text font-body text-sm placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all duration-200"
            />
          </FormField>

          <FormField
            id="password"
            label="Password"
            icon={<Lock size={16} strokeWidth={1.5} />}
            error={errors.password}
            extraHeaderAction={
              <a href="#" className="font-body text-xs text-brand-accent hover:text-brand-accent-dark hover:underline">
                Forgot Password?
              </a>
            }
          >
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              {...register("password")}
              className="w-full pl-9 pr-4 py-2.5 rounded-card-sm border border-brand-border bg-brand-surface text-brand-text font-body text-sm placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all duration-200"
            />
          </FormField>

          <FormError message={error?.message} />

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 font-body font-medium bg-brand-accent hover:bg-brand-accent-dark disabled:bg-brand-accent/70 text-white py-3 rounded-pill shadow-sm transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5"
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

        <div className="mt-8 text-center text-sm font-body text-brand-muted border-t border-brand-border pt-6">
          New to JobMate?{" "}
          <Link href="/register" className="font-semibold text-brand-accent hover:text-brand-accent-dark hover:underline">
            Create an Account
          </Link>
        </div>
      </motion.div>
    </div>
  );
}