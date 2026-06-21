"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  MapPin, 
   
  Grid, 
  List, 
  AlertCircle,
  Clock,
  BriefcaseBusiness
} from "lucide-react";
import { dummyJobs, dummyUser, Job } from "@/lib/dummy-data";

// Helper component that uses search parameters
function JobsListContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const types = ["All", ...Array.from(new Set(dummyJobs.map(job => job.type)))];

 useEffect(() => {
  const applyJobId = searchParams.get("apply");
  if (applyJobId) {
    const job = dummyJobs.find(j => j.id === applyJobId);
    if (job) {
      handleWhatsAppApply(job);
      router.replace("/jobs");
    }
  }
}, [searchParams, router]);

  const handleWhatsAppApply = (job: Job) => {
    const adminPhone = "919999999999";
    const text = `Hi JobMate! I want to apply for the job "${job.title}" (ID: ${job.id}) at ${job.company}. My name is ${dummyUser.name}. Please review my application.`;
    const waUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
  };

  // Filter logic
  const filteredJobs = dummyJobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = selectedType === "All" || job.type === selectedType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      {/* Page Title & Intro */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-brand-text mb-2">
          Available Job Listings
        </h1>
        <p className="font-body text-sm text-brand-muted">
          Browse through {dummyJobs.length} job opportunities. Filter by role or job type, and apply directly via WhatsApp.
        </p>
      </div>

      {/* Sticky Inline Filter Bar */}
      <div className="sticky top-[64px] z-40 bg-brand-bg/85 backdrop-blur-md py-4 mb-8 border-b border-brand-border flex flex-col md:flex-row items-stretch md:items-center gap-4">
        {/* Search Input */}
        <div className="relative flex-grow">
          <Search size={18} strokeWidth={1.5} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" />
          <input
            type="text"
            placeholder="Search by job title, company, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-card-sm border border-brand-border bg-brand-surface text-brand-text font-body text-sm placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all duration-200"
          />
        </div>

        {/* Type Dropdown */}
        <div className="relative min-w-[140px]">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-3 py-2.5 rounded-card-sm border border-brand-border bg-brand-surface text-brand-text font-body text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all duration-200"
          >
            <option value="All">All Types</option>
            {types.filter(t => t !== "All").map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Grid/List View Toggle */}
        <div className="flex items-center border border-brand-border rounded-card-sm overflow-hidden bg-brand-surface self-end md:self-auto">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2.5 transition-colors duration-200 ${viewMode === "grid" ? "bg-brand-surface-2 text-brand-accent-dark" : "text-brand-muted hover:bg-brand-bg"}`}
            title="Grid View"
          >
            <Grid size={18} strokeWidth={1.5} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2.5 transition-colors duration-200 ${viewMode === "list" ? "bg-brand-surface-2 text-brand-accent-dark" : "text-brand-muted hover:bg-brand-bg"}`}
            title="List View"
          >
            <List size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Jobs Container */}
      <AnimatePresence mode="popLayout">
        {filteredJobs.length === 0 ? (
          /* Empty State */
          <motion.div
            key="empty-state"
            className="bg-brand-surface border border-brand-border rounded-card p-12 text-center max-w-md mx-auto my-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <AlertCircle size={48} className="text-brand-accent mx-auto mb-4" strokeWidth={1.5} />
            <h3 className="font-display font-semibold text-brand-text text-lg mb-2">No jobs match your search</h3>
            <p className="font-body text-sm text-brand-muted mb-6">
              Try adjusting your filter settings or search terms to browse other available positions.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedType("All");
              }}
              className="font-body text-sm font-semibold bg-brand-surface-2 border border-brand-border hover:bg-brand-accent-light hover:text-brand-accent-dark text-brand-text px-5 py-2.5 rounded-pill transition-colors duration-200"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : viewMode === "grid" ? (
          /* Grid View Layout */
          <motion.div
            key="grid-layout"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
            }}
          >
            {filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                layout
                className="bg-brand-surface p-6 rounded-card border border-brand-border shadow-card flex flex-col justify-between hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group"
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                {/* Status indicator absolute corner */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${job.status === "active" ? "bg-success animate-pulse" : "bg-error"}`} />
                  <span className="font-body text-[10px] font-semibold text-brand-muted uppercase tracking-wider">
                    {job.status}
                  </span>
                </div>

                <div>
                  {/* Job Logo & Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-card-sm ${job.logoBg} font-display font-semibold text-base flex items-center justify-center flex-shrink-0`}>
                      {job.company.substring(0, 1)}
                    </div>
                    <div className="min-w-0 pr-12">
                      <h3 className="font-display font-bold text-brand-text text-base leading-snug truncate group-hover:text-brand-accent transition-colors duration-150">
                        {job.title}
                      </h3>
                      <p className="font-body text-xs text-brand-muted truncate">
                        {job.company}
                      </p>
                    </div>
                  </div>

                  <p className="font-body text-xs text-brand-muted leading-relaxed mb-4 line-clamp-2">
                    {job.description}
                  </p>

                  {/* Skills Tag Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-0.5 rounded-pill bg-brand-accent-light text-brand-accent-dark font-body text-[10px] font-medium border border-brand-accent-light"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="border-t border-brand-border pt-4 mt-auto">
                  <div className="flex justify-between items-center mb-3 text-xs font-body text-brand-muted">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} className="text-brand-accent" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} className="text-brand-accent" /> {job.type}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                      <span className="font-body text-[9px] uppercase tracking-wider font-semibold text-brand-muted">Salary</span>
                      <span className="font-body text-xs font-semibold text-brand-text truncate max-w-[120px]">
                        {job.salary.split(' / ')[0]}
                      </span>
                    </div>

                    <button
                      onClick={() => handleWhatsAppApply(job)}
                      disabled={job.status === "closed"}
                      className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-pill font-body text-xs font-semibold shadow-sm transition-all duration-200 ${
                        job.status === "closed"
                          ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                          : "bg-whatsapp hover:bg-[#1ebe5b] text-white hover:scale-102"
                      }`}
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.472 5.358 1.473 5.568 0 10.1-4.529 10.104-10.099.002-2.699-1.047-5.234-2.951-7.138C17.256 1.487 14.73 0.439 12.004 0.439 6.438 0.439 1.91 4.966 1.906 10.537c-.001 2.115.562 4.185 1.63 6.002l-1.074 3.924 4.017-1.054-.232-.116z" />
                      </svg>
                      <span>Apply</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* List View Layout */
          <motion.div
            key="list-layout"
            className="flex flex-col gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.04 } }
            }}
          >
            {filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                layout
                className="bg-brand-surface p-4 rounded-card border border-brand-border shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden"
                variants={{
                  hidden: { opacity: 0, x: -15 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                {/* Meta & Logo Group */}
                <div className="flex items-center gap-4 flex-grow min-w-0">
                  <div className={`w-10 h-10 rounded-card-sm ${job.logoBg} font-display font-semibold text-sm flex items-center justify-center flex-shrink-0`}>
                    {job.company.substring(0, 1)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-brand-text text-base leading-snug truncate">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 font-body text-xs text-brand-muted">
                      <span className="font-semibold text-brand-text">{job.company}</span>
                      <span className="text-brand-border">•</span>
                      <span className="flex items-center gap-0.5"><MapPin size={12} /> {job.location}</span>
                      <span className="text-brand-border">•</span>
                      <span className="flex items-center gap-0.5"><BriefcaseBusiness size={12} /> {job.type}</span>
                    </div>
                  </div>
                </div>

                {/* Skills tags list (compact) */}
                <div className="hidden lg:flex flex-wrap items-center gap-1.5 max-w-[300px]">
                  {job.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-pill bg-brand-surface-2 text-brand-accent-dark font-body text-[10px] border border-brand-border"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.skills.length > 3 && (
                    <span className="font-body text-[10px] text-brand-muted">
                      +{job.skills.length - 3} more
                    </span>
                  )}
                </div>

                {/* Status, Salary & WhatsApp Action */}
                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0">
                  <div className="flex flex-col text-left md:text-right">
                    <span className="font-body text-[9px] uppercase tracking-wider font-semibold text-brand-muted">Salary</span>
                    <span className="font-body text-xs font-semibold text-brand-text">
                      {job.salary.split(' / ')[0]}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Status badge */}
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-pill font-body text-[10px] font-semibold border ${
                      job.status === "active" 
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                        : "bg-rose-50 text-rose-700 border-rose-200"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${job.status === "active" ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
                      <span className="capitalize">{job.status}</span>
                    </span>

                    <button
                      onClick={() => handleWhatsAppApply(job)}
                      disabled={job.status === "closed"}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-pill font-body text-xs font-semibold shadow-sm transition-all duration-200 ${
                        job.status === "closed"
                          ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                          : "bg-whatsapp hover:bg-[#1ebe5b] text-white"
                      }`}
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.472 5.358 1.473 5.568 0 10.1-4.529 10.104-10.099.002-2.699-1.047-5.234-2.951-7.138C17.256 1.487 14.73 0.439 12.004 0.439 6.438 0.439 1.91 4.966 1.906 10.537c-.001 2.115.562 4.185 1.63 6.002l-1.074 3.924 4.017-1.054-.232-.116z" />
                      </svg>
                      <span className="hidden sm:inline">Apply via WhatsApp</span>
                      <span className="sm:hidden">Apply</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function JobsListing() {
  return (
    <Suspense fallback={
      <div className="max-w-[1200px] mx-auto px-6 py-8 flex justify-center items-center min-h-[300px]">
        <div className="w-8 h-8 rounded-full border-4 border-brand-accent-light border-t-brand-accent animate-spin" />
      </div>
    }>
      <JobsListContent />
    </Suspense>
  );
}
