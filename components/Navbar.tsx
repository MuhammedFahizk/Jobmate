"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, User, BriefcaseBusiness, ChevronDown } from "lucide-react";
import { dummyUser } from "@/lib/dummy-data";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Simple state tracking: if path is /dashboard, consider logged in for visual purposes
    setIsLoggedIn(pathname.startsWith("/dashboard"));

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-surface/80 backdrop-blur-md border-b border-brand-border shadow-card"
          : "bg-brand-surface border-b border-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-card-sm bg-brand-accent flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-105 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="50,5 90,28 90,72 50,95 10,72 10,28" />
              <polygon points="50,28 72,40 72,60 50,72 28,60 28,40" />
              <line x1="50" y1="28" x2="50" y2="72" />
              <line x1="28" y1="40" x2="50" y2="50" />
              <line x1="72" y1="40" x2="50" y2="50" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg leading-none tracking-tight text-brand-text flex items-center gap-1.5">
              JOBMATE
              <span className="text-[10px] font-semibold bg-brand-accent-light text-brand-accent-dark px-1.5 py-0.5 rounded">M CUBE</span>
            </span>
            <span className="font-body text-[9px] uppercase tracking-wider font-semibold text-brand-muted leading-none mt-1">
              The optimal solution for employment
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`font-body font-medium text-sm transition-colors duration-200 hover:text-brand-accent ${
              pathname === "/" ? "text-brand-accent" : "text-brand-muted"
            }`}
          >
            Home
          </Link>
          <Link
            href="/jobs"
            className={`font-body font-medium text-sm transition-colors duration-200 hover:text-brand-accent ${
              pathname.startsWith("/jobs") ? "text-brand-accent" : "text-brand-muted"
            }`}
          >
            Jobs
          </Link>

          {/* Services Dropdown */}
          <div
            className="relative py-4"
            onMouseEnter={() => setIsServicesHovered(true)}
            onMouseLeave={() => setIsServicesHovered(false)}
          >
            <button
              className={`flex items-center gap-1 font-body font-medium text-sm transition-colors duration-200 hover:text-brand-accent focus:outline-none ${
                pathname.startsWith("/services") ? "text-brand-accent" : "text-brand-muted"
              }`}
            >
              <span>Services</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${isServicesHovered ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {isServicesHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-brand-surface border border-brand-border rounded-card shadow-card-hover py-3 z-50"
                >
                  <Link
                    href="/services/job-consulting"
                    className="flex flex-col px-4 py-2.5 hover:bg-brand-bg transition-colors duration-150"
                  >
                    <span className="font-display font-semibold text-sm text-brand-text">Job Consulting</span>
                    <span className="font-body text-[10px] text-brand-muted">Kerala Job Placement via WhatsApp</span>
                  </Link>
                  <Link
                    href="/services/home-staffing"
                    className="flex flex-col px-4 py-2.5 hover:bg-brand-bg transition-colors duration-150"
                  >
                    <span className="font-display font-semibold text-sm text-brand-text">Home Staffing</span>
                    <span className="font-body text-[10px] text-brand-muted">Verified Home Nurses & Domestic Staff</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/#about"
            className="font-body font-medium text-sm transition-colors duration-200 hover:text-brand-accent text-brand-muted"
          >
            About
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 rounded-pill bg-brand-surface-2 border border-brand-border hover:bg-brand-accent-light/50 transition-colors duration-200"
            >
              <div className="w-6 h-6 rounded-full bg-brand-accent text-white text-xs font-semibold flex items-center justify-center font-display">
                {dummyUser.avatarInitials}
              </div>
              <span className="font-body text-sm font-medium text-brand-text">
                Dashboard
              </span>
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="font-body font-medium text-sm text-brand-muted hover:text-brand-accent transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="font-body font-medium text-sm bg-brand-accent hover:bg-brand-accent-dark text-white px-5 py-2.5 rounded-pill shadow-sm transition-all duration-200 hover:scale-102"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-card-sm text-brand-muted hover:text-brand-text hover:bg-brand-bg transition-colors duration-200"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-brand-surface border-b border-brand-border shadow-card-hover p-6 flex flex-col gap-6 animate-in fade-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-body font-medium text-base text-brand-muted hover:text-brand-accent transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/jobs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-body font-medium text-base text-brand-muted hover:text-brand-accent transition-colors duration-200"
            >
              Jobs
            </Link>

            {/* Mobile services sub-menu */}
            <div className="flex flex-col">
              <button
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                className="flex items-center justify-between font-body font-medium text-base text-brand-muted hover:text-brand-accent transition-colors duration-200 text-left py-1"
              >
                <span>Services</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${isMobileServicesOpen ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {isMobileServicesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-4 flex flex-col gap-3 mt-2 border-l border-brand-border"
                  >
                    <Link
                      href="/services/job-consulting"
                      onClick={() => { setIsMobileMenuOpen(false); setIsMobileServicesOpen(false); }}
                      className="font-body text-sm font-medium text-brand-muted hover:text-brand-accent transition-colors py-0.5"
                    >
                      Job Consulting
                    </Link>
                    <Link
                      href="/services/home-staffing"
                      onClick={() => { setIsMobileMenuOpen(false); setIsMobileServicesOpen(false); }}
                      className="font-body text-sm font-medium text-brand-muted hover:text-brand-accent transition-colors py-0.5"
                    >
                      Home Staffing
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-body font-medium text-base text-brand-muted hover:text-brand-accent transition-colors duration-200"
            >
              About
            </Link>
          </nav>
          
          <hr className="border-brand-border" />
          
          <div className="flex flex-col gap-3">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-pill bg-brand-surface-2 border border-brand-border font-body font-medium text-brand-text"
              >
                <div className="w-6 h-6 rounded-full bg-brand-accent text-white text-xs font-semibold flex items-center justify-center">
                  {dummyUser.avatarInitials}
                </div>
                <span>Dashboard</span>
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3 text-center rounded-pill font-body font-medium text-brand-muted hover:bg-brand-bg transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3 text-center rounded-pill bg-brand-accent hover:bg-brand-accent-dark text-white font-body font-medium shadow-sm transition-colors duration-200"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

