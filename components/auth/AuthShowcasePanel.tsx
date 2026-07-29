'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    TrendingUp,
    FileCheck,
    BellRing,
    Building2,
    BarChart3,
    Bot,
} from 'lucide-react';

const testimonials = [
    {
        quote:
            'The AI matching engine reduced our hiring time by 60%. We found qualified engineers in days instead of weeks.',
        name: 'Priya Nair',
        role: 'Head of Talent',
        company: 'Northgate Systems',
    },
    {
        quote:
            'Our recruiters spend less time screening and more time talking to great candidates. The pipeline view alone paid for itself.',
        name: 'Daniel Osei',
        role: 'VP People',
        company: 'Fieldstone Labs',
    },
    {
        quote:
            'Setup took an afternoon. Two weeks later we had a shortlist of candidates better than anything our old ATS produced.',
        name: 'Mira Solano',
        role: 'CEO',
        company: 'Verdant Robotics',
    },
];

/**
 * Small glass "floating card" used to build the illustration.
 * Kept generic/data-agnostic so it reads as UI chrome, not a screenshot.
 */
function GlassCard({
    className = '',
    children,
    delay = 0,
    blurAmount = 'backdrop-blur-md',
}: {
    className?: string;
    children: React.ReactNode;
    delay?: number;
    blurAmount?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute rounded-2xl border border-white/15 bg-white/10 ${blurAmount} shadow-[0_8px_30px_rgba(0,0,0,0.12)] ${className}`}
        >
            {children}
        </motion.div>
    );
}

function FloatWrap({
    children,
    duration = 6,
    delay = 0,
}: {
    children: React.ReactNode;
    duration?: number;
    delay?: number;
}) {
    return (
        <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
        >
            {children}
        </motion.div>
    );
}

export default function AuthShowcasePanel() {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 6000);
        return () => clearInterval(id);
    }, []);

    const t = testimonials[active];

    return (
        <div
            className="relative hidden lg:flex h-full w-full flex-col justify-between overflow-hidden rounded-[24px] p-10 xl:p-12"
            style={{ background: 'var(--gradient-primary)' }}
        >
            {/* subtle geometric overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
                            <path d="M 56 0 L 0 0 0 56" fill="none" stroke="white" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>
            <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[var(--primary-300)]/20 blur-3xl" />
            <div className="pointer-events-none absolute bottom-10 -left-16 h-64 w-64 rounded-full bg-[var(--secondary-500)]/20 blur-3xl" />

            {/* top brand mark */}
            <div className="relative z-10 flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md border border-white/20">
                    <img src="/jobmate-icon.svg" alt="JobMate" className="w-5 h-5 text-primary-500" />                </div>
                <span className="font-display text-white/95 text-[15px] font-semibold tracking-tight">
                    JobMate
                </span>
            </div>

            {/* illustration stage */}
            <div className="relative z-10 mx-auto my-10 hidden h-[360px] w-full max-w-[440px] flex-1 xl:block">
                {/* AI assistant panel — top left */}
                <FloatWrap duration={7}>
                    <GlassCard className="left-2 top-2 w-[190px] p-4" delay={0.1}>
                        <div className="flex items-center gap-2 mb-2.5">
                            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/20">
                                <Bot size={13} className="text-white" strokeWidth={1.75} />
                            </div>
                            <div className="h-2 w-16 rounded-full bg-white/30" />
                        </div>
                        <div className="space-y-1.5">
                            <div className="h-1.5 w-full rounded-full bg-white/20" />
                            <div className="h-1.5 w-3/4 rounded-full bg-white/20" />
                            <div className="h-1.5 w-5/6 rounded-full bg-white/20" />
                        </div>
                    </GlassCard>
                </FloatWrap>

                {/* Dashboard nav card — center, primary */}
                <FloatWrap duration={8} delay={0.4}>
                    <GlassCard
                        className="left-1/2 top-16 w-[240px] -translate-x-1/2 bg-white/[0.14] p-4"
                        delay={0.25}
                        blurAmount="backdrop-blur-lg"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-1.5">
                                <div className="h-6 w-6 rounded-md bg-white/25" />
                                <div className="h-2 w-14 rounded-full bg-white/30" />
                            </div>
                            <div className="h-2 w-2 rounded-full bg-[var(--accent-400)]" />
                        </div>
                        <div className="rounded-lg bg-white/15 px-3 py-2 mb-2">
                            <div className="h-1.5 w-20 rounded-full bg-white/40 mb-1.5" />
                            <div className="h-1.5 w-12 rounded-full bg-white/25" />
                        </div>
                        <div className="grid grid-cols-3 gap-1.5">
                            <div className="h-10 rounded-md bg-white/10" />
                            <div className="h-10 rounded-md bg-white/15" />
                            <div className="h-10 rounded-md bg-white/10" />
                        </div>
                    </GlassCard>
                </FloatWrap>

                {/* Candidate profile card — right */}
                <FloatWrap duration={6.5} delay={0.2}>
                    <GlassCard className="right-0 top-4 w-[168px] p-3.5" delay={0.4}>
                        <div className="flex items-center gap-2 mb-2">
                            <div
                                className="h-8 w-8 rounded-full"
                                style={{ background: 'var(--gradient-secondary)' }}
                            />
                            <div className="space-y-1">
                                <div className="h-1.5 w-14 rounded-full bg-white/35" />
                                <div className="h-1.5 w-10 rounded-full bg-white/20" />
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 rounded-md bg-white/15 px-2 py-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-[var(--teal)]" />
                            <div className="h-1.5 w-16 rounded-full bg-white/30" />
                        </div>
                    </GlassCard>
                </FloatWrap>

                {/* Skill match / analytics widget — lower left */}
                <FloatWrap duration={7.5} delay={0.5}>
                    <GlassCard className="left-0 bottom-16 w-[150px] p-3.5" delay={0.55}>
                        <div className="flex items-center gap-1.5 mb-2.5">
                            <BarChart3 size={13} className="text-white/80" strokeWidth={1.75} />
                            <div className="h-1.5 w-14 rounded-full bg-white/30" />
                        </div>
                        <div className="flex items-end gap-1 h-9">
                            <div className="w-2.5 rounded-t bg-white/20" style={{ height: '45%' }} />
                            <div className="w-2.5 rounded-t bg-white/30" style={{ height: '70%' }} />
                            <div className="w-2.5 rounded-t bg-[var(--accent-400)]/70" style={{ height: '100%' }} />
                            <div className="w-2.5 rounded-t bg-white/25" style={{ height: '60%' }} />
                            <div className="w-2.5 rounded-t bg-white/20" style={{ height: '35%' }} />
                        </div>
                    </GlassCard>
                </FloatWrap>

                {/* Resume analysis / hiring pipeline card — bottom right */}
                <FloatWrap duration={6} delay={0.3}>
                    <GlassCard className="right-4 bottom-0 w-[196px] p-4" delay={0.7}>
                        <div className="flex items-center gap-1.5 mb-2.5">
                            <FileCheck size={13} className="text-white/80" strokeWidth={1.75} />
                            <div className="h-1.5 w-20 rounded-full bg-white/30" />
                        </div>
                        <div className="flex items-center gap-2">
                            {['Applied', 'Screened', 'Interview'].map((_, i) => (
                                <div key={i} className="flex-1">
                                    <div
                                        className={`h-1.5 rounded-full ${i === 2 ? 'bg-[var(--accent-400)]/80' : 'bg-white/25'
                                            }`}
                                    />
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </FloatWrap>

                {/* Notification badge — floating accent */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    className="absolute right-16 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/15 backdrop-blur-md shadow-lg"
                >
                    <BellRing size={15} className="text-white" strokeWidth={1.75} />
                    <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[var(--accent-400)] ring-2 ring-[var(--primary-700)]" />
                </motion.div>

                {/* Company / employer card — small accent, bottom left corner */}
                <FloatWrap duration={9} delay={0.6}>
                    <GlassCard className="left-10 bottom-[-8px] w-[130px] p-3" delay={0.8}>
                        <div className="flex items-center gap-1.5">
                            <Building2 size={12} className="text-white/80" strokeWidth={1.75} />
                            <div className="h-1.5 w-16 rounded-full bg-white/30" />
                        </div>
                    </GlassCard>
                </FloatWrap>
            </div>

            {/* compact illustration fallback for smaller lg screens (below xl) */}
            <div className="relative z-10 mx-auto my-8 flex w-full max-w-[380px] flex-1 items-center justify-center gap-3 xl:hidden">
                <GlassCard className="static w-24 h-24 p-3 flex flex-col justify-center items-center gap-1.5" delay={0.1}>
                    <Users size={18} className="text-white/85" strokeWidth={1.5} />
                    <div className="h-1.5 w-12 rounded-full bg-white/30" />
                </GlassCard>
                <GlassCard className="static w-24 h-28 p-3 flex flex-col justify-center items-center gap-1.5" delay={0.2}>
                    <TrendingUp size={18} className="text-white/85" strokeWidth={1.5} />
                    <div className="h-1.5 w-12 rounded-full bg-white/30" />
                </GlassCard>
                <GlassCard className="static w-24 h-24 p-3 flex flex-col justify-center items-center gap-1.5" delay={0.3}>
                    <Bot size={18} className="text-white/85" strokeWidth={1.5} />
                    <div className="h-1.5 w-12 rounded-full bg-white/30" />
                </GlassCard>
            </div>

            {/* testimonial */}
            <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
            >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/15 backdrop-blur-md font-display text-sm font-semibold text-white">
                    {t.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                </div>
                <p className="font-body text-lg leading-relaxed text-white/95 xl:text-xl max-w-[440px]">
                    &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-4">
                    <p className="font-display text-sm font-semibold text-white">{t.name}</p>
                    <p className="font-body text-xs text-white/70">
                        {t.role} · {t.company}
                    </p>
                </div>
                <div className="mt-6 flex gap-1.5">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            aria-label={`Show testimonial ${i + 1}`}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-white' : 'w-1.5 bg-white/35'
                                }`}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
}