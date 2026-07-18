"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  AlertCircle,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Clock,
  HashIcon,
} from "lucide-react";
import { dummyJobs, dummyUser, Job } from "@/lib/dummy-data";

const JOBS_PER_PAGE = 5;

function JobsListContent() {
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showMobileList, setShowMobileList] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const types = ["All", ...Array.from(new Set(dummyJobs.map((job) => job.type)))];

  // ── Filtering ──
  const filteredJobs = useMemo(() => {
    return dummyJobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesType = selectedType === "All" || job.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [searchTerm, selectedType]);

  // ── Pagination helpers ──
  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / JOBS_PER_PAGE));
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedType]);

  // ── Deep-link: ?apply=JOB-xxx ──
  useEffect(() => {
    const applyJobId = searchParams.get("apply");
    if (applyJobId) {
      const job = dummyJobs.find((j) => j.id === applyJobId);
      if (job) {
        setSelectedJob(job);
        setShowMobileList(false);
      }
    }
  }, [searchParams]);

  // ── Auto-select first job on desktop ──
  useEffect(() => {
    if (!selectedJob && paginatedJobs.length > 0 && typeof window !== "undefined" && window.innerWidth >= 1024) {
      setSelectedJob(paginatedJobs[0]);
    }
  }, [paginatedJobs, selectedJob]);

  const handleWhatsAppApply = (job: Job) => {
    const adminPhone = "919999999999";
    const text = `Hi JobMate! I want to apply for the job "${job.title}" (ID: ${job.id}) at ${job.company}. My name is ${dummyUser.name}. Please review my application.`;
    const waUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
  };

  const handleSelectJob = (job: Job) => {
    setSelectedJob(job);
    setShowMobileList(false);
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    // Auto-select first job of the new page on desktop
    const start = (page - 1) * JOBS_PER_PAGE;
    const firstJob = filteredJobs[start];
    if (firstJob && typeof window !== "undefined" && window.innerWidth >= 1024) {
      setSelectedJob(firstJob);
    }
  };

  // ── Render ──
  return (
    <div className="bg-background flex flex-col ">
      {/* ─── HEADER (fixed height) ─── */}
      {/* <div className="bg-white border-b border-border px-6 py-6 md:py-8 flex-shrink-0">
        <div className="max-w-7xl mx-auto">
          <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-primary-500 mb-2 block">
            Explore Roles
          </span>
          <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-2">
            Find Your Next Opportunity
          </h1>
          <p className="text-muted text-sm max-w-[600px] leading-[1.6]">
            Browse {filteredJobs.length} openings from verified companies.
            Connect directly with employers and fast-track your hiring process.
          </p>
        </div>
      </div> */}

      {/* ─── BODY (fills remaining viewport) ─── */}
      <div className="flex-1 min-h-0 max-w-7xl w-full mx-auto px-4 md:px-6 flex flex-col py-4 gap-4">
        {/* Search Bar (fixed height) */}
        <div className="bg-white p-3 rounded-[14px] border border-border shadow-sm flex flex-col sm:flex-row gap-3 flex-shrink-0 z-20">
          <div className="relative flex-grow flex items-center">
            <Search size={18} className="absolute left-4 text-muted" />
            <input
              type="text"
              placeholder="Search roles, companies, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-lg border border-transparent bg-background/50 hover:bg-background focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 text-foreground font-body text-[14px] placeholder-muted transition-all duration-200 outline-none"
            />
          </div>
          <div className="sm:w-[200px] flex-shrink-0">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 hover:bg-background focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 text-foreground font-body text-[14px] outline-none transition-all duration-200 cursor-pointer appearance-none"
            >
              <option value="All">All Job Types</option>
              {types
                .filter((t) => t !== "All")
                .map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* ─── Split View (fills the rest, both panels scroll independently) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 min-h-0">
          {/* ── LEFT: Job List + Pagination ── */}
          <div
            className={`lg:col-span-5 flex flex-col min-h-0 ${!showMobileList ? "hidden lg:flex" : "flex"
              }`}
          >
            {/* Scrollable list */}
            <div className="flex-1 min-h-0 pr-1 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {paginatedJobs.length === 0 ? (
                  <motion.div
                    key="empty-state"
                    className="bg-white border border-border rounded-[14px] p-10 text-center shadow-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <AlertCircle
                      size={40}
                      className="text-muted mx-auto mb-4"
                      strokeWidth={1.5}
                    />
                    <h3 className="font-display font-semibold text-lg mb-2">
                      No roles found
                    </h3>
                    <p className="text-[13px] text-muted leading-[1.6]">
                      Try adjusting your search terms or filters to find what
                      you&apos;re looking for.
                    </p>
                  </motion.div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {paginatedJobs.map((job, idx) => (
                      <motion.div
                        key={job.id}
                        layout
                        onClick={() => handleSelectJob(job)}
                        className={`cursor-pointer bg-white border rounded-[14px] p-5 relative overflow-hidden transition-all duration-300 group ${selectedJob?.id === job.id
                          ? "border-primary-500 shadow-md ring-1 ring-primary-500/20"
                          : "border-border shadow-sm hover:border-primary-300 hover:shadow-card-hover hover:-translate-y-0.5"
                          }`}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        {selectedJob?.id === job.id && (
                          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary-500" />
                        )}

                        <div className="flex justify-between items-start mb-3 pl-1">
                          <div className="flex gap-3 items-center">
                            <div
                              className={`w-10 h-10 rounded-lg border-[1.5px] ${selectedJob?.id === job.id
                                ? "border-primary-200"
                                : "border-border"
                                } ${job.logoBg || "bg-primary-50 text-primary-700"
                                } font-display font-semibold text-sm flex items-center justify-center -rotate-3`}
                            >
                              {job.company.substring(0, 1)}
                            </div>
                            <div>
                              <h3 className="font-display font-semibold text-[15px] group-hover:text-primary-600 transition-colors leading-tight">
                                {job.title}
                              </h3>
                              <p className="font-body text-[12px] text-muted mt-0.5">
                                {job.company}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full font-mono text-[9px] font-semibold tracking-wider uppercase border ${job.status === "active"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-rose-50 text-rose-700 border-rose-200"
                              }`}
                          >
                            {job.status}
                          </span>
                        </div>

                        <div className="pl-1 mb-4 flex flex-wrap gap-2 text-[11px] font-body text-muted">
                          <span className="flex items-center gap-1">
                            <MapPin size={12} /> {job.location}
                          </span>
                          <span className="text-border">•</span>
                          <span className="flex items-center gap-1">
                            <BriefcaseBusiness size={12} /> {job.type}
                          </span>
                        </div>

                        <div className="pl-1 border-t border-dashed border-border pt-3 mt-auto flex items-center justify-between">
                          <span className="font-mono text-[10px] text-primary-500 font-semibold tracking-[0.04em] uppercase">
                            {job.salary.split(" / ")[0]}
                          </span>
                          <span
                            className={`font-body text-[11px] font-semibold flex items-center gap-1 transition-colors ${selectedJob?.id === job.id
                              ? "text-primary-600"
                              : "text-muted group-hover:text-foreground"
                              }`}
                          >
                            View Details{" "}
                            <ArrowRight
                              size={14}
                              className="transform group-hover:translate-x-0.5 transition-transform"
                            />
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Pagination bar (pinned to bottom of left column) */}
            {totalPages > 1 && (
              <div className="flex-shrink-0 pt-4 flex items-center justify-between">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg border border-border bg-white text-[12px] font-semibold text-muted hover:text-foreground hover:border-primary-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <ChevronLeft size={14} /> Prev
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`w-8 h-8 rounded-lg text-[12px] font-semibold transition-all duration-200 ${page === currentPage
                          ? "bg-foreground text-white shadow-sm"
                          : "bg-white border border-border text-muted hover:border-primary-300 hover:text-foreground"
                          }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg border border-border bg-white text-[12px] font-semibold text-muted hover:text-foreground hover:border-primary-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Next <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>

          {/* ── RIGHT: Job Details ── */}
          <div
            className={`lg:col-span-7 min-h-0 flex flex-col ${showMobileList ? "hidden lg:flex" : "flex"
              }`}
          >
            {selectedJob ? (
              <motion.div
                key={selectedJob.id}
                className="bg-white border border-border rounded-[14px] shadow-sm  flex flex-col flex-1 min-h-0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Mobile Back Button */}
                <div className="lg:hidden border-b border-border p-4 bg-background/50 flex items-center flex-shrink-0">
                  <button
                    onClick={() => setShowMobileList(true)}
                    className="flex items-center gap-1 text-[13px] font-semibold text-muted hover:text-foreground transition-colors"
                  >
                    <ChevronLeft size={16} /> Back to roles
                  </button>
                </div>

                {/* Scrollable detail content */}
                <div className="flex-1 min-h-0 p-6 md:p-8 ">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 pb-8 border-b border-dashed border-border">
                    <div className="flex gap-4 items-start">
                      <div
                        className={`w-14 h-14 rounded-xl border-2 border-border ${selectedJob.logoBg ||
                          "bg-primary-50 text-primary-700"
                          } font-display font-bold text-xl flex items-center justify-center -rotate-3 shadow-sm flex-shrink-0`}
                      >
                        {selectedJob.company.substring(0, 1)}
                      </div>
                      <div>
                        <h2 className="font-display font-bold text-2xl md:text-[28px] leading-tight mb-2">
                          {selectedJob.title}
                        </h2>
                        <div className="text-[14px] text-muted flex flex-wrap items-center gap-2">
                          <span className="font-semibold text-foreground">
                            {selectedJob.company}
                          </span>
                          <span className="text-border">•</span>
                          <span className="flex items-center gap-1">
                            <MapPin size={14} /> {selectedJob.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleWhatsAppApply(selectedJob)}
                      disabled={selectedJob.status === "closed"}
                      className={`flex-shrink-0 font-mono text-[11px] font-semibold tracking-widest uppercase flex items-center justify-center gap-2 px-6 py-3 rounded transition-all duration-200 ${selectedJob.status === "closed"
                        ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                        : "bg-foreground hover:bg-primary-600 text-white shadow-md hover:-translate-y-0.5 active:translate-y-0"
                        }`}
                    >
                      <svg
                        className={`w-4 h-4 ${selectedJob.status === "closed"
                          ? "fill-slate-400"
                          : "fill-whatsapp"
                          }`}
                        viewBox="0 0 24 24"
                      >
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.472 5.358 1.473 5.568 0 10.1-4.529 10.104-10.099.002-2.699-1.047-5.234-2.951-7.138C17.256 1.487 14.73 0.439 12.004 0.439 6.438 0.439 1.91 4.966 1.906 10.537c-.001 2.115.562 4.185 1.63 6.002l-1.074 3.924 4.017-1.054-.232-.116z" />
                      </svg>
                      <span>
                        {selectedJob.status === "closed"
                          ? "Closed"
                          : "Apply Now"}
                      </span>
                    </button>
                  </div>

                  {/* Meta Highlights — Ticket Card */}
                  <div className="bg-white border border-border rounded-[14px] overflow-hidden mb-8 relative">
                    {/* Left accent bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary-500" />

                    {/* Top row: Salary + Job Type */}
                    <div className="grid grid-cols-2 divide-x divide-dashed divide-border">
                      <div className="p-5 pl-6 flex items-start  gap-3">
                        <div className="w-9 h-9 rounded-lg border-[1.5px] border-primary-500 bg-primary-50 text-primary-700 flex items-center justify-center -rotate-3 flex-shrink-0">
                          <span className="font-display font-bold text-[11px]">₹</span>
                        </div>
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted block mb-1">Salary</span>
                          <span className="font-display font-semibold text-[14px] leading-tight block">{selectedJob.salary}</span>
                        </div>
                      </div>
                      <div className="p-5 flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg border-[1.5px] border-primary-500 bg-primary-50 text-primary-700 flex items-center justify-center -rotate-3 flex-shrink-0">
                          <BriefcaseBusiness size={14} strokeWidth={2} />
                        </div>
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted block mb-1">Job Type</span>
                          <span className="font-display font-semibold text-[15px] leading-tight block">{selectedJob.type}</span>
                        </div>
                      </div>
                    </div>

                    {/* Dashed divider with circle punches */}
                    <div className="relative border-t-[1.5px] border-dashed border-border before:content-[''] before:absolute before:-top-[7px] before:-left-[7px] before:w-3.5 before:h-3.5 before:rounded-full before:bg-background before:border-[1.5px] before:border-border after:content-[''] after:absolute after:-top-[7px] after:-right-[7px] after:w-3.5 after:h-3.5 after:rounded-full after:bg-background after:border-[1.5px] after:border-border" />

                    {/* Bottom row: Experience + Job ID */}
                    <div className="grid grid-cols-2 divide-x divide-dashed divide-border">
                      <div className="p-5 pl-6 flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg border-[1.5px] border-primary-500 bg-primary-50 text-primary-700 flex items-center justify-center -rotate-3 flex-shrink-0">
                          <Clock size={14} strokeWidth={2} />
                        </div>
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted block mb-1">Experience</span>
                          <span className="font-display font-semibold text-[15px] leading-tight block">Min. 1-2 Years</span>
                        </div>
                      </div>
                      <div className="p-5 flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg border-[1.5px] border-primary-500 bg-primary-50 text-primary-700 flex items-center justify-center -rotate-3 flex-shrink-0">
                          <HashIcon size={14} strokeWidth={2} />
                        </div>
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted block mb-1">Job ID</span>
                          <span className="font-display font-semibold text-[15px] leading-tight block">{selectedJob.id}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Details Content */}
                  <div className="space-y-8">
                    <div>
                      <h3 className="font-display font-semibold text-lg mb-3">
                        About the Role
                      </h3>
                      <p className="text-[14px] text-muted leading-[1.7]">
                        {selectedJob.description}
                        <br />
                        <br />
                        As a key member of the team, you will be responsible for
                        contributing to high-impact projects, working closely
                        with cross-functional teams, and helping the company
                        achieve its goals in a fast-paced environment.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-display font-semibold text-lg mb-3">
                        Required Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedJob.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-lg text-[12px] font-medium border border-primary-100"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-display font-semibold text-lg mb-3">
                        Key Responsibilities
                      </h3>
                      <ul className="space-y-2 text-[14px] text-muted">
                        <li className="flex items-start gap-3">
                          <span className="font-mono text-primary-500 font-bold text-[10px] mt-1 flex-shrink-0">
                            ++
                          </span>
                          <span>
                            Collaborate with cross-functional teams to define,
                            design, and ship new features.
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="font-mono text-primary-500 font-bold text-[10px] mt-1 flex-shrink-0">
                            ++
                          </span>
                          <span>
                            Work on bug fixing and improving application
                            performance.
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="font-mono text-primary-500 font-bold text-[10px] mt-1 flex-shrink-0">
                            ++
                          </span>
                          <span>
                            Continuously discover, evaluate, and implement new
                            technologies to maximize efficiency.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white border border-border rounded-[14px] shadow-sm flex items-center justify-center flex-1 text-center p-8">
                <div>
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4 border border-border">
                    <Search size={24} className="text-muted" />
                  </div>
                  <h3 className="font-display font-semibold text-xl mb-2">
                    Select a Job
                  </h3>
                  <p className="text-[14px] text-muted max-w-sm mx-auto">
                    Click on a job from the list to view its full details,
                    requirements, and apply instantly.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function JobsListing() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="w-8 h-8 rounded-full border-4 border-primary-200 border-t-primary-500 animate-spin" />
        </div>
      }
    >
      <JobsListContent />
    </Suspense>
  );
}
