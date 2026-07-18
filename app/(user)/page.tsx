"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Shield,
  Zap,
  ChevronDown,
  Users,
  Building2,
  TrendingUp,
  FileText,
  UserCheck,
  Briefcase,
  PhoneCall,
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

  //  const cardHoverEffect: TargetAndTransition = {
  //   y: -4,
  //   boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  //   transition: { duration: 0.2, ease: "easeInOut" as const },
  // };

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
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-primary-500 mb-2 block">
                The Optimal Solution For Employment
              </span>
            </motion.div>

            <motion.h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] leading-[1.15] text-foreground tracking-tight" variants={itemVariants}>
              Find Your <span className="block font-bold text-primary-500">Dream Job Here</span>
            </motion.h1>

            <motion.p className="text-base sm:text-lg text-muted max-w-lg leading-[1.6]" variants={itemVariants}>
              Powered by M Cube Services, JOBMATE provides direct matching with top-tier companies in Kerala. Submit your application instantly via WhatsApp for rapid placement.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2" variants={itemVariants}>
              <Link href="/jobs" className="font-mono text-[11px] font-semibold tracking-widest uppercase bg-foreground hover:bg-primary-600 text-white px-8 py-3.5 rounded transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 text-center">
                Get Started
              </Link>
              <button onClick={handleWhatsAppChat} className="font-mono text-[11px] font-semibold tracking-widest uppercase flex items-center justify-center gap-2 border-[1.5px] border-border bg-white hover:bg-background text-foreground px-8 py-3.5 rounded transition-all duration-200 hover:-translate-y-0.5">
                <svg className="w-4 h-4 fill-whatsapp" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.472 5.358 1.473 5.568 0 10.1-4.529 10.104-10.099.002-2.699-1.047-5.234-2.951-7.138C17.256 1.487 14.73 0.439 12.004 0.439 6.438 0.439 1.91 4.966 1.906 10.537c-.001 2.115.562 4.185 1.63 6.002l-1.074 3.924 4.017-1.054-.232-.116z" />
                </svg>
                <span>Chat on WhatsApp</span>
              </button>
            </motion.div>

            <motion.div className="grid grid-cols-3 gap-4 pt-8 mt-4 border-t-[1.5px] border-dashed border-border" variants={itemVariants}>
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
                  <p className="font-mono text-[9px] uppercase tracking-wider text-muted leading-tight whitespace-nowrap mt-1">Active Members</p>
                </div>
              </div>
              <div className="col-span-1 pl-2">
                <h4 className="font-display text-xl sm:text-2xl font-bold text-foreground leading-tight">7,000+</h4>
                <p className="font-mono text-[9px] uppercase tracking-wider text-muted leading-tight mt-1">Global Companies</p>
              </div>
              <div className="col-span-1 pl-2">
                <h4 className="font-display text-xl sm:text-2xl font-bold text-foreground leading-tight">90%</h4>
                <p className="font-mono text-[9px] uppercase tracking-wider text-muted leading-tight mt-1">Hiring Response</p>
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
            <motion.div className="absolute top-4 right-[5%] sm:right-[10%] w-[240px] bg-white p-5 pb-4 rounded-[14px] border border-border shadow-sm z-20 overflow-hidden" initial={{ opacity: 0, x: 50, y: -20 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 0.4, type: "spring", stiffness: 80 }} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
              <div className="absolute left-0 right-0 bottom-12 h-0 border-t-[1.5px] border-dashed border-border pointer-events-none" />
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-3">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-sm bg-primary-100 border border-border">
                    <Image src="/images/image.png" alt={dummyUser.name} fill className="object-cover" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-5 h-5 bg-whatsapp border-2 border-white rounded-full flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                  </div>
                </div>
                <h3 className="font-display font-semibold text-foreground text-[17px] leading-tight mb-1">{dummyUser.name}</h3>
                <p className="font-mono text-[10px] text-muted tracking-wider uppercase mb-7">UI Designer • {dummyUser.experience}</p>
                <Link href="/jobs" className="w-full pt-3 mt-auto font-mono text-[10px] uppercase tracking-wider font-semibold text-primary-500 hover:text-primary-700 transition-colors text-center z-10 block">
                  Hire Candidate →
                </Link>
              </div>
            </motion.div>

            <motion.div className="absolute bottom-4 left-[2%] sm:left-[8%] w-[290px] bg-white p-5 rounded-[14px] border border-border shadow-sm z-10" initial={{ opacity: 0, x: -50, y: 20 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 0.6, type: "spring", stiffness: 80 }}>
              <div className="mb-4">
                <label className="font-mono text-[10px] uppercase tracking-[0.1em] font-semibold text-muted block mb-1">Find Job</label>
                <div className="relative">
                  <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-full flex items-center justify-between bg-background px-3 py-2 rounded border border-border text-foreground font-display font-semibold text-sm hover:bg-primary-50 transition-colors duration-150">
                    <span>{selectedRole === "Design" ? "UI Designer" : "Frontend Dev"}</span>
                    <ChevronDown size={14} className={`text-muted transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute left-0 right-0 mt-1 bg-white border border-border rounded-md shadow-sm z-30 overflow-hidden">
                      <button onClick={() => { setSelectedRole("Design"); setIsDropdownOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-background text-[13px] font-body text-foreground transition-colors">UI Designer</button>
                      <button onClick={() => { setSelectedRole("Development"); setIsDropdownOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-background text-[13px] font-body text-foreground transition-colors">Frontend Dev</button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {activeMockJobs.map((job, idx) => (
                  <motion.div key={job.title} className="flex gap-3 items-start p-2 rounded hover:bg-background transition-colors duration-150" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * idx }}>
                    <div className={`w-8 h-8 rounded border-[1.5px] border-border ${job.logoBg} font-display font-semibold text-xs flex items-center justify-center flex-shrink-0 -rotate-3`}>{job.initial}</div>
                    <div className="min-w-0">
                      <h4 className="font-display font-semibold text-[14px] text-foreground truncate">{job.title}</h4>
                      <p className="text-[11px] text-muted truncate">{job.company}</p>
                      <p className="font-mono text-[8px] tracking-wider uppercase text-primary-500 mt-1 truncate">{job.meta}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="border-t-[1.5px] border-dashed border-border mt-3 pt-3 flex justify-between items-center">
                <Link href="/jobs" className="font-mono text-[10px] tracking-wider uppercase font-semibold text-foreground hover:text-primary-600 flex items-center gap-1 transition-colors duration-200">
                  Load More Jobs →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ─── 2. LATEST JOBS ─── */}
      <section className="bg-background py-20 px-6">
        <div className="max-w-[960px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-primary-500 mb-2.5 block">Hiring Now</span>
              <h2 className="font-display font-semibold text-[34px] tracking-tight mb-2">Latest Job Openings</h2>
            </div>
            <Link href="/jobs" className="font-body text-sm font-semibold text-primary-500 hover:text-primary-700 flex items-center gap-1 group transition-colors duration-200">
              View All Jobs <ArrowRight size={16} className="transform transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {latestJobs.map((job, idx) => (
              <motion.div key={job.id} className="bg-white border border-border rounded-[14px] p-6 pb-5 relative overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.4, delay: idx * 0.1 }}>
                <div className="absolute left-0 right-0 bottom-[46px] h-0 border-t-[1.5px] border-dashed border-border pointer-events-none" />
                <div className="font-mono text-[10px] text-muted tracking-[0.06em] text-right mb-4 uppercase">
                  JM-JOB-00{idx + 1}
                </div>

                <div className="flex justify-between items-start mb-4">
                  <div className={`w-10 h-10 rounded-lg border-[1.5px] border-primary-500 ${job.logoBg} font-display font-semibold text-sm flex items-center justify-center -rotate-3`}>{job.company.substring(0, 1)}</div>
                  <span className="inline-block px-2.5 py-1 rounded-pill bg-primary-50 text-primary-700 font-mono text-[9px] font-semibold tracking-wider uppercase border border-border/50">{job.type}</span>
                </div>

                <h3 className="font-display font-semibold text-[17px] mb-1 leading-tight">{job.title}</h3>
                <span className="font-body text-[12px] text-muted block mb-4">{job.company} • {job.location}</span>

                <div className="flex flex-wrap gap-1.5 mb-8">
                  {job.skills.map((skill) => (
                    <span key={skill} className="px-2 py-0.5 rounded-card-sm bg-background text-muted font-body text-[10px] border border-border">{skill}</span>
                  ))}
                </div>

                <div className="pt-3.5 mt-auto flex items-center justify-between z-10">
                  <span className="font-mono text-[10px] text-primary-500 tracking-[0.04em] uppercase">{job.salary.split(' / ')[0]}</span>
                  <Link href={`/jobs?apply=${job.id}`} className="font-body text-[11px] font-semibold text-foreground hover:text-primary-600 transition-colors">
                    Apply →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="relative my-16 border-t-[1.5px] border-dashed border-border before:content-[''] before:absolute before:-top-[7px] before:-left-[7px] before:w-3.5 before:h-3.5 before:rounded-full before:bg-background before:border-[1.5px] before:border-border after:content-[''] after:absolute after:-top-[7px] after:-right-[7px] after:w-3.5 after:h-3.5 after:rounded-full after:bg-background after:border-[1.5px] after:border-border" />
        </div>
      </section>

      {/* ─── 3. WHY CHOOSE US ─── */}
      <section id="services" className="bg-background py-10 px-6">
        <div className="max-w-[960px] mx-auto">
          <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-primary-500 mb-2.5 block">Our process</span>
          <h2 className="font-display font-semibold text-[34px] tracking-tight mb-2">Why choose JobMate</h2>
          <p className="text-muted text-sm max-w-[480px] leading-[1.6] mb-10">Three reasons candidates stop applying everywhere else — and start here.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { code: "JM-WA-01", stamp: "✓", title: "WhatsApp applications", desc: "Apply to any job instantly. Your details go straight to the recruiter, pre-formatted, no lengthy form.", foot: "INSTANT · NO FORMS" },
              { code: "JM-VF-02", stamp: "✓", title: "Verified direct hiring", desc: "Skip the recruiter chain. Listing companies review applications themselves, directly.", foot: "VERIFIED EMPLOYER" },
              { code: "JM-RP-03", stamp: "✓", title: "Rapid placement", desc: "Under 48 hours response time on average. Interviews and offers move fast, on purpose.", foot: "48HR RESPONSE" },
            ].map((feat, idx) => (
              <motion.div key={feat.title} className="bg-white border border-border rounded-[14px] p-6 pb-5 relative overflow-hidden flex flex-col" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * (idx + 1) }}>
                <div className="absolute left-0 right-0 bottom-[46px] h-0 border-t-[1.5px] border-dashed border-border pointer-events-none" />
                <div className="font-mono text-[10px] text-muted tracking-[0.06em] text-right mb-4">{feat.code}</div>

                <div className="w-[38px] h-[38px] rounded-lg border-[1.5px] border-primary-500 text-primary-700 flex items-center justify-center font-display font-semibold text-base mb-3.5 -rotate-3 bg-primary-50">
                  {feat.stamp}
                </div>

                <h3 className="font-display font-semibold text-[17px] mb-2">{feat.title}</h3>
                <p className="text-[13px] text-muted leading-[1.6] mb-7">{feat.desc}</p>

                <div className="font-mono text-[10px] text-primary-500 tracking-[0.04em] pt-3.5 mt-auto">
                  {feat.foot}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="relative my-16 border-t-[1.5px] border-dashed border-border before:content-[''] before:absolute before:-top-[7px] before:-left-[7px] before:w-3.5 before:h-3.5 before:rounded-full before:bg-background before:border-[1.5px] before:border-border after:content-[''] after:absolute after:-top-[7px] after:-right-[7px] after:w-3.5 after:h-3.5 after:rounded-full after:bg-background after:border-[1.5px] after:border-border" />
        </div>
      </section>

      {/* ─── 4. ABOUT (HOME VERSION) ─── */}
      <section className="bg-background py-10 px-6">
        <div className="max-w-[960px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative rounded-[14px] overflow-hidden bg-white border border-border shadow-sm aspect-[4/3] p-2">
              <div className="absolute inset-2 border-[1.5px] border-dashed border-border rounded-lg pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-background -z-10" />
              <div className="w-full h-full flex flex-col items-center justify-center opacity-80 text-primary-500">
                <div className="font-mono text-xs tracking-widest uppercase mb-4 opacity-50">Est. 2018</div>
                <div className="font-display text-5xl font-bold">6+ Years</div>
                <div className="font-display italic text-lg text-muted mt-2">Placing Candidates in Kerala</div>
              </div>
            </div>
            {/* Ticket accent on the image */}
            <div className="absolute -bottom-4 -right-4 bg-white border border-border p-3 shadow-sm flex items-center justify-center -rotate-6">
              <div className="border-[1.5px] border-primary-500 px-3 py-1 text-primary-700 font-mono text-[10px] uppercase font-bold tracking-widest">Trusted</div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col gap-5"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div>
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-primary-500 mb-2.5 block">Who We Are</span>
              <h2 className="font-display font-semibold text-[34px] tracking-tight leading-[1.1] mb-2">
                Kerala&apos;s Trusted Job Consulting Partner
              </h2>
            </div>
            <p className="text-[14px] text-muted leading-[1.6]">
              JobMate is a Kerala-based recruitment consultancy helping job seekers across Kochi, Thrissur, Kozhikode, and Thiruvananthapuram connect directly with employers — without the usual wait. We work across industries including IT, sales, accounts, admin, and skilled trades.
            </p>
            <div className="flex flex-col gap-2 mt-1">
              {["Free registration for all candidates", "Direct employer connections, no middlemen", "WhatsApp-first — apply the way you already communicate"].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <span className="font-mono text-primary-500 font-bold text-[10px] mt-1 flex-shrink-0">++</span>
                  <span className="font-body text-[13px] text-foreground">{point}</span>
                </div>
              ))}
            </div>
            <Link href="/about" className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] font-semibold tracking-wider text-primary-600 hover:text-primary-800 uppercase transition-colors duration-200">
              Read our full story <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
        <div className="max-w-[960px] mx-auto relative my-16 border-t-[1.5px] border-dashed border-border before:content-[''] before:absolute before:-top-[7px] before:-left-[7px] before:w-3.5 before:h-3.5 before:rounded-full before:bg-background before:border-[1.5px] before:border-border after:content-[''] after:absolute after:-top-[7px] after:-right-[7px] after:w-3.5 after:h-3.5 after:rounded-full after:bg-background after:border-[1.5px] after:border-border" />
      </section>

      {/* ─── 5. EMPLOYMENT OPPORTUNITIES ─── */}
      <section className="bg-background py-10 px-6">
        <div className="max-w-[960px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-primary-500 mb-2.5 block">What&apos;s Available</span>
              <h2 className="font-display font-semibold text-[34px] tracking-tight mb-2">Employment Opportunities</h2>
              <p className="text-muted text-sm max-w-[480px] leading-[1.6]">Browse openings across industries. New listings added every week from verified Kerala employers.</p>
            </div>
            <Link href="/jobs" className="font-mono text-[11px] font-semibold text-primary-600 hover:text-primary-800 tracking-wider uppercase flex items-center gap-1 transition-colors duration-200">
              See All Openings <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sectors.map((sector, idx) => (
              <motion.div
                key={sector.label}
                className="group relative flex items-center gap-4 p-5 bg-white border border-border rounded-[14px] hover:border-primary-500/50 cursor-pointer overflow-hidden transition-colors"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * idx }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-border group-hover:bg-primary-500 transition-colors duration-300" />
                <div className="font-mono text-[10px] text-muted absolute right-3 top-3 opacity-50 group-hover:opacity-100 group-hover:text-primary-500 transition-all">0{idx + 1}</div>
                <div className="pl-2">
                  <h3 className="font-display font-semibold text-[15px]">{sector.label}</h3>
                  <p className="font-mono text-[10px] text-muted tracking-wide uppercase mt-1">{sector.count}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="relative my-16 border-t-[1.5px] border-dashed border-border before:content-[''] before:absolute before:-top-[7px] before:-left-[7px] before:w-3.5 before:h-3.5 before:rounded-full before:bg-background before:border-[1.5px] before:border-border after:content-[''] after:absolute after:-top-[7px] after:-right-[7px] after:w-3.5 after:h-3.5 after:rounded-full after:bg-background after:border-[1.5px] after:border-border" />
        </div>
      </section>

      {/* ─── 6. HIRING PROCESS ─── */}
      <section className="bg-background py-10 px-6">
        <div className="max-w-[960px] mx-auto">
          <div className="text-center max-w-lg mx-auto mb-14">
            <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-primary-500 mb-2.5 block">How It Works</span>
            <h2 className="font-display font-semibold text-[34px] tracking-tight mb-2">Get Placed in 4 Steps</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {hiringSteps.map((step, idx) => (
              <motion.div
                key={step.num}
                className="bg-white border border-border p-6 rounded-[14px] flex flex-col items-start relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
              >
                <div className="font-mono text-[24px] font-bold text-primary-100 absolute right-4 top-4 leading-none select-none">{step.num}</div>
                <div className="w-[34px] h-[34px] rounded border-[1.5px] border-primary-500 text-primary-700 flex items-center justify-center font-display font-semibold text-sm mb-4 bg-primary-50">
                  {idx + 1}
                </div>
                <h3 className="font-display font-semibold text-[15px] mb-2 z-10">{step.title}</h3>
                <p className="text-[12px] text-muted leading-[1.6] z-10">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link href="/register" className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider bg-foreground text-white px-7 py-3 rounded hover:bg-primary-600 transition-colors duration-200">
              Start Now — It&apos;s Free <ArrowRight size={14} />
            </Link>
          </div>

          <div className="relative my-16 border-t-[1.5px] border-dashed border-border before:content-[''] before:absolute before:-top-[7px] before:-left-[7px] before:w-3.5 before:h-3.5 before:rounded-full before:bg-background before:border-[1.5px] before:border-border after:content-[''] after:absolute after:-top-[7px] after:-right-[7px] after:w-3.5 after:h-3.5 after:rounded-full after:bg-background after:border-[1.5px] after:border-border" />
        </div>
      </section>

      {/* ─── 7. TESTIMONIALS ─── */}
      <section className="bg-background py-10 px-6">
        <div className="max-w-[960px] mx-auto">
          <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-primary-500 mb-2.5 block">Placed & Happy</span>
          <h2 className="font-display font-semibold text-[34px] tracking-tight mb-2">What candidates say</h2>
          <p className="text-muted text-sm max-w-[480px] leading-[1.6] mb-10">Records straight from the source.</p>

          <div className="flex flex-col gap-5">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.name}
                className="bg-white border border-border rounded-[14px] p-7 flex flex-col md:flex-row gap-4 md:gap-6 items-start relative overflow-hidden"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
              >
                <div className="hidden md:block absolute left-0 top-5 bottom-5 w-0 border-l-[1.5px] border-dashed border-border" />

                <span className="font-display text-[44px] leading-[0.8] text-primary-500 shrink-0 md:ml-2 mt-2 md:mt-0">&ldquo;</span>

                <div className="flex-1 w-full">
                  <p className="font-display text-[16px] leading-[1.55] text-foreground mb-4">
                    {t.text}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded border border-border overflow-hidden bg-primary-50 flex-shrink-0 grayscale opacity-80">
                        <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="text-[13px] font-semibold font-body">{t.name}</div>
                        <div className="text-[11px] text-muted font-body">{t.role}</div>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-muted tracking-wider uppercase">JM-PLC-0{231 + idx}</span>
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