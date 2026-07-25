"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface GridTile {
    src: string;
    alt: string;
    className: string;
    tint: string;
    rotate?: number;
    delay: number;
    duration: number;
    badge?: string;
    label?: { name: string; role: string };
}

const tiles: GridTile[] = [
    {
        src: "/images/profile.png",
        alt: "Candidate",
        className: "w-[130px] h-[170px] top-0 left-[4%]",
        tint: "bg-primary-100",
        rotate: -3,
        delay: 0.1,
        duration: 4.2,
    },
    {
        src: "/images/profile1.png",
        alt: "Candidate",
        className: "w-[120px] h-[150px] top-[4%] right-[10%]",
        tint: "bg-secondary-100",
        rotate: 2,
        delay: 0.25,
        duration: 3.8,
    },
    {
        src: "/images/profile2.png",
        alt: "Candidate",
        className: "w-[110px] h-[140px] bottom-[6%] left-[2%] z-10",
        tint: "bg-accent-400/20",
        rotate: -2,
        delay: 0.4,
        duration: 4.5,
        badge: "Hired ✓",
    },
    {
        src: "/images/profile4.png",
        alt: "Candidate",
        className: "w-[100px] h-[130px] top-[36%] left-[34%] z-20",
        tint: "bg-secondary-50",
        rotate: -4,
        delay: 0.5,
        duration: 3.6,
    },
    {
        src: "/images/image.png",
        alt: "Featured candidate",
        className: "w-[175px] h-[235px] bottom-0 right-[2%] z-20",
        tint: "bg-primary-50",
        rotate: 3,
        delay: 0.15,
        duration: 4,
        label: { name: "Ayesha Rahman", role: "UI Designer • Hired" },
    },
];

const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const item = {
    hidden: { opacity: 0, scale: 0.85, y: 24 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: "spring" as const, stiffness: 90, damping: 14 },
    },
};

export function HeroPhotoGrid() {
    return (
        <motion.div
            className="relative w-full h-[420px] sm:h-[480px]"
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {/* ambient color wash behind the cluster */}
            <div className="absolute w-[75%] h-[75%] top-[8%] left-[8%] rounded-full bg-gradient-to-tr from-primary-200 via-primary-100 to-transparent opacity-50 blur-3xl pointer-events-none" />
            <div className="absolute w-[45%] h-[45%] top-0 right-0 rounded-full bg-gradient-to-bl from-secondary-100 to-transparent opacity-40 blur-2xl pointer-events-none" />
            <div className="absolute w-[35%] h-[35%] bottom-0 left-0 rounded-full bg-gradient-to-tr from-accent-400/20 to-transparent opacity-40 blur-2xl pointer-events-none" />

            {/* dashed connective arc, echoes the doodle motif elsewhere on the page */}
            <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full opacity-25 pointer-events-none">
                <circle cx="200" cy="200" r="175" fill="none" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 7" />
            </svg>

            {tiles.map((tile, idx) => (
                <motion.div
                    key={idx}
                    variants={item}
                    animate={{ y: [0, -8, 0], rotate: tile.rotate ?? 0 }}
                    transition={{
                        y: {
                            duration: tile.duration,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                            delay: tile.delay,
                        },
                    }}
                    whileHover={{ y: -10, scale: 1.045, transition: { duration: 0.25 } }}
                    className={`absolute ${tile.className} rounded-[28px] overflow-hidden shadow-card hover:shadow-card-hover border border-white/70 ${tile.tint} backdrop-blur-sm cursor-pointer`}
                >
                    <Image src={tile.src} alt={tile.alt} fill className="object-cover" />

                    {tile.badge && (
                        <span className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-sm text-[9px] font-mono uppercase tracking-wider font-semibold text-primary-700 px-2 py-1 rounded-full shadow-sm">
                            {tile.badge}
                        </span>
                    )}

                    {tile.label && (
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-3.5 pt-10 pb-3.5">
                            <p className="text-white font-display font-semibold text-[13px] leading-tight">
                                {tile.label.name}
                            </p>
                            <p className="text-white/80 font-mono text-[9px] uppercase tracking-wider mt-0.5">
                                {tile.label.role}
                            </p>
                        </div>
                    )}
                </motion.div>
            ))}
        </motion.div>
    );
}