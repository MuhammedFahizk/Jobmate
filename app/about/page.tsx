"use client";

import { motion } from "framer-motion";
import { Users, Building, ShieldCheck, Target, MapPin, Award } from "lucide-react";

export default function About() {
  const values = [
    {
      title: "Direct Placement",
      description: "We bypass long-drawn resume filters, connecting jobseekers directly with hiring companies via WhatsApp.",
      icon: Users,
    },
    {
      title: "Absolute Integrity",
      description: "Every listing, candidate background, and service detail is vetted. No hidden placement fees beyond our clear ₹199 plan.",
      icon: ShieldCheck,
    },
    {
      title: "Kerala Focus",
      description: "Delivering dedicated employment support for Kozhikode, Kochi, Thrissur, Thiruvananthapuram, and rural communities.",
      icon: Target,
    },
    {
      title: " NIT Kattangal Born",
      description: "Founded and nurtured at NIT Kattangal, Calicut, matching high-tier talent with startups and enterprises.",
      icon: Award,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div className="bg-brand-bg min-h-screen font-body overflow-hidden py-12 md:py-20">
      <div className="max-w-[1000px] mx-auto px-6 flex flex-col gap-16">
        
        {/* Hero Section */}
        <div className="text-center flex flex-col items-center gap-6">
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex px-3 py-1.5 rounded-pill bg-brand-accent-light text-brand-accent-dark text-xs font-semibold uppercase tracking-wider shadow-sm"
          >
            Our Mission & Slogan
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-brand-text max-w-2xl leading-[1.15]"
          >
            The Optimal Solution For <span className="bg-gradient-to-r from-brand-accent-dark to-brand-accent bg-clip-text text-transparent">Employment</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-brand-muted max-w-xl leading-relaxed"
          >
            JOBMATE (operated by M Cube Services) was founded with a single goal: to remove the friction from job hunting and helper recruiting in Kerala.
          </motion.p>
        </div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-brand-surface p-8 sm:p-12 rounded-card border border-brand-border shadow-card grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
        >
          <div className="md:col-span-7 flex flex-col gap-4">
            <span className="font-body text-xs font-bold text-brand-accent uppercase tracking-wider">
              The Journey
            </span>
            <h2 className="font-display text-2xl font-bold text-brand-text">
              From NIT Kattangal to All of Kerala
            </h2>
            <p className="font-body text-sm text-brand-muted leading-relaxed">
              M Cube Services started as a small student recruitment cell based in NIT Kattangal, Calicut. We realized that local candidates and local businesses faced a unique challenge: despite having opportunities, they lacked a rapid, direct medium to connect.
            </p>
            <p className="font-body text-sm text-brand-muted leading-relaxed">
              By introducing instant WhatsApp placement applications under our JobMate brand, we enabled candidates to apply for vacancies with the tap of a button, boosting placement speed by 300% and helping hundreds get placed.
            </p>
          </div>
          <div className="md:col-span-5 bg-brand-surface-2 p-6 rounded-card border border-brand-border flex flex-col gap-4">
            <div className="flex items-center gap-2 text-brand-accent-dark">
              <MapPin size={18} />
              <span className="font-display font-semibold text-sm">Corporate Office</span>
            </div>
            <div className="text-xs text-brand-text font-body leading-relaxed flex flex-col gap-1">
              <span className="font-bold">M Cube Services / JOBMATE</span>
              <span>Near National Institute of Technology Calicut</span>
              <span>Kattangal, Kozhikode</span>
              <span>Kerala - 673601</span>
              <span className="mt-2 text-brand-accent-dark font-semibold">Phone: +91 9207 543 772</span>
            </div>
          </div>
        </motion.div>

        {/* Values Grid */}
        <div>
          <div className="text-center mb-12">
            <span className="font-body text-xs font-semibold text-brand-accent uppercase tracking-wider block mb-2">
              Our Pillars
            </span>
            <h2 className="font-display text-2xl font-bold text-brand-text">
              Core Principles We Live By
            </h2>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {values.map((val, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-brand-surface border border-brand-border p-6 rounded-card flex gap-4 hover:shadow-card transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-card-sm bg-brand-accent-light text-brand-accent-dark flex items-center justify-center flex-shrink-0">
                  <val.icon size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-brand-text text-base">
                    {val.title}
                  </h3>
                  <p className="font-body text-xs text-brand-muted mt-1 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
