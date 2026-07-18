"use client";

import { motion } from "framer-motion";
import { 
  HeartHandshake, 
  Home, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Shield, 
  UserCheck, 
  Headphones, 
  Phone, 
  Mail 
} from "lucide-react";

export default function HomeStaffing() {
  const staffTypes = [
    {
      title: "Home Nurses",
      badge: "10 Vacancies",
      badgeClass: "bg-pink-50 text-pink-700 border-pink-100",
      description: "Qualified caretakers for elder care, patient care, and post-hospitalisation nursing support.",
      icon: HeartHandshake,
      message: "Hi JobMate / M Cube Services, I would like to enquire about hiring a Home Nurse."
    },
    {
      title: "Housekeeping Live-in",
      badge: "10 Vacancies",
      badgeClass: "bg-blue-50 text-blue-700 border-blue-100",
      description: "Full-time domestic workers for cooking, deep cleaning, laundry, and daily household management.",
      icon: Home,
      message: "Hi JobMate / M Cube Services, I would like to enquire about Live-in Housekeeping staff."
    },
    {
      title: "Office Cleaning Kozhikode",
      badge: "Open Positions",
      badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-100",
      description: "Professional cleaning crews for workspace upkeep, corporate dusting, and routine sanitation.",
      icon: Sparkles,
      message: "Hi JobMate / M Cube Services, I would like to enquire about Office Cleaning services in Kozhikode."
    },
  ];

  const plans = [
    {
      title: "Daily",
      subtitle: "Every Day Support",
      description: "Consistent support structure for elderly patients, babies, or full-scale housekeeping. Available on live-in or day shift basis.",
    },
    {
      title: "Alternate Days",
      subtitle: "Every Other Day Care",
      description: "Ideal plan for managing regular chores, laundry, and housekeeping support without requiring full-time daily personnel.",
    },
    {
      title: "Once a Week",
      subtitle: "Weekly Deep Clean",
      description: "Perfect for deep dusting, floor polishing, and thorough cleaning of bathrooms, kitchens, and common rooms.",
    },
  ];

  const areas = [
    "Mukkam",
    "Mavoor",
    "Kunnamangalam",
    "Omassery",
    "Koduvalli",
    "Kutikattur",
    "Medical College",
  ];

  const trustFactors = [
    {
      title: "Background Verified",
      description: "We complete rigorous reference checks, local verification, and paperwork review for every helper.",
      icon: Shield,
    },
    {
      title: "Direct Match",
      description: "Get matching profiles tailored specifically to your family's language, shift, and work requirements.",
      icon: UserCheck,
    },
    {
      title: "Ongoing Support",
      description: "We handle staffing replacements, shift schedules, and query support to keep your home functioning smoothly.",
      icon: Headphones,
    },
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

  const handleWhatsAppChat = (customText?: string) => {
    const defaultText = "Hi JobMate / M Cube Services, I would like to enquire about Home Staffing / Home Nurse services.";
    const text = encodeURIComponent(customText || defaultText);
    window.open(`https://wa.me/919207543772?text=${text}`, "_blank");
  };

  return (
    <div className="bg-brand-bg min-h-screen font-body overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-[#EBF5FF] to-brand-bg px-6 py-20 md:py-28 border-b border-brand-border/60">
        <div className="absolute right-0 top-1/4 w-[350px] h-[350px] rounded-full bg-blue-100/40 blur-[80px] pointer-events-none -z-10" />
        <div className="absolute left-10 bottom-10 w-[200px] h-[200px] rounded-full bg-blue-50/50 blur-[50px] pointer-events-none -z-10" />

        <div className="max-w-[1200px] mx-auto text-center flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-blue-50 text-blue-700 border border-blue-100 text-xs font-semibold uppercase tracking-wider shadow-sm"
          >
            Verified Home Placement Services
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.1] text-brand-text max-w-3xl tracking-tight"
          >
            Trusted Help for <span className="font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">Your Home</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-base sm:text-lg text-brand-muted max-w-xl leading-relaxed"
          >
            Hire qualified home nurses, professional housekeeping staff, and live-in helpers in the Kozhikode area. Reliable, reference-verified placement support.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mt-2"
          >
            <button
              onClick={() => handleWhatsAppChat()}
              className="font-body font-medium flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white px-8 py-3.5 rounded-pill shadow-card transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 text-center"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.472 5.358 1.473 5.568 0 10.1-4.529 10.104-10.099.002-2.699-1.047-5.234-2.951-7.138C17.256 1.487 14.73 0.439 12.004 0.439 6.438 0.439 1.91 4.966 1.906 10.537c-.001 2.115.562 4.185 1.63 6.002l-1.074 3.924 4.017-1.054-.232-.116z" />
              </svg>
              <span>Book via WhatsApp</span>
            </button>
            
            <a
              href="tel:+919207543772"
              className="font-body font-medium flex items-center justify-center gap-2 border border-brand-border bg-brand-surface hover:bg-brand-bg text-brand-text px-8 py-3.5 rounded-pill shadow-sm transition-all duration-200 hover:-translate-y-0.5 text-center"
            >
              <Phone size={16} strokeWidth={1.5} />
              <span>Call 9207 543 772</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. STAFF TYPES GRID SECTION */}
      <section className="py-20 px-6 bg-brand-surface border-b border-brand-border/60">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-md mx-auto mb-16">
            <span className="font-body font-semibold text-blue-600 uppercase tracking-wider text-xs block mb-2">
              Staff Categories
            </span>
            <h2 className="font-display text-3xl font-bold text-brand-text tracking-tight">
              Home Care Profiles
            </h2>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {staffTypes.map((staff, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className="relative bg-brand-bg border border-brand-border p-8 rounded-card flex flex-col items-start gap-4 transition-all duration-200 hover:shadow-card"
              >
                {/* Vacancy badge top-right */}
                <span className={`absolute top-6 right-6 inline-flex px-2.5 py-0.5 rounded-pill text-[10px] font-semibold border ${staff.badgeClass}`}>
                  {staff.badge}
                </span>

                <div className="w-12 h-12 rounded-card-sm bg-blue-50 text-blue-600 flex items-center justify-center mt-2">
                  <staff.icon size={22} strokeWidth={1.5} />
                </div>
                
                <h3 className="font-display font-semibold text-brand-text text-lg">
                  {staff.title}
                </h3>
                
                <p className="font-body text-sm text-brand-muted leading-relaxed mb-4">
                  {staff.description}
                </p>

                <button
                  onClick={() => handleWhatsAppChat(staff.message)}
                  className="mt-auto font-body text-xs font-semibold border border-brand-border bg-brand-surface hover:bg-blue-50 text-brand-text hover:text-blue-700 px-4 py-2.5 rounded-pill transition-colors duration-200 flex items-center gap-1.5"
                >
                  Enquire on WhatsApp
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. SERVICE PLANS SECTION */}
      <section className="py-20 px-6 bg-brand-bg border-b border-brand-border/60">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-md mx-auto mb-16">
            <span className="font-body font-semibold text-blue-600 uppercase tracking-wider text-xs block mb-2">
              Flexible Schedules
            </span>
            <h2 className="font-display text-3xl font-bold text-brand-text tracking-tight">
              Our Service Plans
            </h2>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {plans.map((plan, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className="bg-brand-surface border border-brand-border p-8 rounded-card flex flex-col items-center text-center gap-4 transition-all duration-200 hover:shadow-card hover:border-blue-100"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Calendar size={22} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-display font-semibold text-brand-text text-lg">
                    {plan.title}
                  </h3>
                  <span className="font-body text-xs font-medium text-blue-600 uppercase tracking-wider">
                    {plan.subtitle}
                  </span>
                </div>
                <p className="font-body text-xs text-brand-muted leading-relaxed">
                  {plan.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. SERVICE AREAS */}
      <section className="py-16 px-6 bg-brand-surface border-b border-brand-border/60">
        <div className="max-w-[1200px] mx-auto text-center">
          <span className="font-body font-semibold text-blue-600 uppercase tracking-wider text-xs block mb-4">
            Service Zone
          </span>
          <h2 className="font-display text-2xl font-bold text-brand-text tracking-tight mb-8">
            Kozhikode Service Areas
          </h2>

          <motion.div 
            className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {areas.map((area) => (
              <motion.div
                key={area}
                variants={itemVariants}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-pill bg-blue-50 border border-blue-100 font-body text-sm font-semibold text-blue-700 shadow-sm"
              >
                <MapPin size={14} className="text-blue-600" strokeWidth={1.5} />
                <span>{area}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. WHY FAMILIES TRUST US */}
      <section className="py-20 px-6 bg-brand-bg border-b border-brand-border/60">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-md mx-auto mb-16">
            <span className="font-body font-semibold text-blue-600 uppercase tracking-wider text-xs block mb-2">
              Why Choose Us
            </span>
            <h2 className="font-display text-3xl font-bold text-brand-text tracking-tight">
              Why Families Trust Us
            </h2>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {trustFactors.map((factor, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-brand-surface border border-brand-border p-8 rounded-card flex flex-col items-start gap-4"
              >
                <div className="w-12 h-12 rounded-card-sm bg-blue-50 text-blue-600 flex items-center justify-center">
                  <factor.icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="font-display font-semibold text-brand-text text-lg">
                  {factor.title}
                </h3>
                <p className="font-body text-sm text-brand-muted leading-relaxed">
                  {factor.description}
                </p>
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
            className="relative overflow-hidden bg-gradient-to-r from-blue-700 to-blue-500 rounded-card p-10 md:p-14 text-white text-center shadow-card-hover"
          >
            {/* Blurry circular background accents */}
            <div className="absolute -left-16 -top-16 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />
            <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />

            <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center gap-5">
              <h2 className="font-display text-3xl font-bold tracking-tight">
                Book Home Staff Today
              </h2>
              <p className="font-body text-white/90 text-sm max-w-md leading-relaxed">
                Connect with our consultants to schedule home nurses or helpers. Quick screening and background-verified profiles.
              </p>
              
              <button
                onClick={() => handleWhatsAppChat()}
                className="mt-2 font-body font-medium flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white px-8 py-3.5 rounded-pill shadow-card transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.472 5.358 1.473 5.568 0 10.1-4.529 10.104-10.099.002-2.699-1.047-5.234-2.951-7.138C17.256 1.487 14.73 0.439 12.004 0.439 6.438 0.439 1.91 4.966 1.906 10.537c-.001 2.115.562 4.185 1.63 6.002l-1.074 3.924 4.017-1.054-.232-.116z" />
                </svg>
                <span>Book via WhatsApp</span>
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
