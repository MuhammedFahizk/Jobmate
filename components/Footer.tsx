import { BriefcaseBusiness } from "lucide-react";
import Link from "next/link";
// import { Briefcase, Twitter, Linkedin, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  const footerLinks = [
    {
      title: "For Candidates",
      links: [
        { name: "Browse Jobs", href: "/jobs" },
        { name: "Candidate Dashboard", href: "/dashboard" },
        { name: "Placement Services", href: "/services/job-consulting" },
        { name: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Contact Support", href: "/contact" },
        { name: "Privacy Policy", href: "/privacy" },
      ],
    },
  ];

  return (
    <footer className="bg-brand-text text-white pt-16 pb-12 border-t border-brand-text/20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo and About Column */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 self-start group">
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
                <span className="font-display font-bold text-lg leading-none tracking-tight text-white flex items-center gap-1.5">
                  JOBMATE
                  <span className="text-[10px] font-semibold bg-white/10 text-white px-1.5 py-0.5 rounded">M CUBE</span>
                </span>
                <span className="font-body text-[9px] uppercase tracking-wider font-semibold text-slate-400 leading-tight mt-0.5">
                  The optimal solution for employment
                </span>
              </div>
            </Link>
            <p className="font-body text-brand-muted text-sm max-w-sm leading-relaxed text-slate-300">
              Connecting premium talent with the fastest-growing companies in Kerala and globally. Powered by M Cube Services, NIT Kattangal.
            </p>
            {/* Social Icons */}
            {/* <div className="flex items-center gap-4 text-slate-400">
              <a href="#" className="hover:text-brand-accent transition-colors duration-200" aria-label="Twitter">
                <Twitter size={20} strokeWidth={1.5} />
              </a>
              <a href="#" className="hover:text-brand-accent transition-colors duration-200" aria-label="LinkedIn">
                <Linkedin size={20} strokeWidth={1.5} />
              </a>
              <a href="#" className="hover:text-brand-accent transition-colors duration-200" aria-label="Facebook">
                <Facebook size={20} strokeWidth={1.5} />
              </a>
              <a href="#" className="hover:text-brand-accent transition-colors duration-200" aria-label="Instagram">
                <Instagram size={20} strokeWidth={1.5} />
              </a>
            </div> */}
          </div>

          {/* Quick links columns */}
          {footerLinks.map((column) => (
            <div key={column.title} className="flex flex-col gap-4">
              <h3 className="font-display text-sm font-semibold text-white tracking-wider uppercase">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-slate-300 hover:text-brand-accent transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="border-slate-800 my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-body">
          <span>&copy; {new Date().getFullYear()} JobMate. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-accent transition-colors duration-200">Terms of Service</a>
            <a href="#" className="hover:text-brand-accent transition-colors duration-200">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
