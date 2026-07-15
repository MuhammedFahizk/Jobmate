"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitSuccessful(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setIsSubmitSuccessful(false), 5000);
    }, 1000);
  };

  const handleWhatsAppQuickChat = () => {
    const text = encodeURIComponent("Hi JobMate / M Cube Services, I have a support query regarding your consulting plans.");
    window.open(`https://wa.me/919207543772?text=${text}`, "_blank");
  };

  return (
    <div className="bg-background min-h-screen font-body overflow-hidden py-12 md:py-20">
      <div className="max-w-[1000px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        
        {/* Left Side: Contact Information Cards */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <span className="inline-flex px-3 py-1.5 rounded-pill bg-primary-100 text-primary-700 text-xs font-semibold uppercase tracking-wider self-start shadow-sm">
              Contact Center
            </span>
            <h1 className="font-display text-4xl font-bold tracking-tight text-foreground leading-tight">
              Get in Touch with Us
            </h1>
            <p className="font-body text-sm text-muted leading-relaxed">
              Have questions about our ₹199 placement plan, or need to hire home staffing helpers in Kozhikode? Speak directly with our NIT Kattangal coordinators.
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            {/* Phone */}
            <div className="bg-white p-5 rounded-card border border-border shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-card-sm bg-primary-100 text-primary-700 flex items-center justify-center flex-shrink-0">
                <Phone size={18} strokeWidth={1.5} />
              </div>
              <div>
                <span className="font-body text-[10px] text-muted uppercase tracking-wider font-semibold">Direct Call</span>
                <a href="tel:+919207543772" className="font-display font-semibold text-sm text-foreground block hover:text-primary-500 transition-colors">
                  9207 543 772
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white p-5 rounded-card border border-border shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-card-sm bg-primary-100 text-primary-700 flex items-center justify-center flex-shrink-0">
                <Mail size={18} strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <span className="font-body text-[10px] text-muted uppercase tracking-wider font-semibold">Email support</span>
                <a href="mailto:mcubeservicesclt@gmail.com" className="font-display font-semibold text-sm text-foreground block hover:text-primary-500 transition-colors truncate">
                  mcubeservicesclt@gmail.com
                </a>
              </div>
            </div>

            {/* Office Address */}
            <div className="bg-white p-5 rounded-card border border-border shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-card-sm bg-primary-100 text-primary-700 flex items-center justify-center flex-shrink-0">
                <MapPin size={18} strokeWidth={1.5} />
              </div>
              <div>
                <span className="font-body text-[10px] text-muted uppercase tracking-wider font-semibold">Office Location</span>
                <span className="font-display font-semibold text-sm text-foreground block leading-snug">
                  NIT Kattangal, Calicut, Kerala
                </span>
              </div>
            </div>
          </div>

          {/* Quick WhatsApp chat CTA */}
          <button
            onClick={handleWhatsAppQuickChat}
            className="w-full font-body font-medium flex items-center justify-center gap-2 bg-whatsapp hover:bg-[#1ebe5b] text-white py-3.5 rounded-pill shadow-card transition-all duration-200 hover:-translate-y-0.5"
          >
            <MessageSquare size={18} />
            <span>Chat with Placement Manager</span>
          </button>
        </div>

        {/* Right Side: Interactive Mock Form Card */}
        <div className="lg:col-span-7">
          <motion.div
            className="bg-white p-8 sm:p-10 rounded-card border border-border shadow-card h-full flex flex-col justify-between"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div>
              <h2 className="font-display font-bold text-lg text-foreground mb-2">
                Send a Message
              </h2>
              <p className="font-body text-xs text-muted mb-6">
                Fill out the form below and M Cube Services customer support will get back to you within 24 hours.
              </p>

              <AnimatePresence>
                {isSubmitSuccessful && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-card-sm bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center gap-3 mb-6"
                  >
                    <CheckCircle className="text-emerald-600 flex-shrink-0" size={18} />
                    <span className="font-body text-xs font-semibold">Message sent successfully! We will contact you soon.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="font-body text-xs font-semibold text-foreground uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Michael Darwin"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-card-sm border border-border bg-white text-foreground font-body text-sm placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="font-body text-xs font-semibold text-foreground uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="michael@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-card-sm border border-border bg-white text-foreground font-body text-sm placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="font-body text-xs font-semibold text-foreground uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    placeholder="e.g. Help with UPI payment verification"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-card-sm border border-border bg-white text-foreground font-body text-sm placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="font-body text-xs font-semibold text-foreground uppercase tracking-wider">
                    Message Details
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Describe your query in detail..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-card-sm border border-border bg-white text-foreground font-body text-sm placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 font-body font-medium bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500/70 text-white py-3 rounded-pill shadow-sm transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5"
                >
                  {loading ? (
                    <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <span>Send Support Ticket</span>
                      <Send size={14} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
