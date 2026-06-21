"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import {  User, Mail, Phone, Lock, ArrowRight, BriefcaseBusiness } from "lucide-react";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock register delay
    setTimeout(() => {
      router.push("/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-brand-bg px-6 py-12">
      
      {/* Blurred decorative background blobs */}
      <div className="absolute right-[35%] bottom-[25%] w-[300px] h-[300px] rounded-full bg-brand-accent-light/30 blur-[80px] pointer-events-none -z-10" />

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
            Create Account
          </h1>
          <p className="font-body text-sm text-brand-muted mt-1 text-center">
            Register as a candidate to unlock instant WhatsApp applications
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="font-body text-xs font-semibold text-brand-text uppercase tracking-wider">
              Full Name
            </label>
            <div className="relative">
              <User size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
              <input
                id="name"
                type="text"
                required
                placeholder="Michael Darwin"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-card-sm border border-brand-border bg-brand-surface text-brand-text font-body text-sm placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all duration-200"
              />
            </div>
          </div>

          {/* Email field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="font-body text-xs font-semibold text-brand-text uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
              <input
                id="email"
                type="email"
                required
                placeholder="michael@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-card-sm border border-brand-border bg-brand-surface text-brand-text font-body text-sm placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all duration-200"
              />
            </div>
          </div>

          {/* Phone field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="phone" className="font-body text-xs font-semibold text-brand-text uppercase tracking-wider">
              Phone Number
            </label>
            <div className="relative">
              <Phone size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
              <input
                id="phone"
                type="tel"
                required
                placeholder="919999999999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-card-sm border border-brand-border bg-brand-surface text-brand-text font-body text-sm placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all duration-200"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="font-body text-xs font-semibold text-brand-text uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
              <input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-card-sm border border-brand-border bg-brand-surface text-brand-text font-body text-sm placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all duration-200"
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-3 font-body font-medium bg-brand-accent hover:bg-brand-accent-dark disabled:bg-brand-accent/70 text-white py-3 rounded-pill shadow-sm transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5"
          >
            {isLoading ? (
              <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              <>
                <span>Register & Get Started</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm font-body text-brand-muted border-t border-brand-border pt-6">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-brand-accent hover:text-brand-accent-dark hover:underline">
            Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
