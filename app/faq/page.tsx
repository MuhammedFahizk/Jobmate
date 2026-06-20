"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare, ShieldCheck, CreditCard } from "lucide-react";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is the fee for Job Placement Consulting?",
      answer: "We charge a minimal consulting registration fee of ₹199 (reduced from ₹499 for a limited time) for candidate verification and CV preparation at our NIT Kattangal center. We do not take cut-percentages from your starting salary.",
      category: "Job Consulting",
      icon: CreditCard,
    },
    {
      question: "How do I apply for jobs on JOBMATE?",
      answer: "Once you browse the vacancies on our Jobs page, simply click the 'Apply' or 'Quick Apply' button. This automatically opens a pre-formatted chat with M Cube placement officers on WhatsApp with your name and job code. No portals required!",
      category: "Job Consulting",
      icon: MessageSquare,
    },
    {
      question: "Are the home nursing and housekeeping staff verified?",
      answer: "Yes, absolutely. Under our M Cube Home Staffing division, we execute reference checks, background evaluations, and document collection (Aadhaar/police check verification) to ensure absolute safety for Kozhikode families.",
      category: "Home Staffing",
      icon: ShieldCheck,
    },
    {
      question: "Which locations in Kozhikode do you support for domestic staff?",
      answer: "We support home nurses and housekeeping placements in Mukkam, Mavoor, Kunnamangalam, Omassery, Koduvalli, Kutikattur, and around the Medical College area. Replacement support is guaranteed.",
      category: "Home Staffing",
      icon: HelpCircle,
    },
    {
      question: "What happens after I send a WhatsApp application?",
      answer: "Our placement coordinators at NIT Kattangal will verify your request, check your dashboard credentials, and match your CV with the hiring manager. Typically, you will hear back regarding interviews within 48 hours.",
      category: "Job Consulting",
      icon: HelpCircle,
    },
    {
      question: "Can I edit my resume or skills list after registering?",
      answer: "Yes. Simply login and go to your Candidate Dashboard. There, you can edit your experience, upload a new PDF document, and add or delete technology tags on the fly. Changes reflect instantly.",
      category: "General",
      icon: HelpCircle,
    },
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-brand-bg min-h-screen font-body overflow-hidden py-12 md:py-20">
      <div className="max-w-[800px] mx-auto px-6">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-6 mb-16">
          <span className="inline-flex px-3 py-1.5 rounded-pill bg-brand-accent-light text-brand-accent-dark text-xs font-semibold uppercase tracking-wider shadow-sm">
            Help Center
          </span>
          <h1 className="font-display text-4xl font-bold tracking-tight text-brand-text">
            Frequently Asked Questions
          </h1>
          <p className="font-body text-base text-brand-muted max-w-lg leading-relaxed">
            Find answers to commonly asked questions about registration, fees, background checks, and home care placements.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-brand-surface border border-brand-border rounded-card overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-brand-bg/40 focus:outline-none transition-colors duration-150"
                >
                  <div className="flex items-center gap-4 min-w-0 pr-4">
                    <div className="w-10 h-10 rounded-card-sm bg-brand-accent-light text-brand-accent-dark flex items-center justify-center flex-shrink-0">
                      <faq.icon size={18} strokeWidth={1.5} />
                    </div>
                    <div className="min-w-0">
                      <span className="font-body text-[9px] uppercase tracking-wider font-semibold text-brand-accent-dark block mb-1">
                        {faq.category}
                      </span>
                      <h3 className="font-display font-semibold text-brand-text text-sm sm:text-base leading-tight">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  <div className="text-brand-muted flex-shrink-0">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 pl-16 border-t border-brand-border/40 font-body text-xs sm:text-sm text-brand-muted leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
