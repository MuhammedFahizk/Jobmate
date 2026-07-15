"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, TargetAndTransition } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle, 
  Shield, 
  Zap, 
  MessageSquare, 
  ChevronDown, 
  Star,
  Users,
  Building2,
  TrendingUp,
  FileText,
  UserCheck,
  Briefcase,
  PhoneCall,
  Quote
} from "lucide-react";
import { dummyJobs, dummyUser } from "@/lib/dummy-data";

export default function Home() {
  const [selectedRole, setSelectedRole] = useState<"Design" | "Development">("Design");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const latestJobs = dummyJobs.filter(job => job.status === "active").slice(0, 3);

  const mockDesignJobs = [
    { initial: "M", title: "UI/UX Designer", company: "Minerva Company", meta: "Min. 1+ Years Exp • Based in Bangalore", logoBg: "bg-secondary-100 text-secondary-700" },
    { initial: "P", title: "UI Designer", company: "Pixel Perfect", meta: "Internship • Based in Mumbai", logoBg: "bg-primary-100 text-primary-700" }
  ];

  const mockDevJobs = [
    { initial: "H", title: "Frontend Developer", company: "Halden Inc.", meta: "Min. 2+ Years Exp • Based in Remote", logoBg: "bg-primary-100 text-primary-700" },
    { initial: "F", title: "Associate Developer", company: "FlowState SaaS", meta: "Min. 1+ Years Exp • Based in Bangalore", logoBg: "bg-accent-400/20 text-accent-500" }
  ];

  const activeMockJobs = selectedRole === "Design" ? mockDesignJobs : mockDevJobs;

  const stackedAvatars = [
    "/images/profile.png",
    "/images/profile1.png",
    "/images/profile2.png",
    "/images/profile4.png",
  ];

  const floatingAvatars = [
    { src: "/images/profile.png", className: "top-[22%] -left-[4%] sm:left-[8%]", delay: 0.1, duration: 4.2 },
    { src: "/images/profile1.png", className: "top-[42%] right-[10%] sm:right-[3%]", delay: 0.3, duration: 3.8 },
    { src: "/images/profile2.png", className: "bottom-[4%] left-[10%] sm:left-[6%]", delay: 0.5, duration: 4.5 },
    { src: "/images/profile4.png", className: "-top-[10%] right-[32%] sm:right-[38%]", delay: 0.2, duration: 3.5 },
  ];

  // ─── NEW: Hiring Steps ───
  const hiringSteps = [
    {
      num: "01",
      icon: <UserCheck size={22} strokeWidth={1.5} />,
      title: "Create Your Profile",
      desc: "Register and fill in your skills, experience, and upload your resume. Takes under 5 minutes.",
    },
    {
      num: "02",
      icon: <Briefcase size={22} strokeWidth={1.5} />,
      title: "Browse & Pick a Job",
      desc: "Filter openings by location or category. Every listing shows salary range and company details upfront.",
    },
    {
      num: "03",
      icon: <PhoneCall size={22} strokeWidth={1.5} />,
      title: "Apply via WhatsApp",
      desc: "Hit Apply and a pre-filled WhatsApp message goes straight to the recruiter. No lengthy forms.",
    },
    {
      num: "04",
      icon: <CheckCircle size={22} strokeWidth={1.5} />,
      title: "Get Placed",
      desc: "Our team follows up within 48 hours. Most candidates receive interview calls the same week.",
    },
  ];

  // ─── NEW: Testimonials ───
  const testimonials = [
    {
      name: "Arjun Menon",
      role: "Sales Executive — Kochi",
      avatar: "/images/profile.png",
      text: "I had been applying online for three months without a single callback. JobMate got me placed at a Kochi firm within ten days. The WhatsApp apply feature made everything instant.",
      rating: 5,
    },
    {
      name: "Sreelakshmi R.",
      role: "Admin Executive — Thrissur",
      avatar: "/images/profile1.png",
      text: "Very professional service. They clearly understood what kind of role I was looking for and didn&apos;t push random openings. Highly recommend for anyone in Kerala looking seriously.",
      rating: 5,
    },
    {
      name: "Faisal K.",
      role: "Accountant — Kozhikode",
      avatar: "/images/profile2.png",
      text: "The process was straightforward — no unnecessary steps. Got an interview within a week and an offer two days later. The team was responsive throughout.",
      rating: 5,
    },
  ];

  // ─── NEW: Employment Opportunity sectors ───
  const sectors = [
    { label: "Accounting & Finance", count: "12 openings", icon: <TrendingUp size={20} strokeWidth={1.5} /> },
    { label: "Sales & Marketing", count: "19 openings", icon: <Users size={20} strokeWidth={1.5} /> },
    { label: "Admin & Office", count: "8 openings", icon: <FileText size={20} strokeWidth={1.5} /> },
    { label: "IT & Software", count: "6 openings", icon: <Zap size={20} strokeWidth={1.5} /> },
    { label: "Healthcare", count: "5 openings", icon: <Shield size={20} strokeWidth={1.5} /> },
    { label: "Construction & Civil", count: "9 openings", icon: <Building2 size={20} strokeWidth={1.5} /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
  };

 const cardHoverEffect: TargetAndTransition = {
  y: -4,
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  transition: { duration: 0.2, ease: "easeInOut" as const },
};

  const handleWhatsAppChat = () => {
    const message = encodeURIComponent(`Hi JobMate! I&apos;m interested in finding a job. My name is ${dummyUser.name}.`);
    window.open(`https://wa.me/919999999999?text=${message}`, "_blank");
  };

  return (
    <div className="overflow-hidden">
      {/* ─── 1. HERO ─── */}
      <section className="relative min-h-[calc(100vh-64px)] flex items-center bg-gradient-to-b from-white to-background px-6 py-12 md:py-10">
        <div className="absolute right-0 top-1/4 w-[400px] h-[400px] rounded-full bg-primary-100/40 blur-[80px] pointer-events-none -z-10" />
        <div className="absolute left-10 bottom-10 w-[200px] h-[200px] rounded-full bg-primary-50/50 blur-[50px] pointer-events-none -z-10" />

        <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <motion.div className="lg:col-span-6 flex flex-col gap-6" initial="hidden" animate="visible" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-primary-100 text-primary-700 text-xs font-semibold uppercase tracking-wider shadow-sm">
                <Star size={12} fill="currentColor" /> The Optimal Solution For Employment
              </span>
            </motion.div>

            <motion.h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] leading-[1.15] text-foreground tracking-tight" variants={itemVariants}>
              Find Your <span className="block font-bold bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">Dream Job Here</span>
            </motion.h1>

            <motion.p className="font-body text-base sm:text-lg text-muted max-w-lg leading-relaxed" variants={itemVariants}>
              Powered by M Cube Services, JOBMATE provides direct matching with top-tier companies in Kerala. Submit your application instantly via WhatsApp for rapid placement.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2" variants={itemVariants}>
              <Link href="/jobs" className="font-body font-medium text-center bg-primary-500 hover:bg-primary-600 text-white px-8 py-3.5 rounded-pill shadow-card transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0">
                Get Started
              </Link>
              <button onClick={handleWhatsAppChat} className="font-body font-medium flex items-center justify-center gap-2 border border-border bg-white hover:bg-background text-foreground px-8 py-3.5 rounded-pill shadow-sm transition-all duration-200 hover:-translate-y-0.5">
                <svg className="w-5 h-5 fill-whatsapp" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.472 5.358 1.473 5.568 0 10.1-4.529 10.104-10.099.002-2.699-1.047-5.234-2.951-7.138C17.256 1.487 14.73 0.439 12.004 0.439 6.438 0.439 1.91 4.966 1.906 10.537c-.001 2.115.562 4.185 1.63 6.002l-1.074 3.924 4.017-1.054-.232-.116z" />
                </svg>
                <span>Chat on WhatsApp</span>
              </button>
            </motion.div>

            <motion.div className="grid grid-cols-3 gap-4 pt-8 mt-4 border-t border-border/60" variants={itemVariants}>
              <div className="col-span-1 flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <div className="flex items-center -space-x-3 flex-shrink-0">
                  {stackedAvatars.map((src, idx) => (
                    <div key={src} className="relative w-8 h-8 rounded-full bg-primary-50 border-2 border-white shadow-card overflow-hidden" style={{ zIndex: 10 - idx }}>
                      <Image src={src} alt={`Profile ${idx + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <div className="min-w-0">
                  <h4 className="font-display text-xl sm:text-2xl font-bold text-foreground leading-tight">50,000+</h4>
                  <p className="font-body text-[10px] sm:text-xs text-muted leading-tight whitespace-nowrap">Active Members</p>
                </div>
              </div>
              <div className="col-span-1 pl-2">
                <h4 className="font-display text-xl sm:text-2xl font-bold text-foreground leading-tight">7,000+</h4>
                <p className="font-body text-[10px] sm:text-xs text-muted leading-tight">Global Companies</p>
              </div>
              <div className="col-span-1 pl-2">
                <h4 className="font-display text-xl sm:text-2xl font-bold text-foreground leading-tight">90%</h4>
                <p className="font-body text-[10px] sm:text-xs text-muted leading-tight">Hiring Response Rate</p>
              </div>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[420px] sm:min-h-[480px]">
            <div className="absolute w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-primary-100 to-transparent opacity-50 blur-3xl pointer-events-none" />
            {floatingAvatars.map((avatar, idx) => (
              <motion.div key={idx} className={`absolute ${avatar.className} w-22 h-22 z-40 sm:w-11 sm:h-11 rounded-full bg-white border border-border shadow-card overflow-hidden z-10 flex-shrink-0`} animate={{ y: [0, -6, 0] }} transition={{ duration: avatar.duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: avatar.delay }}>
                <div className="relative w-full h-full bg-primary-50">
                  <Image src={avatar.src} alt="Candidate Doodle" fill className="object-cover" />
                </div>
              </motion.div>
            ))}
            <div className="absolute w-[240px] h-[240px] opacity-20 pointer-events-none z-0">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-primary-500">
                <circle cx="50" cy="40" r="20" stroke="currentColor" strokeWidth="1.5" />
                <path d="M15 85C15 65 30 55 50 55C70 55 85 65 85 85" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M50 20C45 20 40 25 40 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <motion.div className="absolute top-4 right-[5%] sm:right-[10%] w-[240px] bg-white p-5 rounded-card border border-border shadow-card z-20" initial={{ opacity: 0, x: 50, y: -20 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 0.4, type: "spring", stiffness: 80 }} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-3">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-sm bg-primary-100">
                    <Image src="/images/image.png" alt={dummyUser.name} fill className="object-cover" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-5 h-5 bg-whatsapp border-2 border-white rounded-full flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                  </div>
                </div>
                <h3 className="font-display font-semibold text-foreground text-base">{dummyUser.name}</h3>
                <p className="font-body text-xs text-muted mb-4">UI Designer • {dummyUser.experience} Exp</p>
                <Link href="/jobs" className="w-full py-2 bg-foreground hover:bg-primary-500 text-white font-body text-xs font-semibold rounded-pill transition-colors duration-200 text-center">
                  Hire Candidate
                </Link>
              </div>
            </motion.div>
            <motion.div className="absolute bottom-4 left-[2%] sm:left-[8%] w-[290px] bg-white p-5 rounded-card border border-border shadow-card z-10" initial={{ opacity: 0, x: -50, y: 20 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 0.6, type: "spring", stiffness: 80 }}>
              <div className="mb-4">
                <label className="font-body text-[10px] uppercase tracking-wider font-semibold text-muted block mb-1">Find Job</label>
                <div className="relative">
                  <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-full flex items-center justify-between bg-background px-3 py-2 rounded-card-sm border border-border text-foreground font-display font-semibold text-sm hover:bg-primary-50 transition-colors duration-150">
                    <span>{selectedRole === "Design" ? "UI Designer" : "Frontend Dev"}</span>
                    <ChevronDown size={14} className={`text-muted transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute left-0 right-0 mt-1 bg-white border border-border rounded-card shadow-card-hover z-30 overflow-hidden">
                      <button onClick={() => { setSelectedRole("Design"); setIsDropdownOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-background text-xs font-body text-foreground transition-colors">UI Designer</button>
                      <button onClick={() => { setSelectedRole("Development"); setIsDropdownOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-background text-xs font-body text-foreground transition-colors">Frontend Dev</button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {activeMockJobs.map((job, idx) => (
                  <motion.div key={job.title} className="flex gap-3 items-start p-2 rounded-card-sm hover:bg-background transition-colors duration-150" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * idx }}>
                    <div className={`w-8 h-8 rounded-card-sm ${job.logoBg} font-display font-semibold text-xs flex items-center justify-center flex-shrink-0`}>{job.initial}</div>
                    <div className="min-w-0">
                      <h4 className="font-display font-semibold text-xs text-foreground truncate">{job.title}</h4>
                      <p className="font-body text-[10px] text-muted truncate">{job.company}</p>
                      <p className="font-body text-[9px] text-primary-700 mt-0.5 truncate">{job.meta}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="border-t border-border mt-3 pt-3 flex justify-between items-center">
                <Link href="/jobs" className="font-body text-[10px] font-semibold text-primary-500 hover:text-primary-700 flex items-center gap-1 transition-colors duration-200">
                  Load More Jobs <ArrowRight size={10} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 2. LATEST JOBS ─── */}
      <section className="bg-background py-20 px-6 border-y border-border/60">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-body font-semibold text-primary-500 uppercase tracking-wider text-xs block mb-2">Hiring Now</span>
              <h2 className="font-display text-3xl font-bold text-foreground tracking-tight">Latest Job Openings</h2>
            </div>
            <Link href="/jobs" className="font-body text-sm font-semibold text-primary-500 hover:text-primary-700 flex items-center gap-1 group transition-colors duration-200">
              View All Jobs <ArrowRight size={16} className="transform transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestJobs.map((job) => (
              <motion.div key={job.id} className="bg-white p-6 rounded-card border border-border shadow-card flex flex-col justify-between hover:shadow-card-hover transition-all duration-300" whileHover={cardHoverEffect} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.4 }}>
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-12 h-12 rounded-card-sm ${job.logoBg} font-display font-semibold text-sm flex items-center justify-center`}>{job.company.substring(0, 1)}</div>
                    <span className="inline-block px-2.5 py-1 rounded-pill bg-primary-100 text-primary-700 font-body text-[10px] font-semibold">{job.type}</span>
                  </div>
                  <span className="font-body text-xs text-muted block mb-1">{job.company} • {job.location}</span>
                  <h3 className="font-display font-semibold text-foreground text-lg mb-3">{job.title}</h3>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {job.skills.map((skill) => (
                      <span key={skill} className="px-2 py-0.5 rounded-card-sm bg-primary-50 text-primary-700 font-body text-[10px] border border-border">{skill}</span>
                    ))}
                  </div>
                </div>
                <div className="border-t border-border pt-4 mt-auto flex items-center justify-between">
                  <span className="font-body text-xs font-semibold text-foreground">{job.salary.split(' / ')[0]}</span>
                  <Link href={`/jobs?apply=${job.id}`} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-pill bg-primary-500 hover:bg-primary-600 text-white font-body text-xs font-medium transition-all duration-200">
                    Quick Apply
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. WHY CHOOSE US ─── */}
      <section id="services" className="bg-white py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-lg mx-auto mb-16">
            <span className="font-body font-semibold text-primary-500 uppercase tracking-wider text-xs block mb-2">Our Process</span>
            <h2 className="font-display text-3xl font-bold text-foreground tracking-tight">Why Choose JobMate</h2>
            <p className="font-body text-muted text-sm mt-3 leading-relaxed">We streamline recruitment by pairing elite talent with active employers and eliminating long resume submission gates.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <MessageSquare size={24} strokeWidth={1.5} />, title: "WhatsApp Applications", desc: "Apply to any job instantly via WhatsApp. Your details are pre-formatted for direct and immediate review." },
              { icon: <Shield size={24} strokeWidth={1.5} />, title: "Verified Direct Hirings", desc: "Skip standard recruiters. Our listing companies directly examine applications for immediate feedback." },
              { icon: <Zap size={24} strokeWidth={1.5} />, title: "Rapid Fast Placements", desc: "Our candidates get response times of less than 48 hours. Secure interviews and job offers rapidly." },
            ].map((feat, idx) => (
              <motion.div key={feat.title} className="p-8 rounded-card border border-border bg-background flex flex-col items-start gap-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * (idx + 1) }}>
                <div className="w-12 h-12 rounded-card-sm bg-primary-100 text-primary-700 flex items-center justify-center">{feat.icon}</div>
                <h3 className="font-display font-semibold text-foreground text-lg">{feat.title}</h3>
                <p className="font-body text-sm text-muted leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. ABOUT (HOME VERSION) ─── NEW ─── */}
      <section className="bg-background py-20 px-6 border-t border-border/60">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: visual block */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative rounded-card overflow-hidden bg-white border border-border shadow-card aspect-[4/3]">
              {/* Placeholder gradient if no image — swap with <Image> when ready */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-white to-background" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-48 opacity-30 text-primary-500">
                  <rect x="20" y="20" width="70" height="90" rx="6" stroke="currentColor" strokeWidth="2" />
                  <rect x="110" y="50" width="70" height="60" rx="6" stroke="currentColor" strokeWidth="2" />
                  <circle cx="55" cy="48" r="14" stroke="currentColor" strokeWidth="2" />
                  <path d="M30 140 Q55 120 80 140" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="145" cy="72" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M120 130 Q145 115 170 130" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            {/* Floating stat badge */}
            <div className="absolute -bottom-5 -right-5 bg-white border border-border rounded-card shadow-card-hover px-6 py-4">
              <span className="font-display text-2xl font-bold text-foreground block">6+ Years</span>
              <span className="font-body text-xs text-muted">Placing Candidates in Kerala</span>
            </div>
          </motion.div>

          {/* Right: content */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div>
              <span className="font-body font-semibold text-primary-500 uppercase tracking-wider text-xs block mb-2">Who We Are</span>
              <h2 className="font-display text-3xl font-bold text-foreground tracking-tight leading-snug">
                Kerala&apos;s Trusted Job Consulting Partner
              </h2>
            </div>
            <p className="font-body text-muted text-sm leading-relaxed">
              JobMate is a Kerala-based recruitment consultancy helping job seekers across Kochi, Thrissur, Kozhikode, and Thiruvananthapuram connect directly with employers — without the usual wait. We work across industries including IT, sales, accounts, admin, and skilled trades.
            </p>
            <p className="font-body text-muted text-sm leading-relaxed">
              We don&apos;t just share your CV and disappear. Our team stays involved from first application to final offer, making sure candidates are matched to roles that genuinely fit their skills and expectations.
            </p>
            <div className="flex flex-col gap-3 mt-2">
              {["Free registration for all candidates", "Direct employer connections, no middlemen", "WhatsApp-first — apply the way you already communicate"].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-primary-500 mt-0.5 flex-shrink-0" />
                  <span className="font-body text-sm text-foreground">{point}</span>
                </div>
              ))}
            </div>
            <Link href="/about" className="mt-2 inline-flex items-center gap-2 font-body text-sm font-semibold text-primary-500 hover:text-primary-700 group transition-colors duration-200">
              Read our full story <ArrowRight size={14} className="transform transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── 5. EMPLOYMENT OPPORTUNITIES ─── NEW ─── */}
      <section className="bg-white py-20 px-6 border-t border-border/60">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-body font-semibold text-primary-500 uppercase tracking-wider text-xs block mb-2">What&apos;s Available</span>
              <h2 className="font-display text-3xl font-bold text-foreground tracking-tight">Employment Opportunities</h2>
              <p className="font-body text-muted text-sm mt-2 max-w-md">Browse openings across industries. New listings added every week from verified Kerala employers.</p>
            </div>
            <Link href="/jobs" className="font-body text-sm font-semibold text-primary-500 hover:text-primary-700 flex items-center gap-1 group transition-colors duration-200 whitespace-nowrap">
              See All Openings <ArrowRight size={16} className="transform transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sectors.map((sector, idx) => (
              <motion.div
                key={sector.label}
                className="group flex items-center gap-4 p-5 rounded-card border border-border bg-background hover:border-primary-500/40 hover:bg-primary-100/20 transition-all duration-200 cursor-pointer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * idx }}
                whileHover={{ y: -2 }}
              >
                <div className="w-11 h-11 rounded-card-sm bg-primary-100 text-primary-700 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-200">
                  {sector.icon}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground text-sm">{sector.label}</h3>
                  <p className="font-body text-xs text-primary-700 mt-0.5">{sector.count}</p>
                </div>
                <ArrowRight size={14} className="ml-auto text-border group-hover:text-primary-500 transition-colors duration-200" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. HIRING PROCESS ─── NEW ─── */}
      <section className="bg-background py-20 px-6 border-t border-border/60">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-lg mx-auto mb-16">
            <span className="font-body font-semibold text-primary-500 uppercase tracking-wider text-xs block mb-2">How It Works</span>
            <h2 className="font-display text-3xl font-bold text-foreground tracking-tight">Get Placed in 4 Steps</h2>
            <p className="font-body text-muted text-sm mt-3 leading-relaxed">No complicated portals. No waiting weeks for replies. Just a clean, fast path from profile to placement.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector line (desktop only) */}
            <div className="hidden lg:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px bg-border" />

            {hiringSteps.map((step, idx) => (
              <motion.div
                key={step.num}
                className="flex flex-col items-center text-center gap-4 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
              >
                {/* Step circle */}
                <div className="relative w-[52px] h-[52px] rounded-full bg-white border-2 border-primary-500 flex items-center justify-center text-primary-500 shadow-card z-10">
                  {step.icon}
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary-500 text-white font-display font-bold text-[9px] flex items-center justify-center">
                    {step.num}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-foreground text-sm">{step.title}</h3>
                <p className="font-body text-xs text-muted leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/register" className="inline-flex items-center gap-2 font-body font-medium bg-primary-500 hover:bg-primary-600 text-white px-8 py-3.5 rounded-pill shadow-card transition-all duration-200 hover:-translate-y-0.5">
              Start Now — It&apos;s Free <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 7. TESTIMONIALS ─── NEW ─── */}
      <section className="bg-white py-20 px-6 border-t border-border/60">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-lg mx-auto mb-16">
            <span className="font-body font-semibold text-primary-500 uppercase tracking-wider text-xs block mb-2">Placed & Happy</span>
            <h2 className="font-display text-3xl font-bold text-foreground tracking-tight">What Our Candidates Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.name}
                className="bg-background p-6 rounded-card border border-border shadow-card flex flex-col gap-5"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
                whileHover={cardHoverEffect}
              >
                {/* Quote icon */}
                <div className="w-9 h-9 rounded-card-sm bg-primary-100 text-primary-700 flex items-center justify-center flex-shrink-0">
                  <Quote size={16} strokeWidth={1.5} />
                </div>

                <p className="font-body text-sm text-muted leading-relaxed flex-1">
                  &lsquo;{t.text}&lsquo;
                </p>

                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-3 border-t border-border">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden bg-primary-50 flex-shrink-0">
                    <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-foreground text-xs">{t.name}</p>
                    <p className="font-body text-[10px] text-muted">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. CTA BANNER ─── */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-[1200px] mx-auto">
          <motion.div className="bg-gradient-primary rounded-card p-10 md:p-16 text-white text-center relative overflow-hidden shadow-card-hover" initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
            <div className="absolute -left-16 -top-16 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />
            <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full bg-primary-100/20 blur-xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Register & Get Placed Now</h2>
              <p className="font-body text-white/90 text-sm md:text-base max-w-lg leading-relaxed">Create your candidate profile, specify your expertise, verify status, and start chatting directly with recruiters. Your career leap is one click away.</p>
              <Link href="/register" className="mt-2 font-body font-medium bg-white hover:bg-background text-primary-700 hover:text-primary-700 px-8 py-3.5 rounded-pill shadow-card transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0">
                Register as Candidate
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}