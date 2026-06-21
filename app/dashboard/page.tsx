"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Code,
  Upload,
  Check,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Trash2,
  Plus,
  ArrowUpRight,
  BriefcaseBusiness,
} from "lucide-react";
import { dummyUser, dummyApplications } from "@/lib/dummy-data";

export default function Dashboard() {
  // Local states initialized from dummy data
  const [profile, setProfile] = useState(dummyUser);
  const [newSkill, setNewSkill] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle",
  );

  const [applications] = useState(dummyApplications);
  
  const togglePaymentStatus = () => {
    setProfile((prev) => ({
      ...prev,
      paymentStatus: prev.paymentStatus === "pending" ? "paid" : "pending",
    }));
  };

  // Profile Save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2500);
    }, 1000);
  };

  // Add Skill Tag
  const handleAddSkill = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newSkill.trim()) {
      e.preventDefault();
      if (!profile.skills.includes(newSkill.trim())) {
        setProfile((prev) => ({
          ...prev,
          skills: [...prev.skills, newSkill.trim()],
        }));
      }
      setNewSkill("");
    }
  };

  const handleAddSkillClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (newSkill.trim()) {
      if (!profile.skills.includes(newSkill.trim())) {
        setProfile((prev) => ({
          ...prev,
          skills: [...prev.skills, newSkill.trim()],
        }));
      }
      setNewSkill("");
    }
  };

  // Remove Skill Tag
  const handleRemoveSkill = (skillToRemove: string) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  // Mock upload action
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploading(true);
      setUploadProgress(10);

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setUploading(false);
            setProfile((p) => ({ ...p, resumeName: file.name }));
            return 100;
          }
          return prev + 30;
        });
      }, 200);
    }
  };

  // Get status color for applications table
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Accepted":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Interviewing":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Applied":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Reviewing":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Rejected":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  // WhatsApp click handler for notification
  const handleWhatsAppPaymentNotify = () => {
    const adminPhone = "919999999999";
    const text = `Hi JobMate! I've made the payment for my candidate consulting profile. Name: ${profile.name}, Email: ${profile.email}. Please verify and update my status.`;
    const waUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-brand-bg py-12 px-6">
      <div className="max-w-[680px] mx-auto flex flex-col gap-8">
        {/* DEMO TOOLBAR: Small utility to swap status easily */}
        <div className="flex items-center justify-between p-3.5 rounded-card bg-brand-accent-light/50 border border-brand-accent/30 shadow-sm">
          <span className="font-body text-xs font-semibold text-brand-accent-dark flex items-center gap-1.5">
            <CheckCircle2 size={16} /> Demo Tool: Test payment status views
          </span>
          <button
            onClick={togglePaymentStatus}
            className="font-body text-xs font-bold bg-brand-accent hover:bg-brand-accent-dark text-white px-4 py-2 rounded-pill transition-colors duration-200"
          >
            Toggle to {profile.paymentStatus === "pending" ? "Paid" : "Pending"}
          </button>
        </div>

        {/* 1. HEADER CARD */}
        <motion.div
          className="bg-brand-surface p-6 sm:p-8 rounded-card border border-brand-border shadow-card flex flex-col sm:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
            {/* Initials Avatar */}
            <div className="w-16 h-16 rounded-full bg-brand-accent-light text-brand-accent-dark font-display font-semibold text-2xl flex items-center justify-center shadow-inner">
              {profile.avatarInitials}
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl text-brand-text leading-tight">
                {profile.name}
              </h1>
              <p className="font-body text-sm text-brand-muted mt-0.5">
                {profile.email}
              </p>
            </div>
          </div>

          {/* Payment Status Badge */}
          <div>
            <span
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-pill font-body text-xs font-semibold uppercase tracking-wider border ${
                profile.paymentStatus === "paid"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-amber-50 text-amber-700 border-amber-200"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${profile.paymentStatus === "paid" ? "bg-emerald-500" : "bg-amber-500 animate-pulse"}`}
              />
              Payment: {profile.paymentStatus}
            </span>
          </div>
        </motion.div>

        {/* 2. PAYMENT STATUS NOTICE CARD */}
        <AnimatePresence mode="wait">
          {profile.paymentStatus === "pending" ? (
            <motion.div
              key="pending-notice"
              className="bg-amber-50 border border-amber-200 rounded-card p-6 shadow-sm flex flex-col gap-4"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start gap-3">
                <AlertTriangle
                  className="text-amber-600 flex-shrink-0 mt-0.5"
                  size={20}
                  strokeWidth={1.5}
                />
                <div>
                  <h3 className="font-display font-semibold text-amber-900 text-sm">
                    Placement Consulting Payment Required
                  </h3>
                  <p className="font-body text-xs text-amber-700 mt-1 leading-relaxed">
                    To activate your candidate status and enable direct
                    placement matching services, please pay the mock service
                    charge of <strong>₹499</strong> to the UPI ID below.
                  </p>
                </div>
              </div>

              <div className="bg-white/80 p-3 rounded-card-sm border border-amber-200/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="font-body text-[10px] text-amber-600 uppercase tracking-wider font-semibold block">
                    UPI Address
                  </span>
                  <span className="font-display font-semibold text-brand-text text-sm">
                    JobMate@upi
                  </span>
                </div>
                <button
                  onClick={handleWhatsAppPaymentNotify}
                  className="w-full sm:w-auto font-body font-medium flex items-center justify-center gap-1.5 bg-whatsapp hover:bg-[#1ebe5b] text-white text-xs px-4 py-2.5 rounded-pill shadow-sm transition-all duration-200 hover:-translate-y-0.5"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.472 5.358 1.473 5.568 0 10.1-4.529 10.104-10.099.002-2.699-1.047-5.234-2.951-7.138C17.256 1.487 14.73 0.439 12.004 0.439 6.438 0.439 1.91 4.966 1.906 10.537c-.001 2.115.562 4.185 1.63 6.002l-1.074 3.924 4.017-1.054-.232-.116z" />
                  </svg>
                  <span>Notify via WhatsApp</span>
                  <ArrowUpRight size={12} />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="paid-notice"
              className="bg-emerald-50 border border-emerald-200 rounded-card p-6 shadow-sm flex items-start gap-3"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <CheckCircle2
                className="text-emerald-600 flex-shrink-0 mt-0.5"
                size={20}
                strokeWidth={1.5}
              />
              <div>
                <h3 className="font-display font-semibold text-emerald-950 text-sm">
                  Candidate Consulting Active
                </h3>
                <p className="font-body text-xs text-emerald-700 mt-1 leading-relaxed">
                  Your profile has been verified and placement matching is fully
                  active. Our team is forwarding your qualifications directly to
                  hiring partners.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. PROFILE DETAILS FORM */}
        <motion.div
          className="bg-brand-surface p-6 sm:p-8 rounded-card border border-brand-border shadow-card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="font-display font-bold text-lg text-brand-text mb-6">
            Consulting Profile Details
          </h2>

          <form onSubmit={handleSaveProfile} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="font-body text-xs font-semibold text-brand-text uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted"
                  />
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    className="w-full pl-9 pr-4 py-2.5 rounded-card-sm border border-brand-border bg-brand-surface text-brand-text font-body text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="flex flex-col gap-1.5">
                <label className="font-body text-xs font-semibold text-brand-text uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted"
                  />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    className="w-full pl-9 pr-4 py-2.5 rounded-card-sm border border-brand-border bg-brand-surface text-brand-text font-body text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="font-body text-xs font-semibold text-brand-text uppercase tracking-wider">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted"
                  />
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    className="w-full pl-9 pr-4 py-2.5 rounded-card-sm border border-brand-border bg-brand-surface text-brand-text font-body text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Experience level */}
              <div className="flex flex-col gap-1.5">
                <label className="font-body text-xs font-semibold text-brand-text uppercase tracking-wider">
                  Experience
                </label>
                <div className="relative">
                  <BriefcaseBusiness
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted"
                  />
                  <select
                    value={profile.experience}
                    onChange={(e) =>
                      setProfile({ ...profile, experience: e.target.value })
                    }
                    className="w-full pl-9 pr-4 py-2.5 rounded-card-sm border border-brand-border bg-brand-surface text-brand-text font-body text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all duration-200"
                  >
                    <option value="Internship">Internship / Entry Level</option>
                    <option value="1+ Years">1+ Years Experience</option>
                    <option value="2+ Years">2+ Years Experience</option>
                    <option value="5+ Years">5+ Years Experience</option>
                    <option value="10+ Years">10+ Years Experience</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Tag-based Skills input */}
            <div className="flex flex-col gap-2">
              <label className="font-body text-xs font-semibold text-brand-text uppercase tracking-wider">
                Skills & Technologies (Press Enter to Add)
              </label>

              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <Code
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted"
                  />
                  <input
                    type="text"
                    placeholder="e.g. React, Python, Figma"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={handleAddSkill}
                    className="w-full pl-9 pr-4 py-2.5 rounded-card-sm border border-brand-border bg-brand-surface text-brand-text font-body text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all duration-200"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddSkillClick}
                  className="px-3 py-2 rounded-card-sm border border-brand-border bg-brand-bg hover:bg-brand-surface-2 text-brand-text font-body font-semibold text-xs transition-colors duration-150 flex items-center gap-1"
                >
                  <Plus size={16} /> Add
                </button>
              </div>

              {/* Tag chip Container */}
              <div className="flex flex-wrap gap-2 mt-2 p-3 bg-brand-bg rounded-card-sm border border-brand-border min-h-[50px]">
                {profile.skills.length === 0 ? (
                  <span className="font-body text-xs text-brand-muted italic self-center">
                    No skills listed yet.
                  </span>
                ) : (
                  profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-brand-accent-light text-brand-accent-dark font-body text-xs font-semibold border border-brand-accent-light"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="w-4 h-4 rounded-full bg-brand-accent-dark/10 hover:bg-brand-accent-dark/20 text-brand-accent-dark flex items-center justify-center transition-colors"
                      >
                        &times;
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Resume Upload UI */}
            <div className="flex flex-col gap-2">
              <label className="font-body text-xs font-semibold text-brand-text uppercase tracking-wider">
                Resume Document
              </label>

              <div className="border-2 border-dashed border-brand-border hover:border-brand-accent rounded-card p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors duration-200 relative bg-brand-bg/50">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                {uploading ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full border-4 border-brand-accent-light border-t-brand-accent animate-spin" />
                    <span className="font-body text-xs text-brand-muted">
                      Simulating Upload {uploadProgress}%
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload
                      size={24}
                      className="text-brand-accent"
                      strokeWidth={1.5}
                    />
                    <span className="font-body text-sm font-semibold text-brand-text">
                      Upload new resume
                    </span>
                    <span className="font-body text-xs text-brand-muted">
                      Support: PDF, DOC, DOCX up to 5MB
                    </span>
                  </div>
                )}
              </div>

              {/* Uploaded File display */}
              {profile.resumeName && (
                <div className="flex items-center justify-between p-3.5 bg-brand-surface rounded-card-sm border border-brand-border">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText
                      size={18}
                      className="text-brand-accent flex-shrink-0"
                    />
                    <span className="font-body text-xs font-semibold text-brand-text truncate">
                      {profile.resumeName}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setProfile((p) => ({ ...p, resumeName: "" }))
                    }
                    className="text-brand-muted hover:text-error transition-colors p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="border-t border-brand-border pt-6 flex items-center justify-end gap-3">
              <button
                type="submit"
                disabled={saveStatus === "saving"}
                className="font-body font-medium bg-brand-accent hover:bg-brand-accent-dark disabled:bg-brand-accent/70 text-white px-6 py-2.5 rounded-pill shadow-sm transition-all duration-200 flex items-center gap-2 hover:-translate-y-0.5"
              >
                {saveStatus === "saving" ? (
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                ) : saveStatus === "saved" ? (
                  <>
                    <Check size={16} />
                    <span>Saved Successfully</span>
                  </>
                ) : (
                  <span>Save Profile</span>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* 4. APPLICATIONS TABLE */}
        <motion.div
          className="bg-brand-surface p-6 sm:p-8 rounded-card border border-brand-border shadow-card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-display font-bold text-lg text-brand-text mb-4">
            My Applications
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-brand-border font-body text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  <th className="pb-3 pr-4">Job Title</th>
                  <th className="pb-3 pr-4">Company</th>
                  <th className="pb-3 pr-4">Date Applied</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border font-body text-sm text-brand-text">
                {applications.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-brand-bg/40 transition-colors"
                  >
                    <td className="py-3.5 pr-4 font-semibold text-brand-text">
                      {app.jobTitle}
                    </td>
                    <td className="py-3.5 pr-4 text-brand-muted">
                      {app.company}
                    </td>
                    <td className="py-3.5 pr-4 text-brand-muted">
                      {app.appliedDate}
                    </td>
                    <td className="py-3.5 text-right">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-pill text-[10px] font-semibold border ${getStatusStyle(app.status)}`}
                      >
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
