"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  MessageSquare, 
  ShieldCheck, 
  Clock, 
  UserPlus, 
  Search, 
  Send, 
  UserCheck, 
  Briefcase, 
  TrendingUp, 
  FileText, 
  Code, 
  HeartPulse, 
  Building2, 
  ArrowRight, 
  MapPin, 
  Phone, 
  Mail 
} from "lucide-react";

export default function JobConsulting() {
  const features = [
    {
      title: "WhatsApp Applications",
      description: "No complex portals. Apply instantly with a pre-formatted WhatsApp chat directly to our placement managers.",
      icon: MessageSquare,
    },
    {
      title: "Verified Employers",
      description: "Direct connection with verified hiring companies in Kozhikode, Kochi, and across Kerala.",
      icon: ShieldCheck,
    },
    {
      title: "48-Hour Response",
      description: "We review and match your profile with suitable vacancies, initiating contact within 48 hours.",
      icon: Clock,
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Create Profile",
      description: "Enter your experience, qualifications and upload your resume document.",
      icon: UserPlus,
    },
    {
      number: "02",
      title: "Browse Openings",
      description: "Browse curated vacancies in multiple sectors across Kerala locations.",
      icon: Search,
    },
    {
      number: "03",
      title: "Apply via WhatsApp",
      description: "Tap the quick-apply button to open a direct chat line with details.",
      icon: Send,
    },
    {
      number: "04",
      title: "Get Placed",
      description: "Attend direct interviews and secure your premium job placement.",
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

  // Container variants for stagger animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
  };

  const handleWhatsAppChat = () => {
    const text = encodeURIComponent("Hi JobMate / M Cube Services, I would like to register for Job Consulting services.");
    window.open(`https://wa.me/919207543772?text=${text}`, "_blank");
  };

  return (
    <div className="bg-brand-bg min-h-screen font-body overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-brand-surface to-brand-bg px-6 py-20 md:py-28 border-b border-brand-border/40">
        <div className="absolute right-0 top-1/4 w-[350px] h-[350px] rounded-full bg-brand-accent-light/35 blur-[80px] pointer-events-none -z-10" />
        <div className="absolute left-10 bottom-10 w-[200px] h-[200px] rounded-full bg-[#EDF6F4]/50 blur-[50px] pointer-events-none -z-10" />

        <div className="max-w-[1200px] mx-auto text-center flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-brand-accent-light text-brand-accent-dark text-xs font-semibold uppercase tracking-wider shadow-sm"
          >
            Limited Offer: ₹499 → ₹199 Only
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.1] text-brand-text max-w-3xl tracking-tight"
          >
            Your Career, <span className="font-bold bg-gradient-to-r from-brand-accent-dark to-brand-accent bg-clip-text text-transparent">Placed Right</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-base sm:text-lg text-brand-muted max-w-xl leading-relaxed"
          >
            Fast-track your job search in Kerala. Direct hiring matching, direct communication, and immediate WhatsApp applications. Consulted at NIT Kattangal.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mt-2"
          >
            <button
              onClick={handleWhatsAppChat}
              className="font-body font-medium bg-brand-accent hover:bg-brand-accent-dark text-white px-8 py-3.5 rounded-pill shadow-card transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 text-center"
            >
              Register Free — ₹199
            </button>
            <Link
              href="/jobs"
              className="font-body font-medium border border-brand-border bg-brand-surface hover:bg-brand-bg text-brand-text px-8 py-3.5 rounded-pill shadow-sm transition-all duration-200 hover:-translate-y-0.5 text-center"
            >
              Browse Jobs
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. FEATURES GRID SECTION */}
      <section className="py-20 px-6 bg-brand-surface border-b border-brand-border/60">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-md mx-auto mb-16">
            <span className="font-body font-semibold text-brand-accent uppercase tracking-wider text-xs block mb-2">
              Key Features
            </span>
            <h2 className="font-display text-3xl font-bold text-brand-text tracking-tight">
              A Modern Hiring Service
            </h2>
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
                className="bg-brand-bg border border-brand-border p-8 rounded-card flex flex-col items-start gap-4 transition-all duration-200 hover:shadow-card"
              >
                <div className="w-12 h-12 rounded-card-sm bg-brand-accent-light text-brand-accent-dark flex items-center justify-center">
                  <feature.icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="font-display font-semibold text-brand-text text-lg">
                  {feature.title}
                </h3>
                <p className="font-body text-sm text-brand-muted leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section className="py-20 px-6 bg-brand-bg border-b border-brand-border/60">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-md mx-auto mb-16">
            <span className="font-body font-semibold text-brand-accent uppercase tracking-wider text-xs block mb-2">
              Process Flow
            </span>
            <h2 className="font-display text-3xl font-bold text-brand-text tracking-tight">
              How It Works
            </h2>
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
                    <div className="w-24 h-24 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center text-brand-accent-dark shadow-sm">
                      <step.icon size={32} strokeWidth={1.5} />
                    </div>
                    <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-brand-accent text-white text-xs font-display font-bold flex items-center justify-center shadow-sm">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 max-w-[220px]">
                    <h3 className="font-display font-semibold text-brand-text text-base">
                      {step.title}
                    </h3>
                    <p className="font-body text-xs text-brand-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. JOB CATEGORIES GRID */}
      <section className="py-20 px-6 bg-brand-surface border-b border-brand-border/60">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-md mx-auto mb-16">
            <span className="font-body font-semibold text-brand-accent uppercase tracking-wider text-xs block mb-2">
              Industries
            </span>
            <h2 className="font-display text-3xl font-bold text-brand-text tracking-tight">
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
                className="group cursor-pointer bg-brand-bg border border-brand-border p-6 rounded-card flex items-center justify-between transition-all duration-200 hover:shadow-card hover:border-brand-accent/40"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-11 h-11 rounded-card-sm bg-brand-accent-light text-brand-accent-dark flex items-center justify-center flex-shrink-0">
                    <cat.icon size={20} strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display font-semibold text-sm text-brand-text truncate">
                      {cat.title}
                    </h3>
                    <p className="font-body text-xs text-brand-accent-dark mt-0.5">
                      {cat.openings} Openings
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center text-brand-muted group-hover:text-brand-accent group-hover:bg-brand-accent-light group-hover:border-transparent transition-colors duration-200 flex-shrink-0">
                  <ArrowRight size={14} strokeWidth={1.5} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. SERVICE LOCATIONS */}
      <section className="py-16 px-6 bg-brand-bg border-b border-brand-border/60">
        <div className="max-w-[1200px] mx-auto text-center">
          <span className="font-body font-semibold text-brand-accent uppercase tracking-wider text-xs block mb-4">
            Coverage Area
          </span>
          <h2 className="font-display text-2xl font-bold text-brand-text tracking-tight mb-8">
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
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-pill bg-brand-surface border border-brand-border font-body text-sm font-medium text-brand-text shadow-sm hover:border-brand-accent/30 transition-colors duration-150"
              >
                <MapPin size={14} className="text-brand-accent" strokeWidth={1.5} />
                <span>{loc}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. CTA BANNER */}
      <section className="py-12 px-6 bg-brand-surface">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden bg-gradient-to-r from-brand-accent-dark to-brand-accent rounded-card p-10 md:p-14 text-white text-center shadow-card-hover"
          >
            {/* Blurry circular background accents */}
            <div className="absolute -left-16 -top-16 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />
            <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />

            <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center gap-5">
              <h2 className="font-display text-3xl font-bold tracking-tight">
                Ready to Get Placed?
              </h2>
              <p className="font-body text-white/90 text-sm max-w-md leading-relaxed">
                Connect directly with our consulting center at NIT Kattangal. Lock in your placement plan and start receiving calls.
              </p>
              
              <button
                onClick={handleWhatsAppChat}
                className="mt-2 font-body font-medium bg-white hover:bg-brand-bg text-brand-accent-dark px-8 py-3.5 rounded-pill shadow-card transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                Register Now
              </button>

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
    </div>
  );
}
