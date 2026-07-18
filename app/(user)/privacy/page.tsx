"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Eye, Lock, FileKey2, RefreshCw } from "lucide-react";

export default function Privacy() {
  const policies = [
    {
      title: "1. Information We Collect",
      description: "We collect candidate details like your name, email address, phone number, work experience, lists of skills, and resume documents. For Home Staffing, we collect Aadhaar verification files and reference letters.",
      icon: Eye,
    },
    {
      title: "2. How We Use Data",
      description: "Your details are processed to matching qualification profiles with verified employers. We do not sell or lease candidate details to advertising agencies or outside third parties.",
      icon: RefreshCw,
    },
    {
      title: "3. WhatsApp Communications",
      description: "By applying via WhatsApp or clicking chat lines, you consent to coordinate with M Cube placement managers. Pre-formatted apply messages contain only basic parameters (job ID, name, profile code).",
      icon: FileKey2,
    },
    {
      title: "4. Security & Storage",
      description: "Consulting files, verified Aadhaar credentials, and CV records are encrypted and stored safely. Candidate dashboard records can be deleted completely by filing a deletion ticket to support.",
      icon: Lock,
    },
  ];

  return (
    <div className="bg-brand-bg min-h-screen font-body py-12 md:py-20">
      <div className="max-w-[800px] mx-auto px-6 flex flex-col gap-12">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-brand-accent-light text-brand-accent-dark flex items-center justify-center mb-2">
            <ShieldAlert size={24} strokeWidth={1.5} />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-brand-text">
            Privacy Policy
          </h1>
          <p className="font-body text-xs sm:text-sm text-brand-muted max-w-md mt-1 leading-relaxed">
            Effective Date: June 20, 2026. This policy explains how JOBMATE (M Cube Services) handles candidate and client files.
          </p>
        </div>

        {/* Introduction Card */}
        <div className="bg-brand-surface p-6 sm:p-8 rounded-card border border-brand-border shadow-sm font-body text-xs sm:text-sm text-brand-muted leading-relaxed flex flex-col gap-3">
          <p>
            Welcome to JOBMATE. We operate placement consulting services based at <strong>NIT Kattangal, Kozhikode</strong> under the parent company name <strong>M Cube Services</strong>. We value the trust you place in us when sharing your resume and home nurse staffing requirements.
          </p>
          <p>
            This Privacy Policy describes our practices regarding collection, use, security, and disclosure of details collected from users registering on our website or applying via our direct WhatsApp placement lines.
          </p>
        </div>

        {/* Policies Grid */}
        <div className="flex flex-col gap-6">
          {policies.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-brand-surface p-6 rounded-card border border-brand-border shadow-sm flex gap-4"
            >
              <div className="w-10 h-10 rounded-card-sm bg-brand-accent-light text-brand-accent-dark flex items-center justify-center flex-shrink-0">
                <p.icon size={20} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-display font-semibold text-brand-text text-base">
                  {p.title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-brand-muted leading-relaxed">
                  {p.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Contact note */}
        <div className="text-center font-body text-xs text-brand-muted mt-4 border-t border-brand-border/60 pt-8">
          Have privacy questions? Reach out to M Cube Services Compliance Officer at{" "}
          <a href="mailto:mcubeservicesclt@gmail.com" className="font-semibold text-brand-accent hover:text-brand-accent-dark hover:underline">
            mcubeservicesclt@gmail.com
          </a>{" "}
          or visit NIT Kattangal corporate office.
        </div>

      </div>
    </div>
  );
}
