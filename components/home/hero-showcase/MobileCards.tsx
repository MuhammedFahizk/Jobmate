import Image from "next/image";
import { ArrowRight, Chrome, Code2, Grid2x2, ShoppingBag, Home, Music } from "lucide-react";
import type { CandidateCardData, CompanyCardData, JobCardData } from "./cardData";

const TINTS: Record<string, string> = {
    mint: "linear-gradient(135deg, #E8FFE9, #C8FDC9)",
    peach: "linear-gradient(135deg, #FFD8C2, #FFC8A9)",
    coral: "linear-gradient(135deg, #FFB3AF, #FF908D)",
    purple: "linear-gradient(135deg, #F3C6FF, #E8B0F2)",
    sky: "linear-gradient(135deg, #C6F7FF, #78E6FF)",
};

const COMPANY_ICONS: Record<string, React.ElementType> = {
    chrome: Chrome, "code-2": Code2, "grid-2x2": Grid2x2,
    "shopping-bag": ShoppingBag, home: Home, music: Music,
};

// ── Candidate — 75px target ──────────────────────────────────────────
export function MobileCandidateChip({ card }: { card: CandidateCardData }) {
    const skillTags = card.skills.split("•").map((s) => s.trim()).slice(0, 2);
    const dotColor = card.status === "Available" ? "#22C55E" : "#A855F7";

    return (
        <div
            className="flex-shrink-0 w-[230px] h-[76px] rounded-[20px] px-3 py-2.5 flex items-center gap-2.5 shadow-[0_8px_20px_rgba(17,17,17,0.06)] snap-start"
            style={{ backgroundImage: TINTS[card.tint] }}
        >
            <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-white flex-shrink-0">
                <Image src={card.avatar} alt={card.name} fill className="object-cover" />
                <span
                    className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white"
                    style={{ backgroundColor: dotColor }}
                />
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-[13px] font-bold text-[#111111] leading-tight truncate">{card.name}</p>
                <p className="text-[11px] font-medium text-[#444444] leading-tight truncate">{card.role}</p>
                <div className="flex gap-1 mt-1">
                    {skillTags.map((s) => (
                        <span key={s} className="text-[9px] font-semibold text-[#111111] bg-white/70 px-1.5 py-0.5 rounded-full truncate max-w-[70px]">
                            {s}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ── Company — 65px target ────────────────────────────────────────────
export function MobileCompanyChip({ card }: { card: CompanyCardData }) {
    const Icon = COMPANY_ICONS[card.icon] ?? Code2;
    return (
        <div
            className="flex-shrink-0 w-[170px] h-[66px] rounded-[20px] px-3 py-2 flex items-center gap-2.5 shadow-[0_8px_20px_rgba(17,17,17,0.06)] snap-start"
            style={{ backgroundImage: TINTS[card.tint] }}
        >
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                <Icon size={14} style={{ color: card.iconColor }} />
            </div>
            <div className="min-w-0">
                <p className="text-[13px] font-bold text-[#111111] truncate">{card.name}</p>
                <p className="text-[10px] text-[#5a3a38] font-semibold">Hiring • {card.openings}</p>
            </div>
        </div>
    );
}

// ── Job — 78px target ────────────────────────────────────────────────
export function MobileJobChip({ card }: { card: JobCardData }) {
    const Icon = COMPANY_ICONS[card.companyIcon] ?? Code2;
    return (
        <div
            className="flex-shrink-0 w-[200px] h-[78px] rounded-[20px] px-3 py-2.5 shadow-[0_8px_20px_rgba(17,17,17,0.06)] snap-start"
            style={{ backgroundImage: TINTS[card.tint] }}
        >
            <div className="flex items-center gap-1.5 mb-1">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <Icon size={11} style={{ color: card.companyColor }} />
                </div>
                <p className="text-[12px] font-bold text-[#111111] truncate">{card.title}</p>
            </div>
            <p className="text-[11px] font-semibold text-[#111111]">{card.salary}</p>
            <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] text-[#555555] truncate">{card.location}</span>
                <span className="flex items-center gap-0.5 text-[9px] font-mono uppercase tracking-wide font-bold text-[#111111]">
                    Apply <ArrowRight size={9} />
                </span>
            </div>
        </div>
    );
}

// ── Skill — 50px target ───────────────────────────────────────────────
export function MobileSkillPill({ skill }: { skill: string }) {
    return (
        <div
            className="flex-shrink-0 h-[50px] rounded-full px-4 flex items-center shadow-[0_6px_16px_rgba(17,17,17,0.05)] snap-start"
            style={{ backgroundImage: TINTS.purple }}
        >
            <span className="text-[12px] font-semibold text-[#111111] whitespace-nowrap">{skill}</span>
        </div>
    );
}

// ── Stat — 60px target ───────────────────────────────────────────────
export function MobileStatChip({ value, label }: { value: string; label: string }) {
    return (
        <div
            className="flex-shrink-0 w-[140px] h-[60px] rounded-[20px] px-3 flex flex-col justify-center shadow-[0_8px_20px_rgba(17,17,17,0.06)] snap-start"
            style={{ backgroundImage: TINTS.sky }}
        >
            <p className="text-[16px] font-display font-bold text-[#111111] leading-none">{value}</p>
            <p className="text-[10px] text-[#333333] mt-0.5 truncate">{label}</p>
        </div>
    );
}