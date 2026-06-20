"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, DollarSign, Calendar, MessageSquare, ArrowUpRight } from "lucide-react";

export default function Careers() {
  const openings = [
    {
      id: "MC-CAR-01",
      title: "Placement Coordinator",
      department: "Client Placements",
      location: "NIT Kattangal, Calicut",
      salary: "₹18,000 - ₹25,000 / month",
      type: "Full-time",
      description: "Manage candidate registration profiles, check resume formats, filter job vacancies, and manage direct communications with corporate partners on WhatsApp.",
      requirements: ["Strong communication in Malayalam and English", "Basic knowledge of Excel & Google Docs", "Customer support or recruitment experience is a plus"],
    },
    {
      id: "MC-CAR-02",
      title: "Home Care Field Supervisor",
      department: "M Cube Home Staffing",
      location: "Kozhikode, India",
      salary: "₹20,000 - ₹28,000 / month",
      type: "Full-time",
      description: "Conduct candidate background check verifications, coordinate schedule matches, visit household clients in Mavoor/Mukkam, and manage elder care emergency schedules.",
      requirements: ["Must own a two-wheeler with a valid license", "Great organizational skills", "Background in social work or operations is preferred"],
    },
    {
      id: "MC-CAR-03",
      title: "Junior Frontend Developer",
      department: "Technology",
      location: "Remote / NIT Kattangal",
      type: "Internship (6 Months)",
      salary: "₹8,000 - ₹12,000 / month",
      description: "Optimize web interface performance, maintain candidate dashboards, hook up form details, and add animations under senior engineer supervision.",
      requirements: ["Strong skills in Next.js/React, TypeScript, and Tailwind CSS", "Experience with Framer Motion and Git", "Ability to write clean, modular component code"],
    },
  ];

  const handleWhatsAppApply = (jobTitle: string) => {
    const adminPhone = "919207543772";
    const text = `Hi M Cube Services! I want to apply for the internal position "${jobTitle}". Please let me know how to submit my CV.`;
    const waUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-brand-bg min-h-screen font-body overflow-hidden py-12 md:py-20">
      <div className="max-w-[1000px] mx-auto px-6">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-6 mb-16">
          <span className="inline-flex px-3 py-1.5 rounded-pill bg-brand-accent-light text-brand-accent-dark text-xs font-semibold uppercase tracking-wider shadow-sm">
            Join Our Team
          </span>
          <h1 className="font-display text-4xl font-bold tracking-tight text-brand-text max-w-xl leading-tight">
            Build Your Career with <span className="bg-gradient-to-r from-brand-accent-dark to-brand-accent bg-clip-text text-transparent">M Cube Services</span>
          </h1>
          <p className="font-body text-base text-brand-muted max-w-lg leading-relaxed">
            Help us build the optimal solution for employment in Kerala. We are looking for placement coordinators, coordinators, developers, and field leaders.
          </p>
        </div>

        {/* Vacancies List */}
        <motion.div
          className="flex flex-col gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {openings.map((job) => (
            <motion.div
              key={job.id}
              variants={itemVariants}
              className="bg-brand-surface p-6 sm:p-8 rounded-card border border-brand-border shadow-card flex flex-col gap-6 relative overflow-hidden"
            >
              {/* Type Badge top-right */}
              <div className="absolute top-6 right-6 inline-flex px-3 py-1 rounded-pill bg-brand-accent-light text-brand-accent-dark text-xs font-semibold border border-brand-accent-light">
                {job.type}
              </div>

              {/* Title & Metadata */}
              <div className="flex flex-col gap-1.5 pr-28">
                <span className="font-body text-[10px] uppercase tracking-wider font-semibold text-brand-accent-dark">
                  {job.department}
                </span>
                <h3 className="font-display font-bold text-brand-text text-lg sm:text-xl leading-tight">
                  {job.title}
                </h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-body text-xs text-brand-muted mt-1.5">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} className="text-brand-accent" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign size={14} className="text-brand-accent" /> {job.salary}
                  </span>
                </div>
              </div>

              <hr className="border-brand-border/60" />

              {/* Description & Requirements */}
              <div className="flex flex-col gap-4">
                <p className="font-body text-xs sm:text-sm text-brand-muted leading-relaxed">
                  {job.description}
                </p>
                <div className="flex flex-col gap-1.5">
                  <span className="font-body text-xs font-bold text-brand-text">Key Requirements:</span>
                  <ul className="list-disc pl-5 font-body text-xs text-brand-muted flex flex-col gap-1">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-brand-border/60 pt-4 flex items-center justify-end">
                <button
                  onClick={() => handleWhatsAppApply(job.title)}
                  className="font-body font-medium flex items-center justify-center gap-1.5 bg-whatsapp hover:bg-[#1ebe5b] text-white text-xs px-5 py-2.5 rounded-pill shadow-sm transition-all duration-200 hover:-translate-y-0.5"
                >
                  <MessageSquare size={14} />
                  <span>Apply via WhatsApp</span>
                  <ArrowUpRight size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
