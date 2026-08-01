"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSearchBar() {
    const router = useRouter();
    const [keyword, setKeyword] = useState("");
    const [focused, setFocused] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (keyword.trim()) params.set("search", keyword.trim());
        router.push(`/jobs${params.toString() ? `?${params.toString()}` : ""}`);
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative w-full max-w-full"
        >
            {/* soft gradient glow ring, appears on focus */}
            <div
                className={`absolute -inset-[1.5px] rounded-full bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 blur-sm transition-opacity duration-500 pointer-events-none ${focused ? "opacity-50" : "opacity-0"
                    }`}
            />

            <div className="relative flex items-center gap-2 bg-white/60 backdrop-blur-2xl border border-white/70 shadow-lg shadow-black/[0.06] rounded-full pl-6 pr-2 py-2">
                <Search size={18} className="text-primary-600/70 flex-shrink-0" />
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="Search job title, keyword, or company…"
                    className="w-full min-w-0 py-3 font-body text-[15px] text-foreground placeholder-muted/70 outline-none bg-transparent"
                />
                <button
                    type="submit"
                    className="flex-shrink-0 inline-flex items-center justify-center gap-2 font-mono text-[11px] font-semibold tracking-widest uppercase bg-teal hover:bg-primary-600 text-white px-5 sm:px-7 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                >
                    <Search size={14} className="sm:hidden" />
                    <span className="hidden sm:inline">Search Jobs</span>
                </button>
            </div>
        </motion.form>
    );
}