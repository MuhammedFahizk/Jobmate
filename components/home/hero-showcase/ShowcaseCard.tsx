import Image from "next/image";
import {
    ArrowRight, ArrowUpRight, MapPin, DollarSign,
    Code2, Grid2x2, ShoppingBag, Home, Music,
    RouteIcon,
} from "lucide-react";
import type { ShowcaseCard as ShowcaseCardData } from "./cardData";

const TINTS: Record<string, string> = {
    mint: "linear-gradient(135deg, #E8FFE9, #C8FDC9)",
    peach: "linear-gradient(135deg, #FFD8C2, #FFC8A9)",
    coral: "linear-gradient(135deg, #FFB3AF, #FF908D)",
    purple: "linear-gradient(135deg, #F3C6FF, #E8B0F2)",
    sky: "linear-gradient(135deg, #C6F7FF, #78E6FF)",
};

const COMPANY_ICONS: Record<string, React.ElementType> = {
    chrome: RouteIcon, "code-2": Code2, "grid-2x2": Grid2x2,
    "shopping-bag": ShoppingBag, home: Home, music: Music,
};

const cardBase =
    "rounded-[24px] p-4 shadow-[0_12px_32px_rgba(17,17,17,0.08)] cursor-default select-none";

export function ShowcaseCard({ card }: { card: ShowcaseCardData }) {
    const bg = { backgroundImage: TINTS[(card as any).tint] };

    switch (card.type) {
        case "candidate": {
            const dotColor = card.status === "Available" ? "#22C55E" : "#A855F7";
            return (
                <div className={cardBase} style={bg}>
                    <div className="flex items-center gap-1.5 mb-2.5">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dotColor }} />
                        <span className="text-[11px] font-semibold" style={{ color: dotColor }}>{card.status}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-sm border-2 border-white flex-shrink-0">
                            <Image src={card.avatar} alt={card.name} fill className="object-cover" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[17px] font-bold text-[#111111] leading-tight truncate">{card.name}</p>
                            <p className="text-[13px] font-medium text-[#444444] leading-tight truncate">{card.role}</p>
                        </div>
                    </div>
                    <p className="text-[12px] text-[#555555] mt-2.5 truncate">{card.skills}</p>
                    <p className="text-[11px] text-[#666666] font-medium mt-1">{card.years}</p>
                </div>
            );
        }

        case "job": {
            const Icon = COMPANY_ICONS[card.companyIcon] ?? Code2;
            return (
                <div className={cardBase} style={bg}>
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm mb-3">
                        <Icon size={16} style={{ color: card.companyColor }} />
                    </div>
                    <p className="text-[16px] font-bold text-[#111111] leading-snug mb-1.5">{card.title}</p>
                    <div className="flex items-center gap-1 text-[12px] text-[#555555] mb-1">
                        <MapPin size={11} /> {card.location}
                    </div>
                    <div className="flex items-center gap-1 text-[13px] font-semibold text-[#111111] mb-3">
                        <DollarSign size={12} /> {card.salary}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider font-bold text-[#111111]">
                        Apply Now <ArrowRight size={12} />
                    </div>
                </div>
            );
        }

        case "company": {
            const Icon = COMPANY_ICONS[card.icon] ?? Code2;
            return (
                <div className={cardBase} style={bg}>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                            <Icon size={18} style={{ color: card.iconColor }} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[17px] font-bold text-[#111111] truncate">{card.name}</p>
                            <p className="text-[11px] font-mono uppercase tracking-wider text-[#5a3a38]">Hiring</p>
                        </div>
                    </div>
                    <p className="text-[13px] font-semibold text-[#111111] mt-2">{card.openings} Open Positions</p>
                    <div className="flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider font-bold text-[#111111] mt-2">
                        View Jobs <ArrowRight size={12} />
                    </div>
                </div>
            );
        }

        case "skill":
            return (
                <div className={cardBase} style={bg}>
                    <div className="flex flex-wrap gap-1.5">
                        {card.skills.map((s) => (
                            <span key={s} className="text-[11px] font-semibold text-[#111111] bg-white/70 px-2.5 py-1 rounded-full">
                                {s}
                            </span>
                        ))}
                    </div>
                </div>
            );

        case "stat":
            if (card.variant === "sparkline") {
                const bars = [40, 65, 45, 80, 60, 95, 70];
                return (
                    <div className={cardBase} style={bg}>
                        <p className="text-[13px] font-semibold text-[#333333]">{card.label}</p>
                        <p className="text-[26px] font-display font-bold text-[#111111] leading-none mt-1">{card.value}</p>
                        <div className="flex items-end gap-1 h-8 mt-2.5">
                            {bars.map((h, i) => (
                                <div key={i} className="flex-1 rounded-sm bg-[#111111]/70" style={{ height: `${h}%` }} />
                            ))}
                        </div>
                        {card.sub && <p className="text-[10px] text-[#333333] font-medium mt-1.5">{card.sub}</p>}
                    </div>
                );
            }
            if (card.variant === "ring") {
                return (
                    <div className={cardBase} style={bg}>
                        <div className="flex items-center gap-4">
                            <div
                                className="relative w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                                style={{ background: `conic-gradient(#111111 ${parseInt(card.value)}%, rgba(255,255,255,0.5) 0)` }}
                            >
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[11px] font-bold text-[#111111]">
                                    {card.value}
                                </div>
                            </div>
                            <div className="min-w-0">
                                <p className="text-[14px] font-bold text-[#111111] leading-tight">{card.label}</p>
                                {card.sub && <p className="text-[11px] text-[#444444] mt-0.5">{card.sub}</p>}
                            </div>
                        </div>
                    </div>
                );
            }
            return (
                <div className={cardBase} style={bg}>
                    <p className="text-[26px] font-display font-bold text-[#111111] leading-none">{card.value}</p>
                    <p className="text-[12px] text-[#333333] mt-1.5">{card.label}</p>
                    {card.sub && (
                        <p className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#111111] mt-2 flex items-center gap-1">
                            View All <ArrowUpRight size={11} />
                        </p>
                    )}
                </div>
            );
    }
}