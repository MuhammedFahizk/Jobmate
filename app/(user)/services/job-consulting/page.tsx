"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Clock,
  UserPlus,
  Search,
  MousePointerClick,
  UserCheck,
  Briefcase,
  TrendingUp,
  FileText,
  Code,
  HeartPulse,
  Building2,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useAuthStore } from "@/lib/store/authStore";

export default function JobConsulting() {
  const { isAuthenticated } = useAuthStore();
  const features = [
    {
      title: "1-Click Online Apply",
      description:
        "No WhatsApp. No phone calls. Submit your application directly through the platform — your profile goes straight to the recruiter instantly.",
      icon: MousePointerClick,
    },
    {
      title: "Verified Employers",
      description:
        "Every company listed on JobMate is verified. Direct hiring connections with top companies in Kozhikode, Kochi, and across Kerala.",
      icon: ShieldCheck,
    },
    {
      title: "48-Hour Recruiter Response",
      description:
        "Our placement team reviews every application and matches your profile with the right vacancy. Most candidates hear back within 48 hours.",
      icon: Clock,
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description:
        "Register and complete your profile — add your skills, experience level, preferred location, and upload your resume. Takes under 5 minutes.",
      icon: UserPlus,
    },
    {
      number: "02",
      title: "Browse Job Openings",
      description:
        "Explore curated vacancies across multiple sectors and Kerala locations. Filter by category, salary, and job type to find the perfect match.",
      icon: Search,
    },
    {
      number: "03",
      title: "Apply in 1 Click",
      description:
        "Tap the Apply button. Your profile and resume are sent directly to the employer's recruiter instantly — no lengthy forms or calls needed.",
      icon: MousePointerClick,
    },
    {
      number: "04",
      title: "Get Placed",
      description:
        "Our team follows up within 48 hours. Most candidates receive interview calls within the same week of applying.",
      icon: UserCheck,
    },
  ];

  const categories = [
    { title: "Accounting & Finance", openings: 12, icon: Briefcase },
    { title: "Sales & Marketing", openings: 19, icon: TrendingUp },
    { title: "Admin & Office", openings: 8, icon: FileText },
    { title: "IT & Software", openings: 6, icon: Code },
    { title: "Healthcare", openings: 5, icon: HeartPulse },
    { title: "Construction & Civil", openings: 9, icon: Building2 },
  ];

  const locations = [
    "Kozhikode",
    "Kochi",
    "Thrissur",
    "Thiruvananthapuram",
    "Malappuram",
    "Kannur",
  ];

  const whyJobMate = [
    "One-time registration fee of ₹200 — no recurring or hidden charges",
    "Profiles reviewed by human consultants, not bots",
    "Direct connection to verified companies in Kerala",
    "Dedicated to placements in the Kerala job market",
    "Fast placement — most candidates placed within 1 week",
    "Backed by M Cube Services with campus presence at NIT Kattangal",
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100 },
    },
  };

  return (
    <div className="bg-background min-h-screen font-body overflow-hidden">

      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-brand-surface to-brand-bg px-6 py-20 md:py-28 border-b border-border/40">
        <div className="absolute right-0 top-1/4 w-[350px] h-[350px] rounded-full bg-primary-100/35 blur-[80px] pointer-events-none -z-10" />
        <div className="absolute left-10 bottom-10 w-[200px] h-[200px] rounded-full bg-[#EDF6F4]/50 blur-[50px] pointer-events-none -z-10" />

        <div className="max-w-[1200px] mx-auto text-center flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-primary-100 text-primary-700 text-xs font-semibold uppercase tracking-wider shadow-sm"
          >
            Powered by M Cube Services · NIT Kattangal
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.1] text-foreground max-w-3xl tracking-tight"
          >
            Apply Online.{" "}
            <span className="font-bold bg-gradient-to-r from-brand-accent-dark to-brand-accent bg-clip-text text-transparent">
              Get Placed Fast.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-base sm:text-lg text-muted max-w-xl leading-relaxed"
          >
            JobMate connects candidates directly with verified employers across
            Kerala. Create your profile, browse curated openings, and apply with
            a single click — no calls, no WhatsApp, no hassle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mt-2"
          >
            {!isAuthenticated && (
              <Link
                href="/auth/register"
                className="font-body font-medium bg-primary-500 hover:bg-primary-700 text-white px-8 py-3.5 rounded-pill shadow-card transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                Create Account
              </Link>
            )}
            <Link
              href="/jobs"
              className="font-body font-medium border border-border bg-white hover:bg-background text-foreground px-8 py-3.5 rounded-pill shadow-sm transition-all duration-200 hover:-translate-y-0.5 text-center"
            >
              Browse Jobs
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. FEATURES GRID SECTION */}
      <section className="py-20 px-6 bg-white border-b border-border/60">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-md mx-auto mb-16">
            <span className="font-body font-semibold text-primary-500 uppercase tracking-wider text-xs block mb-2">
              Key Features
            </span>
            <h2 className="font-display text-3xl font-bold text-foreground tracking-tight">
              A Smarter Way to Get Hired
            </h2>
            <p className="text-sm text-muted mt-3 leading-relaxed">
              JobMate is a fully online platform. Everything from application to
              placement happens through the app.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className="bg-background border border-border p-8 rounded-card flex flex-col items-start gap-4 transition-all duration-200 hover:shadow-card"
              >
                <div className="w-12 h-12 rounded-card-sm bg-primary-100 text-primary-700 flex items-center justify-center">
                  <feature.icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="font-display font-semibold text-foreground text-lg">
                  {feature.title}
                </h3>
                <p className="font-body text-sm text-muted leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section className="py-20 px-6 bg-background border-b border-border/60">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-md mx-auto mb-16">
            <span className="font-body font-semibold text-primary-500 uppercase tracking-wider text-xs block mb-2">
              Process Flow
            </span>
            <h2 className="font-display text-3xl font-bold text-foreground tracking-tight">
              How JobMate Works
            </h2>
            <p className="text-sm text-muted mt-3 leading-relaxed">
              From registration to placement — the entire process is done
              through the platform.
            </p>
          </div>

          <div className="relative">
            {/* Horizontal Line on Desktop */}
            <div className="hidden md:block absolute top-[52px] left-[12%] right-[12%] h-[1px] bg-brand-border/80 z-0" />

            <motion.div
              className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="flex flex-col items-center text-center gap-4"
                >
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-white border border-border flex items-center justify-center text-primary-700 shadow-sm">
                      <step.icon size={32} strokeWidth={1.5} />
                    </div>
                    <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-primary-500 text-white text-xs font-display font-bold flex items-center justify-center shadow-sm">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 max-w-[220px]">
                    <h3 className="font-display font-semibold text-foreground text-base">
                      {step.title}
                    </h3>
                    <p className="font-body text-xs text-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. WHY JOBMATE */}
      <section className="py-20 px-6 bg-white border-b border-border/60">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-body font-semibold text-primary-500 uppercase tracking-wider text-xs block mb-3">
                Why Choose Us
              </span>
              <h2 className="font-display text-3xl font-bold text-foreground tracking-tight mb-4">
                Why JobMate is Different
              </h2>
              <p className="text-sm text-muted leading-relaxed mb-8 max-w-md">
                We are not just a job board. JobMate is a managed placement
                service backed by M Cube Services, with dedicated consultants
                who review every application.
              </p>
              <motion.ul
                className="flex flex-col gap-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {whyJobMate.map((point, idx) => (
                  <motion.li
                    key={idx}
                    variants={itemVariants}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-primary-500 flex-shrink-0 mt-0.5"
                      strokeWidth={2}
                    />
                    <span className="font-body text-sm text-foreground leading-relaxed">
                      {point}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

          </div>
        </div>
      </section>

      {/* 5. JOB CATEGORIES GRID */}
      <section className="py-20 px-6 bg-background border-b border-border/60">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-md mx-auto mb-16">
            <span className="font-body font-semibold text-primary-500 uppercase tracking-wider text-xs block mb-2">
              Industries
            </span>
            <h2 className="font-display text-3xl font-bold text-foreground tracking-tight">
              Popular Job Categories
            </h2>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {categories.map((cat, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -3 }}
              >
                <Link
                  href="/jobs"
                  className="group cursor-pointer bg-white border border-border p-6 rounded-card flex items-center justify-between transition-all duration-200 hover:shadow-card hover:border-brand-accent/40 block"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-11 h-11 rounded-card-sm bg-primary-100 text-primary-700 flex items-center justify-center flex-shrink-0">
                      <cat.icon size={20} strokeWidth={1.5} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display font-semibold text-sm text-foreground truncate">
                        {cat.title}
                      </h3>
                      <p className="font-body text-xs text-primary-700 mt-0.5">
                        {cat.openings} Openings
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-muted group-hover:text-primary-500 group-hover:bg-primary-100 group-hover:border-transparent transition-colors duration-200 flex-shrink-0">
                    <ArrowRight size={14} strokeWidth={1.5} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. SERVICE LOCATIONS */}
      <section className="py-16 px-6 bg-white border-b border-border/60">
        <div className="max-w-[1200px] mx-auto text-center">
          <span className="font-body font-semibold text-primary-500 uppercase tracking-wider text-xs block mb-4">
            Coverage Area
          </span>
          <h2 className="font-display text-2xl font-bold text-foreground tracking-tight mb-8">
            Placement Service Locations
          </h2>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 max-w-2xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {locations.map((loc) => (
              <motion.div
                key={loc}
                variants={itemVariants}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-pill bg-background border border-border font-body text-sm font-medium text-foreground shadow-sm hover:border-brand-accent/30 transition-colors duration-150"
              >
                <MapPin size={14} className="text-primary-500" strokeWidth={1.5} />
                <span>{loc}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. CTA BANNER */}
      {!isAuthenticated && (
        <section className="py-12 px-6 bg-background">
          <div className="max-w-[1200px] mx-auto">
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden bg-gradient-to-r from-brand-accent-dark to-brand-accent rounded-card p-10 md:p-14 text-white text-center shadow-card-hover"
            >
              <div className="absolute -left-16 -top-16 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />
              <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />

              <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center gap-5">
                <h2 className="font-display text-3xl font-bold tracking-tight">
                  Ready to Get Placed?
                </h2>
                <p className="font-body text-white/90 text-sm max-w-md leading-relaxed">
                  Create your account on JobMate, complete your profile, and
                  start applying to verified job openings across Kerala — all
                  online, in under 5 minutes.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
                  <Link
                    href="/register"
                    className="font-body font-medium bg-white hover:bg-background text-primary-700 px-8 py-3.5 rounded-pill shadow-card transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Create Account
                  </Link>
                  <Link
                    href="/jobs"
                    className="font-body font-medium border border-white/40 hover:bg-white/10 text-white px-8 py-3.5 rounded-pill transition-all duration-200 hover:-translate-y-0.5"
                  >
                    Browse Jobs
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t border-white/20 w-full flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-body text-white/80">
                  <span className="flex items-center gap-1.5">
                    <Phone size={14} /> 9207 543 772
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Mail size={14} /> mcubeservicesclt@gmail.com
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} /> NIT Kattangal, Calicut
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
